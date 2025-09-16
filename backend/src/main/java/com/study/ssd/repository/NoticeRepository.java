package com.study.ssd.repository;

import com.study.ssd.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    List<Notice> findAllByOrderByCreatedAtDesc();

    // 제목에서만 검색
    List<Notice> findByTitleContaining(String keyword);
}
