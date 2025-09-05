package com.study.ssd.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyPostResponse {
    private Long id;
    private String title;
    private String content;
    private String category;
    private LocalDateTime deadline;
    private LocalDateTime created;
    private LocalDateTime updated;
    private int currentCont = 0;
    private int maxCount = 0;
    private int wishCount = 0;
}
