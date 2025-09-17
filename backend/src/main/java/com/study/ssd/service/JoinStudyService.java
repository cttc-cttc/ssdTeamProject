package com.study.ssd.service;

import com.study.ssd.dto.studyPost.StudyPostResponse;
import com.study.ssd.entity.JoinStudy;
import com.study.ssd.entity.StudyPost;
import com.study.ssd.entity.User;
import com.study.ssd.repository.JoinStudyRepository;
import com.study.ssd.repository.StudyPostRepository;
import com.study.ssd.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JoinStudyService {

    private final JoinStudyRepository joinStudyRepository;
    private final UserRepository userRepository;
    private final StudyPostRepository  studyPostRepository;

    @Transactional
    public void join (Long userId, Long postId) {
        if (joinStudyRepository.existsByUserIdAndPostId(userId, postId)) {
            throw new IllegalStateException("이미 참여한 스터디입니다.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found" + userId));
        StudyPost post = studyPostRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found: " + postId));

        JoinStudy joinStudy = JoinStudy.builder()
                .user(user)
                .post(post)
                .build();

        joinStudyRepository.save(joinStudy);

        post.increaseCurrentCount();
        studyPostRepository.save(post);
    }

    public boolean isJoined (Long userId, Long postId) {
        return joinStudyRepository.existsByUserIdAndPostId(userId, postId);
    }

    public List<StudyPostResponse> getJoinStudyByUserId(Long userId) {
        List<JoinStudy> joinStudies = joinStudyRepository.findByUserIdWithPost(userId);
        return joinStudies.stream()
                .map(joinStudy -> StudyPostResponse.fromEntity(joinStudy.getPost()))
                .toList();
    }
}
