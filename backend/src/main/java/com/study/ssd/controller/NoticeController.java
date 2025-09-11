package com.study.ssd.controller;

import com.study.ssd.dto.NoticeRequest;
import com.study.ssd.dto.NoticeResponse;
import com.study.ssd.service.NoticeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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

    @PostMapping("/create")
    public NoticeResponse createNotice(@Valid @RequestBody NoticeRequest request) {
        return noticeService.createNotice(request);
    }
}