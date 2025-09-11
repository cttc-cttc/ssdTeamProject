package com.study.ssd.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Table(name = "study_post")
@Data @Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private  String title;

    @Column(length = 4000, nullable = false)
    private  String content;

    @Column(length = 20, nullable = false)
    private String category;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime deadline;

    @Builder.Default private int currentCont = 0;
    private int maxCount;

    @Builder.Default private int wishCount = 0;

    @PrePersist
    public void prePersist() {
        if (deadline == null) {
            this.deadline = LocalDateTime.now().plusDays(30);
        }
    }

    public void increaseCurrentCont() {
        if (currentCont < maxCount) {
            this.currentCont++;
        } else {
            throw new IllegalStateException("최대 인원 초과");
        }
    }

    public void decreaseCurrentCont() {
        if (currentCont > 0) {
            this.currentCont--;
        }
    }

    public  void increaseWishCount() {
        this.wishCount++;
    }

    public  void decreaseWishCount() {
        if (wishCount > 0) {
            this.wishCount--;
        }
    }

}
