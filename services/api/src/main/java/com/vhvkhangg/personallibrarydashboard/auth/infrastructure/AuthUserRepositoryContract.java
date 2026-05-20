package com.vhvkhangg.personallibrarydashboard.auth.infrastructure;

import java.util.Optional;
import com.vhvkhangg.personallibrarydashboard.auth.domain.AuthUser;
import com.vhvkhangg.personallibrarydashboard.auth.domain.AuthUserId;

/**
 * Phase 2.1 persistence contract for username/email/phone lookup.
 */
public interface AuthUserRepositoryContract {

  Optional<AuthUser> findByIdentifier(String identifier);

  Optional<AuthUser> findById(AuthUserId id);
}
