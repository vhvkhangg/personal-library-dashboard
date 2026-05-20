package com.vhvkhangg.personallibrarydashboard.auth.application;

import com.vhvkhangg.personallibrarydashboard.auth.AuthProperties;
import com.vhvkhangg.personallibrarydashboard.auth.infrastructure.AuthUserEntity;
import com.vhvkhangg.personallibrarydashboard.auth.infrastructure.AuthUserJpaRepository;
import com.vhvkhangg.personallibrarydashboard.auth.infrastructure.RefreshTokenEntity;
import com.vhvkhangg.personallibrarydashboard.auth.infrastructure.RefreshTokenJpaRepository;
import com.vhvkhangg.personallibrarydashboard.common.security.JwtClaims;
import com.vhvkhangg.personallibrarydashboard.common.security.JwtService;
import com.vhvkhangg.personallibrarydashboard.common.security.OpaqueTokenGenerator;
import com.vhvkhangg.personallibrarydashboard.common.security.TokenHashingService;
import java.time.Clock;
import java.time.Instant;
import java.util.UUID;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
public class DefaultAuthUseCase implements AuthUseCase {

  private final AuthUserJpaRepository users;
  private final RefreshTokenJpaRepository refreshTokens;
  private final PasswordEncoder passwordEncoder;
  private final IdentifierNormalizer identifierNormalizer;
  private final JwtService jwtService;
  private final OpaqueTokenGenerator opaqueTokenGenerator;
  private final TokenHashingService tokenHashingService;
  private final AuthProperties authProperties;
  private final Clock clock;

  public DefaultAuthUseCase(
      AuthUserJpaRepository users,
      RefreshTokenJpaRepository refreshTokens,
      PasswordEncoder passwordEncoder,
      IdentifierNormalizer identifierNormalizer,
      JwtService jwtService,
      OpaqueTokenGenerator opaqueTokenGenerator,
      TokenHashingService tokenHashingService,
      AuthProperties authProperties,
      Clock clock
  ) {
    this.users = users;
    this.refreshTokens = refreshTokens;
    this.passwordEncoder = passwordEncoder;
    this.identifierNormalizer = identifierNormalizer;
    this.jwtService = jwtService;
    this.opaqueTokenGenerator = opaqueTokenGenerator;
    this.tokenHashingService = tokenHashingService;
    this.authProperties = authProperties;
    this.clock = clock;
  }

  @Override
  @Transactional
  public AuthSession login(LoginCommand command) {
    String identifier = identifierNormalizer.normalize(command.identifier());
    AuthUserEntity user = users.findByIdentifier(identifier)
        .filter(AuthUserEntity::isEnabled)
        .filter(candidate -> passwordEncoder.matches(command.rawPassword(), candidate.getPasswordHash()))
        .orElseThrow(AuthException::invalidCredentials);

    Instant now = clock.instant();
    user.markLoggedIn(now);
    return issueSession(user, UUID.randomUUID(), now);
  }

  @Override
  @Transactional
  public AuthSession refresh(String rawRefreshToken) {
    if (!StringUtils.hasText(rawRefreshToken)) {
      throw AuthException.missingRefreshToken();
    }

    Instant now = clock.instant();
    RefreshTokenEntity existing = refreshTokens.findByTokenHash(tokenHashingService.sha256Hex(rawRefreshToken))
        .filter(token -> token.isActive(now))
        .orElseThrow(AuthException::invalidRefreshToken);

    existing.revoke(now);
    AuthUserEntity user = existing.getUser();
    return issueSession(user, existing.getRotationFamilyId(), now);
  }

  @Override
  @Transactional(readOnly = true)
  public AuthenticatedUser currentUser(String rawAccessToken) {
    JwtClaims claims = jwtService.validateAccessToken(rawAccessToken);
    AuthUserEntity user = users.findById(UUID.fromString(claims.subject()))
        .filter(AuthUserEntity::isEnabled)
        .orElseThrow(AuthException::invalidAccessToken);
    return toAuthenticatedUser(user);
  }

  @Override
  @Transactional
  public void logout(String rawRefreshToken) {
    if (!StringUtils.hasText(rawRefreshToken)) {
      return;
    }

    Instant now = clock.instant();
    refreshTokens.findByTokenHash(tokenHashingService.sha256Hex(rawRefreshToken))
        .ifPresent(token -> token.revoke(now));
  }

  private AuthSession issueSession(AuthUserEntity user, UUID rotationFamilyId, Instant now) {
    String accessToken = jwtService.createAccessToken(user, now);
    String refreshToken = opaqueTokenGenerator.generate();
    Instant accessTokenExpiresAt = now.plus(authProperties.getJwt().getAccessTokenTtl());
    Instant refreshTokenExpiresAt = now.plus(authProperties.getJwt().getRefreshTokenTtl());

    refreshTokens.save(new RefreshTokenEntity(
        UUID.randomUUID(),
        user,
        tokenHashingService.sha256Hex(refreshToken),
        now,
        refreshTokenExpiresAt,
        null,
        rotationFamilyId
    ));

    return new AuthSession(
        toAuthenticatedUser(user),
        accessToken,
        refreshToken,
        accessTokenExpiresAt,
        refreshTokenExpiresAt
    );
  }

  private static AuthenticatedUser toAuthenticatedUser(AuthUserEntity user) {
    return new AuthenticatedUser(
        user.getId().toString(),
        user.getUsername(),
        user.getEmail(),
        user.getPhone(),
        user.getDisplayName(),
        user.getCreatedAt(),
        user.getLastLoginAt()
    );
  }
}
