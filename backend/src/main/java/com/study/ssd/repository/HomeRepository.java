package com.study.ssd.repository;

import com.study.ssd.dto.home.TagDto;
import com.study.ssd.entity.StudyPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HomeRepository extends JpaRepository<StudyPost, Long> {

    // 인기 태그 Top 30
    @Query("""
            SELECT new com.study.ssd.dto.home.TagDto(s, COUNT(s))
            FROM StudyPost p JOIN p.subCategories s
            WHERE p.isEnded = false
            GROUP BY s
            ORDER BY COUNT(s) DESC
            """)
    List<TagDto> findPopularTags(Pageable pageable);

    // 마감되지 않은 스터디 리스트 조회 (마감 임박 / 인기 / 최신)
    Page<StudyPost> findAllByIsEndedFalse(Pageable pageable);

    // 모든 리스트 조회 (id값 내림차순 페이징)
    Page<StudyPost> findAllByIsEndedFalseOrderByIdDesc(Pageable pageable);

    // 카테고리로 찾기 (id값 내림차순 페이징)
    Page<StudyPost> findByMainCategoryAndIsEndedFalseOrderByIdDesc(String category, Pageable pageable);

    // 모든 리스트에서 검색 키워드로 찾기 (id값 내림차순 페이징)
    Page<StudyPost> findByTitleContainingIgnoreCaseAndIsEndedFalse(String keyword, Pageable pageable);

    // 특정 카테고리에서 검색 키워드로 찾기 (id값 내림차순 페이징)
    Page<StudyPost> findByMainCategoryAndTitleContainingIgnoreCaseAndIsEndedFalse(String category, String keyword, Pageable pageable);

    // 무한 스크롤 + 태그 필터링
    @Query("""
        SELECT p
        FROM StudyPost p
        JOIN p.subCategories t
        WHERE p.isEnded = false
          AND (:lastId IS NULL OR p.id < :lastId)
          AND t IN :tags
        GROUP BY p.id
        HAVING COUNT(DISTINCT t) = :tagCount
        ORDER BY p.id DESC
    """)
    Slice<StudyPost> findByAllTagsWithCursor(
            @Param("tags") List<String> tags,
            @Param("tagCount") long tagCount,
            @Param("lastId") Long lastId,
            Pageable pageable
    );
}
