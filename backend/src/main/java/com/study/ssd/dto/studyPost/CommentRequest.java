package com.study.ssd.dto.studyPost;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CommentRequest {

    private Long postId;

    @NotBlank (message = "댓글을 입력하세요.")
    private  String content;
}
