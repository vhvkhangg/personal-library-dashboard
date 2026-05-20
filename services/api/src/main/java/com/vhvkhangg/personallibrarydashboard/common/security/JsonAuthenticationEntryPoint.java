package com.vhvkhangg.personallibrarydashboard.common.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vhvkhangg.personallibrarydashboard.common.web.ApiErrorResponse;
import com.vhvkhangg.personallibrarydashboard.common.web.ErrorDetail;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JsonAuthenticationEntryPoint implements AuthenticationEntryPoint {

  private final ObjectMapper objectMapper;

  public JsonAuthenticationEntryPoint(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
      throws IOException {
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    ApiErrorResponse body = new ApiErrorResponse(new ApiErrorResponse.ApiError(
        "AUTH_UNAUTHORIZED",
        "Authentication is required.",
        List.<ErrorDetail>of()
    ));
    objectMapper.writeValue(response.getOutputStream(), body);
  }
}
