package com.study.ssd.controller;

import com.study.ssd.dto.StudyPostRequest;
import com.study.ssd.dto.StudyPostResponse;
import com.study.ssd.service.StudyPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class StudyPostController {

    private final StudyPostService studyPostService;

    @PostMapping("/create-post")
    public ResponseEntity<StudyPostResponse> createPost (
            @RequestBody StudyPostRequest studyPostRequest
    ) {
        StudyPostResponse studyPostResponse = studyPostService.createPost(studyPostRequest);
        return ResponseEntity.ok(studyPostResponse);
    }

    @PostMapping("/upload-image")
    public Map<String, String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
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
        // 프론트로 보낼 URL
        return Map.of("url", "/uploads/" + newFilename);
    }

    @GetMapping("/create-post/{id}")
    public ResponseEntity<StudyPostResponse> getPost ( @PathVariable Long id) {
        StudyPostResponse studyPostResponse = studyPostService.getPost(id);
        return ResponseEntity.ok(studyPostResponse);
    }
}
