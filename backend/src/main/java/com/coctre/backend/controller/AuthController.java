package com.coctre.backend.controller;

import com.coctre.backend.config.PasswordUtil;
import com.coctre.backend.config.AdminOnly;
import com.coctre.backend.config.AdminAuthInterceptor;
import com.coctre.backend.config.AdminSessionService;
import com.coctre.backend.dto.ApiResponse;
import com.coctre.backend.dto.ChangePasswordRequest;
import com.coctre.backend.dto.LoginRequest;
import com.coctre.backend.dto.LoginResponse;
import com.coctre.backend.entity.AdminUserEntity;
import com.coctre.backend.repository.AdminUserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AdminUserRepository adminUserRepository;
    private final AdminSessionService sessions;
    private final com.coctre.backend.config.AuthRateLimiter authRateLimiter;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest
    ) {
        String clientIp = getClientIp(httpRequest);
        String email = request.getEmail() != null ? request.getEmail().trim() : "";
        String password = request.getPassword() != null ? request.getPassword() : "";

        if (!authRateLimiter.isAllowed(clientIp, email)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .header("Retry-After", "900")
                    .body(ApiResponse.error("Tài khoản hoặc địa chỉ IP này đã nhập sai mật khẩu quá 5 lần. Vui lòng thử lại sau 15 phút."));
        }

        Optional<AdminUserEntity> userOpt = adminUserRepository.findByEmailIgnoreCase(email);

        if (userOpt.isEmpty()) {
            authRateLimiter.recordFailure(clientIp, email);
            log.warn("[Security] Đăng nhập thất bại từ IP {} cho email không tồn tại: {}", clientIp, email);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Email hoặc mật khẩu không chính xác"));
        }

        AdminUserEntity user = userOpt.get();

        if (Boolean.FALSE.equals(user.getIsActive())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("Tài khoản quản trị viên này đã bị tạm khóa"));
        }

        if (!PasswordUtil.verify(password, user.getPasswordHash())) {
            authRateLimiter.recordFailure(clientIp, email);
            log.warn("[Security] Mật khẩu sai từ IP {} cho tài khoản {}", clientIp, email);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Email hoặc mật khẩu không chính xác"));
        }

        // Login success - clear failed rate limit counter
        authRateLimiter.recordSuccess(clientIp, email);

        if (PasswordUtil.needsRehash(user.getPasswordHash())) {
            user.setPasswordHash(PasswordUtil.hashPassword(password));
        }

        // Update last login
        user.setLastLoginAt(LocalDateTime.now());
        adminUserRepository.save(user);

        String token = sessions.create(user.getEmail(), Boolean.TRUE.equals(request.getRememberMe()));

        LoginResponse responseData = LoginResponse.builder()
                .token(token)
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .build();

        log.info("[Security] Quản trị viên {} đã đăng nhập thành công từ IP {}", email, clientIp);
        return ResponseEntity.ok(ApiResponse.ok("Đăng nhập thành công", responseData));
    }

    private String getClientIp(HttpServletRequest request) {
        String remote = request.getRemoteAddr() == null ? "unknown" : request.getRemoteAddr();
        boolean trustedProxy = remote.equals("127.0.0.1") || remote.equals("::1") || remote.startsWith("10.")
                || remote.startsWith("192.168.") || remote.startsWith("172.");

        if (trustedProxy) {
            String realIp = request.getHeader("X-Real-IP");
            if (realIp != null && !realIp.isBlank()) {
                return realIp.trim();
            }
            String forwarded = request.getHeader("X-Forwarded-For");
            if (forwarded != null && !forwarded.isBlank()) {
                return forwarded.split(",")[0].trim();
            }
        }
        return remote;
    }

    @PostMapping("/change-password")
    @AdminOnly
    public ResponseEntity<ApiResponse<String>> changePassword(
            @Valid @RequestBody ChangePasswordRequest request,
            HttpServletRequest httpRequest
    ) {
        String email = (String) httpRequest.getAttribute(AdminAuthInterceptor.AUTHENTICATED_EMAIL);
        String currentPassword = request.getCurrentPassword() != null ? request.getCurrentPassword() : "";
        String newPassword = request.getNewPassword() != null ? request.getNewPassword() : "";

        if (newPassword.length() < 12) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Mật khẩu mới phải có ít nhất 12 ký tự"));
        }

        Optional<AdminUserEntity> userOpt = adminUserRepository.findByEmailIgnoreCase(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Không tìm thấy tài khoản quản trị"));
        }

        AdminUserEntity user = userOpt.get();

        if (!PasswordUtil.verify(currentPassword, user.getPasswordHash())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Mật khẩu hiện tại không chính xác"));
        }

        user.setPasswordHash(PasswordUtil.hashPassword(newPassword));
        adminUserRepository.save(user);
        sessions.revokeAll(email);

        return ResponseEntity.ok(ApiResponse.ok("Đổi mật khẩu thành công!", "OK"));
    }

    @GetMapping("/me")
    @AdminOnly
    public ResponseEntity<ApiResponse<LoginResponse>> checkStatus(HttpServletRequest request) {
        String email = (String) request.getAttribute(AdminAuthInterceptor.AUTHENTICATED_EMAIL);
        return adminUserRepository.findByEmailIgnoreCase(email)
                .filter(user -> !Boolean.FALSE.equals(user.getIsActive()))
                .map(user -> ResponseEntity.ok(ApiResponse.ok(LoginResponse.builder()
                    .email(user.getEmail())
                    .fullName(user.getFullName())
                    .role(user.getRole())
                    .build())))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Tài khoản không còn tồn tại")));
    }

    @PostMapping("/logout")
    @AdminOnly
    public ResponseEntity<ApiResponse<String>> logout(HttpServletRequest request) {
        sessions.revoke((String) request.getAttribute("authenticatedAdminToken"));
        return ResponseEntity.ok(ApiResponse.ok("Đã đăng xuất", "OK"));
    }
}
