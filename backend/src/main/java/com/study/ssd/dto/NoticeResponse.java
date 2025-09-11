package com.study.ssd.dto;

import com.study.ssd.entity.Notice;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class NoticeResponse {
    private final Long id;
    private final String title;
    private final String content;
    private final LocalDateTime createdAt;

    // 엔티티 → DTO 변환 생성자
    public NoticeResponse(Notice notice) {
        this.id = notice.getId();
        this.title = notice.getTitle();
        this.content = notice.getContent();
        this.createdAt = notice.getCreatedAt();
    }
}