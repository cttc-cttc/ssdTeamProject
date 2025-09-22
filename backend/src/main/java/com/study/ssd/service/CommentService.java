package com.study.ssd.service;

import com.study.ssd.dto.comment.CommentRequest;
import com.study.ssd.dto.comment.CommentResponse;
import com.study.ssd.dto.comment.UpdateCommentRequest;
import com.study.ssd.dto.comment.UpdateCommentResponse;
import com.study.ssd.entity.Comment;
import com.study.ssd.entity.StudyPost;
import com.study.ssd.repository.CommentRepository;
import com.study.ssd.repository.StudyPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final StudyPostRepository studyPostRepository;

    public CommentResponse createComment(CommentRequest commentRequest) {
        StudyPost post = studyPostRepository.findById(commentRequest.getPostId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다."));

        Comment comment = Comment.builder()
                .post(post)
                .userNickname(commentRequest.getUserNickname())
                .content(commentRequest.getContent())
                .depth(0)
                .build();

        return CommentResponse.fromEntity(commentRepository.save(comment));
    }

    public List<CommentResponse> getComment(Long postId) {
        return commentRepository.findByPostIdOrderByCreatedAtAsc(postId)
                .stream()
                .map(CommentResponse::fromEntity)
                .toList();
    }

    public CommentResponse updateComment(Long id, UpdateCommentRequest updateCommentRequest) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("댓글이 존재하지 않습니다."));

        comment.setContent(updateCommentRequest.getContent());
        Comment save = commentRepository.save(comment);

        return CommentResponse.fromEntity(save);
    }

    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("댓글이 존재하지 않습니다."));

        commentRepository.deleteById(comment.getId());
    }

}
