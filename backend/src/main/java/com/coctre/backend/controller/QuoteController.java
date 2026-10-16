package com.coctre.backend.controller;

import com.coctre.backend.dto.ApiResponse;
import com.coctre.backend.dto.PublicQuoteRequest;
import com.coctre.backend.config.AdminOnly;
import com.coctre.backend.config.QuoteRateLimiter;
import com.coctre.backend.entity.QuoteRequestEntity;
import com.coctre.backend.repository.QuoteRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/quotes")
@RequiredArgsConstructor
public class QuoteController {

    private final QuoteRequestRepository quoteRequestRepository;
    private final QuoteRateLimiter quoteRateLimiter;
    private static final Set<String> ALLOWED_STATUSES = Set.of("NEW", "CONTACTED", "CLOSED", "CANCELLED");

    @GetMapping
    @AdminOnly
    public ResponseEntity<ApiResponse<List<QuoteRequestEntity>>> getAllQuotes() {
        List<QuoteRequestEntity> list = quoteRequestRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách yêu cầu báo giá thành công", list));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<QuoteRequestEntity>> submitQuote(
            @Valid @RequestBody PublicQuoteRequest request,
            HttpServletRequest httpRequest
    ) {
        String clientIp = getClientIp(httpRequest);
        if (!quoteRateLimiter.allow(clientIp)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .header("Retry-After", "900")
                    .body(ApiResponse.error("Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút."));
        }

        QuoteRequestEntity quote = QuoteRequestEntity.builder()
                .id("quote-" + UUID.randomUUID())
                .customerName(clean(request.getCustomerName()))
                .phone(request.getPhone().trim())
                .email(clean(request.getEmail()))
                .company(clean(request.getCompany()))
                .location(clean(request.getLocation()))
                .productType(clean(request.getProductType()))
                .quantity(clean(request.getQuantity()))
                .notes(clean(request.getNotes()))
                .createdAt(LocalDateTime.now())
                .status("NEW")
                .build();
        QuoteRequestEntity saved = quoteRequestRepository.save(quote);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Đã nhận yêu cầu báo giá thành công! Kỹ sư sẽ liên hệ sớm nhất.", saved));
    }

    @PatchMapping("/{id}/status")
    @AdminOnly
    public ResponseEntity<ApiResponse<QuoteRequestEntity>> updateStatus(
            @PathVariable String id,
            @RequestParam String status
    ) {
        String normalizedStatus = status == null ? "" : status.trim().toUpperCase();
        if (!ALLOWED_STATUSES.contains(normalizedStatus)) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Trạng thái báo giá không hợp lệ"));
        }
        Optional<QuoteRequestEntity> found = quoteRequestRepository.findById(id);
        if (found.isEmpty()) {
            return ResponseEntity.status(404).body(ApiResponse.error("Không tìm thấy yêu cầu báo giá"));
        }
        QuoteRequestEntity entity = found.get();
        entity.setStatus(normalizedStatus);
        QuoteRequestEntity updated = quoteRequestRepository.save(entity);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật trạng thái thành công", updated));
    }

    @DeleteMapping("/{id}")
    @AdminOnly
    public ResponseEntity<ApiResponse<Void>> deleteQuote(@PathVariable String id) {
        if (!quoteRequestRepository.existsById(id)) {
            return ResponseEntity.status(404).body(ApiResponse.error("Không tìm thấy yêu cầu báo giá"));
        }
        quoteRequestRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.ok("Đã xóa yêu cầu báo giá", null));
    }

    private String getClientIp(HttpServletRequest request) {
        String remote = request.getRemoteAddr() == null ? "unknown" : request.getRemoteAddr();
        String forwarded = request.getHeader("X-Forwarded-For");
        boolean trustedProxy = remote.equals("127.0.0.1") || remote.equals("::1") || remote.startsWith("10.")
                || remote.startsWith("192.168.") || remote.startsWith("172.");
        if (trustedProxy && forwarded != null && !forwarded.isBlank()) return forwarded.split(",")[0].trim();
        return remote;
    }

    private String clean(String value) {
        if (value == null) return null;
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
