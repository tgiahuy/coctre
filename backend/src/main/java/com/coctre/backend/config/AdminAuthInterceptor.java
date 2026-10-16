package com.coctre.backend.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class AdminAuthInterceptor implements HandlerInterceptor {
    public static final String AUTHENTICATED_EMAIL = "authenticatedAdminEmail";
    private final AdminSessionService sessions;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!(handler instanceof HandlerMethod method) ||
                (!method.hasMethodAnnotation(AdminOnly.class) && !method.getBeanType().isAnnotationPresent(AdminOnly.class))) {
            return true;
        }

        String header = request.getHeader("Authorization");
        String token = header != null && header.startsWith("Bearer ") ? header.substring(7).trim() : null;
        var email = sessions.validate(token);
        if (email.isPresent()) {
            request.setAttribute(AUTHENTICATED_EMAIL, email.get());
            request.setAttribute("authenticatedAdminToken", token);
            return true;
        }

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.getWriter().write("{\"success\":false,\"message\":\"Phiên đăng nhập không hợp lệ hoặc đã hết hạn\"}");
        return false;
    }
}
