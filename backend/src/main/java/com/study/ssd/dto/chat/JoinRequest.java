package com.study.ssd.dto.chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinRequest {
    private Long userId; // 참가자 id (유저 식별키)
    private String username; // 참가자 닉네임
}
