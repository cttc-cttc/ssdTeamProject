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

        if (studyPostRequest.getSubCategories() != null && studyPostRequest.getSubCategories().size() > 3) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "최대 3개까지 가능합니다.");
        }

        StudyPost studyPost = StudyPost.builder()
                .title(studyPostRequest.getTitle())
                .content(studyPostRequest.getContent())
                .mainCategory(studyPostRequest.getMainCategory())
                .subCategories(studyPostRequest.getSubCategories())
                .maxCount(studyPostRequest.getMaxCount())
                .currentCont(0)
                .deadline(LocalDateTime.now().plusDays(30))
                .build();

        StudyPost saved = studyPostRepository.save(studyPost);

        return StudyPostResponse.fromEntity(saved);
    }

    public StudyPostResponse getPost(Long id) {
        StudyPost post = studyPostRepository.findById(id)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다."));

        // 여기에 마감일 넣는지?
        return StudyPostResponse.fromEntity(post);
    }
}
