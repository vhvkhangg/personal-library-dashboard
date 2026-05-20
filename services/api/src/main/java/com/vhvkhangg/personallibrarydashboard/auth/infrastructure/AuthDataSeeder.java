package com.vhvkhangg.personallibrarydashboard.auth.infrastructure;

import com.vhvkhangg.personallibrarydashboard.auth.AuthProperties;
import com.vhvkhangg.personallibrarydashboard.auth.application.IdentifierNormalizer;
import java.time.Clock;
import java.time.Instant;
import java.util.UUID;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Component
public class AuthDataSeeder implements ApplicationRunner {

  private final AuthProperties authProperties;
  private final AuthUserJpaRepository users;
  private final PasswordEncoder passwordEncoder;
  private final IdentifierNormalizer identifierNormalizer;
  private final Clock clock;

  public AuthDataSeeder(
      AuthProperties authProperties,
      AuthUserJpaRepository users,
      PasswordEncoder passwordEncoder,
      IdentifierNormalizer identifierNormalizer,
      Clock clock
  ) {
    this.authProperties = authProperties;
    this.users = users;
    this.passwordEncoder = passwordEncoder;
    this.identifierNormalizer = identifierNormalizer;
    this.clock = clock;
  }

  @Override
  @Transactional
  public void run(ApplicationArguments args) {
    if (users.count() > 0) {
      return;
    }

    AuthProperties.Seed seed = authProperties.getSeed();
    String username = requireText(seed.getUsername(), "PLD_AUTH_SEED_USERNAME");
    String email = requireText(seed.getEmail(), "PLD_AUTH_SEED_EMAIL");
    String password = requireText(seed.getPassword(), "PLD_AUTH_SEED_PASSWORD");
    String displayName = StringUtils.hasText(seed.getDisplayName()) ? seed.getDisplayName().trim() : username;
    String phone = StringUtils.hasText(seed.getPhone()) ? seed.getPhone().trim() : null;
    Instant now = clock.instant();

    AuthUserEntity user = new AuthUserEntity(
        UUID.randomUUID(),
        username.trim(),
        identifierNormalizer.normalize(username),
        email.trim(),
        identifierNormalizer.normalize(email),
        phone,
        phone == null ? null : identifierNormalizer.normalize(phone),
        displayName,
        passwordEncoder.encode(password),
        true,
        now,
        now,
        null
    );

    users.save(user);
  }

  private static String requireText(String value, String envName) {
    if (!StringUtils.hasText(value)) {
      throw new IllegalStateException(envName + " must be configured before bootstrapping auth.");
    }
    return value.trim();
  }
}
