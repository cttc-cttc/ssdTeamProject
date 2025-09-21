package com.study.ssd.dto.chat;

/**
 * 채팅방 정보 Response Dto
 * @param roomId 채팅방 id
 * @param roomName 채팅방 이름
 * @param currentCount 채팅방 현재 참여자 수
 * @param maxCount 채팅방 최대 참여자 수
 */
public record ChatRoomInfoResponse(
        String roomId,
        String roomName,
        int currentCount,
        int maxCount
) {
}
