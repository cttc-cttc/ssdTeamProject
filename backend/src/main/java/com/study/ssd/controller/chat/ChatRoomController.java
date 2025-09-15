package com.study.ssd.controller.chat;

import com.study.ssd.dto.chat.ChatMessageResponseDto;
import com.study.ssd.entity.chat.ChatMessage;
import com.study.ssd.entity.chat.ChatRoom;
import com.study.ssd.repository.chat.ChatMessageRepository;
import com.study.ssd.repository.chat.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    // 1️⃣ 채팅방 생성
    @PostMapping("/rooms")
    public ChatRoom createRoom(@RequestParam String name) {
        ChatRoom room = new ChatRoom();
        room.setName(name);
        return chatRoomRepository.save(room);
    }

    // 2️⃣ 채팅방 목록 조회
    @GetMapping("/rooms")
    public List<ChatRoom> getRooms() {
        return chatRoomRepository.findAll();
    }

    // 3️⃣ 채팅방 메시지 조회
    @GetMapping("/room/{roomId}/messages")
    public List<ChatMessageResponseDto> getMessages(@PathVariable String roomId) {
        return chatMessageRepository.findByRoomIdOrderByCreatedAtAsc(roomId)
                .stream()
                .map(ChatMessageResponseDto::fromEntity)
                .collect(Collectors.toList());
    }
}
