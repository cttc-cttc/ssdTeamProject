package com.study.ssd.controller;

import com.study.ssd.dto.studyPost.StudyPostResponse;
import com.study.ssd.service.WishStudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wish")
@RequiredArgsConstructor
public class WishStudyController {

    private final WishStudyService wishStudyService;

    @PostMapping
    public ResponseEntity<?> addWish (@RequestParam Long userId, @RequestParam Long postId) {
        wishStudyService.addWish(userId, postId);
        return ResponseEntity.ok(Map.of("message", "Wish Added Successfully"));
    }

    @DeleteMapping
    public ResponseEntity<?> cancelWish (@RequestParam Long userId, @RequestParam Long postId) {
        wishStudyService.cancelWish(userId, postId);
        return ResponseEntity.ok(Map.of("message", "Wish Deleted Successfully"));
    }

    @GetMapping("/check")
    public ResponseEntity<?> getWishCheck (@RequestParam Long userId,  @RequestParam Long postId) {
        boolean isWished = wishStudyService.isWished(userId, postId);
        return ResponseEntity.ok(Map.of("isWished", isWished));
    }

    @GetMapping("/list")
    public ResponseEntity<List<StudyPostResponse>> getWishStudy (@RequestParam Long userId) {
        return ResponseEntity.ok(wishStudyService.getWishStudyByUserId(userId));
    }
}
