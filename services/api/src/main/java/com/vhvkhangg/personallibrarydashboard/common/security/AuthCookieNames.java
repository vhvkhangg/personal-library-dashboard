package com.vhvkhangg.personallibrarydashboard.common.security;

/**
 * Canonical auth cookie names for the browser client.
 */
public final class AuthCookieNames {

  public static final String ACCESS_TOKEN = "pld_access_token";
  public static final String REFRESH_TOKEN = "pld_refresh_token";

  private AuthCookieNames() {
    throw new UnsupportedOperationException("Utility class");
  }
}
