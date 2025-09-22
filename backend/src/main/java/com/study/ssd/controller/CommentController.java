package com.study.ssd.controller;

import com.study.ssd.dto.comment.CommentRequest;
import com.study.ssd.dto.comment.CommentResponse;
import com.study.ssd.dto.comment.UpdateCommentRequest;
import com.study.ssd.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts/{postId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentResponse> createComment(
            @PathVariable Long postId,
            @RequestBody CommentRequest commentRequest) {

        commentRequest.setPostId(postId);
        return  ResponseEntity.ok(commentService.createComment(commentRequest));
    }

    @GetMapping
    public ResponseEntity<List<CommentResponse>> getComment(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getComment(postId));
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<CommentResponse> updateComment(
            @PathVariable Long postId,
            @PathVariable Long commentId,
            @RequestBody UpdateCommentRequest updateCommentRequest
    ) {
        return ResponseEntity.ok(commentService.updateComment(commentId, updateCommentRequest));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long postId,
            @PathVariable Long commentId
    ) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
