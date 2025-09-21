package com.study.ssd.dto.chat;

/**
 * 그룹 채팅방 참가자 Request Dto
 * @param userId 참가자 id (유저 식별키)
 * @param username 참가자 닉네임
 */
public record GroupChatJoinRequest(Long userId, String username) {
}
