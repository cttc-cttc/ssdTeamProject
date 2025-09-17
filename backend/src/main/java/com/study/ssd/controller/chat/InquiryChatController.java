package com.study.ssd.controller.chat;

import com.study.ssd.dto.chat.InquiryChatRoomResponseDto;
import com.study.ssd.dto.chat.InquiryMessageResponseDto;
import com.study.ssd.entity.chat.InquiryChatRoom;
import com.study.ssd.repository.UserRepository;
import com.study.ssd.repository.chat.InquiryChatMessageRepository;
import com.study.ssd.repository.chat.InquiryChatRoomRepository;
import com.study.ssd.service.chat.InquiryChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/inquiry")
@RequiredArgsConstructor
public class InquiryChatController {

    private final InquiryChatService inquiryChatService;
    private final InquiryChatRoomRepository inquiryChatRoomRepository;
    private final InquiryChatMessageRepository inquiryChatMessageRepository;

    // GET /api/inquiry/room/me  -> 현재 로그인 유저의 문의 방 반환(없으면 생성)
    @GetMapping("/room/me")
    public ResponseEntity<Map<String, String>> getMyRoom(@RequestParam Long userPkID) {
        InquiryChatRoom room = inquiryChatService.getOrCreateRoomForUser(userPkID);
        return ResponseEntity.ok(Map.of("roomId", room.getId(), "roomName", room.getName()));
    }


    // 채팅방 메시지 불러오기
    // 채팅방 id로 메시지 조회
    @GetMapping("/inquiry-room/{roomId}/messages")
    public List<InquiryMessageResponseDto> getMessages(@PathVariable String roomId) {
        return inquiryChatMessageRepository.findByRoomIdOrderByCreatedAtAsc(roomId)
                .stream()
                .map(InquiryMessageResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    // 관리자가 보는 경우 방 목록 불러오기
    @GetMapping("/rooms")
    public List<InquiryChatRoomResponseDto> getRooms() {
        return inquiryChatRoomRepository.findAll()
                .stream()
                .map(InquiryChatRoomResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

}
