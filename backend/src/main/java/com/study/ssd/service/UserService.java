package com.study.ssd.service;

import com.study.ssd.entity.Comment;
import com.study.ssd.entity.User;
import com.study.ssd.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ID 확인 및 유저 조회
    private User findByUserId(String userId){
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
    }

    // 회원가입
    public User registerUser(User user){
        // userId 중복 체크
        if (userRepository.existsByUserId(user.getUserId())){
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }

        // userNickname 중복 체크
        if (userRepository.existsByUserNickname(user.getUserNickname())){
            throw new RuntimeException("이미 존재하는 닉네임입니다.");
        }

        // userEmail 중복 체크
        if (userRepository.existsByUserEmail(user.getUserEmail())){
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }

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
//   public User loginUser(String userId, String userPassword){
//        Optional<User> userCheck = userRepository.findByUserId(userId);
//
//        if (userCheck.isEmpty()){
//            throw new RuntimeException("사용자를 찾을 수 없습니다.");
//        }
//
//        User user = userCheck.get();
//
//        // 비밀번호 확인
//
//    }

    // 로그아웃
    public void logoutUser(String userId){
        User user = findByUserId(userId);
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
            LocalDate now = LocalDate.now();

            if (user.getUserNicknameUpdatedAt() == null || user.getUserNicknameUpdatedAt().plusDays(30).isBefore(now)){
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

//        List<Comment> use

        // 사용자 삭제
        userRepository.deleteById(user.getId());

        return true;
    }

//    // 연관된 댓글 작성자 익명 처리
//    List<Comment> userComments = commentService.getCommentsByUserId(pid);
//    for (Comment comment : userComments) {
//        comment.setAuthorName("탈퇴회원"); // 작성자 이름 변경
//        comment.setUser(null);            // User 객체 연결 해제
//        commentService.saveComment(comment); // 변경 저장
//    }
//
//    // 연관된 게시글 작성자 익명 처리
//    List<Post> userPosts = postService.getPostsByUserId(pid);
//    for (Post post : userPosts) {
//        post.setAuthorName("탈퇴회원"); // 작성자 이름 변경
//        post.setUser(null);            // User 객체 연결 해제
//        postService.savePost(post);    // 변경 저장
//    }
}





































