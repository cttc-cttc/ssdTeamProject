package com.study.ssd.controller;

import com.study.ssd.dto.studyPost.StudyPostResponse;
import com.study.ssd.service.JoinStudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/join")
@RequiredArgsConstructor
public class JoinStudyController {

    private final JoinStudyService joinStudyService;

    @PostMapping
    public ResponseEntity<?> join (@RequestParam Long userId, @RequestParam Long postId) {
        joinStudyService.join(userId, postId);
        return ResponseEntity.ok(Map.of("message", "스터디 참여 완료"));
    }

    @DeleteMapping
    public ResponseEntity<?> leaveStudy (@RequestParam Long userId, @RequestParam Long postId) {
        joinStudyService.leaveStudy(userId, postId);
        return ResponseEntity.ok(Map.of("message", "스터디 탈퇴 완료"));
    }

    @GetMapping("/check")
    public ResponseEntity<?> getJoinCheck (@RequestParam Long userId, @RequestParam Long postId) {
        boolean isJoined = joinStudyService.isJoined(userId, postId);
        return ResponseEntity.ok(Map.of("isJoined", isJoined));
    }

    @GetMapping("/list")
    public ResponseEntity<List<StudyPostResponse>> getJoinStudy (@RequestParam Long userId) {
        return ResponseEntity.ok(joinStudyService.getJoinStudyByUserId(userId));
    }
}
