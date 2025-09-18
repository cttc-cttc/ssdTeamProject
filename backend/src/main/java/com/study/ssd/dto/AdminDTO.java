package com.study.ssd.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

public class AdminDTO {
    // Admin 회원가입 DTO
    @Data
    public static class SignUpRequest {
        private String adminName;
        private String adminId;
        private String adminPassword;
    }

    // 로그인 DTO
    @Data
    public static class LoginRequest {
        private String adminId;
        private String adminPassword;
    }

    // 응답 DTO
    @Data
    @AllArgsConstructor
    public static class AdminResponse {
        private Long userId;
        private String adminName;
        private String adminId;
        private String adminPassword;
    }
}
