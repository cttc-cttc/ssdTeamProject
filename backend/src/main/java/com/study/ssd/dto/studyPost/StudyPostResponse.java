package com.study.ssd.dto.studyPost;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.study.ssd.entity.StudyPost;
import com.study.ssd.entity.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyPostResponse {
    private Long id;
    private Long userPkId;
    private String userNickname;
    private String title;
    private String content;
    private String mainCategory;
    private List<String> subCategories;
    private LocalDateTime deadline;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    // @Builder 사용 시 초기값을 지정할 경우 @Builder.Default 선언 필요
    @Builder.Default private int currentCount = 0;
    @Builder.Default private int maxCount = 0;
    @Builder.Default private int wishCount = 0;
    @JsonProperty("isEnded")
    @Builder.Default
    private boolean isEnded = false;

    // StudyPost -> StudyPostResponse 변환
    public static StudyPostResponse fromEntity(StudyPost entity) {
        return StudyPostResponse.builder()
                .id(entity.getId())
                .userPkId(entity.getUserId())
                .userNickname(entity.getUserNickname())
                .title(entity.getTitle())
                .content(entity.getContent())
                .mainCategory(entity.getMainCategory())
                .subCategories(entity.getSubCategories())
                .deadline(entity.getDeadline())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .currentCount(entity.getCurrentCount())
                .maxCount(entity.getMaxCount())
                .wishCount(entity.getWishCount())
                .isEnded(entity.isEnded())
                .build();
    }
}
