package com.study.ssd.service.chat;

import com.study.ssd.dto.chat.ChatMessageRequestDto;
import com.study.ssd.entity.chat.ChatMessage;
import com.study.ssd.entity.chat.ChatRoom;
import com.study.ssd.entity.chat.MessageType;
import com.study.ssd.repository.chat.ChatMessageRepository;
import com.study.ssd.repository.chat.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;

    // 채팅 메시지 전송
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

    // 스터디 종료 후 종료 메시지 전송
    public void sendEndMessageAndDeleteChatRoom(Long postId) {
        ChatRoom room = chatRoomRepository.findByStudyPostId(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // 스터디 종료 메시지 발송
        ChatMessage endMessage = new ChatMessage();
        endMessage.setRoom(room);
        endMessage.setSender("NOTICE");
        endMessage.setMessageType(MessageType.SYSTEM);
        endMessage.setContent("스터디가 종료 되었습니다.\n종료 이후에는 메시지를 입력할 수 없으며, 채팅방이 삭제됩니다.");
        chatMessageRepository.save(endMessage);

        // STOMP 구독자에게 실시간 전송
        messagingTemplate.convertAndSend("/sub/groupChat/" + room.getId(), endMessage);

        // 채팅방 삭제 (Cascade로 참가자/메시지 자동 삭제)
        chatRoomRepository.delete(room);
    }
}
