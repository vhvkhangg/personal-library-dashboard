package com.vhvkhangg.personallibrarydashboard.common.web;

/**
 * Field-level API error detail contract.
 */
public record ErrorDetail(String field, String code, String message) {
}
