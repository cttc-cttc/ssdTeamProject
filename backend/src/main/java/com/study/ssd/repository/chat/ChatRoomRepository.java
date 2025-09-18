package com.study.ssd.repository.chat;

import com.study.ssd.entity.chat.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {
    Optional<ChatRoom> findByStudyPostId(Long postId);
}
