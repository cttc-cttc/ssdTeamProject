package com.study.ssd.repository;

import com.study.ssd.entity.StudyPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface HomeRepository extends JpaRepository<StudyPost, Long> {

    // 모든 리스트 조회 (id값 내림차순 페이징)
    Page<StudyPost> findAllByOrderByIdDesc(Pageable pageable);

    // 카테고리로 찾기 (id값 내림차순 페이징)
    Page<StudyPost> findByCategoryOrderByIdDesc(String category, Pageable pageable);

    // 모든 리스트에서 검색 키워드로 찾기 (id값 내림차순 페이징)
    Page<StudyPost> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);

    // 특정 카테고리에서 검색 키워드로 찾기 (id값 내림차순 페이징)
    Page<StudyPost> findByCategoryAndTitleContainingIgnoreCase(String category, String keyword, Pageable pageable);
}
