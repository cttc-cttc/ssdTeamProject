package com.study.ssd.controller.chat;

import com.study.ssd.dto.chat.ChatMessageRequestDto;
import com.study.ssd.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    /**
     * 채팅창에서 메시지 작성
     * 메시지 db 등록
     * @param requestMessage
     */
    @MessageMapping("/chat/message")
    public void writeMessage(ChatMessageRequestDto requestMessage) {
        chatService.writeMessage(requestMessage);
    }
}
