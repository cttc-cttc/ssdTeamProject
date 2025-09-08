package com.study.ssd.service;

import com.study.ssd.dto.StudyPostRequest;
import com.study.ssd.dto.StudyPostResponse;
import com.study.ssd.entity.StudyPost;
import com.study.ssd.repository.StudyPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
                .updated(saved.getUpdatedAt())
                .currentCont(saved.getCurrentCont())
                .maxCount(saved.getMaxCount())
                .wishCount(saved.getWishCount())
                .build();
    }
}
