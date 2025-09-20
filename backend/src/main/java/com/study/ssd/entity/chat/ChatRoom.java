package com.study.ssd.entity.chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.study.ssd.entity.StudyPost;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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

    // 채팅방 이름
    @Column(length = 50, nullable = false)
    private String name;

    // 연결된 게시글
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false, unique = true)
    @JsonIgnore
    private StudyPost studyPost;

    // 연결된 채팅 참여자
    // cascade = CascadeType.ALL → 부모 삭제 시 자식까지 전부 삭제
    // orphanRemoval = true → 부모 컬렉션에서 빠지면 DB에서도 삭제
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ChatRoomParticipant> participants = new ArrayList<>();

    // 연결된 채팅 메시지
    // cascade = CascadeType.ALL → 부모 삭제 시 자식까지 전부 삭제
    // orphanRemoval = true → 부모 컬렉션에서 빠지면 DB에서도 삭제
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ChatMessage> messages = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() { // DB에 데이터 등록 시 현재 시간을 자동으로 설정
        this.createdAt = LocalDateTime.now();
    }
}
