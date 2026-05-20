package com.vhvkhangg.personallibrarydashboard.common.security;

import com.vhvkhangg.personallibrarydashboard.auth.AuthProperties;
import com.vhvkhangg.personallibrarydashboard.auth.application.AuthException;
import com.vhvkhangg.personallibrarydashboard.auth.infrastructure.AuthUserEntity;
import com.vhvkhangg.personallibrarydashboard.auth.infrastructure.AuthUserJpaRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final AuthProperties authProperties;
  private final JwtService jwtService;
  private final AuthUserJpaRepository users;

  public JwtAuthenticationFilter(AuthProperties authProperties, JwtService jwtService, AuthUserJpaRepository users) {
    this.authProperties = authProperties;
    this.jwtService = jwtService;
    this.users = users;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    String token = readCookie(request, authProperties.getCookies().getAccessTokenName());

    if (token != null && SecurityContextHolder.getContext().getAuthentication() == null) {
      try {
        JwtClaims claims = jwtService.validateAccessToken(token);
        users.findById(UUID.fromString(claims.subject()))
            .filter(AuthUserEntity::isEnabled)
            .ifPresent(user -> {
              CurrentUserPrincipal principal = new CurrentUserPrincipal(
                  user.getId().toString(),
                  user.getUsername(),
                  user.getEmail(),
                  user.getPhone(),
                  user.getDisplayName()
              );
              UsernamePasswordAuthenticationToken authentication =
                  new UsernamePasswordAuthenticationToken(principal, null, List.of());
              SecurityContextHolder.getContext().setAuthentication(authentication);
            });
      } catch (AuthException | IllegalArgumentException ignored) {
        SecurityContextHolder.clearContext();
      }
    }

    filterChain.doFilter(request, response);
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
