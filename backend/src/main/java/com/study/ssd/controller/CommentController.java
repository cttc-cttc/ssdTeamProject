package com.study.ssd.controller;

import com.study.ssd.dto.studyPost.CommentRequest;
import com.study.ssd.dto.studyPost.CommentResponse;
import com.study.ssd.dto.studyPost.UpdateCommentRequest;
import com.study.ssd.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // 댓글 생성
    @PostMapping
    public ResponseEntity<CommentResponse> createComment(
            @RequestBody CommentRequest request,
            @RequestParam Long userId // 실제 구현에서는 JWT/세션으로 대체
    ) {
        return ResponseEntity.ok(commentService.createComment(request, userId));
    }

    // 게시글별 댓글 조회
    @GetMapping("/{postId}")
    public ResponseEntity<List<CommentResponse>> getComment(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPost(postId));
    }

    // 댓글 수정
    @PutMapping("/{commentId}")
    public ResponseEntity<CommentResponse> updateComment(
            @PathVariable Long commentId,
            @RequestParam Long userId,
            @RequestBody UpdateCommentRequest request
    ) {
        return ResponseEntity.ok(commentService.updateComment(commentId, request, userId));
    }

    // 댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long commentId,
            @RequestParam Long userId
    ) {
        commentService.deleteComment(commentId, userId);
        return ResponseEntity.noContent().build();
    }
}
