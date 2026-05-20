package com.vhvkhangg.personallibrarydashboard.common.error;

import com.vhvkhangg.personallibrarydashboard.auth.application.AuthException;
import com.vhvkhangg.personallibrarydashboard.common.web.ApiErrorResponse;
import com.vhvkhangg.personallibrarydashboard.common.web.ErrorDetail;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(AuthException.class)
  ResponseEntity<ApiErrorResponse> handleAuth(AuthException ex) {
    return ResponseEntity.status(ex.getStatus()).body(error(ex.getCode(), ex.getMessage(), List.of()));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  ResponseEntity<ApiErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
    List<ErrorDetail> details = ex.getBindingResult().getFieldErrors().stream()
        .map(this::toDetail)
        .toList();

    return ResponseEntity.badRequest().body(error("VALIDATION_ERROR", "Invalid request.", details));
  }

  @ExceptionHandler(Exception.class)
  ResponseEntity<ApiErrorResponse> handleUnexpected(Exception ex) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(error("INTERNAL_ERROR", "Unexpected server error.", List.of()));
  }

  private ErrorDetail toDetail(FieldError fieldError) {
    return new ErrorDetail(fieldError.getField(), "INVALID_FIELD", fieldError.getDefaultMessage());
  }

  private static ApiErrorResponse error(String code, String message, List<ErrorDetail> details) {
    return new ApiErrorResponse(new ApiErrorResponse.ApiError(code, message, details));
  }
}
