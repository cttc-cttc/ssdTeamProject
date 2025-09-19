package com.study.ssd.dto.chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageRequestDto {
    private String sender; // 메시지 작성자
    private String content; // 메시지 내용
}
