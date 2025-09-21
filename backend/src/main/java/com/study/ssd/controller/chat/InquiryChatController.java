package com.study.ssd.controller.chat;

import com.study.ssd.dto.chat.InquiryChatRoomResponse;
import com.study.ssd.dto.chat.InquiryMessageResponse;
import com.study.ssd.entity.chat.InquiryChatRoom;
import com.study.ssd.service.chat.InquiryChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inquiry")
@RequiredArgsConstructor
public class InquiryChatController {

    private final InquiryChatService inquiryChatService;

    // 현재 로그인 유저의 문의 채팅방 반환(없으면 생성)
    @GetMapping("/room/me")
    public ResponseEntity<Map<String, String>> getMyRoom(@RequestParam Long userPkID) {
        InquiryChatRoom room = inquiryChatService.getOrCreateRoomForUser(userPkID);
        return ResponseEntity.ok(Map.of("roomId", room.getId(), "roomName", room.getName()));
    }

    // 채팅방 메시지 불러오기
    @GetMapping("/inquiry-room/{roomId}/messages")
    public ResponseEntity<List<InquiryMessageResponse>> getMessages(@PathVariable String roomId) {
        return ResponseEntity.ok(inquiryChatService.getMessages(roomId));
    }

    // 관리자가 보는 경우 방 목록 불러오기
    @GetMapping("/rooms")
    public ResponseEntity<List<InquiryChatRoomResponse>> getRooms() {
        return ResponseEntity.ok(inquiryChatService.getRooms());
    }
}
