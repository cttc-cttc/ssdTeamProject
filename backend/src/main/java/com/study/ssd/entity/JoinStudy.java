package com.study.ssd.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "join_study")
@Data @Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JoinStudy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private StudyPost post;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
