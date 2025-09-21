package com.study.ssd.dto.chat;

/**
 * 채팅 메시지 전송 Request Dto
 * @param sender 메시지 작성자
 * @param content 메시지 내용
 */
public record ChatMessageRequest(String sender, String content) {
}
