package com.study.ssd.dto.studyPost;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class StudyPostRequest {

    @NotNull
    private Long id;

    @NotBlank(message = "제목을 입력하세요.")
    private String title;

    @NotBlank(message = "내용을 입력하세요.")
    private String content;

    @NotBlank(message = "카테고리를 입력하세요.")
    private String mainCategory;
    private List<String> subCategories;

    @NotNull(message = "참여인원을 입력하세요.")
    @Max(value = 50, message = "최대 인원은 50명입니다.")
    private int maxCount;
}
