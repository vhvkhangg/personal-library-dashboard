package com.vhvkhangg.personallibrarydashboard.common.security;

import java.time.Instant;

public record JwtClaims(
    String subject,
    String username,
    String email,
    String phone,
    String displayName,
    String issuer,
    String tokenType,
    Instant issuedAt,
    Instant expiresAt
) {
}
