package com.coctre.backend.repository;

import com.coctre.backend.entity.ArticleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<ArticleEntity, String> {
    Optional<ArticleEntity> findBySlug(String slug);
    List<ArticleEntity> findByCategory(String category);
    void deleteBySlug(String slug);
}
