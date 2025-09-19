package com.study.ssd.repository.chat;

import com.study.ssd.entity.chat.ChatRoomParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomParticipantRepository extends JpaRepository<ChatRoomParticipant, Long> {
    // 특정 채팅방(roomId)에 참여한 사람 수를 반환
    int countByRoomId(String roomId);

    // 특정 유저가 이미 참여했는지 확인
    boolean existsByRoomIdAndUserId(String roomId, Long userId);
}
