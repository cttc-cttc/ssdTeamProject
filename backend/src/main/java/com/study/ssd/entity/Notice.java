package com.study.ssd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity // JPA 엔티티로 지정
@Table(name = "notices") // DB 테이블명
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가 ID
    private Long id;

    @Column(nullable = false, length = 200)
    private String title; // 공지 제목

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content; // 공지 내용

    @Column(nullable = false)
    private LocalDateTime createdAt; // 작성일시

    @Column
    private LocalDateTime updatedAt; // 수정일시

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
