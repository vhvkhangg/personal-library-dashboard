package com.vhvkhangg.personallibrarydashboard.auth.application;

import org.springframework.http.HttpStatus;

public class AuthException extends RuntimeException {

  private final String code;
  private final HttpStatus status;

  public AuthException(String code, String message, HttpStatus status) {
    super(message);
    this.code = code;
    this.status = status;
  }

  public static AuthException invalidCredentials() {
    return new AuthException("AUTH_INVALID_CREDENTIALS", "Invalid identifier or password.", HttpStatus.UNAUTHORIZED);
  }

  public static AuthException missingRefreshToken() {
    return new AuthException("AUTH_REFRESH_TOKEN_MISSING", "Refresh token cookie is missing.", HttpStatus.UNAUTHORIZED);
  }

  public static AuthException invalidRefreshToken() {
    return new AuthException("AUTH_REFRESH_TOKEN_INVALID", "Refresh token is invalid or expired.", HttpStatus.UNAUTHORIZED);
  }

  public static AuthException invalidAccessToken() {
    return new AuthException("AUTH_ACCESS_TOKEN_INVALID", "Access token is invalid or expired.", HttpStatus.UNAUTHORIZED);
  }

  public String getCode() {
    return code;
  }

  public HttpStatus getStatus() {
    return status;
  }
}
