package com.study.ssd.dto;

import com.study.ssd.entity.StudyPost;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyPostResponse {
    private Long id;
    private String title;
    private String content;
    private String mainCategory;
    private List<String> subCategories;
    private LocalDateTime deadline;
    private LocalDateTime created;
    private LocalDateTime updated;
    // 초기값을 지정할 경우 @Builder.Default 선언 필요 아하!
    @Builder.Default private int currentCont = 0;
    @Builder.Default private int maxCount = 0;
    @Builder.Default private int wishCount = 0;

    // StudyPost -> StudyPostResponse 변환
    public static StudyPostResponse fromEntity(StudyPost entity) {
        return StudyPostResponse.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .mainCategory(entity.getMainCategory())
                .subCategories(entity.getSubCategories())
                .deadline(entity.getDeadline())
                .created(entity.getCreatedAt())
                .updated(entity.getUpdatedAt())
                .currentCont(entity.getCurrentCont())
                .maxCount(entity.getMaxCount())
                .wishCount(entity.getWishCount())
                .build();
    }
}
