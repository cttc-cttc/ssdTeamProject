package com.study.ssd.repository;

import com.study.ssd.entity.StudyPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface StudyPostRepository extends JpaRepository<StudyPost, Long> {
    
    // 특정 사용자가 개설한 스터디 목록 조회
    List<StudyPost> findByUserNicknameOrderByIdDesc(String userNickname);

    // 마감일이 지나면 자동으로 스터디 종료 처리
    @Modifying
    @Query("UPDATE StudyPost p SET p.isEnded = true WHERE p.deadline <:today AND p.isEnded = false")
    int updateEndedStudies(@Param("today") LocalDateTime today);
}
