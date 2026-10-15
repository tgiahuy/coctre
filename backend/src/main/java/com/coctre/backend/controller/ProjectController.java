package com.coctre.backend.controller;

import com.coctre.backend.dto.ApiResponse;
import com.coctre.backend.entity.ProjectEntity;
import com.coctre.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectRepository projectRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectEntity>>> getAllProjects() {
        List<ProjectEntity> list = projectRepository.findAll();
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách dự án thành công", list));
    }

    @GetMapping("/{slugOrId}")
    public ResponseEntity<ApiResponse<ProjectEntity>> getProject(@PathVariable String slugOrId) {
        Optional<ProjectEntity> found = projectRepository.findBySlug(slugOrId);
        if (found.isEmpty()) {
            found = projectRepository.findById(slugOrId);
        }
        return found.map(projectEntity -> ResponseEntity.ok(ApiResponse.ok(projectEntity)))
                .orElseGet(() -> ResponseEntity.status(404).body(ApiResponse.error("Không tìm thấy dự án")));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProjectEntity>> saveProject(@RequestBody ProjectEntity project) {
        if (project.getId() == null || project.getId().trim().isEmpty()) {
            project.setId("project-" + System.currentTimeMillis());
        }
        ProjectEntity saved = projectRepository.save(project);
        return ResponseEntity.ok(ApiResponse.ok("Đã lưu dự án thành công", saved));
    }

    @DeleteMapping("/{slugOrId}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable String slugOrId) {
        Optional<ProjectEntity> found = projectRepository.findBySlug(slugOrId);
        if (found.isPresent()) {
            projectRepository.delete(found.get());
        } else {
            projectRepository.deleteById(slugOrId);
        }
        return ResponseEntity.ok(ApiResponse.ok("Đã xóa dự án thành công", null));
    }
}
