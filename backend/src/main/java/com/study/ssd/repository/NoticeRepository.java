package com.study.ssd.repository;





import com.study.ssd.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    // createdAt 기준으로 내림차순 정렬된 리스트 반환
    List<Notice> findAllByOrderByCreatedAtDesc();
}
