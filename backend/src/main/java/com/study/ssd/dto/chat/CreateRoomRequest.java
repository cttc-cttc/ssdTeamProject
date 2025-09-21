package com.study.ssd.dto.chat;

/**
 * 채팅방 생성 정보가 담긴 Request Dto
 * @param roomName 새로운 방의 이름
 * @param postId 연결된 스터디 게시글 (게시글 식별키)
 * @param creatorId 채팅방 개설자 id (유저 식별키)
 * @param creatorName 채팅방 개설자 닉네임
 */
public record CreateRoomRequest(
        String roomName,
        Long postId,
        Long creatorId,
        String creatorName
) {
}
