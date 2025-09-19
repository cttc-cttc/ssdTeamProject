package com.study.ssd.controller.chat;

import com.study.ssd.dto.chat.ChatMessageRequestDto;
import com.study.ssd.dto.chat.InquiryMessageRequestDto;
import com.study.ssd.service.chat.ChatService;
import com.study.ssd.service.chat.InquiryChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final InquiryChatService inquiryChatService;

    /**
     * 그룹 채팅창에서 메시지 작성 시 메시지 db에 등록
     * @param requestMessage
     */
    @MessageMapping("/groupChat/{roomId}/message")
    public void sendGroupChatMessage(@DestinationVariable String roomId, ChatMessageRequestDto requestMessage) {
        chatService.writeMessage(roomId, requestMessage);
    }

    /**
     * 문의하기 채팅방에서 메시지 작성 시 메시지 db에 등록
     * @param roomId
     * @param messageDto
     */
    @MessageMapping("/inquiry/{roomId}/message") // 클라이언트 → 서버
    public void sendInquiryMessage(@DestinationVariable String roomId, InquiryMessageRequestDto messageDto) {
        inquiryChatService.writeMessage(roomId, messageDto);
    }
}
