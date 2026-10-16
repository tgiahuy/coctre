package com.coctre.backend.config;

import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtil {
    private static final BCryptPasswordEncoder ENCODER = new BCryptPasswordEncoder(12);

    public static String hashPassword(String rawPassword) {
        if (rawPassword == null || rawPassword.isBlank()) return "";
        return ENCODER.encode(rawPassword);
    }

    public static boolean verify(String rawPassword, String hashedPassword) {
        if (rawPassword == null || hashedPassword == null) return false;
        if (hashedPassword.startsWith("$2a$") || hashedPassword.startsWith("$2b$") || hashedPassword.startsWith("$2y$")) {
            return ENCODER.matches(rawPassword, hashedPassword);
        }
        return MessageDigest.isEqual(
                legacyHash(rawPassword).getBytes(StandardCharsets.US_ASCII),
                hashedPassword.toLowerCase().getBytes(StandardCharsets.US_ASCII)
        );
    }

    public static boolean needsRehash(String hashedPassword) {
        return hashedPassword == null || !hashedPassword.startsWith("$2");
    }

    private static String legacyHash(String rawPassword) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(("CoctreHoaBinh2026@SecuritySalt" + rawPassword)
                    .getBytes(StandardCharsets.UTF_8));
            StringBuilder result = new StringBuilder();
            for (byte value : hash) result.append(String.format("%02x", value));
            return result.toString();
        } catch (Exception e) {
            throw new IllegalStateException("Không thể kiểm tra mật khẩu cũ", e);
        }
    }

    private PasswordUtil() {}
}
