package com.coctre.backend.controller;

import com.coctre.backend.config.PasswordUtil;
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

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AdminUserRepository adminUserRepository;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        String email = request.getEmail() != null ? request.getEmail().trim() : "";
        String password = request.getPassword() != null ? request.getPassword().trim() : "";

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

        // Update last login
        user.setLastLoginAt(LocalDateTime.now());
        adminUserRepository.save(user);

        // Generate simple auth token
        String token = "coctre-token-" + UUID.randomUUID();

        LoginResponse responseData = LoginResponse.builder()
                .token(token)
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .build();

        return ResponseEntity.ok(ApiResponse.ok("Đăng nhập thành công", responseData));
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<String>> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        String email = request.getEmail() != null ? request.getEmail().trim() : "";
        String currentPassword = request.getCurrentPassword() != null ? request.getCurrentPassword().trim() : "";
        String newPassword = request.getNewPassword() != null ? request.getNewPassword().trim() : "";

        if (newPassword.length() < 6) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Mật khẩu mới phải có ít nhất 6 ký tự"));
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

        return ResponseEntity.ok(ApiResponse.ok("Đổi mật khẩu thành công!", "OK"));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<String>> checkStatus() {
        return ResponseEntity.ok(ApiResponse.ok("Auth Service is running", "OK"));
    }
}
