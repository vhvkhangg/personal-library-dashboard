package com.vhvkhangg.personallibrarydashboard.auth.web;

import java.time.Instant;

/**
 * Phase 2.1 API contract returned after login or refresh.
 *
 * <p>Access and refresh tokens are set through httpOnly cookies. They are intentionally not exposed
 * in this response body.</p>
 */
public record AuthSessionResponse(
    CurrentUserResponse user,
    Instant accessTokenExpiresAt,
    Instant refreshTokenExpiresAt,
    boolean authenticated
) {
}
