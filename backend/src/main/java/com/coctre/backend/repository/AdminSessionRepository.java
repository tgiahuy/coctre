package com.coctre.backend.repository;

import com.coctre.backend.entity.AdminSessionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdminSessionRepository extends JpaRepository<AdminSessionEntity, String> {
    Optional<AdminSessionEntity> findByTokenHash(String tokenHash);
    void deleteByTokenHash(String tokenHash);
    void deleteByUserEmailIgnoreCase(String userEmail);
}
