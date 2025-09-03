package com.study.ssd.dto;

import com.study.ssd.entity.TestEntity;
import lombok.Builder;

@Builder
public class TestResponseDto {
    private Long id;
    private String name;

    public static TestResponseDto fromEntity(TestEntity test) {
        return TestResponseDto.builder()
                .id(test.getId())
                .name(test.getName())
                .build();
    }
}
