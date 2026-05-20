package com.vhvkhangg.personallibrarydashboard.common.security;

import java.security.SecureRandom;
import java.util.Base64;
import org.springframework.stereotype.Component;

@Component
public class OpaqueTokenGenerator {

  private static final int TOKEN_BYTES = 32;
  private final SecureRandom secureRandom = new SecureRandom();

  public String generate() {
    byte[] bytes = new byte[TOKEN_BYTES];
    secureRandom.nextBytes(bytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
  }
}
