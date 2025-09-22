package com.study.ssd.dto;

import com.study.ssd.entity.Notice;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeRequest {

    @NotBlank(message = "공지사항 어쩌고")
    private String title;

    @NotBlank(message = "어쩌고 공지하상")
    private String content;

    // DTO → 엔티티 변환 메서드
    public Notice toEntity() {
        return Notice.builder()
                .title(this.title)
                .content(this.content)
                .build();
    }

    // 기존 엔티티 업데이트 메서드
    public void updateEntity(Notice notice) {
        notice.setTitle(this.title);
        notice.setContent(this.content);
    }
}