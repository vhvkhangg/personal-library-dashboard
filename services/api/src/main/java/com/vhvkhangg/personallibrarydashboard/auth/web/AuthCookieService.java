package com.vhvkhangg.personallibrarydashboard.auth.web;

import com.vhvkhangg.personallibrarydashboard.auth.AuthProperties;
import com.vhvkhangg.personallibrarydashboard.auth.application.AuthSession;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.Duration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class AuthCookieService {

  private final AuthProperties authProperties;

  public AuthCookieService(AuthProperties authProperties) {
    this.authProperties = authProperties;
  }

  public String readAccessToken(HttpServletRequest request) {
    return readCookie(request, authProperties.getCookies().getAccessTokenName());
  }

  public String readRefreshToken(HttpServletRequest request) {
    return readCookie(request, authProperties.getCookies().getRefreshTokenName());
  }

  public void writeSessionCookies(HttpServletResponse response, AuthSession session) {
    addCookie(response, buildCookie(
        authProperties.getCookies().getAccessTokenName(),
        session.accessToken(),
        authProperties.getJwt().getAccessTokenTtl()
    ));
    addCookie(response, buildCookie(
        authProperties.getCookies().getRefreshTokenName(),
        session.refreshToken(),
        authProperties.getJwt().getRefreshTokenTtl()
    ));
  }

  public void clearAuthCookies(HttpServletResponse response) {
    addCookie(response, buildCookie(authProperties.getCookies().getAccessTokenName(), "", Duration.ZERO));
    addCookie(response, buildCookie(authProperties.getCookies().getRefreshTokenName(), "", Duration.ZERO));
  }

  private ResponseCookie buildCookie(String name, String value, Duration maxAge) {
    AuthProperties.Cookies cookies = authProperties.getCookies();
    return ResponseCookie.from(name, value)
        .httpOnly(true)
        .secure(cookies.isSecure())
        .sameSite(cookies.getSameSite())
        .path(cookies.getPath())
        .maxAge(maxAge)
        .build();
  }

  private static void addCookie(HttpServletResponse response, ResponseCookie cookie) {
    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
  }

  private static String readCookie(HttpServletRequest request, String name) {
    Cookie[] cookies = request.getCookies();
    if (cookies == null) {
      return null;
    }
    for (Cookie cookie : cookies) {
      if (name.equals(cookie.getName())) {
        return cookie.getValue();
      }
    }
    return null;
  }
}
