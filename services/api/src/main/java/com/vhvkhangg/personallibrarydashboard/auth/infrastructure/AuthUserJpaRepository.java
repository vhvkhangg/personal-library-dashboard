package com.vhvkhangg.personallibrarydashboard.auth.infrastructure;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthUserJpaRepository extends JpaRepository<AuthUserEntity, UUID> {

  Optional<AuthUserEntity> findByUsernameNormalized(String usernameNormalized);

  Optional<AuthUserEntity> findByEmailNormalized(String emailNormalized);

  Optional<AuthUserEntity> findByPhoneNormalized(String phoneNormalized);

  default Optional<AuthUserEntity> findByIdentifier(String normalizedIdentifier) {
    return findByUsernameNormalized(normalizedIdentifier)
        .or(() -> findByEmailNormalized(normalizedIdentifier))
        .or(() -> findByPhoneNormalized(normalizedIdentifier));
  }
}
