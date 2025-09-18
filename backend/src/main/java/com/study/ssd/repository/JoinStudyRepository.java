package com.study.ssd.repository;

import com.study.ssd.entity.JoinStudy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JoinStudyRepository extends JpaRepository<JoinStudy, Long> {
    
    // 특정 사용자가 특정 스터디에 참여했는지 확인
    Optional<JoinStudy> findByUserIdAndPostId(Long userId, Long postId);
    
    // 특정 사용자가 참여한 모든 스터디 조회
    @Query("SELECT js FROM JoinStudy js JOIN FETCH js.post WHERE js.user.id = :userId order by js.id DESC ")
    List<JoinStudy> findByUserIdWithPost(@Param("userId") Long userId);
    
    // 특정 스터디에 참여한 사용자 수 조회
    long countByPostId(Long postId);
    
    // 특정 사용자가 특정 스터디에 참여했는지 확인
    boolean existsByUserIdAndPostId(Long userId, Long postId);
}
