package com.vhvkhangg.personallibrarydashboard.auth.domain;

import java.time.Instant;

/**
 * Phase 2.1 domain contract for the single local user.
 *
 * <p>The password hash must be generated with a strong password encoder. Plaintext passwords must
 * never be stored.</p>
 */
public record AuthUser(
    AuthUserId id,
    String username,
    String email,
    String phone,
    String displayName,
    String passwordHash,
    boolean enabled,
    Instant createdAt,
    Instant updatedAt,
    Instant lastLoginAt
) {
}
