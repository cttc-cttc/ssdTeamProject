package com.study.ssd.service.chat;

import com.study.ssd.dto.chat.InquiryMessageRequestDto;
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
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InquiryChatService {
    private final InquiryChatRoomRepository inquiryChatRoomRepository;
    private final InquiryChatMessageRepository inquiryChatMessageRepository;
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
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

    // 메시지 작성
    public void writeMessage(String roomId, InquiryMessageRequestDto messageDto) {
        InquiryChatRoom room = inquiryChatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 방"));

        InquiryChatMessage entity = InquiryChatMessage.builder()
                .room(room)
                .sender(messageDto.getSender())
                .content(messageDto.getContent())
                .build();
        inquiryChatMessageRepository.save(entity);

        // 해당 방 구독자에게 메시지 발행
        messagingTemplate.convertAndSend("/sub/inquiry/" + roomId, messageDto);
    }

}
