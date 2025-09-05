package com.study.ssd.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigInteger;

@Entity
@Table(name = "user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;

    private String userName;

    private String userId;

    @Column(nullable = false)
    private String userPassword;

    @Column(nullable = false, unique = true)
    private String userNickname;

    private String userEmail;


}
