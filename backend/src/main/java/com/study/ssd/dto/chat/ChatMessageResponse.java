package com.study.ssd.dto.chat;

import com.study.ssd.entity.chat.ChatMessage;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageResponse {
    private Long id; // 메시지 id
    private String roomId; // 채팅방 id
    private Long senderId; // 메시지 작성자 id
    private String sender; // 메시지 작성자 닉네임
    private String content; // 메시지 내용
    private String senderType; // USER 고정
    private LocalDateTime createdAt; // 작성 시간

    public static ChatMessageResponse fromEntity(ChatMessage entity) {
        return ChatMessageResponse.builder()
                .id(entity.getId())
                .roomId(entity.getRoom().getId())
                .senderId(entity.getSenderId())
                .sender(entity.getSender())
                .content(entity.getContent())
                .senderType("USER")
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
