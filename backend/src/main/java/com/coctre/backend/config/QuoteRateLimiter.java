package com.coctre.backend.config;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class QuoteRateLimiter {
    private static final int MAX_REQUESTS = 5;
    private static final long WINDOW_SECONDS = 15 * 60;
    private static final int MAX_TRACKED_CLIENTS = 10_000;
    private final Map<String, Deque<Long>> attempts = new ConcurrentHashMap<>();

    public boolean allow(String clientKey) {
        long now = Instant.now().getEpochSecond();
        long cutoff = now - WINDOW_SECONDS;
        if (attempts.size() > MAX_TRACKED_CLIENTS) {
            attempts.entrySet().removeIf(entry -> entry.getValue().isEmpty() || entry.getValue().peekLast() < cutoff);
        }

        Deque<Long> timestamps = attempts.computeIfAbsent(clientKey, ignored -> new ArrayDeque<>());
        synchronized (timestamps) {
            while (!timestamps.isEmpty() && timestamps.peekFirst() < cutoff) timestamps.removeFirst();
            if (timestamps.size() >= MAX_REQUESTS) return false;
            timestamps.addLast(now);
            return true;
        }
    }
}
