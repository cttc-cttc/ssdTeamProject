package com.study.ssd.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.List;

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

    @Column(name = "main_category", length = 20, nullable = false)
    private String mainCategory;

    @ElementCollection
    @CollectionTable(name = "study_post_subcategories", joinColumns = @JoinColumn(name = "post_id"))
    @Column(name = "sub_category", length = 20)
    @Size(max = 3, message = "최대 3개까지 가능합니다.")
    private List<@Size(max = 20, message = "최대 20자까지 입력 가능합니다.") String> subCategories;

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
