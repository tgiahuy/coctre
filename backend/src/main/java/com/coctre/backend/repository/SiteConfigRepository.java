package com.coctre.backend.repository;

import com.coctre.backend.entity.SiteConfigEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SiteConfigRepository extends JpaRepository<SiteConfigEntity, String> {
}
