package com.study.ssd.service;

import com.study.ssd.entity.Admin;
import com.study.ssd.repository.AdminRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    // ID 확인 및 관리자 조회
    private Admin findByAdminId(String adminId){
        return adminRepository.findByAdminId(adminId)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 관리자입니다."));
    }

    // 회원가입
    public Admin signUpAdmin(Admin admin){
        // 아이디 중복 체크
        if(adminRepository.existsByAdminId(admin.getAdminId())){
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }
        return adminRepository.save(admin);
    }

    // 로그인
    public Admin loginAdmin(String adminId, String adminPassword){
        Optional<Admin> adminCheck = adminRepository.findByAdminId(adminId);

        if (adminCheck.isEmpty()){
            throw new RuntimeException("존재하지 않는 관리자입니다.");
        }

        Admin admin = adminCheck.get();

        if (!adminPassword.equals(admin.getAdminPassword())){
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }
        return admin;
    }
}
