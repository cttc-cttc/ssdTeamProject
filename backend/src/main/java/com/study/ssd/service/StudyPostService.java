package com.study.ssd.service;

import com.study.ssd.dto.StudyPostRequest;
import com.study.ssd.dto.StudyPostResponse;
import com.study.ssd.entity.JoinStudy;
import com.study.ssd.entity.StudyPost;
import com.study.ssd.entity.User;
import com.study.ssd.entity.WishStudy;
import com.study.ssd.repository.JoinStudyRepository;
import com.study.ssd.repository.StudyPostRepository;
import com.study.ssd.repository.UserRepository;
import com.study.ssd.repository.WishStudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudyPostService {

    private final StudyPostRepository studyPostRepository;
    private final UserRepository userRepository;
    private final WishStudyRepository wishStudyRepository;
    private final JoinStudyRepository joinStudyRepository;

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
    
    // 조인 스터디 조회
    public List<StudyPostResponse> getJoinStudy(Long userId) {
        List<JoinStudy> joinStudy = joinStudyRepository.findByUserIdWithPost(userId);
        return joinStudy.stream()
                .map(joinStudies -> StudyPostResponse.fromEntity(joinStudies.getPost()))
                .toList();
    }

    // 오픈 스터디 조회
    public List<StudyPostResponse> getOpenStudy(String userNickname) {
        List<StudyPost> studyPosts = studyPostRepository.findByUserNickname(userNickname);
        return studyPosts.stream()
                .map(StudyPostResponse::fromEntity)
                .toList();
    }

    // 위시 스터디 조회
    public List<StudyPostResponse> getWishStudy(Long userId) {
        List<WishStudy> wishStudy = wishStudyRepository.findByUserIdWithPost(userId);
        return wishStudy.stream()
                .map(wishStudies -> StudyPostResponse.fromEntity(wishStudies.getPost()))
                .toList();
    }
    
}
