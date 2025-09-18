package com.study.ssd.repository;

import com.study.ssd.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    // adminId 중복체크
    boolean existsByAdminId(String adminId);

    // adminId 로그인 처리
    Optional<Admin> findByAdminId(String adminId);
}
