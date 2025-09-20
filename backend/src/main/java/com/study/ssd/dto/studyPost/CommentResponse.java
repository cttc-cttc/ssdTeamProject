package com.study.ssd.dto.studyPost;

import com.study.ssd.entity.Comment;
import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponse {
    private Long id;
    private Long postId;
    private String userNickname;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
