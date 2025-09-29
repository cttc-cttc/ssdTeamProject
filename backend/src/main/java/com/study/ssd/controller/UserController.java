package com.study.ssd.controller;

import com.study.ssd.dto.UserDTO;
import com.study.ssd.entity.User;
import com.study.ssd.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
// @CrossOrigin(origins = "*") 나중에 하자

public class UserController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/signUp")
    public ResponseEntity<?> signUpUser(@RequestBody UserDTO.SignUpRequest signUpRequest){
        try {
            User user = new User();
            user.setUserName(signUpRequest.getUserName());
            user.setUserNickname(signUpRequest.getUserNickname());
            user.setUserId(signUpRequest.getUserId());
            user.setUserPassword(signUpRequest.getUserPassword());
            user.setUserEmail(signUpRequest.getUserEmail());

            User saveUser = userService.signUpUser(user);
        

            // UserResponse로 변환해주어야 한다 - 추후 보안 유지(비밀번호만 제외 하자)와 API 연계를 쉽게하기 위해 만듦
            UserDTO.UserResponse response = new UserDTO.UserResponse(
                    saveUser.getId(),
                    saveUser.getUserName(),
                    saveUser.getUserNickname(),
                    saveUser.getUserId(),
                    saveUser.getUserEmail(),
                    saveUser.getLastNicknameChangedAt(),
                    saveUser.getNextNicknameChangedAt()
            );
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO.LoginRequest loginRequest){
        try {
            User user = userService.loginUser(loginRequest.getUserId(), loginRequest.getUserPassword());

            // UserResponse로 변환해주어야 한다 - 추후 보안 유지(비밀번호만 제외 하자)와 API 연계를 쉽게하기 위해 만듦
            UserDTO.UserResponse response = new UserDTO.UserResponse(
                    user.getId(),
                    user.getUserName(),
                    user.getUserNickname(),
                    user.getUserId(),
                    user.getUserEmail(),
                    user.getLastNicknameChangedAt(),
                    user.getNextNicknameChangedAt()
            );

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 유저 정보 수정
    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable String userId, @RequestBody UserDTO.UserUpdateRequest updateRequest){
        try {
            User userInfo = new User();
            userInfo.setUserPassword(updateRequest.getUserPassword());
            userInfo.setUserNickname(updateRequest.getUserNickname());

            User updateUser = userService.updateUser(userId, userInfo);

            // UserResponse로 변환해주어야 한다 - 추후 보안 유지(비밀번호만 제외 하자)와 API 연계를 쉽게하기 위해 만듦
            UserDTO.UserResponse response = new UserDTO.UserResponse(
                    updateUser.getId(),
                    updateUser.getUserName(),
                    updateUser.getUserNickname(),
                    updateUser.getUserId(),
                    updateUser.getUserEmail(),
                    updateUser.getLastNicknameChangedAt(),
                    updateUser.getNextNicknameChangedAt()
            );

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 회원 탈퇴
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId, @RequestBody UserDTO.PasswordRequest passwordRequest){
        try {
            boolean result = userService.withdrawUser(userId, passwordRequest.getPassword());

            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 로그아웃
//    @PostMapping("/logout/{userId}")
//    public ResponseEntity<?> logoutUser(@PathVariable String userId){
//        try {
//            userService.logoutUser(userId);
//
//            return ResponseEntity.ok("로그아웃 성공");
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
    
    // 비밀번호 재설정 요청
    @PostMapping("/password-reset/request")
    public ResponseEntity<?> requestPasswordReset(@RequestBody UserDTO.PasswordResetRequest request,
                                                    HttpServletRequest httpRequest) {
        try {
            userService.requestPasswordReset(request.getUserEmail(), httpRequest);
            return ResponseEntity.ok("비밀번호 재설정 이메일이 전송되었습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    // 비밀번호 재설정 처리
    @PostMapping("/password-reset/confirm")
    public ResponseEntity<?> resetPassword(@RequestBody UserDTO.PasswordResetConfirmRequest request) {
        try {
            userService.resetPassword(request.getToken(), request.getNewPassword());
            return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 활동 통계
    @GetMapping("/activity/{userPkID}")
    public ResponseEntity<UserDTO.ActivityResponse> getActivity(@PathVariable Long userPkID) {
        return ResponseEntity.ok(userService.getActivity(userPkID));
    }
}
/*
* @Controller: 요청과 응답을 처리하는 곳
* @RestController: API를 주고 받을 때 사용하는 어노테이션
* @RestController = @Controller + @ResponseBody
* @RequestMapping: 클라이언트 요청 URL을 컨트롤러 메서드(혹은 클래스)의 매핑하는 역할
*/