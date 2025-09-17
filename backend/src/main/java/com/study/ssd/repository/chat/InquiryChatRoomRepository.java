package com.study.ssd.repository.chat;

import com.study.ssd.entity.chat.InquiryChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InquiryChatRoomRepository extends JpaRepository<InquiryChatRoom, String> {
    Optional<InquiryChatRoom> findByUserId(Long userPk);
}
