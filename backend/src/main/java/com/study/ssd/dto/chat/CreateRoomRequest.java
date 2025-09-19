package com.study.ssd.dto.chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateRoomRequest {
    private String roomName; // 새로운 방의 이름
    private Long postId; // 게시글 식별키
    private Long creatorId; // 개설자 id (유저 식별키)
    private String creatorName; // 개설자 닉네임
}
