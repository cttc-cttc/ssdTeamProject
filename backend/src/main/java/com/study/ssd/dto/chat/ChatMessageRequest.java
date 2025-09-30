package com.study.ssd.dto.chat;

import com.study.ssd.entity.chat.SenderType;

/**
 * 그룹 채팅 메시지 전송 Request Dto
 * @param sender 메시지 작성자
 * @param senderId 메시지 작성자 id
 * @param content 메시지 내용
 * @param senderType USER or ADMIN
 */
public record ChatMessageRequest(
        String sender,
        Long senderId,
        String content,
        SenderType senderType
) { }
