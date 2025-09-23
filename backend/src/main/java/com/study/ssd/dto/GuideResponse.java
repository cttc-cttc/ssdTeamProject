package com.study.ssd.dto;

import com.study.ssd.entity.Guide;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GuideResponse {
    private Long id;
    private String type;
    private String content;
    private String imageUrl;

    // 엔티티 → DTO 변환 생성자
    public GuideResponse(Guide guide) {
        this.id = guide.getId();
        this.type = guide.getType();
        this.content = guide.getContent();
        this.imageUrl = guide.getImageUrl();
    }
}
