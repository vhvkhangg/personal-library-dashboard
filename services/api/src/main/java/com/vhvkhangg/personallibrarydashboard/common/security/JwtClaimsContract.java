package com.vhvkhangg.personallibrarydashboard.common.security;

/**
 * Canonical JWT claims used by the auth module.
 */
public final class JwtClaimsContract {

  public static final String SUBJECT = "sub";
  public static final String USERNAME = "username";
  public static final String TOKEN_TYPE = "token_type";
  public static final String ISSUED_AT = "iat";
  public static final String EXPIRES_AT = "exp";

  private JwtClaimsContract() {
    throw new UnsupportedOperationException("Utility class");
  }
}
