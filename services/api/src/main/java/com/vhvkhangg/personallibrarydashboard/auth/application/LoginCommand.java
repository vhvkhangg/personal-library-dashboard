package com.vhvkhangg.personallibrarydashboard.auth.application;

/**
 * Application-layer command for username/email/phone login.
 */
public record LoginCommand(String identifier, String rawPassword) {
}
