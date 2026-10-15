package com.coctre.backend.repository;

import com.coctre.backend.entity.QuoteRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuoteRequestRepository extends JpaRepository<QuoteRequestEntity, String> {
    List<QuoteRequestEntity> findAllByOrderByCreatedAtDesc();
}
