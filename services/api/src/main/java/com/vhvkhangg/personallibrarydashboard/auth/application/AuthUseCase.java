package com.vhvkhangg.personallibrarydashboard.auth.application;

/**
 * Phase 2.1 application contract for auth. Implementation starts in Phase 2.2.
 */
public interface AuthUseCase {

  AuthSession login(LoginCommand command);

  AuthSession refresh(String rawRefreshToken);

  AuthenticatedUser currentUser(String rawAccessToken);

  void logout(String rawRefreshToken);
}
