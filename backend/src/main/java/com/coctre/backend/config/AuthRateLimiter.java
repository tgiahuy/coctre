package com.coctre.backend.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Giới hạn số lần thử đăng nhập quản trị viên sai (Rate Limiter chống Brute Force).
 * Quy tắc an toàn:
 * - Khóa theo tài khoản (Email): Tối đa 5 lần thử sai trong 15 phút cho một email cụ thể.
 *   Điều này đảm bảo nếu 1 tài khoản nhập sai, KHÔNG ảnh hưởng đến các quản trị viên khác.
 * - Khóa theo IP diện rộng: Tối đa 20 lần thử sai trong 15 phút cho một địa chỉ IP (chống dò mật khẩu hàng loạt).
 *   Tránh khóa nhầm toàn bộ người dùng khi nhiều quản trị viên cùng truy cập qua mạng công ty / Docker NAT.
 */
@Component
@Slf4j
public class AuthRateLimiter {
    private static final int MAX_FAILED_ACCOUNT_ATTEMPTS = 5;
    private static final int MAX_FAILED_IP_ATTEMPTS = 20;
    private static final long LOCK_WINDOW_SECONDS = 15 * 60; // 15 phút
    private static final int MAX_TRACKED_ENTRIES = 10_000;

    private final Map<String, Deque<Long>> failedAttempts = new ConcurrentHashMap<>();

    /**
     * Kiểm tra xem IP hoặc Email này có được phép thử đăng nhập hay không.
     * @return true nếu chưa bị khóa, false nếu đã vượt quá số lần thử sai cho phép.
     */
    public boolean isAllowed(String clientIp, String email) {
        long now = Instant.now().getEpochSecond();
        long cutoff = now - LOCK_WINDOW_SECONDS;

        // 1. Kiểm tra khóa theo tài khoản trước (ưu tiên bảo vệ tài khoản cụ thể)
        if (email != null && !email.isBlank()) {
            if (isKeyBlocked("email:" + normalize(email), cutoff, MAX_FAILED_ACCOUNT_ATTEMPTS)) {
                log.warn("[Security Alert] Tài khoản {} bị khóa tạm thời 15 phút do nhập sai mật khẩu quá {} lần", email, MAX_FAILED_ACCOUNT_ATTEMPTS);
                return false;
            }
        }

        // 2. Kiểm tra khóa theo IP nếu có hành vi dò quét quy mô lớn (trên 20 lần thử sai từ 1 IP)
        if (clientIp != null && !clientIp.isBlank() && !isInternalIp(clientIp)) {
            if (isKeyBlocked("ip:" + normalize(clientIp), cutoff, MAX_FAILED_IP_ATTEMPTS)) {
                log.warn("[Security Alert] Địa chỉ IP {} bị khóa tạm thời do có hành vi tấn công dò quét mật khẩu ({} lần thử sai)", clientIp, MAX_FAILED_IP_ATTEMPTS);
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
        if (clientIp != null && !clientIp.isBlank()) {
            recordFailureKey("ip:" + normalize(clientIp), now, MAX_FAILED_IP_ATTEMPTS);
        }
        if (email != null && !email.isBlank()) {
            recordFailureKey("email:" + normalize(email), now, MAX_FAILED_ACCOUNT_ATTEMPTS);
        }
    }

    /**
     * Xóa dữ liệu lỗi khi đăng nhập thành công cho tài khoản đó.
     */
    public void recordSuccess(String clientIp, String email) {
        if (email != null && !email.isBlank()) {
            failedAttempts.remove("email:" + normalize(email));
        }
    }

    private boolean isKeyBlocked(String key, long cutoff, int maxAllowed) {
        Deque<Long> timestamps = failedAttempts.get(key);
        if (timestamps == null) return false;

        synchronized (timestamps) {
            cleanExpired(timestamps, cutoff);
            return timestamps.size() >= maxAllowed;
        }
    }

    private void recordFailureKey(String key, long now, int limitThreshold) {
        if (failedAttempts.size() >= MAX_TRACKED_ENTRIES) {
            cleanupPeriodic();
        }

        Deque<Long> timestamps = failedAttempts.computeIfAbsent(key, ignored -> new ArrayDeque<>());
        synchronized (timestamps) {
            cleanExpired(timestamps, now - LOCK_WINDOW_SECONDS);
            timestamps.addLast(now);
            int attempts = timestamps.size();
            if (attempts >= limitThreshold) {
                log.warn("[Security Violation] Khóa đối tượng {} trong 15 phút do đạt ngưỡng thử sai ({} lần)", key, attempts);
            }
        }
    }

    private void cleanExpired(Deque<Long> timestamps, long cutoff) {
        while (!timestamps.isEmpty() && timestamps.peekFirst() < cutoff) {
            timestamps.removeFirst();
        }
    }

    private boolean isInternalIp(String ip) {
        String clean = ip.trim();
        return clean.equals("127.0.0.1") || clean.equals("::1") || clean.equals("localhost");
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
