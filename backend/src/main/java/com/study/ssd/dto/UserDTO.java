package com.study.ssd.dto;

import java.time.LocalDate;

public class UserDTO {

    // 회원가입 DTO
    public static class SignUpRequest {
        private String userName;
        private String userNickname;
        private String userId;
        private String userPassword;
        private String userEmail;

        // 기본 생성자
        public SignUpRequest() {}

        // 생성자
        public SignUpRequest(String userName, String userNickname, String userId, String userPassword, String userEmail) {
            this.userName = userName;
            this.userNickname = userNickname;
            this.userId = userId;
            this.userPassword = userPassword;
            this.userEmail = userEmail;
        }

        // 게터, 세터
        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }

        public String getUserNickname() {
            return userNickname;
        }

        public void setUserNickname(String userNickname) {
            this.userNickname = userNickname;
        }

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public String getUserPassword() {
            return userPassword;
        }

        public void setUserPassword(String userPassword) {
            this.userPassword = userPassword;
        }

        public String getUserEmail() {
            return userEmail;
        }

        public void setUserEmail(String userEmail) {
            this.userEmail = userEmail;
        }
    }

    // 로그인 DTO
    public static class LoginRequest{
        private String userId;
        private String userPassword;

        // 기본 생성자
        public LoginRequest() {}

        // 생성자
        public LoginRequest(String userId, String userPassword) {
            this.userId = userId;
            this.userPassword = userPassword;
        }

        // 게터, 세터
        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public String getUserPassword() {
            return userPassword;
        }

        public void setUserPassword(String userPassword) {
            this.userPassword = userPassword;
        }
    }

    // 유저 정보 수정 DTO
    public static class UserUpdateRequest{
        private String userPassword;
        private String userNickname;

        // 기본 생성자
        public UserUpdateRequest() {}

        // 생성자
        public UserUpdateRequest(String userPassword, String userNickname) {
            this.userPassword = userPassword;
            this.userNickname = userNickname;
        }

        // 게터, 세터
        public String getUserPassword() {
            return userPassword;
        }

        public void setUserPassword(String userPassword) {
            this.userPassword = userPassword;
        }

        public String getUserNickname() {
            return userNickname;
        }

        public void setUserNickname(String userNickname) {
            this.userNickname = userNickname;
        }
    }

    // 비밀번호 DTO - 회원탈퇴
    public static class PasswordRequest {
        private String password;

        // 기본 생성자
        public PasswordRequest() {}

        // 생성자
        public PasswordRequest(String password) {
            this.password = password;
        }

        // 게터, 세터
        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    // 유저 응답 DTO - 추후 보안 유지(비밀번호만 제외 하자)와 API 연계를 쉽게하기 위해 만듦
    public static class UserResponse {
        private Long id;
        private String userName;
        private String userNickname;
        private String userId;
        private String userEmail;
        private LocalDate userNicknameUpdatedAt;
        private LocalDate nextNicknameChangedAt;

        // 기본 생성자
        public UserResponse() {}

        // 생성자
        public UserResponse(Long id, String userName, String userNickname, String userId, String userEmail, LocalDate userNicknameUpdatedAt, LocalDate nextNicknameChangedAt) {
            this.id = id;
            this.userName = userName;
            this.userNickname = userNickname;
            this.userId = userId;
            this.userEmail = userEmail;
            this.userNicknameUpdatedAt = userNicknameUpdatedAt;
            this.nextNicknameChangedAt = nextNicknameChangedAt;
        }

        // 게터, 세터
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }

        public String getUserNickname() {
            return userNickname;
        }

        public void setUserNickname(String userNickname) {
            this.userNickname = userNickname;
        }

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public String getUserEmail() {
            return userEmail;
        }

        public void setUserEmail(String userEmail) {
            this.userEmail = userEmail;
        }

        public LocalDate getUserNicknameUpdatedAt() {
            return userNicknameUpdatedAt;
        }

        public void setUserNicknameUpdatedAt(LocalDate userNicknameUpdatedAt) {
            this.userNicknameUpdatedAt = userNicknameUpdatedAt;
        }

        public LocalDate getNextNicknameChangedAt() {
            return nextNicknameChangedAt;
        }

        public void setNextNicknameChangedAt(LocalDate nextNicknameChangedAt) {
            this.nextNicknameChangedAt = nextNicknameChangedAt;
        }
    }
    
    // 비밀번호 재설정 요청 DTO
    public static class PasswordResetRequest {
        private String userEmail;
        
        // 기본 생성자
        public PasswordResetRequest() {}
        
        // 생성자
        public PasswordResetRequest(String userEmail) {
            this.userEmail = userEmail;
        }
        
        // 게터, 세터
        public String getUserEmail() {
            return userEmail;
        }
        
        public void setUserEmail(String userEmail) {
            this.userEmail = userEmail;
        }
    }
    
    // 비밀번호 재설정 확인 DTO
    public static class PasswordResetConfirmRequest {
        private String token;
        private String newPassword;
        
        // 기본 생성자
        public PasswordResetConfirmRequest() {}
        
        // 생성자
        public PasswordResetConfirmRequest(String token, String newPassword) {
            this.token = token;
            this.newPassword = newPassword;
        }
        
        // 게터, 세터
        public String getToken() {
            return token;
        }
        
        public void setToken(String token) {
            this.token = token;
        }
        
        public String getNewPassword() {
            return newPassword;
        }
        
        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }
    }
}