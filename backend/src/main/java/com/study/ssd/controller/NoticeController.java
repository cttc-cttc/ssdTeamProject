package com.study.ssd.controller;

import com.study.ssd.dto.NoticeRequest;
import com.study.ssd.dto.NoticeResponse;
import com.study.ssd.service.NoticeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices") // API 엔드포인트
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    // GET /api/notices → 전체 공지사항 목록
    @GetMapping("/list")
    public List<NoticeResponse> getNotices() {
        return noticeService.getAllNotices();
    }
    
    // 공지사항 작성
    @PostMapping("/create")
    public NoticeResponse createNotice(@Valid @RequestBody NoticeRequest request) {
        return noticeService.createNotice(request);
    }
    
    // 공지사항 식별
    @GetMapping("/{id}")
    public NoticeResponse getNotice(@PathVariable Long id) {
        return noticeService.getNoticeById(id);
    }
    
    // 공지사항 검색
    @GetMapping("/search")
    public List<NoticeResponse> searchNotices(@RequestParam("q") String keyword) {
        return noticeService.searchNotices(keyword);
    }
    
    // 공지사항 수정
    @PutMapping("/{id}")
    public ResponseEntity<?> updateNotice(@PathVariable Long id, @Valid @RequestBody NoticeRequest request) {
        try {
            NoticeResponse response = noticeService.updateNotice(id, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 공지사항 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
        try {
            noticeService.deleteNotice(id);
            return ResponseEntity.ok("공지사항 삭제 완료");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}