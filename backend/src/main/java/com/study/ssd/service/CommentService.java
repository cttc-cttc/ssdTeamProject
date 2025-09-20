package com.study.ssd.service;

import com.study.ssd.dto.studyPost.CommentRequest;
import com.study.ssd.dto.studyPost.CommentResponse;
import com.study.ssd.dto.studyPost.UpdateCommentRequest;
import com.study.ssd.entity.Comment;
import com.study.ssd.entity.StudyPost;
import com.study.ssd.entity.User;
import com.study.ssd.repository.CommentRepository;
import com.study.ssd.repository.StudyPostRepository;
import com.study.ssd.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

        private final CommentRepository commentRepository;
        private final StudyPostRepository postRepository;
        private final UserRepository userRepository;

        // 댓글 생성
        public CommentResponse createComment(CommentRequest request, Long userId) {
            StudyPost post = postRepository.findById(request.getPostId())
                    .orElseThrow(() -> new EntityNotFoundException("게시글 없음"));

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("유저 없음"));

            Comment comment = Comment.builder()
                    .post(post)
                    .userId(user) // 연결 맞는지 봐야 됨
                    .content(request.getContent())
                    .depth(0) // 답글 안 씀 0
                    .build();

            return toResponse(commentRepository.save(comment));
        }

        // 댓글 조회
        @Transactional
        public List<CommentResponse> getCommentsByPost(Long postId) {
            return commentRepository.findByPost_IdOrderByCreatedAtAsc(postId)
                    .stream()
                    .map(this::toResponse)
                    .collect(Collectors.toList());
        }

        // 댓글 수정
        public CommentResponse updateComment(Long commentId, UpdateCommentRequest request, Long userId) {
            Comment comment = commentRepository.findById(commentId)
                    .orElseThrow(() -> new EntityNotFoundException("댓글 없음"));

            // 작성자 본인 확인 (User 연관관계 추가했다고 가정)
            if (!comment.getPost().getId().equals(userId)) {
                throw new IllegalArgumentException("본인 댓글만 수정 가능");
            }

            comment.setContent(request.getContent());
            return toResponse(comment);
        }

        // 댓글 삭제
        public void deleteComment(Long commentId, Long userId) {
            Comment comment = commentRepository.findById(commentId)
                    .orElseThrow(() -> new EntityNotFoundException("댓글 없음"));

            if (!comment.getPost().getId().equals(userId)) {
                throw new IllegalArgumentException("본인 댓글만 삭제 가능");
            }

            commentRepository.delete(comment);
        }

        // Entity → DTO 변환
        private CommentResponse toResponse(Comment comment) {
            return CommentResponse.builder()
                    .id(comment.getId())
                    .postId(comment.getPost().getId())
                    .content(comment.getContent())
                    .userNickname(comment.getUserId().getUserNickname())
                    .createdAt(comment.getCreatedAt())
                    .updatedAt(comment.getUpdatedAt())
                    .build();
        }
}

