package com.vhvkhangg.personallibrarydashboard.common.security;

import java.time.Duration;

/**
 * Phase 2.1 token lifetime contract.
 */
public final class AuthTokenPolicy {

  public static final Duration ACCESS_TOKEN_TTL = Duration.ofMinutes(15);
  public static final Duration REFRESH_TOKEN_TTL = Duration.ofDays(14);

  private AuthTokenPolicy() {
    throw new UnsupportedOperationException("Utility class");
  }
}
