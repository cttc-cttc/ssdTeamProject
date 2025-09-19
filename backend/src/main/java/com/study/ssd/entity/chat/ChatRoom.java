package com.study.ssd.entity.chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.study.ssd.entity.StudyPost;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "chat_room")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoom {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString(); // String PK

    @Column(length = 50, nullable = false)
    private String name; // 채팅방 이름

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false, unique = true)
    @JsonIgnore
    private StudyPost studyPost; // 연결된 게시글

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() { // DB에 데이터 등록 시 현재 시간을 자동으로 설정
        this.createdAt = LocalDateTime.now();
    }
}
