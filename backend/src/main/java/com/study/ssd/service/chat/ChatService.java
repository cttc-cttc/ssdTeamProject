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

    public void writeMessage(ChatMessageRequestDto requestMessage) {
        // 1️⃣ roomId로 ChatRoom 조회
        ChatRoom room = chatRoomRepository.findById(requestMessage.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 방입니다"));

        // 2️⃣ ChatMessage 엔티티 생성
        ChatMessage entity = ChatMessage.builder()
                .room(room)                       // 👈 여기서 room 객체 넣기
                .sender(requestMessage.getSender())
                .content(requestMessage.getContent())
                .build();

        // 3️⃣ DB 저장
        chatMessageRepository.save(entity);

        // "/sub/chat/room/{roomId}"
        // 4️⃣ WebSocket 구독자에게 전달
        messagingTemplate.convertAndSend("/sub/chat/room/" + requestMessage.getRoomId(), requestMessage);
    }
}
