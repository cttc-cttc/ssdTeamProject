package com.study.ssd.service.chat;

import com.study.ssd.dto.chat.*;
import com.study.ssd.entity.StudyPost;
import com.study.ssd.entity.chat.ChatMessage;
import com.study.ssd.entity.chat.ChatRoom;
import com.study.ssd.entity.chat.ChatRoomParticipant;
import com.study.ssd.entity.chat.MessageType;
import com.study.ssd.repository.StudyPostRepository;
import com.study.ssd.repository.chat.ChatMessageRepository;
import com.study.ssd.repository.chat.ChatRoomParticipantRepository;
import com.study.ssd.repository.chat.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final StudyPostRepository studyPostRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomParticipantRepository participantRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final SimpMessageSendingOperations messagingTemplate;

    /**
     * 존재하는 채팅방인지 확인, 있으면 채팅방 정보 반환
     * @param postId 연결된 게시글 id
     * @return ChatRoomCheckResponse 채팅방 정보 Response Dto
     */
    public ChatRoomCheckResponse checkRoom(Long postId) {
        return chatRoomRepository.findByStudyPostId(postId)
                .map(ChatRoomCheckResponse::fromEntity)
                .orElse(ChatRoomCheckResponse.notExists());
    }

    /**
     * 채팅방 생성
     * @param request 채팅방 생성 정보가 담긴 Request Dto
     * @return ChatRoom 생성된 채팅방
     */
    public ChatRoom createRoom(CreateRoomRequest request) {
        StudyPost post = studyPostRepository.findById(request.postId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        ChatRoom room = new ChatRoom();
        room.setName(request.roomName());
        room.setStudyPost(post);
        ChatRoom savedRoom = chatRoomRepository.save(room);

        // 개설자 자동 참여
        ChatRoomParticipant participant = new ChatRoomParticipant();
        participant.setRoom(savedRoom);
        participant.setUserId(request.creatorId());
        participantRepository.save(participant);

        // 스터디 시작 안내 메시지 발송
        ChatMessage startMessage = new ChatMessage();
        startMessage.setRoom(savedRoom);
        startMessage.setSender("NOTICE");
        startMessage.setMessageType(MessageType.SYSTEM);
        startMessage.setContent("스터디가 시작 되었습니다. 🎉🎉\n팀원들과 소통하며 본격적으로 스터디를 진행해 보세요!");
        chatMessageRepository.save(startMessage);

        // 채팅방 구독 주소: "/sub/groupChat/{roomId}"
        messagingTemplate.convertAndSend("/sub/groupChat/" + savedRoom.getId(), startMessage);

        // 입장 메시지 발송
        ChatMessage joinMessage = new ChatMessage();
        joinMessage.setRoom(savedRoom);
        joinMessage.setSender("SYSTEM");
        joinMessage.setMessageType(MessageType.JOIN);
        joinMessage.setContent(request.creatorName() + "님이 입장했습니다.");
        chatMessageRepository.save(joinMessage);

        // 채팅방 구독 주소: "/sub/groupChat/{roomId}"
        messagingTemplate.convertAndSend("/sub/groupChat/" + savedRoom.getId(), joinMessage);

        return savedRoom;
    }

    /**
     * 채팅방 정보 확인
     * @param roomId 채팅방 id
     * @return ChatRoomInfoResponse 채팅방 정보 Response Dto
     */
    public ChatRoomInfoResponse getRoomInfo(String roomId) {
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        int currentCount = participantRepository.countByRoomId(roomId);
        int maxCount = room.getStudyPost().getMaxCount() + 1; // 개설자 본인 추가

        return new ChatRoomInfoResponse(
                roomId,
                room.getName(),
                currentCount,
                maxCount
        );
    }

    /**
     * 채팅방 입장 처리
     * @param roomId 채팅방 id
     * @param request 채팅방 참가자 Request Dto
     */
    @Transactional
    public void joinRoom(String roomId, GroupChatJoinRequest request) {
        Long userId = request.userId();
        String username = request.username();

        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // 참여자 등록 (중복 체크)
        try {
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

            // 채팅방 구독 주소: "/sub/groupChat/{roomId}"
            // STOMP 구독자에게 실시간 전송
            messagingTemplate.convertAndSend("/sub/groupChat/" + roomId, joinMessage);

        } catch (DataIntegrityViolationException e) {
            // 이미 존재하면 무시 (중복 입장 방지)
            // 필요하면 로그 남기기
            log.info("이미 입장한 사용자: roomId={}, userId={}", roomId, userId);
        }
    }

    /**
     * 그룹 채팅 메시지 전송
     * @param roomId 채팅방 id
     * @param requestMessage 채팅 메시지 전송 Request Dto
     */
    public void sendMessage(String roomId, ChatMessageRequest requestMessage) {
        // roomId로 ChatRoom 조회
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // ChatMessage 엔티티 생성
        ChatMessage entity = ChatMessage.builder()
                .room(room)
                .sender(requestMessage.sender())
                .content(requestMessage.content())
                .build();

        // DB 저장
        chatMessageRepository.save(entity);

        // 채팅방 구독 주소: "/sub/groupChat/{roomId}"
        // WebSocket 구독자에게 전달
        messagingTemplate.convertAndSend("/sub/groupChat/" + roomId, requestMessage);
    }

    /**
     * 채팅방 메시지 조회
     * @param roomId 채팅방 id
     * @return List<ChatMessageResponse> 채팅방에 작성된 모든 메시지
     */
    public List<ChatMessageResponse> getMessages(String roomId) {
        return chatMessageRepository.findByRoomIdOrderByCreatedAtAsc(roomId)
                .stream()
                .map(ChatMessageResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
