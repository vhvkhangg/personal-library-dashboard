package com.vhvkhangg.personallibrarydashboard.auth.application;

import java.time.Instant;

/**
 * Application-layer authenticated user view.
 */
public record AuthenticatedUser(
    String id,
    String username,
    String email,
    String phone,
    String displayName,
    Instant createdAt,
    Instant lastLoginAt
) {
}
