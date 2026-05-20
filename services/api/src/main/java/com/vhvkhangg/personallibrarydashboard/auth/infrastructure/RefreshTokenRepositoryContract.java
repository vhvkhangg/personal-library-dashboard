package com.vhvkhangg.personallibrarydashboard.auth.infrastructure;

import java.util.Optional;
import com.vhvkhangg.personallibrarydashboard.auth.domain.RefreshToken;
import com.vhvkhangg.personallibrarydashboard.auth.domain.RefreshTokenId;

/**
 * Phase 2.1 persistence contract. Real Spring Data/JPA implementation starts in Phase 2.2.
 */
public interface RefreshTokenRepositoryContract {

  Optional<RefreshToken> findByTokenHash(String tokenHash);

  RefreshToken save(RefreshToken refreshToken);

  void revokeById(RefreshTokenId id);
}
