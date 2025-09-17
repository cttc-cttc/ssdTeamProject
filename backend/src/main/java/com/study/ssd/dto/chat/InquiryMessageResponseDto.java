package com.study.ssd.dto.chat;

import com.study.ssd.entity.chat.InquiryChatMessage;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InquiryMessageResponseDto {
    private Long id; // 메시지 id
    private String roomId; // 채팅방 id
    private String sender; // 메시지 작성자
    private String content; // 메시지 내용
    private LocalDateTime createdAt; // 작성 시간

    public static InquiryMessageResponseDto fromEntity(InquiryChatMessage entity) {
        return InquiryMessageResponseDto.builder()
                .id(entity.getId())
                .roomId(entity.getRoom().getId())
                .sender(entity.getSender())
                .content(entity.getContent())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
