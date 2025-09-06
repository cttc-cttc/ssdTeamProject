package com.study.ssd.controller;

import com.study.ssd.dto.UserDTO;
import com.study.ssd.entity.User;
import com.study.ssd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
// @CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    // 회원가입
    @PostMapping("/signIn")
    public ResponseEntity<?> signInUser(@RequestBody UserDTO.SignInRequest signInRequest){
        try {
            User user = new User();
            user.setUserName(signInRequest.getUserName());
            user.setUserNickname(signInRequest.getUserNickname());
            user.setUserId(signInRequest.getUserId());
            user.setUserPassword(signInRequest.getUserPassword());
            user.setUserEmail(signInRequest.getUserEmail());

            User saveUser = userService.signInUser(user);
        

            // UserResponse로 변환해주어야 한다 - 추후 보안 유지(비밀번호만 제외 하자)와 API 연계를 쉽게하기 위해 만듦
            UserDTO.UserResponse response = new UserDTO.UserResponse(
                    saveUser.getId(),
                    saveUser.getUserName(),
                    saveUser.getUserNickname(),
                    saveUser.getUserId(),
                    saveUser.getUserEmail(),
                    saveUser.getUserNicknameUpdatedAt()
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
                    user.getUserNicknameUpdatedAt()
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
                    updateUser.getUserNicknameUpdatedAt()
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
    @PostMapping("/logout/{userId}")
    public ResponseEntity<?> logoutUser(@PathVariable String userId){
        try {
            userService.logoutUser(userId);

            return ResponseEntity.ok("로그아웃 성공");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}















