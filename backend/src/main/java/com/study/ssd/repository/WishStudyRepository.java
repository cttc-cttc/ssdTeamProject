package com.study.ssd.repository;

import com.study.ssd.entity.WishStudy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WishStudyRepository extends JpaRepository<WishStudy, Long> {
    
    // 사용자가 특정 스터디를 찜했는지 확인
    Optional<WishStudy> findByUserIdAndPostId(Long userId, Long postId);
    
    // 사용자가 찜한 모든 스터디 조회
    @Query("SELECT ws FROM WishStudy ws JOIN FETCH ws.post WHERE ws.user.id = :userId")
    List<WishStudy> findByUserIdWithPost(@Param("userId") Long userId);
    
    // 스터디를 찜한 사용자 수 조회
    long countByPostId(Long postId);
    
    // 사용자가 찜한 스터디가 있는지 확인
    boolean existsByUserIdAndPostId(Long userId, Long postId);
}
