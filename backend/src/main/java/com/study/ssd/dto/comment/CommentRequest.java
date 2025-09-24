package com.study.ssd.dto.comment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CommentRequest {

    @NotNull
    private Long postId;

    @NotNull
    private Long userPkId;

    @NotBlank
    private String userNickname;

    @NotBlank(message = "댓글을 입력하세요.")
    private String content;
}
