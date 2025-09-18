package com.study.ssd.service;

import com.study.ssd.dto.studyPost.StudyPostRequest;
import com.study.ssd.dto.studyPost.StudyPostResponse;
import com.study.ssd.dto.studyPost.UpdateStudyPostRequest;
import com.study.ssd.dto.studyPost.UpdateStudyPostResponse;
import com.study.ssd.entity.StudyPost;
import com.study.ssd.entity.User;
import com.study.ssd.repository.StudyPostRepository;
import com.study.ssd.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudyPostService {

    private final StudyPostRepository studyPostRepository;
    private final UserRepository userRepository;

    /**
     * 크론 표현식으로 실행 주기 지정
     * ex) (cron = "0 0 1 * * ?") -> 매일 새벽 1시에 실행
     * ┌───────────── 초 (0-59)
     * │ ┌─────────── 분 (0-59)
     * │ │ ┌───────── 시 (0-23)
     * │ │ │ ┌─────── 일 (1-31)
     * │ │ │ │ ┌───── 월 (1-12)
     * │ │ │ │ │ ┌─── 요일 (0-7, 일요일=0 또는 7)
     * │ │ │ │ │ │
     * 0 0 1 * * ?
     */
    @Scheduled(cron = "0 */5 * * * ?")  // 5분마다 계속 마감 처리
    @Transactional
    public void updateEndedStudies() {
        studyPostRepository.updateEndedStudies(LocalDateTime.now());
    }

    @Transactional
    public StudyPostResponse createPost (StudyPostRequest studyPostRequest) {

        if (studyPostRequest.getSubCategories() != null && studyPostRequest.getSubCategories().size() > 3) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "최대 3개까지 가능합니다.");
        }

        StudyPost post = StudyPost.builder()
                .userNickname(studyPostRequest.getUserNickname())
                .title(studyPostRequest.getTitle())
                .content(studyPostRequest.getContent())
                .mainCategory(studyPostRequest.getMainCategory())
                .subCategories(studyPostRequest.getSubCategories())
                .maxCount(studyPostRequest.getMaxCount())
                .currentCount(0)
                .build();

        StudyPost saved = studyPostRepository.save(post);

        return StudyPostResponse.fromEntity(saved);
    }

    // 상세 페이지 조회
    public StudyPostResponse getPost(Long id) {
        StudyPost post = studyPostRepository.findById(id)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다."));

        return StudyPostResponse.fromEntity(post);
    }

    // 게시글 수정
    public UpdateStudyPostResponse updatePost (Long id, UpdateStudyPostRequest updateStudyPostRequest) {
        StudyPost post = studyPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

        post.setTitle(updateStudyPostRequest.getTitle());
        post.setContent(updateStudyPostRequest.getContent());
        post.setMainCategory(updateStudyPostRequest.getMainCategory());
        post.setSubCategories(updateStudyPostRequest.getSubCategories());
        post.setMaxCount(updateStudyPostRequest.getMaxCount());

        StudyPost saved = studyPostRepository.save(post); // 수정 게시글 저장

        UpdateStudyPostResponse response = new UpdateStudyPostResponse();
        response.setId(saved.getId());
        response.setTitle(saved.getTitle());
        response.setContent(saved.getContent());
        response.setMainCategory(saved.getMainCategory());
        response.setSubCategories(saved.getSubCategories());
        response.setMaxCount(saved.getMaxCount());
        response.setCreatedAt(saved.getCreatedAt());
        response.setUpdateAt(saved.getUpdatedAt());

        return response;
    }

    // 게시글 삭제
    public void deletePost(Long id) {
        StudyPost post = studyPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
        studyPostRepository.delete(post);
    }

    // 오픈 스터디 조회
    public List<StudyPostResponse> getOpenStudy(String userNickname) {
        List<StudyPost> studyPosts = studyPostRepository.findByUserNicknameOrderByIdDesc(userNickname);
        return studyPosts.stream()
                .map(StudyPostResponse::fromEntity)
                .toList();
    }

    // 스터디 종료
    @Transactional
    public StudyPostResponse endStudy(Long id) {
        StudyPost post = studyPostRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        
        if (post.isEnded()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        
        post.setEnded(true);
        StudyPost savedPost = studyPostRepository.save(post);
        
        return StudyPostResponse.fromEntity(savedPost);
    }
}
