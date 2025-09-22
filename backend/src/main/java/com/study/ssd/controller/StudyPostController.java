package com.study.ssd.controller;

import com.study.ssd.dto.studyPost.*;
import com.study.ssd.service.StudyPostService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class StudyPostController {

    private final StudyPostService studyPostService;

    @PostMapping
    public ResponseEntity<StudyPostResponse> createPost (
            @RequestBody StudyPostRequest studyPostRequest
    ) {
        StudyPostResponse studyPostResponse = studyPostService.createPost(studyPostRequest);
        return ResponseEntity.ok(studyPostResponse);
    }

    @PostMapping("/upload-image")
    public Map<String, String> uploadImage(@RequestParam("file") MultipartFile file,
                                           HttpServletRequest request) throws IOException {
        String uploadDir = System.getProperty("user.dir") + "/uploads";

        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        // 확장자 추출
        String originalFilename = file.getOriginalFilename();
        String ext = (originalFilename != null && originalFilename.contains("."))
                ? originalFilename.substring(originalFilename.lastIndexOf("."))
                : "";
        // 파일명 충돌 방지
        String newFilename = UUID.randomUUID() + ext;
        // 실제 저장
        Path filePath = uploadPath.resolve(newFilename);
        file.transferTo(filePath.toFile());

        // 현재 요청의 host/ip + 포트 가져오기
        String serverUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String fileUrl = serverUrl + "/uploads/" + newFilename;
        
        // 프론트로 보낼 URL
        return Map.of("url", fileUrl);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudyPostResponse> getPost ( @PathVariable Long id) {
        StudyPostResponse studyPostResponse = studyPostService.getPost(id);
        return ResponseEntity.ok(studyPostResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UpdateStudyPostResponse> updatePost (
            @PathVariable Long id,
            @RequestBody UpdateStudyPostRequest updateStudyPostRequest) {

        UpdateStudyPostResponse response = studyPostService.updatePost(id, updateStudyPostRequest);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteStudyPostResponse> deletePost (@PathVariable Long id) {
        studyPostService.deletePost(id);
        return ResponseEntity.ok(new DeleteStudyPostResponse(true, "게시글이 삭제되었습니다."));
    }

     // 오픈 스터디 조회
     @GetMapping("/open-study")
     public ResponseEntity<List<StudyPostResponse>> getOpenStudy(@RequestParam String userNickname) {
         return ResponseEntity.ok(studyPostService.getOpenStudy(userNickname));
     }

     // 스터디 종료
     @PostMapping("/end-study/{id}")
     public ResponseEntity<StudyPostResponse> endStudy(@PathVariable Long id) {
         StudyPostResponse response = studyPostService.endStudy(id);
         return ResponseEntity.ok(response);
     }
}
