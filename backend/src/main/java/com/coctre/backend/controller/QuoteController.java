package com.coctre.backend.controller;

import com.coctre.backend.dto.ApiResponse;
import com.coctre.backend.entity.QuoteRequestEntity;
import com.coctre.backend.repository.QuoteRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/quotes")
@RequiredArgsConstructor
public class QuoteController {

    private final QuoteRequestRepository quoteRequestRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<QuoteRequestEntity>>> getAllQuotes() {
        List<QuoteRequestEntity> list = quoteRequestRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách yêu cầu báo giá thành công", list));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<QuoteRequestEntity>> submitQuote(@RequestBody QuoteRequestEntity quote) {
        if (quote.getId() == null || quote.getId().trim().isEmpty()) {
            quote.setId("quote-" + System.currentTimeMillis());
        }
        quote.setCreatedAt(LocalDateTime.now());
        if (quote.getStatus() == null) {
            quote.setStatus("NEW");
        }
        QuoteRequestEntity saved = quoteRequestRepository.save(quote);
        return ResponseEntity.ok(ApiResponse.ok("Đã nhận yêu cầu báo giá thành công! Kỹ sư sẽ liên hệ sớm nhất.", saved));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<QuoteRequestEntity>> updateStatus(
            @PathVariable String id,
            @RequestParam String status
    ) {
        Optional<QuoteRequestEntity> found = quoteRequestRepository.findById(id);
        if (found.isEmpty()) {
            return ResponseEntity.status(404).body(ApiResponse.error("Không tìm thấy yêu cầu báo giá"));
        }
        QuoteRequestEntity entity = found.get();
        entity.setStatus(status.toUpperCase());
        QuoteRequestEntity updated = quoteRequestRepository.save(entity);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật trạng thái thành công", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteQuote(@PathVariable String id) {
        quoteRequestRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.ok("Đã xóa yêu cầu báo giá", null));
    }
}
