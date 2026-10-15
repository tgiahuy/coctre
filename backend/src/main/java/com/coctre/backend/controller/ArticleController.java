package com.coctre.backend.controller;

import com.coctre.backend.dto.ApiResponse;
import com.coctre.backend.entity.ArticleEntity;
import com.coctre.backend.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleRepository articleRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ArticleEntity>>> getAllArticles(
            @RequestParam(required = false) String category
    ) {
        List<ArticleEntity> list;
        if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("all")) {
            list = articleRepository.findByCategory(category);
        } else {
            list = articleRepository.findAll();
        }
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách bài viết thành công", list));
    }

    @GetMapping("/{slugOrId}")
    public ResponseEntity<ApiResponse<ArticleEntity>> getArticle(@PathVariable String slugOrId) {
        Optional<ArticleEntity> found = articleRepository.findBySlug(slugOrId);
        if (found.isEmpty()) {
            found = articleRepository.findById(slugOrId);
        }
        return found.map(articleEntity -> ResponseEntity.ok(ApiResponse.ok(articleEntity)))
                .orElseGet(() -> ResponseEntity.status(404).body(ApiResponse.error("Không tìm thấy bài viết")));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ArticleEntity>> saveArticle(@RequestBody ArticleEntity article) {
        if (article.getId() == null || article.getId().trim().isEmpty()) {
            article.setId("post-" + System.currentTimeMillis());
        }
        ArticleEntity saved = articleRepository.save(article);
        return ResponseEntity.ok(ApiResponse.ok("Đã lưu bài viết thành công", saved));
    }

    @DeleteMapping("/{slugOrId}")
    public ResponseEntity<ApiResponse<Void>> deleteArticle(@PathVariable String slugOrId) {
        Optional<ArticleEntity> found = articleRepository.findBySlug(slugOrId);
        if (found.isPresent()) {
            articleRepository.delete(found.get());
        } else {
            articleRepository.deleteById(slugOrId);
        }
        return ResponseEntity.ok(ApiResponse.ok("Đã xóa bài viết thành công", null));
    }
}
