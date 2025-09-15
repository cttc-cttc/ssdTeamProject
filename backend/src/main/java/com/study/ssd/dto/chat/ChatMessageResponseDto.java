package com.study.ssd.dto.chat;

import com.study.ssd.entity.chat.ChatMessage;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageResponseDto {
    private Long id; // 메시지 id
    private String roomId; // 채팅방 id
    private String sender; // 메시지 작성자
    private String content; // 메시지 내용
    private LocalDateTime createdAt; // 작서 시간

    public static ChatMessageResponseDto fromEntity(ChatMessage entity) {
        return ChatMessageResponseDto.builder()
                .id(entity.getId())
                .roomId(entity.getRoom().getId())
                .sender(entity.getSender())
                .content(entity.getContent())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
