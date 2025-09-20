package com.study.ssd.entity.chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_message")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * fetch = FetchType.LAZY → 지연 로딩
     * 실제로 연관된 엔티티가 필요한 순간까지 DB에서 데이터를 가져오지 않음
     * 성능 최적화에 유리, 특히 @OneToMany 같이 컬렉션이 많을 때 효과적
     * -
     * fetch = FetchType.EAGER → 즉시 로딩
     * 부모 엔티티를 조회할 때 연관된 엔티티도 즉시 조회
     * 편리하지만 컬렉션이 많거나 join이 많으면 성능 저하 가능
     */
    // 연결된 채팅방
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    @JsonIgnore
    private ChatRoom room;

    // 메시지 작성자
    @Column(length = 20, nullable = false)
    private String sender;

    // 메시지 내용
    @Column(length = 1000, nullable = false)
    private String content;

    // 메시지 타입 - TEXT, JOIN, SYSTEM
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MessageType messageType;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.messageType == null) {
            this.messageType = MessageType.TEXT;
        }
    }
}
