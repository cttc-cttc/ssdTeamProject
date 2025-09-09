package com.study.ssd.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "user")
@Data
public class User {
    // 유저 식별키
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 유저 이름
    @Column(nullable = false)
    private String userName;

    // 유저 닉네임
    @Column(nullable = false, unique = true)
    private String userNickname;

    // 유저 아이디
    @Column(nullable = false, unique = true)
    private String userId;

    // 유저 비밀번호
    @Column(nullable = false)
    private String userPassword;

    // 유저 이메일
    @Column(nullable = false, unique = true)
    private String userEmail;

    // 유저 닉네임 변경 - 최근 닉네임 수정일
    @Column
    private LocalDate lastNicknameChangedAt;

    // 유저 닉네임 변경 - 다음 닉네임 수정일
    @Column
    private LocalDate nextNicknameChangedAt;
}
/*
* @Data = Lombok 라이브러리에서 제공하는 어노테이션
*   이걸 클래스 위에 붙이면 자동으로 다음과 같은 메서드들을 만들어준다.
*   getter, setter, toString(), equals(), hashCode() 등
* */