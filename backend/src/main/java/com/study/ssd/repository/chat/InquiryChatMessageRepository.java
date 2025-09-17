package com.study.ssd.repository.chat;

import com.study.ssd.entity.chat.InquiryChatMessage;
import com.study.ssd.entity.chat.InquiryChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InquiryChatMessageRepository extends JpaRepository<InquiryChatMessage, Long>  {
    List<InquiryChatMessage> findByRoomOrderByCreatedAtAsc(InquiryChatRoom room);
}
