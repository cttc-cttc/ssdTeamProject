package com.study.ssd.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

public class UserDTO {
    // 회원가입 DTO
    @Data
    public static class SignUpRequest {
        private String userName;
        private String userNickname;
        private String userId;
        private String userPassword;
        private String userEmail;
    }

    // 로그인 DTO
    @Data
    public static class LoginRequest{
        private String userId;
        private String userPassword;
    }

    // 유저 정보 수정 DTO
    @Data
    public static class UserUpdateRequest{
        private String userPassword;
        private String userNickname;
    }

    // 비밀번호 DTO - 회원탈퇴
    @Data
    public static class PasswordRequest {
        private String password;
    }

    // 유저 응답 DTO - 추후 보안 유지(비밀번호만 제외 하자)와 API 연계를 쉽게하기 위해 만듦
    @Data
    @AllArgsConstructor
    public static class UserResponse {
        private Long id;
        private String userName;
        private String userNickname;
        private String userId;
        private String userEmail;
        private LocalDate userNicknameUpdatedAt;
        private LocalDate nextNicknameChangedAt;
    }
    
    // 비밀번호 재설정 요청 DTO
    @Data
    public static class PasswordResetRequest {
        private String userEmail;
    }
    
    // 비밀번호 재설정 확인 DTO
    @Data
    public static class PasswordResetConfirmRequest {
        private String token;
        private String newPassword;
    }
}