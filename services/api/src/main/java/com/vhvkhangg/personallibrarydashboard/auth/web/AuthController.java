package com.vhvkhangg.personallibrarydashboard.auth.web;

import com.vhvkhangg.personallibrarydashboard.auth.application.AuthException;
import com.vhvkhangg.personallibrarydashboard.auth.application.AuthSession;
import com.vhvkhangg.personallibrarydashboard.auth.application.AuthUseCase;
import com.vhvkhangg.personallibrarydashboard.auth.application.AuthenticatedUser;
import com.vhvkhangg.personallibrarydashboard.auth.application.LoginCommand;
import com.vhvkhangg.personallibrarydashboard.common.web.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Browser-cookie auth API for the private single-user app.
 */
@RestController
public class AuthController {

  private final AuthUseCase auth;
  private final AuthCookieService cookies;

  public AuthController(AuthUseCase auth, AuthCookieService cookies) {
    this.auth = auth;
    this.cookies = cookies;
  }

  @PostMapping("/auth/login")
  public ApiResponse<AuthSessionResponse> login(
      @Valid @RequestBody LoginRequest request,
      HttpServletResponse response
  ) {
    AuthSession session = auth.login(new LoginCommand(request.identifier(), request.password()));
    cookies.writeSessionCookies(response, session);
    return ApiResponse.of(AuthWebMapper.toSessionResponse(session));
  }

  @PostMapping("/auth/refresh")
  public ApiResponse<AuthSessionResponse> refresh(HttpServletRequest request, HttpServletResponse response) {
    AuthSession session = auth.refresh(cookies.readRefreshToken(request));
    cookies.writeSessionCookies(response, session);
    return ApiResponse.of(AuthWebMapper.toSessionResponse(session));
  }

  @PostMapping("/auth/logout")
  public ApiResponse<LogoutResponse> logout(HttpServletRequest request, HttpServletResponse response) {
    auth.logout(cookies.readRefreshToken(request));
    cookies.clearAuthCookies(response);
    return ApiResponse.of(new LogoutResponse(true));
  }

  @GetMapping("/auth/me")
  public ApiResponse<CurrentUserResponse> me(HttpServletRequest request) {
    String accessToken = cookies.readAccessToken(request);
    if (accessToken == null) {
      throw AuthException.invalidAccessToken();
    }
    AuthenticatedUser user = auth.currentUser(accessToken);
    return ApiResponse.of(AuthWebMapper.toCurrentUserResponse(user));
  }
}
