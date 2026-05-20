package com.vhvkhangg.personallibrarydashboard.auth.application;

import java.util.Locale;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class IdentifierNormalizer {

  public String normalize(String identifier) {
    if (!StringUtils.hasText(identifier)) {
      return "";
    }
    return identifier.trim().replaceAll("\\s+", "").toLowerCase(Locale.ROOT);
  }
}
