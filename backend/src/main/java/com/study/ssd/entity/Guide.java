package com.study.ssd.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "guides")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Guide {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 어떤 가이드인지 구분 (게시판작성 / 스터디카페)
    @Column(nullable = false, unique = true)
    private String type; // e.g. "BOARD" or "CAFE"

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content; // 설명 텍스트

    private String imageUrl; // 게시판 작성방법은 이미지 경로 저장
}
