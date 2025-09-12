package com.study.ssd.controller;

import com.study.ssd.dto.SliceResponse;
import com.study.ssd.dto.StudyPostResponse;
import com.study.ssd.entity.StudyPost;
import com.study.ssd.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;

    /**
     * 스터디 리스트 조회 (전체 / 각 카테고리) 또는
     * 검색 결과의 스터디 리스트 조회 (전체 / 각 카테고리)
     * @param category
     * @param keyword
     * @param page
     * @param size
     * @return
     */
    @GetMapping("/studyList")
    public ResponseEntity<Page<StudyPostResponse>> getStudyList(
            @RequestParam String category,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        // 검색 키워드가 없으면 스터디 리스트 조회 (전체 / 각 카테고리)
        System.out.println("keyword: " + keyword);
        if (keyword.isBlank()) {
            return ResponseEntity.ok(homeService.getStudyList(category, pageable));
        }

        // 검색 키워드가 있으면 검색 결과의 스터디 리스트 조회 (전체 / 각 카테고리)
        return ResponseEntity.ok(homeService.getStudyListByKeyword(category, keyword, pageable));
    }

    /**
     * 무한 스크롤 + 태그 필터링
     * @param tags
     * @param lastId
     * @param size
     * @return
     */
    @GetMapping("/posts/search")
    public ResponseEntity<SliceResponse<StudyPostResponse>> getStudyListByTags(
            @RequestParam List<String> tags,
            @RequestParam(required = false) Long lastId,
            @RequestParam(defaultValue = "10") int size
    ) {
        if (tags.isEmpty()) {
            return ResponseEntity.ok(new SliceResponse<>(List.of(), false));
        }
        Slice<StudyPostResponse> slice = homeService.getPostsByTags(tags, lastId, size);
        return ResponseEntity.ok(SliceResponse.from(slice));
    }
}


