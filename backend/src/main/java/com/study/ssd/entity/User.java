package com.study.ssd.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigInteger;
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

    // 유저 닉네임 변경
    @Column
    private LocalDate userNicknameUpdatedAt;
}
