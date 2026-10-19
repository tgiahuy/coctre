package com.coctre.backend.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Giới hạn số lần thử đăng nhập quản trị viên sai (Rate Limiter chống Brute Force).
 * Quy tắc:
 * - Tối đa 5 lần thử sai trong vòng 15 phút cho mỗi địa chỉ IP hoặc Email.
 * - Khóa 15 phút nếu vượt ngưỡng và ghi nhận nhật ký bảo mật.
 * - Xóa bộ đếm khi đăng nhập thành công.
 */
@Component
@Slf4j
public class AuthRateLimiter {
    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final long LOCK_WINDOW_SECONDS = 15 * 60; // 15 phút
    private static final int MAX_TRACKED_ENTRIES = 5_000;

    private final Map<String, Deque<Long>> failedAttempts = new ConcurrentHashMap<>();

    /**
     * Kiểm tra xem IP hoặc Email này có được phép thử đăng nhập hay không.
     * @return true nếu chưa bị khóa, false nếu đã vượt quá số lần thử sai cho phép.
     */
    public boolean isAllowed(String clientIp, String email) {
        long now = Instant.now().getEpochSecond();
        long cutoff = now - LOCK_WINDOW_SECONDS;

        if (isKeyBlocked("ip:" + normalize(clientIp), cutoff)) {
            log.warn("[Security Alert] Địa chỉ IP {} bị chặn do đăng nhập sai quá {} lần", clientIp, MAX_FAILED_ATTEMPTS);
            return false;
        }

        if (email != null && !email.isBlank()) {
            if (isKeyBlocked("email:" + normalize(email), cutoff)) {
                log.warn("[Security Alert] Tài khoản {} bị khóa tạm thời do nhập sai mật khẩu quá {} lần", email, MAX_FAILED_ATTEMPTS);
                return false;
            }
        }

        return true;
    }

    /**
     * Ghi nhận 1 lần đăng nhập thất bại cho IP và Email.
     */
    public void recordFailure(String clientIp, String email) {
        long now = Instant.now().getEpochSecond();
        recordFailureKey("ip:" + normalize(clientIp), now);
        if (email != null && !email.isBlank()) {
            recordFailureKey("email:" + normalize(email), now);
        }
    }

    /**
     * Xóa dữ liệu lỗi khi đăng nhập thành công.
     */
    public void recordSuccess(String clientIp, String email) {
        failedAttempts.remove("ip:" + normalize(clientIp));
        if (email != null && !email.isBlank()) {
            failedAttempts.remove("email:" + normalize(email));
        }
    }

    private boolean isKeyBlocked(String key, long cutoff) {
        Deque<Long> timestamps = failedAttempts.get(key);
        if (timestamps == null) return false;

        synchronized (timestamps) {
            cleanExpired(timestamps, cutoff);
            return timestamps.size() >= MAX_FAILED_ATTEMPTS;
        }
    }

    private void recordFailureKey(String key, long now) {
        if (failedAttempts.size() >= MAX_TRACKED_ENTRIES) {
            cleanupPeriodic();
        }

        Deque<Long> timestamps = failedAttempts.computeIfAbsent(key, ignored -> new ArrayDeque<>());
        synchronized (timestamps) {
            cleanExpired(timestamps, now - LOCK_WINDOW_SECONDS);
            timestamps.addLast(now);
            int attempts = timestamps.size();
            if (attempts >= MAX_FAILED_ATTEMPTS) {
                log.warn("[Security Violation] Khóa đối tượng {} trong 15 phút do đạt {} lần thử sai", key, attempts);
            }
        }
    }

    private void cleanExpired(Deque<Long> timestamps, long cutoff) {
        while (!timestamps.isEmpty() && timestamps.peekFirst() < cutoff) {
            timestamps.removeFirst();
        }
    }

    @Scheduled(fixedRate = 300_000) // Dọn dẹp bộ nhớ mỗi 5 phút
    public void cleanupPeriodic() {
        long cutoff = Instant.now().getEpochSecond() - LOCK_WINDOW_SECONDS;
        failedAttempts.entrySet().removeIf(entry -> {
            Deque<Long> dq = entry.getValue();
            synchronized (dq) {
                cleanExpired(dq, cutoff);
                return dq.isEmpty();
            }
        });
    }

    public void clear() {
        failedAttempts.clear();
    }

    private String normalize(String key) {
        return key == null ? "unknown" : key.trim().toLowerCase();
    }
}
