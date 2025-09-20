package com.study.ssd.entity.chat;

public enum MessageType {
    TEXT, // 일반 메시지
    JOIN, // 첫 입장 시 SYSTEM 메시지
    SYSTEM // 스터디 시작이나 종료 시 안내 문구를 표시할 SYSTEM 메시지
}
