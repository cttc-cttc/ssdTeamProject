package com.study.ssd.repository;

import com.study.ssd.entity.StudyPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyPostRepository extends JpaRepository<StudyPost, Long> {
    
    // 특정 사용자가 개설한 스터디 목록 조회
    List<StudyPost> findByUserNickname(String userNickname);
}
