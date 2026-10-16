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

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        String email = request.getEmail() != null ? request.getEmail().trim() : "";
        String password = request.getPassword() != null ? request.getPassword() : "";

        Optional<AdminUserEntity> userOpt = adminUserRepository.findByEmailIgnoreCase(email);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Email hoặc mật khẩu không chính xác"));
        }

        AdminUserEntity user = userOpt.get();

        if (Boolean.FALSE.equals(user.getIsActive())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("Tài khoản quản trị viên này đã bị tạm khóa"));
        }

        if (!PasswordUtil.verify(password, user.getPasswordHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Email hoặc mật khẩu không chính xác"));
        }

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

        return ResponseEntity.ok(ApiResponse.ok("Đăng nhập thành công", responseData));
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
