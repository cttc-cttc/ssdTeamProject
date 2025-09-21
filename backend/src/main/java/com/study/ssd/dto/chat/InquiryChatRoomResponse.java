package com.study.ssd.dto.chat;

import com.study.ssd.entity.chat.InquiryChatRoom;
import lombok.*;

import java.time.LocalDateTime;

/**
 * JPA의 finaAll을 실행 시
 * 해당 Entity에 Join 처리를 해 놨으면
 * 필요한 값만 반환하는 DTO 생성 필요
 * 없으면 에러 발생
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InquiryChatRoomResponse {
    private String roomId; // 방 id
    private String roomName; // 방 이름
    private Long userPk; // 유저 pk
    private LocalDateTime createdAt; // 방 생성일

    public static InquiryChatRoomResponse fromEntity(InquiryChatRoom entity) {
        return InquiryChatRoomResponse.builder()
                .roomId(entity.getId())
                .roomName(entity.getName())
                .userPk(entity.getUser().getId())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
