package com.study.ssd.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "password_reset_token")
@Data
public class PasswordResetToken {
    
    // 토큰 식별키
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // 재설정 토큰 (32자리 랜덤 문자열)
    @Column(nullable = false, unique = true)
    private String token;
    
    // 사용자 정보 (한 사용자당 하나의 토큰만 가능)
    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id", unique = true)
    private User user;
    
    // 토큰 만료 시간
    @Column(nullable = false)
    private LocalDateTime expiryDate;
    
    // 토큰 생성 시간
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    // 토큰 사용 여부
    @Column
    private boolean used = false;
    
    // 기본 생성자
    public PasswordResetToken() {
        this.createdAt = LocalDateTime.now();
    }
    
    // 토큰 생성자
    public PasswordResetToken(String token, User user) {
        this();
        this.token = token;
        this.user = user;
        this.expiryDate = LocalDateTime.now().plusMinutes(10); // 10분 후 만료
    }
    
    // 토큰 만료 여부 확인
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(this.expiryDate);
    }
}
/*
* PasswordResetToken = 비밀번호 재설정 토큰 엔티티
*   - 사용자가 비밀번호를 재설정할 때 사용하는 임시 토큰
*   - 32자리 랜덤 문자열로 생성되어 보안성 확보
*   - 10분 후 자동 만료되어 보안 강화
*   - 한 번 사용 후 무효화되어 재사용 방지
*   - 한 사용자당 하나의 토큰만 존재 가능
*/
