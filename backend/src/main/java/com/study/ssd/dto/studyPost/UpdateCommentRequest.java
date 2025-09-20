package com.study.ssd.dto.studyPost;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UpdateCommentRequest {
    @NotBlank
    private String content;
}
