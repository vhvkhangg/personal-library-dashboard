package com.vhvkhangg.personallibrarydashboard.common.security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vhvkhangg.personallibrarydashboard.auth.AuthProperties;
import com.vhvkhangg.personallibrarydashboard.auth.application.AuthException;
import com.vhvkhangg.personallibrarydashboard.auth.infrastructure.AuthUserEntity;
import jakarta.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class JwtService {

  private static final String HMAC_ALGORITHM = "HmacSHA256";
  private static final String TOKEN_TYPE_ACCESS = "access";

  private final AuthProperties authProperties;
  private final ObjectMapper objectMapper;
  private final Base64.Encoder encoder = Base64.getUrlEncoder().withoutPadding();
  private final Base64.Decoder decoder = Base64.getUrlDecoder();
  private byte[] secretBytes;

  public JwtService(AuthProperties authProperties, ObjectMapper objectMapper) {
    this.authProperties = authProperties;
    this.objectMapper = objectMapper;
  }

  @PostConstruct
  void validateSecret() {
    String secret = authProperties.getJwt().getSecret();
    if (!StringUtils.hasText(secret) || secret.getBytes(StandardCharsets.UTF_8).length < 32) {
      throw new IllegalStateException("PLD_AUTH_JWT_SECRET must contain at least 32 UTF-8 bytes.");
    }
    this.secretBytes = secret.getBytes(StandardCharsets.UTF_8);
  }

  public String createAccessToken(AuthUserEntity user, Instant now) {
    Instant expiresAt = now.plus(authProperties.getJwt().getAccessTokenTtl());

    Map<String, Object> header = new LinkedHashMap<>();
    header.put("alg", "HS256");
    header.put("typ", "JWT");

    Map<String, Object> payload = new LinkedHashMap<>();
    payload.put(JwtClaimsContract.SUBJECT, user.getId().toString());
    payload.put(JwtClaimsContract.USERNAME, user.getUsername());
    payload.put("email", user.getEmail());
    payload.put("phone", user.getPhone());
    payload.put("display_name", user.getDisplayName());
    payload.put("iss", authProperties.getJwt().getIssuer());
    payload.put(JwtClaimsContract.TOKEN_TYPE, TOKEN_TYPE_ACCESS);
    payload.put(JwtClaimsContract.ISSUED_AT, now.getEpochSecond());
    payload.put(JwtClaimsContract.EXPIRES_AT, expiresAt.getEpochSecond());

    String encodedHeader = encodeJson(header);
    String encodedPayload = encodeJson(payload);
    String signingInput = encodedHeader + "." + encodedPayload;
    return signingInput + "." + sign(signingInput);
  }

  public JwtClaims validateAccessToken(String rawToken) {
    if (!StringUtils.hasText(rawToken)) {
      throw AuthException.invalidAccessToken();
    }

    String[] parts = rawToken.split("\\.");
    if (parts.length != 3) {
      throw AuthException.invalidAccessToken();
    }

    String signingInput = parts[0] + "." + parts[1];
    String expectedSignature = sign(signingInput);
    if (!MessageDigest.isEqual(expectedSignature.getBytes(StandardCharsets.UTF_8), parts[2].getBytes(StandardCharsets.UTF_8))) {
      throw AuthException.invalidAccessToken();
    }

    try {
      JsonNode payload = objectMapper.readTree(decoder.decode(parts[1]));
      String issuer = requiredText(payload, "iss");
      String tokenType = requiredText(payload, JwtClaimsContract.TOKEN_TYPE);
      Instant issuedAt = Instant.ofEpochSecond(payload.path(JwtClaimsContract.ISSUED_AT).asLong());
      Instant expiresAt = Instant.ofEpochSecond(payload.path(JwtClaimsContract.EXPIRES_AT).asLong());

      if (!authProperties.getJwt().getIssuer().equals(issuer) || !TOKEN_TYPE_ACCESS.equals(tokenType) || !expiresAt.isAfter(Instant.now())) {
        throw AuthException.invalidAccessToken();
      }

      return new JwtClaims(
          requiredText(payload, JwtClaimsContract.SUBJECT),
          requiredText(payload, JwtClaimsContract.USERNAME),
          requiredText(payload, "email"),
          optionalText(payload, "phone"),
          requiredText(payload, "display_name"),
          issuer,
          tokenType,
          issuedAt,
          expiresAt
      );
    } catch (AuthException ex) {
      throw ex;
    } catch (Exception ex) {
      throw AuthException.invalidAccessToken();
    }
  }

  private String encodeJson(Map<String, Object> value) {
    try {
      return encoder.encodeToString(objectMapper.writeValueAsBytes(value));
    } catch (Exception ex) {
      throw new IllegalStateException("Unable to encode JWT JSON.", ex);
    }
  }

  private String sign(String signingInput) {
    try {
      Mac mac = Mac.getInstance(HMAC_ALGORITHM);
      mac.init(new SecretKeySpec(secretBytes, HMAC_ALGORITHM));
      return encoder.encodeToString(mac.doFinal(signingInput.getBytes(StandardCharsets.UTF_8)));
    } catch (Exception ex) {
      throw new IllegalStateException("Unable to sign JWT.", ex);
    }
  }

  private static String requiredText(JsonNode payload, String field) {
    String value = optionalText(payload, field);
    if (!StringUtils.hasText(value)) {
      throw AuthException.invalidAccessToken();
    }
    return value;
  }

  private static String optionalText(JsonNode payload, String field) {
    JsonNode value = payload.get(field);
    return value == null || value.isNull() ? null : value.asText();
  }
}
