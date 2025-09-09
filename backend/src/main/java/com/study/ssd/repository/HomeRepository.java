package com.study.ssd.repository;

import com.study.ssd.entity.StudyPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface HomeRepository extends JpaRepository<StudyPost, Long> {

    @Query("""
            SELECT s FROM StudyPost s
            WHERE s.category = :category
            """)
    Page<StudyPost> findPageByCategory(
            @Param("category") String category,
            Pageable pageable
    );
}
