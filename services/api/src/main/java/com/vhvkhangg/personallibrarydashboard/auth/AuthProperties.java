package com.vhvkhangg.personallibrarydashboard.auth;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.auth")
public class AuthProperties {

  private final Seed seed = new Seed();
  private final Jwt jwt = new Jwt();
  private final Cookies cookies = new Cookies();

  public Seed getSeed() {
    return seed;
  }

  public Jwt getJwt() {
    return jwt;
  }

  public Cookies getCookies() {
    return cookies;
  }

  public static class Seed {
    private String username = "owner";
    private String email = "owner@example.local";
    private String phone = "";
    private String displayName = "Vinh Khang";
    private String password = "change-me-local-dev";

    public String getUsername() {
      return username;
    }

    public void setUsername(String username) {
      this.username = username;
    }

    public String getEmail() {
      return email;
    }

    public void setEmail(String email) {
      this.email = email;
    }

    public String getPhone() {
      return phone;
    }

    public void setPhone(String phone) {
      this.phone = phone;
    }

    public String getDisplayName() {
      return displayName;
    }

    public void setDisplayName(String displayName) {
      this.displayName = displayName;
    }

    public String getPassword() {
      return password;
    }

    public void setPassword(String password) {
      this.password = password;
    }
  }

  public static class Jwt {
    private String issuer = "personal-library-dashboard";
    private Duration accessTokenTtl = Duration.ofMinutes(15);
    private Duration refreshTokenTtl = Duration.ofDays(14);
    private String secret = "local-development-jwt-secret-change-me-please-32bytes-min";

    public String getIssuer() {
      return issuer;
    }

    public void setIssuer(String issuer) {
      this.issuer = issuer;
    }

    public Duration getAccessTokenTtl() {
      return accessTokenTtl;
    }

    public void setAccessTokenTtl(Duration accessTokenTtl) {
      this.accessTokenTtl = accessTokenTtl;
    }

    public Duration getRefreshTokenTtl() {
      return refreshTokenTtl;
    }

    public void setRefreshTokenTtl(Duration refreshTokenTtl) {
      this.refreshTokenTtl = refreshTokenTtl;
    }

    public String getSecret() {
      return secret;
    }

    public void setSecret(String secret) {
      this.secret = secret;
    }
  }

  public static class Cookies {
    private String accessTokenName = "pld_access_token";
    private String refreshTokenName = "pld_refresh_token";
    private boolean secure;
    private String sameSite = "Strict";
    private String path = "/";

    public String getAccessTokenName() {
      return accessTokenName;
    }

    public void setAccessTokenName(String accessTokenName) {
      this.accessTokenName = accessTokenName;
    }

    public String getRefreshTokenName() {
      return refreshTokenName;
    }

    public void setRefreshTokenName(String refreshTokenName) {
      this.refreshTokenName = refreshTokenName;
    }

    public boolean isSecure() {
      return secure;
    }

    public void setSecure(boolean secure) {
      this.secure = secure;
    }

    public String getSameSite() {
      return sameSite;
    }

    public void setSameSite(String sameSite) {
      this.sameSite = sameSite;
    }

    public String getPath() {
      return path;
    }

    public void setPath(String path) {
      this.path = path;
    }
  }
}
