package com.study.ssd.repository;

import com.study.ssd.entity.WishStudy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishStudyRepository extends JpaRepository<WishStudy, Long> {
}
