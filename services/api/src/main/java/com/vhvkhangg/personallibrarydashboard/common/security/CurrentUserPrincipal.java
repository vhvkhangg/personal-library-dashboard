package com.vhvkhangg.personallibrarydashboard.common.security;

public record CurrentUserPrincipal(
    String id,
    String username,
    String email,
    String phone,
    String displayName
) {
}
