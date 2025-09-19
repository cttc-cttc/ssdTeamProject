package com.study.ssd.controller.chat;

import com.study.ssd.dto.chat.ChatMessageResponseDto;
import com.study.ssd.dto.chat.CreateRoomRequest;
import com.study.ssd.dto.chat.JoinRequest;
import com.study.ssd.entity.chat.MessageType;
import com.study.ssd.entity.StudyPost;
import com.study.ssd.entity.chat.ChatMessage;
import com.study.ssd.entity.chat.ChatRoom;
import com.study.ssd.entity.chat.ChatRoomParticipant;
import com.study.ssd.repository.StudyPostRepository;
import com.study.ssd.repository.chat.ChatMessageRepository;
import com.study.ssd.repository.chat.ChatRoomParticipantRepository;
import com.study.ssd.repository.chat.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final StudyPostRepository studyPostRepository;
    private final ChatRoomParticipantRepository participantRepository;
    private final SimpMessageSendingOperations messagingTemplate;

    // 존재하는 채팅방인지 확인, 있으면 채팅방 정보 반환
    @GetMapping("/checkRoom")
    public ResponseEntity<?> checkRoom(@RequestParam Long postId) {
        return chatRoomRepository.findByStudyPostId(postId)
                .map(room -> ResponseEntity.ok(Map.of(
                        "exists", true,
                        "roomId", room.getId(),
                        "roomName", room.getName()
                )))
                .orElse(ResponseEntity.ok(Map.of("exists", false)));
    }

    // 채팅방 생성
    @PostMapping("/rooms")
    public ChatRoom createRoom(@RequestBody CreateRoomRequest request) {
        StudyPost post = studyPostRepository.findById(request.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다: " + request.getPostId()));

        ChatRoom room = new ChatRoom();
        room.setName(request.getRoomName());
        room.setStudyPost(post);
        ChatRoom savedRoom = chatRoomRepository.save(room);

        // 개설자 자동 참여
        ChatRoomParticipant participant = new ChatRoomParticipant();
        participant.setRoom(savedRoom);
        participant.setUserId(request.getCreatorId());
        participantRepository.save(participant);

        // 입장 메시지 발송
        ChatMessage joinMessage = new ChatMessage();
        joinMessage.setRoom(savedRoom);
        joinMessage.setSender("SYSTEM");
        joinMessage.setMessageType(MessageType.JOIN);
        joinMessage.setContent(request.getCreatorName() + "님이 입장했습니다.");
        chatMessageRepository.save(joinMessage);

        messagingTemplate.convertAndSend("/sub/groupChat/" + savedRoom.getId(), joinMessage);

        return savedRoom;
    }

    // 채팅방 정보 확인
    @GetMapping("/rooms/{roomId}/info")
    public Map<String, Object> getRoomInfo(@PathVariable String roomId) {
        ChatRoom room = chatRoomRepository.findById(roomId).orElseThrow();
        int currentCount = participantRepository.countByRoomId(roomId);
        int maxCount = room.getStudyPost().getMaxCount() + 1; // 개설자 본인 추가

        return Map.of(
                "roomId", roomId,
                "roomName", room.getName(),
                "currentCount", currentCount,
                "maxCount", maxCount
        );
    }

    // 채팅방 입장 처리
    @PostMapping("/rooms/{roomId}/join")
    public void joinRoom(@PathVariable String roomId,
                         @RequestBody JoinRequest request
    ) {
        Long userId = request.getUserId();
        String username = request.getUsername();

        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("채팅방 없음"));

        // 참여자 등록 (중복 체크)
        boolean alreadyJoined = participantRepository.existsByRoomIdAndUserId(roomId, userId);
        if (!alreadyJoined) {
            ChatRoomParticipant participant = new ChatRoomParticipant();
            participant.setRoom(room);
            participant.setUserId(userId);
            participantRepository.save(participant);

            // 입장 메시지 발송
            ChatMessage joinMessage = new ChatMessage();
            joinMessage.setRoom(room);
            joinMessage.setSender("SYSTEM");
            joinMessage.setMessageType(MessageType.JOIN);
            joinMessage.setContent(username + "님이 입장했습니다.");
            chatMessageRepository.save(joinMessage);

            // STOMP 구독자에게 실시간 전송
            messagingTemplate.convertAndSend("/sub/groupChat" + roomId, joinMessage);
        }
    }

    // 채팅방 메시지 조회
    @GetMapping("/rooms/{roomId}/messages")
    public List<ChatMessageResponseDto> getMessages(@PathVariable String roomId) {
        return chatMessageRepository.findByRoomIdOrderByCreatedAtAsc(roomId)
                .stream()
                .map(ChatMessageResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

}
