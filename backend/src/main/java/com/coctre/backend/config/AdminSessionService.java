package com.coctre.backend.config;

import com.coctre.backend.entity.AdminSessionEntity;
import com.coctre.backend.repository.AdminSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AdminSessionService {
    private final AdminSessionRepository repository;
    private final SecureRandom secureRandom = new SecureRandom();

    public String create(String email, boolean rememberMe) {
        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        repository.save(AdminSessionEntity.builder()
                .id(UUID.randomUUID().toString())
                .tokenHash(hash(token))
                .userEmail(email)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusDays(rememberMe ? 30 : 1))
                .build());
        return token;
    }

    @Transactional
    public Optional<String> validate(String token) {
        if (token == null || token.isBlank()) return Optional.empty();
        Optional<AdminSessionEntity> session = repository.findByTokenHash(hash(token));
        if (session.isEmpty()) return Optional.empty();
        if (session.get().getExpiresAt().isBefore(LocalDateTime.now())) {
            repository.delete(session.get());
            return Optional.empty();
        }
        return Optional.of(session.get().getUserEmail());
    }

    @Transactional
    public void revoke(String token) {
        if (token != null && !token.isBlank()) repository.deleteByTokenHash(hash(token));
    }

    @Transactional
    public void revokeAll(String email) {
        repository.deleteByUserEmailIgnoreCase(email);
    }

    private String hash(String token) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-256").digest(token.getBytes(StandardCharsets.UTF_8));
            return java.util.HexFormat.of().formatHex(digest);
        } catch (Exception e) {
            throw new IllegalStateException("Không thể xử lý phiên đăng nhập", e);
        }
    }
}
