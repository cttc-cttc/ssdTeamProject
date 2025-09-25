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
    /**
     * Repository 메소드와 상관없이, DTO 변환 과정(fromEntity)에서 comments.size() 같은 접근을 하고 있다면
     * 카테고리/검색 조회에서도 댓글 갯수가 "알아서" 들어가게 됩니다.
     * .size() 를 호출하면 Hibernate 가 SELECT COUNT(*) FROM comment WHERE post_id = ? 쿼리를 따로 실행해서 채웁니다.
     */
    @Builder.Default
    private long commentCount = 0;

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
                .commentCount(entity.getComments() != null ? (long) entity.getComments().size() : 0)
                .build();
    }
}
