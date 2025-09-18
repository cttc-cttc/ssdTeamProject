package com.study.ssd.controller;

import com.study.ssd.dto.AdminDTO;
import com.study.ssd.entity.Admin;
import com.study.ssd.repository.AdminRepository;
import com.study.ssd.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
// @CrossOrigin(origins = "*") 나중에 하자
public class AdminController {
    private final AdminRepository adminRepository;
    private final AdminService adminService;

    // 회원가입
    @PostMapping("/signUp")
    public ResponseEntity<?> signUpAdmin(@RequestBody AdminDTO.SignUpRequest signUpRequest){
        try {
            Admin admin = new Admin();
            admin.setAdminName(signUpRequest.getAdminName());
            admin.setAdminId(signUpRequest.getAdminId());
            admin.setAdminPassword(signUpRequest.getAdminPassword());

            Admin saveAdmin = adminRepository.save(admin);

            AdminDTO.AdminResponse response = new AdminDTO.AdminResponse(
                    saveAdmin.getId(),
                    saveAdmin.getAdminId(),
                    saveAdmin.getAdminName(),
                    saveAdmin.getAdminPassword()
            );

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody AdminDTO.LoginRequest loginRequest){
        try {
            Admin admin = adminService.loginAdmin(loginRequest.getAdminId(), loginRequest.getAdminPassword());
            
            AdminDTO.AdminResponse response = new AdminDTO.AdminResponse(
                    admin.getId(),
                    admin.getAdminId(),
                    admin.getAdminName(),
                    admin.getAdminPassword()
            );

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
