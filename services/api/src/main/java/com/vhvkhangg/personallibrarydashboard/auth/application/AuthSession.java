package com.vhvkhangg.personallibrarydashboard.auth.application;

import java.time.Instant;

/**
 * Application-layer auth session contract.
 *
 * <p>Raw token values are internal to the auth module and must only be written to httpOnly cookies
 * by the web adapter.</p>
 */
public record AuthSession(
    AuthenticatedUser user,
    String accessToken,
    String refreshToken,
    Instant accessTokenExpiresAt,
    Instant refreshTokenExpiresAt
) {
}
