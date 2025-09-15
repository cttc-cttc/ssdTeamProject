package com.study.ssd.controller;

import com.study.ssd.dto.studyPost.StudyPostResponse;
import com.study.ssd.dto.pagination.SliceResponse;
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
     * [홈 - 메인]
     * 스터디 섹션에 따른 스터디 리스트 조회
     * deadline - 마감 임박 스터디
     * popular - 인기 스터디
     * recent - 최신 스터디
     * @param studySections
     * @param page
     * @param size
     * @return
     */
    @GetMapping("/studyList/studySections")
    public ResponseEntity<Page<StudyPostResponse>> getStudyListStudySections(
            @RequestParam String studySections,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size
    ) {
        return ResponseEntity.ok(homeService.getStudyListStudySections(studySections, page, size));
    }

    /**
     * [홈 - 스터디]
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
        if (keyword.isBlank()) {
            return ResponseEntity.ok(homeService.getStudyList(category, pageable));
        }

        // 검색 키워드가 있으면 검색 결과의 스터디 리스트 조회 (전체 / 각 카테고리)
        return ResponseEntity.ok(homeService.getStudyListByKeyword(category, keyword, pageable));
    }

    /**
     * [홈 - 메인 (태그 선택)]
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


