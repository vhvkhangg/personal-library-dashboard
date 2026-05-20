package com.vhvkhangg.personallibrarydashboard.common.web;

/**
 * Generic success envelope for REST API responses.
 */
public record ApiResponse<T>(T data, ResponseMeta meta) {

  public static <T> ApiResponse<T> of(T data) {
    return new ApiResponse<>(data, ResponseMeta.empty());
  }
}
