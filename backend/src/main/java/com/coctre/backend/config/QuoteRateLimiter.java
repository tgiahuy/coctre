package com.coctre.backend.config;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class QuoteRateLimiter {
    private static final int MAX_IP_REQUESTS = 5;
    private static final int MAX_PHONE_REQUESTS = 3;
    private static final long WINDOW_SECONDS = 15 * 60; // 15 phút
    public static final int MAX_TRACKED_ENTRIES = 10_000;

    private final Map<String, Deque<Long>> ipAttempts = new ConcurrentHashMap<>();
    private final Map<String, Deque<Long>> phoneAttempts = new ConcurrentHashMap<>();

    public boolean allowIp(String clientIp) {
        return checkAndRecord(ipAttempts, "ip:" + normalizeKey(clientIp), MAX_IP_REQUESTS);
    }

    public boolean allowPhone(String phone) {
        return checkAndRecord(phoneAttempts, "phone:" + normalizeKey(phone), MAX_PHONE_REQUESTS);
    }

    // Tương thích ngược với call cũ
    public boolean allow(String clientKey) {
        return allowIp(clientKey);
    }

    private boolean checkAndRecord(Map<String, Deque<Long>> map, String key, int maxRequests) {
        long now = Instant.now().getEpochSecond();
        long cutoff = now - WINDOW_SECONDS;

        if (map.size() >= MAX_TRACKED_ENTRIES) {
            evictExpired(map, cutoff);
            // Giới hạn cứng: nếu sau khi dọn dữ liệu hết hạn vẫn vượt ngưỡng, cưỡng chế xóa 20% key cũ nhất
            if (map.size() >= MAX_TRACKED_ENTRIES) {
                enforceHardCap(map, (int) (MAX_TRACKED_ENTRIES * 0.8));
            }
        }

        Deque<Long> timestamps = map.computeIfAbsent(key, ignored -> new ArrayDeque<>());
        synchronized (timestamps) {
            while (!timestamps.isEmpty() && timestamps.peekFirst() < cutoff) {
                timestamps.removeFirst();
            }
            if (timestamps.size() >= maxRequests) {
                return false;
            }
            timestamps.addLast(now);
            return true;
        }
    }

    @Scheduled(fixedRate = 300_000) // Dọn dẹp bộ nhớ định kỳ mỗi 5 phút
    public void cleanupPeriodic() {
        long cutoff = Instant.now().getEpochSecond() - WINDOW_SECONDS;
        evictExpired(ipAttempts, cutoff);
        evictExpired(phoneAttempts, cutoff);
    }

    private void evictExpired(Map<String, Deque<Long>> map, long cutoff) {
        map.entrySet().removeIf(entry -> {
            Deque<Long> dq = entry.getValue();
            synchronized (dq) {
                while (!dq.isEmpty() && dq.peekFirst() < cutoff) {
                    dq.removeFirst();
                }
                return dq.isEmpty();
            }
        });
    }

    private void enforceHardCap(Map<String, Deque<Long>> map, int targetSize) {
        int toRemove = map.size() - targetSize;
        if (toRemove <= 0) return;

        // Tìm các key có timestamp gần nhất cũ hơn
        List<Map.Entry<String, Long>> sortedEntries = new ArrayList<>();
        for (Map.Entry<String, Deque<Long>> entry : map.entrySet()) {
            Deque<Long> dq = entry.getValue();
            Long latest = dq.peekLast();
            if (latest != null) {
                sortedEntries.add(new AbstractMap.SimpleEntry<>(entry.getKey(), latest));
            } else {
                map.remove(entry.getKey());
            }
        }

        sortedEntries.sort(Comparator.comparing(Map.Entry::getValue));
        for (int i = 0; i < Math.min(toRemove, sortedEntries.size()); i++) {
            map.remove(sortedEntries.get(i).getKey());
        }
    }

    public void clear() {
        ipAttempts.clear();
        phoneAttempts.clear();
    }

    private String normalizeKey(String key) {
        return key == null ? "unknown" : key.trim().toLowerCase();
    }

    public int getTrackedCount() {
        return ipAttempts.size() + phoneAttempts.size();
    }
}
