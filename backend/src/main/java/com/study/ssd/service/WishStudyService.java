package com.study.ssd.service;

import com.study.ssd.dto.studyPost.StudyPostResponse;
import com.study.ssd.entity.StudyPost;
import com.study.ssd.entity.User;
import com.study.ssd.entity.WishStudy;
import com.study.ssd.repository.StudyPostRepository;
import com.study.ssd.repository.UserRepository;
import com.study.ssd.repository.WishStudyRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishStudyService {

    private final WishStudyRepository wishStudyRepository;
    private final UserRepository userRepository;
    private final StudyPostRepository studyPostRepository;

    @Transactional
    public void addWish (Long userId, Long postId) {
        if (wishStudyRepository.existsByUserIdAndPostId(userId, postId)) {
            return ;
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));
        StudyPost post = studyPostRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found: " + postId));

        // Entity studyPost 의 userId 와 user의 id(PK) 를 비교
        if (post.getUserId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "나의 개설 스터디입니다.");
        }

        WishStudy wishStudy = WishStudy.builder()
                .user(user)
                .post(post)
                .build();

        wishStudyRepository.save(wishStudy);

        post.increaseWishCount();
        studyPostRepository.save(post);
    }

    @Transactional
    public void cancelWish (Long userId, Long postId) {
        WishStudy wishStudy = wishStudyRepository.findByUserIdAndPostId(userId, postId)
                .orElseThrow(() -> new IllegalArgumentException("Not found wish study"));
        wishStudyRepository.delete(wishStudy);

        StudyPost post = wishStudy.getPost();
        post.decreaseWishCount();
        studyPostRepository.save(post);
    }
    
    // 위시 여부 확인
    public boolean isWished(Long userId, Long postId) {
        return wishStudyRepository.existsByUserIdAndPostId(userId, postId);
    }
    
    // 유저에 따른 위시 목록 조회
    public List<StudyPostResponse> getWishStudyByUserId(Long userId) {
        List<WishStudy> wishStudies = wishStudyRepository.findByUserIdWithPost(userId);
        return wishStudies.stream()
                .map(wishStudy -> StudyPostResponse.fromEntity(wishStudy.getPost()))
                .toList();

    }

}
