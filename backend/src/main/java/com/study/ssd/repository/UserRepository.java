package com.study.ssd.repository;

import com.study.ssd.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    // userId 중복체크
    boolean existsByUserId(String userId);

    // userNickname 중복체크
    boolean existsByUserNickname(String userNickname);
    
    // userEmail 중복체크
    boolean existsByUserEmail(String userEmail);

    // userId 로그인 처리
    Optional<User> findByUserId(String userId);
}

/*
* @Repository: DB와 Entity를 연결시켜주는 담당
* 클래스는 객체를 만들기 위한 설계도이지만 인터페이스는 기능(메소드)이 있어야한다는 규칙서이다.
* 복잡한 DB 쿼리를 작성해야 할 때 RepositoryImplements를 만들기도한다.
*/
/*
* Optional< > : 값이 있을 수도 있고 없을 수도 있는 객체 컨테이너
*   NullPointerException을 방지하기 위한 클래스이다.
*   안정적으로 꺼내주려면 orElse나 orElseThrow를 쓰는 것이 좋다.
*/