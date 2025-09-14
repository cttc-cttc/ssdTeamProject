package com.study.ssd.dto;

import java.time.LocalDateTime;
import java.util.List;

public class UpdateStudyPostRequest {
    private String title;
    private String content;
    private String mainCategory;
    private List<String> subCategories;
    private int maxCount;

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

}
