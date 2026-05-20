package com.vhvkhangg.personallibrarydashboard.auth.infrastructure;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "auth_refresh_tokens")
public class RefreshTokenEntity {

  @Id
  @Column(nullable = false)
  private UUID id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private AuthUserEntity user;

  @Column(name = "token_hash", nullable = false, length = 64)
  private String tokenHash;

  @Column(name = "issued_at", nullable = false)
  private Instant issuedAt;

  @Column(name = "expires_at", nullable = false)
  private Instant expiresAt;

  @Column(name = "revoked_at")
  private Instant revokedAt;

  @Column(name = "rotation_family_id", nullable = false)
  private UUID rotationFamilyId;

  protected RefreshTokenEntity() {
  }

  public RefreshTokenEntity(
      UUID id,
      AuthUserEntity user,
      String tokenHash,
      Instant issuedAt,
      Instant expiresAt,
      Instant revokedAt,
      UUID rotationFamilyId
  ) {
    this.id = id;
    this.user = user;
    this.tokenHash = tokenHash;
    this.issuedAt = issuedAt;
    this.expiresAt = expiresAt;
    this.revokedAt = revokedAt;
    this.rotationFamilyId = rotationFamilyId;
  }

  public UUID getId() {
    return id;
  }

  public AuthUserEntity getUser() {
    return user;
  }

  public String getTokenHash() {
    return tokenHash;
  }

  public Instant getIssuedAt() {
    return issuedAt;
  }

  public Instant getExpiresAt() {
    return expiresAt;
  }

  public Instant getRevokedAt() {
    return revokedAt;
  }

  public UUID getRotationFamilyId() {
    return rotationFamilyId;
  }

  public boolean isActive(Instant now) {
    return revokedAt == null && expiresAt.isAfter(now);
  }

  public void revoke(Instant now) {
    this.revokedAt = now;
  }
}
