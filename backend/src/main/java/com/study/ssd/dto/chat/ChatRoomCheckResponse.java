package com.study.ssd.dto.chat;

import com.study.ssd.entity.chat.ChatRoom;

/**
 * 채팅방 정보 Response Dto
 * 존재하는 채팅방인지 확인, 있으면 채팅방 정보 반환
 * @param exists 없으면 false, 있으면 true
 * @param roomId 있으면 roomId
 * @param roomName 있으면 roomName
 */
public record ChatRoomCheckResponse(
        boolean exists,
        String roomId,
        String roomName
) {
    public static ChatRoomCheckResponse notExists() {
        return new ChatRoomCheckResponse(false, null, null);
    }

    public static ChatRoomCheckResponse fromEntity(ChatRoom room) {
        return new ChatRoomCheckResponse(true, room.getId(), room.getName());
    }
}
