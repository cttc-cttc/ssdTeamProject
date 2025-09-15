package com.study.ssd.dto.studyPost;

import java.time.LocalDateTime;
import java.util.List;

public class UpdateStudyPostResponse {
    private Long id;
    private String title;
    private String content;
    private String mainCategory;
    private List<String> subCategories;
    private int maxCount;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getTitle() {return title;}
    public void setTitle(String title) {this.title = title;}

    public String getContent() {return content;}
    public void setContent(String content) {this.content = content;}

    public String getMainCategory() {return mainCategory;}
    public void setMainCategory(String mainCategory) {this.mainCategory = mainCategory;}

    public List<String> getSubCategories() {return subCategories;}
    public void setSubCategories(List<String> subCategories) {this.subCategories = subCategories;}

    public int getMaxCount() {return maxCount;}
    public void setMaxCount(int maxCount) {this.maxCount = maxCount;}

    public LocalDateTime getCreatedAt() {return createdAt;}
    public void setCreatedAt(LocalDateTime createdAt) {this.createdAt = createdAt;}

    public LocalDateTime getUpdateAt() {return updateAt;}
    public void setUpdateAt(LocalDateTime updateAt) {this.updateAt = updateAt;}
}
