package com.vhvkhangg.personallibrarydashboard.auth.web;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Login request. The identifier field accepts username, email, or phone number.
 */
public record LoginRequest(
    @NotBlank(message = "Identifier is required.")
    @Size(max = 320, message = "Identifier is too long.")
    String identifier,

    @NotBlank(message = "Password is required.")
    @Size(min = 8, max = 256, message = "Password must be between 8 and 256 characters.")
    String password
) {
}
