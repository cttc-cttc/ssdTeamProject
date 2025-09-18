package com.study.ssd.entity.chat;

import com.study.ssd.entity.Admin;
import com.study.ssd.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "inquiry_chat_room")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InquiryChatRoom {
    @Id
    private String id; // String PK

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_pk", nullable = false) // FK 컬럼명 = admin_pk
    private Admin admin; // 관리자 Admin 엔티티 참조

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_pk", nullable = false, unique = true)  // FK 컬럼명 = user_pk
    private User user; // 일반 유저 User 엔티티 참조


    @Column(length = 50, nullable = false)
    private String name; // 채팅방 이름

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() { // DB에 데이터 등록 시 초기값 설정
        if (id == null) id = UUID.randomUUID().toString();
        if (createdAt == null) createdAt = LocalDateTime.now();
    }
}
