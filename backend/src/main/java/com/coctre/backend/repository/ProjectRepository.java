package com.coctre.backend.repository;

import com.coctre.backend.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, String> {
    Optional<ProjectEntity> findBySlug(String slug);
    void deleteBySlug(String slug);
}
