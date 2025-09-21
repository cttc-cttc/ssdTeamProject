package com.study.ssd.service.chat;

import com.study.ssd.dto.chat.InquiryChatRoomResponse;
import com.study.ssd.dto.chat.InquiryMessageRequest;
import com.study.ssd.dto.chat.InquiryMessageResponse;
import com.study.ssd.entity.Admin;
import com.study.ssd.entity.User;
import com.study.ssd.entity.chat.InquiryChatMessage;
import com.study.ssd.entity.chat.InquiryChatRoom;
import com.study.ssd.repository.AdminRepository;
import com.study.ssd.repository.UserRepository;
import com.study.ssd.repository.chat.InquiryChatMessageRepository;
import com.study.ssd.repository.chat.InquiryChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InquiryChatService {

    private final InquiryChatRoomRepository inquiryChatRoomRepository;
    private final InquiryChatMessageRepository inquiryChatMessageRepository;
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final SimpMessageSendingOperations messagingTemplate;

    /**
     * 현재 로그인 유저의 문의 채팅방 반환(없으면 생성)
     * @param userPk 로그인 유저 id (유저 식별키)
     * @return InquiryChatRoom 문의하기 채팅방
     */
    @Transactional
    public InquiryChatRoom getOrCreateRoomForUser(Long userPk) {
        // 1. 이미 방이 있는지 확인, 있으면 기존 방을 반환하고 종료
        Optional<InquiryChatRoom> existingRoom = inquiryChatRoomRepository.findByUserId(userPk);
        if (existingRoom.isPresent()) {
            return existingRoom.get();
        }

        // 2. 없으면 채팅방 새로 생성
        User user = userRepository.findById(userPk)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

        // 관리자 계정 PK 고정값 (예: 1L) — 실제로는 설정(property)으로 관리 필요
        // 현재 db에 등록된 임시 관리자 Admin(임시)의 pk는 11번
        Long ADMIN_PK = 1L;
        Admin admin = adminRepository.findById(ADMIN_PK)
                .orElseThrow(() -> new IllegalArgumentException("관리자를 찾을 수 없습니다."));

        InquiryChatRoom newRoom = InquiryChatRoom.builder()
                .user(user)           // User 객체 직접 할당
                .admin(admin)         // 관리자 Admin 객체
                .name(user.getUserNickname() + "님의 문의방")
                .build();

        return inquiryChatRoomRepository.save(newRoom);
    }

    /**
     * 채팅방 메시지 불러오기
     * @param roomId 채팅방 id
     * @return List<InquiryMessageResponse> 채팅방에 작성된 모든 메시지
     */
    public List<InquiryMessageResponse> getMessages(String roomId) {
        return inquiryChatMessageRepository.findByRoomIdOrderByCreatedAtAsc(roomId)
                .stream()
                .map(InquiryMessageResponse::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * 관리자가 보는 경우 채팅방 목록 불러오기
     * @return List<InquiryChatRoomResponse> 채팅방 리스트
     */
    public List<InquiryChatRoomResponse> getRooms() {
        return inquiryChatRoomRepository.findAll()
                .stream()
                .map(InquiryChatRoomResponse::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * 문의하기 채팅 메시지 전송
     * @param roomId 채팅방 id
     * @param requestMessage 문의하기 채팅 메시지 전송 Request Dto
     */
    public void sendMessage(String roomId, InquiryMessageRequest requestMessage) {
        InquiryChatRoom room = inquiryChatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 방"));

        InquiryChatMessage entity = InquiryChatMessage.builder()
                .room(room)
                .sender(requestMessage.sender())
                .content(requestMessage.content())
                .build();
        inquiryChatMessageRepository.save(entity);

        // 채팅방 구독 주소: "/sub/inquiry/{roomId}"
        // 해당 방 구독자에게 메시지 발행
        messagingTemplate.convertAndSend("/sub/inquiry/" + roomId, requestMessage);
    }
}
