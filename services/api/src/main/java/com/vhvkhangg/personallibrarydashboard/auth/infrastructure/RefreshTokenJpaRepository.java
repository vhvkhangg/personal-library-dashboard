package com.vhvkhangg.personallibrarydashboard.auth.infrastructure;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RefreshTokenJpaRepository extends JpaRepository<RefreshTokenEntity, UUID> {

  Optional<RefreshTokenEntity> findByTokenHash(String tokenHash);

  @Modifying
  @Query("update RefreshTokenEntity token set token.revokedAt = :revokedAt where token.user.id = :userId and token.revokedAt is null")
  int revokeActiveTokensForUser(@Param("userId") UUID userId, @Param("revokedAt") Instant revokedAt);
}
