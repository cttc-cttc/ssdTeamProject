package com.study.ssd.service;

import com.study.ssd.dto.StudyPostRequest;
import com.study.ssd.dto.StudyPostResponse;
import com.study.ssd.entity.StudyPost;
import com.study.ssd.entity.User;
import com.study.ssd.repository.StudyPostRepository;
import com.study.ssd.repository.UserRepository;
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
    private final UserRepository userRepository;

    @Transactional
    public StudyPostResponse createPost (StudyPostRequest studyPostRequest) {

        if (studyPostRequest.getSubCategories() != null && studyPostRequest.getSubCategories().size() > 3) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "최대 3개까지 가능합니다.");
        }

        StudyPost studyPost = StudyPost.builder()
                .userNickname(studyPostRequest.getUserNickname())
                .title(studyPostRequest.getTitle())
                .content(studyPostRequest.getContent())
                .mainCategory(studyPostRequest.getMainCategory())
                .subCategories(studyPostRequest.getSubCategories())
                .maxCount(studyPostRequest.getMaxCount())
                .currentCount(0)
                .build();

        StudyPost saved = studyPostRepository.save(studyPost);

        return StudyPostResponse.fromEntity(saved);
    }

    public StudyPostResponse getPost(Long id) {
        StudyPost post = studyPostRepository.findById(id)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다."));

        return StudyPostResponse.fromEntity(post);
    }

    @Transactional
    public StudyPostResponse addWish(Long id) {
        StudyPost post = studyPostRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        post.setWishCount(post.getWishCount() + 1);
        return StudyPostResponse.fromEntity(post);
    }

    @Transactional
    public StudyPostResponse joinStudy(Long id) {
        StudyPost post = studyPostRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (post.getCurrentCount() >= post.getMaxCount()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        post.setCurrentCount(post.getCurrentCount() + 1);
        return StudyPostResponse.fromEntity(post);
    }
}
