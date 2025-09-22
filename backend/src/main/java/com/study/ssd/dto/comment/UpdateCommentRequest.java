package com.study.ssd.dto.comment;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UpdateCommentRequest {

    @NotBlank(message = "댓글을 입력하세요.")
    private String content;
}
