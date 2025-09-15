package com.study.ssd.dto.studyPost;

public class DeleteStudyPostResponse {
    private boolean success;
    private String message;

    public DeleteStudyPostResponse() {}

    public DeleteStudyPostResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() {return success;}
    public void setSuccess(boolean success) {this.success = success;}

    public String getMessage() {return message;}
    public void setMessage(String message) {this.message = message;}
}
