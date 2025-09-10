package com.study.ssd.controller;

import com.study.ssd.dto.StudyPostRequest;
import com.study.ssd.dto.StudyPostResponse;
import com.study.ssd.service.StudyPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class StudyPostController {

    private final StudyPostService studyPostService;

    @PostMapping("/create-post")
    public ResponseEntity<StudyPostResponse> createPost (
            @RequestBody StudyPostRequest studyPostRequest
    ) {
        StudyPostResponse studyPostResponse = studyPostService.createPost(studyPostRequest);
        return ResponseEntity.ok(studyPostResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudyPostResponse> getPost ( @PathVariable Long id) {
        StudyPostResponse studyPostResponse = studyPostService.getPost(id);
        return ResponseEntity.ok(studyPostResponse);
    }
}
