package com.study.ssd.dto.chat;

import com.study.ssd.entity.chat.InquiryChatMessage;
import com.study.ssd.entity.chat.SenderType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InquiryMessageResponse {
    private Long id; // 메시지 id
    private String roomId; // 채팅방 id
    private Long senderId; // 메시지 작성자 id
    private String sender; // 메시지 작성자 닉네임
    private SenderType senderType; // USER or ADMIN
    private String content; // 메시지 내용
    private LocalDateTime createdAt; // 작성 시간

    public static InquiryMessageResponse fromEntity(InquiryChatMessage entity) {
        return InquiryMessageResponse.builder()
                .id(entity.getId())
                .roomId(entity.getRoom().getId())
                .senderId(entity.getSenderId())
                .senderType(entity.getSenderType())
                .sender(entity.getSender())
                .content(entity.getContent())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
