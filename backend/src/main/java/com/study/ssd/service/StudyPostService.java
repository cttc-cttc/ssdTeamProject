package com.study.ssd.service;

import com.study.ssd.dto.StudyPostRequest;
import com.study.ssd.dto.StudyPostResponse;
import com.study.ssd.entity.StudyPost;
import com.study.ssd.repository.StudyPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class StudyPostService {

    private final StudyPostRepository studyPostRepository;

    @Transactional
    public StudyPostResponse createPost (StudyPostRequest studyPostRequest) {
        StudyPost studyPost = StudyPost.builder()
                .title(studyPostRequest.getTitle())
                .content(studyPostRequest.getContent())
                .category(studyPostRequest.getMainCategory())
                .maxCount(studyPostRequest.getMaxCount())
                .currentCont(0)
                .deadline(LocalDateTime.now().plusDays(30))
                .build();

        StudyPost saved = studyPostRepository.save(studyPost);

        return StudyPostResponse.builder()
                .id(saved.getId())
                .title(saved.getTitle())
                .content(saved.getContent())
                .category(saved.getCategory())
                .deadline(saved.getDeadline())
                .created(saved.getCreatedAt())
                .updated(saved.getUpdatedAt())
                .currentCont(saved.getCurrentCont())
                .maxCount(saved.getMaxCount())
                .wishCount(saved.getWishCount())
                .build();
    }

    public StudyPostResponse getPost(Long id) {
        StudyPost post = studyPostRepository.findById(id)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다."));

        // 여기에 마감일 넣는지?
        return StudyPostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .category(post.getCategory())
                .deadline(post.getDeadline())
                .created(post.getCreatedAt())
                .updated(post.getUpdatedAt())
                .currentCont(post.getCurrentCont())
                .maxCount(post.getMaxCount())
                .wishCount(post.getWishCount())
                .build();
    }
}
