package com.coctre.backend.controller;

import com.coctre.backend.dto.ApiResponse;
import com.coctre.backend.entity.SiteConfigEntity;
import com.coctre.backend.repository.SiteConfigRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/config")
@RequiredArgsConstructor
public class ConfigController {

    private final SiteConfigRepository siteConfigRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<SiteConfigEntity>> getConfig() {
        SiteConfigEntity cfg = siteConfigRepository.findById("main-config")
                .orElseGet(() -> siteConfigRepository.save(SiteConfigEntity.builder().id("main-config").build()));
        return ResponseEntity.ok(ApiResponse.ok("Lấy cấu hình thành công", cfg));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<SiteConfigEntity>> updateConfig(@RequestBody SiteConfigEntity updates) {
        updates.setId("main-config");
        SiteConfigEntity saved = siteConfigRepository.save(updates);
        return ResponseEntity.ok(ApiResponse.ok("Đã cập nhật thông tin liên hệ & cấu hình thành công", saved));
    }
}
