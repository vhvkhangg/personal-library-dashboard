package com.vhvkhangg.personallibrarydashboard.common.web;

import java.util.List;

/**
 * Generic error envelope for REST API responses.
 */
public record ApiErrorResponse(ApiError error) {

  public record ApiError(String code, String message, List<ErrorDetail> details) {
  }
}
