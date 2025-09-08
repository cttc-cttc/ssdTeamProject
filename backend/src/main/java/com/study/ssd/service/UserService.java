package com.study.ssd.service;

import com.study.ssd.entity.PasswordResetToken;
import com.study.ssd.entity.User;
import com.study.ssd.repository.PasswordResetTokenRepository;
import com.study.ssd.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;
    
    @Autowired
    private EmailService emailService;

    // ID 확인 및 유저 조회
    private User findByUserId(String userId){
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
    }

    // 회원가입
    public User signUpUser(User user){
        // 아이디 중복 체크
        if (userRepository.existsByUserId(user.getUserId())){
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }

        // 닉네임 중복 체크
        if (userRepository.existsByUserNickname(user.getUserNickname())){
            throw new RuntimeException("이미 존재하는 닉네임입니다.");
        }

        // 이메일 중복 체크
        if (userRepository.existsByUserEmail(user.getUserEmail())){
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }

        // 없으면 DB 저장
        return userRepository.save(user);
    }

    // 로그인
    public User loginUser(String userId, String userPassword){
        Optional<User> userCheck = userRepository.findByUserId(userId);

        if (userCheck.isEmpty()){
            throw new RuntimeException("사용자를 찾을 수 없습니다.");
        }

        User user = userCheck.get();

        // 비밀번호 확인 (단순하게 평문 비교)
        if (!userPassword.equals(user.getUserPassword())){
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        return user;
    }

    // 로그아웃
    public void logoutUser(String userId){
        // 미완성
    }

    // 유저 정보 수정 (닉네임, 비밀번호)
    public User updateUser(String userId, User userInfo){
        // 유저 조회
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다. ID: " + userId));

        // 비밀번호 변경
        if (userInfo.getUserPassword() != null && !userInfo.getUserPassword().isEmpty()){
            user.setUserPassword(userInfo.getUserPassword()); // 단순한 평문 저장
        } else {
            throw new RuntimeException("비밀번호를 입력해주세요.");
        }

        // 닉네임 변경 (30일 제한)
        if (userInfo.getUserNickname() != null && !userInfo.getUserNickname().isEmpty()){
            // 닉네임 중복 체크
            if (userRepository.existsByUserNickname(userInfo.getUserNickname()))
                throw new RuntimeException("이미 존재하는 닉네임입니다.");

            LocalDate now = LocalDate.now();

            if (user.getUserNicknameUpdatedAt() == null || user.getUserNicknameUpdatedAt().plusDays(30).isBefore(now)){
                user.setUserNickname(userInfo.getUserNickname()); // 닉네임 변경
                user.setUserNicknameUpdatedAt(now); // 닉네임 변경 날짜 저장
            } else {
                throw new RuntimeException("닉네임은 30일에 한 번만 변경할 수 있습니다.");
            }
        }

        return userRepository.save(user);
    }

    // 회원 탈퇴
    public boolean withdrawUser(String userId, String password){
        User user = findByUserId(userId);

        // 비밀번호 확인 (간단한 평문 비교)
        if (!password.equals(user.getUserPassword())){
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        // 닉네임 강제변경
        user.setUserNickname("탈퇴회원");
        userRepository.save(user);

        // 사용자 삭제
        userRepository.deleteById(user.getId());

        return true;
    }
    
    // 비밀번호 재설정 요청
    public void requestPasswordReset(String userEmail) {
        User user = userRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("해당 이메일로 등록된 사용자를 찾을 수 없습니다."));
        
        // 기존 토큰이 있다면 삭제
        passwordResetTokenRepository.deleteByUser(user);
        
        // 새로운 토큰 생성
        String token = generateResetToken();
        PasswordResetToken resetToken = new PasswordResetToken(token, user);
        passwordResetTokenRepository.save(resetToken);
        
        // 이메일 전송
        emailService.sendPasswordResetEmail(user.getUserEmail(), token, user.getUserNickname());
    }
    
    // 비밀번호 재설정 토큰 검증 및 비밀번호 변경
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("유효하지 않은 토큰입니다."));
        
        // 토큰 만료 확인
        if (resetToken.isExpired()) {
            passwordResetTokenRepository.delete(resetToken);
            throw new RuntimeException("만료된 토큰입니다.");
        }
        
        // 이미 사용된 토큰인지 확인
        if (resetToken.isUsed()) {
            throw new RuntimeException("이미 사용된 토큰입니다.");
        }
        
        // 비밀번호 변경
        User user = resetToken.getUser();
        user.setUserPassword(newPassword);
        userRepository.save(user);
        
        // 토큰 사용 처리
        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);
    }
    
    // 비밀번호 재설정 토큰 생성
    private String generateResetToken() {
        SecureRandom random = new SecureRandom();
        StringBuilder token = new StringBuilder();
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (int i = 0; i < 32; i++) {
            token.append(chars.charAt(random.nextInt(chars.length())));
        }
        
        return token.toString();
    }
}

/*
* @Service = 이 클래스를 서비스 컴포넌트로 적용시킨다. 이제 다른 곳에서도 주입될 수 있다.
* @Transactional = method 실행 도중 문제가 발생하면 DB변경을 취소하고 롤백시킨다.
* != null && !userInfo.getUserPassword().isEmpty()
*   != null -> 값이 아예 없는 경우 차단
*   != isEmpty() -> 빈 문자열 차단
*/