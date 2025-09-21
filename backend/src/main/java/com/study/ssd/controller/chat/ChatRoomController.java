package com.study.ssd.controller.chat;

import com.study.ssd.dto.chat.*;
import com.study.ssd.entity.chat.ChatRoom;
import com.study.ssd.service.chat.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatService chatService;

    // 존재하는 채팅방인지 확인, 있으면 채팅방 정보 반환
    @GetMapping("/checkRoom")
    public ResponseEntity<ChatRoomCheckResponse> checkRoom(@RequestParam Long postId) {
        return ResponseEntity.ok(chatService.checkRoom(postId));
    }

    // 채팅방 생성
    @PostMapping("/rooms")
    public ResponseEntity<ChatRoom> createRoom(@RequestBody CreateRoomRequest request) {
        return ResponseEntity.ok(chatService.createRoom(request));
    }

    // 채팅방 정보 확인
    @GetMapping("/rooms/{roomId}/info")
    public ResponseEntity<ChatRoomInfoResponse> getRoomInfo(@PathVariable String roomId) {
        return ResponseEntity.ok(chatService.getRoomInfo(roomId));
    }

    // 채팅방 입장 처리
    @PostMapping("/rooms/{roomId}/join")
    public void joinRoom(@PathVariable String roomId, @RequestBody GroupChatJoinRequest request) {
        chatService.joinRoom(roomId, request);
    }

    // 채팅방 메시지 조회
    @GetMapping("/rooms/{roomId}/messages")
    public ResponseEntity<List<ChatMessageResponse>> getMessages(@PathVariable String roomId) {
        return ResponseEntity.ok(chatService.getMessages(roomId));
    }

}
