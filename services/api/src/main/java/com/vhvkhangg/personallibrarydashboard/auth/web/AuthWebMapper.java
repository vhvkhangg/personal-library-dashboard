package com.vhvkhangg.personallibrarydashboard.auth.web;

import com.vhvkhangg.personallibrarydashboard.auth.application.AuthSession;
import com.vhvkhangg.personallibrarydashboard.auth.application.AuthenticatedUser;

final class AuthWebMapper {

  private AuthWebMapper() {
    throw new UnsupportedOperationException("Utility class");
  }

  static AuthSessionResponse toSessionResponse(AuthSession session) {
    return new AuthSessionResponse(
        toCurrentUserResponse(session.user()),
        session.accessTokenExpiresAt(),
        session.refreshTokenExpiresAt(),
        true
    );
  }

  static CurrentUserResponse toCurrentUserResponse(AuthenticatedUser user) {
    return new CurrentUserResponse(
        user.id(),
        user.username(),
        user.email(),
        user.phone(),
        user.displayName(),
        user.createdAt(),
        user.lastLoginAt()
    );
  }
}
