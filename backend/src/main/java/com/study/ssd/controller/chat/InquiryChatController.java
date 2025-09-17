package com.study.ssd.controller.chat;

import com.study.ssd.entity.chat.InquiryChatRoom;
import com.study.ssd.repository.UserRepository;
import com.study.ssd.service.chat.InquiryChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/inquiry")
@RequiredArgsConstructor
public class InquiryChatController {
    private final InquiryChatService inquiryChatService;
    private final UserRepository userRepository;

    // GET /api/inquiry/room/me  -> 현재 로그인 유저의 문의 방 반환(없으면 생성)
    @GetMapping("/room/me")
    public ResponseEntity<Map<String, String>> getMyRoom(@RequestParam Long userPkID) {
        InquiryChatRoom room = inquiryChatService.getOrCreateRoomForUser(userPkID);
        return ResponseEntity.ok(Map.of("roomId", room.getId(), "roomName", room.getName()));
    }

    // GET /api/inquiry/room/{roomId}/messages
//    @GetMapping("/room/{roomId}/messages")
//    public List<Map<String,Object>> getMessages(@PathVariable String roomId, UserPrincipal principal) {
//        Long requesterPk = principal.getId();
//        return inquiryChatService.getMessages(roomId, requesterPk)
//                .stream()
//                .map(m -> Map.of(
//                        "id", m.getId(),
////                        "senderPk", m.getSender().getId(),
//                        "senderNick", m.getSender(),
//                        "content", m.getContent(),
//                        "createdAt", m.getCreatedAt()
//                )).collect(Collectors.toList());
//    }
//
//    // POST /api/inquiry/room/{roomId}/messages  (fallback REST send)
//    @PostMapping("/room/{roomId}/messages")
//    public ResponseEntity<?> postMessage(@PathVariable String roomId, UserPrincipal principal, @RequestBody Map<String,String> body) {
//        Long senderPk = principal.getId();
//        String content = body.get("content");
//        inquiryChatService.postMessage(roomId, senderPk, content);
//        return ResponseEntity.ok().build();
//    }
}
