package com.study.ssd.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "admin")
@Getter
@Setter
@NoArgsConstructor
public class Admin {
    // 관리자 식별키
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 관리자 이름
    @Column(nullable = false)
    private String adminName;

    // 관리자 아이디
    @Column(nullable = false, unique = true )
    private String adminId;

    // 관리자 비밀번호
    @Column(nullable = false)
    private String adminPassword;
}
