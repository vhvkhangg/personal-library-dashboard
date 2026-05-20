package com.vhvkhangg.personallibrarydashboard.auth.web;

/**
 * Phase 2.1 API contract returned after logout clears cookies and invalidates the refresh token.
 */
public record LogoutResponse(boolean loggedOut) {
}
