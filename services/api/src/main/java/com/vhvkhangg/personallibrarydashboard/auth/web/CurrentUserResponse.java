package com.vhvkhangg.personallibrarydashboard.auth.web;

import java.time.Instant;

/**
 * Phase 2.1 API contract for the authenticated single-user profile returned by /auth/me.
 */
public record CurrentUserResponse(
    String id,
    String username,
    String email,
    String phone,
    String displayName,
    Instant createdAt,
    Instant lastLoginAt
) {
}
