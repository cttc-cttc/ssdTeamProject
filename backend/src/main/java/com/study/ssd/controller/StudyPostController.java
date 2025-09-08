package com.study.ssd.controller;

import com.study.ssd.dto.StudyPostRequest;
import com.study.ssd.dto.StudyPostResponse;
import com.study.ssd.service.StudyPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/posting")
@RequiredArgsConstructor
public class StudyPostController {

    private  final StudyPostService  studyPostService;

    @PostMapping
    public ResponseEntity<StudyPostResponse> createPost (
            @RequestBody StudyPostRequest studyPostRequest
    ) {
        StudyPostResponse studyPostResponse = studyPostService.createPost(studyPostRequest);
        return ResponseEntity.ok(studyPostResponse);
    }
}
