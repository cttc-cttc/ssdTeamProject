package com.study.ssd.repository;

import com.study.ssd.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    // userId 중복 체크
    boolean existsByUserId(String userId);

    // userNickname 중복체크
    boolean existsByUserNickname(String userNickname);
    
    // userEmail 중복체크
    boolean existsByUserEmail(String userEmail);

    // userId 로그인 처리
    Optional<User> findByUserId(String userId);
}

