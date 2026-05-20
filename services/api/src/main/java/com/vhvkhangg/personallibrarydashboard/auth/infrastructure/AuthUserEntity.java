package com.vhvkhangg.personallibrarydashboard.auth.infrastructure;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "auth_users")
public class AuthUserEntity {

  @Id
  @Column(nullable = false)
  private UUID id;

  @Column(nullable = false, length = 64)
  private String username;

  @Column(name = "username_normalized", nullable = false, length = 64)
  private String usernameNormalized;

  @Column(nullable = false, length = 320)
  private String email;

  @Column(name = "email_normalized", nullable = false, length = 320)
  private String emailNormalized;

  @Column(length = 32)
  private String phone;

  @Column(name = "phone_normalized", length = 32)
  private String phoneNormalized;

  @Column(name = "display_name", nullable = false, length = 120)
  private String displayName;

  @Column(name = "password_hash", nullable = false)
  private String passwordHash;

  @Column(nullable = false)
  private boolean enabled = true;

  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;

  @Column(name = "last_login_at")
  private Instant lastLoginAt;

  protected AuthUserEntity() {
  }

  public AuthUserEntity(
      UUID id,
      String username,
      String usernameNormalized,
      String email,
      String emailNormalized,
      String phone,
      String phoneNormalized,
      String displayName,
      String passwordHash,
      boolean enabled,
      Instant createdAt,
      Instant updatedAt,
      Instant lastLoginAt
  ) {
    this.id = id;
    this.username = username;
    this.usernameNormalized = usernameNormalized;
    this.email = email;
    this.emailNormalized = emailNormalized;
    this.phone = phone;
    this.phoneNormalized = phoneNormalized;
    this.displayName = displayName;
    this.passwordHash = passwordHash;
    this.enabled = enabled;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.lastLoginAt = lastLoginAt;
  }

  public UUID getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public String getUsernameNormalized() {
    return usernameNormalized;
  }

  public String getEmail() {
    return email;
  }

  public String getEmailNormalized() {
    return emailNormalized;
  }

  public String getPhone() {
    return phone;
  }

  public String getPhoneNormalized() {
    return phoneNormalized;
  }

  public String getDisplayName() {
    return displayName;
  }

  public String getPasswordHash() {
    return passwordHash;
  }

  public boolean isEnabled() {
    return enabled;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public Instant getUpdatedAt() {
    return updatedAt;
  }

  public Instant getLastLoginAt() {
    return lastLoginAt;
  }

  public void markLoggedIn(Instant now) {
    this.lastLoginAt = now;
    this.updatedAt = now;
  }
}
