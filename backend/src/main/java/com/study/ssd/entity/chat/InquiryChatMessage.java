package com.study.ssd.entity.chat;

import com.study.ssd.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "inquiry_chat_message")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InquiryChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inquiry_room_id", nullable = false)
    private InquiryChatRoom room; // 연결된 채팅방

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SenderType senderType; // USER, ADMIN

    @Column(nullable = false)
    private Long senderId; // user.id or admin.id

    @Column(length = 20, nullable = false)
    private String sender; // 메시지 작성자 닉네임

    @Column(length = 1000, nullable = false)
    private String content; // 메시지 내용

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() { // DB에 데이터 등록 시 현재 시간을 자동으로 설정
        this.createdAt = LocalDateTime.now();
    }
}
