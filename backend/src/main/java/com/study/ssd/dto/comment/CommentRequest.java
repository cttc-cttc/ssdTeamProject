package com.study.ssd.dto.comment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class CommentRequest {

    @NotNull
    private Long postId;

    @NotBlank
    private String userNickname;

    @NotBlank(message = "댓글을 입력하세요.")
    private String content;
}
