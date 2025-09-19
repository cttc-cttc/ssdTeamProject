package com.study.ssd.service.chat;

import com.study.ssd.dto.chat.ChatMessageRequestDto;
import com.study.ssd.entity.chat.ChatMessage;
import com.study.ssd.entity.chat.ChatRoom;
import com.study.ssd.repository.chat.ChatMessageRepository;
import com.study.ssd.repository.chat.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;

    public void writeMessage(String roomId, ChatMessageRequestDto requestMessage) {
        // roomId로 ChatRoom 조회
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 방입니다"));

        // ChatMessage 엔티티 생성
        ChatMessage entity = ChatMessage.builder()
                .room(room)
                .sender(requestMessage.getSender())
                .content(requestMessage.getContent())
                .build();

        // DB 저장
        chatMessageRepository.save(entity);

        // "/sub/groupChat/{roomId}"
        // WebSocket 구독자에게 전달
        messagingTemplate.convertAndSend("/sub/groupChat/" + roomId, requestMessage);
    }
}
