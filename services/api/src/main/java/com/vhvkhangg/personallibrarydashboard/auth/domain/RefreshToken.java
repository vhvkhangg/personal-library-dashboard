package com.vhvkhangg.personallibrarydashboard.auth.domain;

import java.time.Instant;

/**
 * Domain contract for refresh-token persistence.
 *
 * <p>Only tokenHash is persisted. Raw refresh token values must never be stored.</p>
 */
public record RefreshToken(
    RefreshTokenId id,
    AuthUserId userId,
    String tokenHash,
    Instant issuedAt,
    Instant expiresAt,
    Instant revokedAt,
    String rotationFamilyId
) {
}
