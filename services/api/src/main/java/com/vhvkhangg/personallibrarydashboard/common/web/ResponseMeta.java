package com.vhvkhangg.personallibrarydashboard.common.web;

import java.util.Map;

/**
 * Optional response metadata envelope.
 */
public record ResponseMeta(Map<String, Object> values) {

  public static ResponseMeta empty() {
    return new ResponseMeta(Map.of());
  }
}
