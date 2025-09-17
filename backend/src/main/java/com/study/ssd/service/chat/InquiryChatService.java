package com.study.ssd.service.chat;

import com.study.ssd.entity.User;
import com.study.ssd.entity.chat.InquiryChatMessage;
import com.study.ssd.entity.chat.InquiryChatRoom;
import com.study.ssd.repository.UserRepository;
import com.study.ssd.repository.chat.InquiryChatMessageRepository;
import com.study.ssd.repository.chat.InquiryChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InquiryChatService {
    private final InquiryChatRoomRepository inquiryChatRoomRepository;
    private final InquiryChatMessageRepository messageRepo;
    private final UserRepository userRepository; // 기존 User repo
    private final SimpMessageSendingOperations messagingTemplate;

    @Transactional
    public InquiryChatRoom getOrCreateRoomForUser(Long userPk) {
        // 1. 이미 방이 있는지 확인
        Optional<InquiryChatRoom> existingRoom = inquiryChatRoomRepository.findByUserId(userPk);
        if (existingRoom.isPresent()) {
            return existingRoom.get();
        }

        // 2. 없으면 새로 생성
        User user = userRepository.findById(userPk)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

        // 관리자 계정 PK 고정값 (예: 11L) — 실제로는 설정(property)으로 관리하세요
        // 현재 db에 등록된 임시 관리자 Admin(임시)의 pk는 11번
        Long ADMIN_PK = 11L;
        User admin = userRepository.findById(ADMIN_PK)
                .orElseThrow(() -> new IllegalArgumentException("관리자를 찾을 수 없습니다."));

        InquiryChatRoom newRoom = InquiryChatRoom.builder()
                .user(user)           // User 객체 직접 할당
                .admin(admin)         // 관리자 User 객체
                .name(user.getUserNickname() + "님의 문의방")
                .build();

        return inquiryChatRoomRepository.save(newRoom);
    }

    public List<InquiryChatMessage> getMessages(String roomId, Long requesterPk) {
        InquiryChatRoom room = inquiryChatRoomRepository.findById(roomId).orElseThrow();
        // 권한 체크: 유저는 자기 방만, admin은 전체 가능 (간단 예)
        if (!room.getUser().getId().equals(requesterPk) && !room.getAdmin().getId().equals(requesterPk)) {
            throw new RuntimeException("권한 없음");
        }
        return messageRepo.findByRoomOrderByCreatedAtAsc(room);
    }

    @Transactional
    public InquiryChatMessage postMessage(String roomId, Long senderPk, String content) {
        InquiryChatRoom room = inquiryChatRoomRepository.findById(roomId).orElseThrow();
        User sender = userRepository.findById(senderPk).orElseThrow();

        InquiryChatMessage msg = new InquiryChatMessage();
        msg.setRoom(room);
        msg.setSender(sender.getUserNickname());
        msg.setContent(content);
        InquiryChatMessage saved = messageRepo.save(msg);

        // WebSocket으로 방 구독자에게 브로드캐스트 (destination 패턴은 클라이언트와 맞춰야 함)
        messagingTemplate.convertAndSend("/sub/inquiry/" + roomId, Map.of(
                "id", saved.getId(),
                "roomId", roomId,
                "senderPk", senderPk,
                "senderNick", sender.getUserNickname(),
                "content", saved.getContent(),
                "createdAt", saved.getCreatedAt().toString()
        ));
        return saved;
    }
}
