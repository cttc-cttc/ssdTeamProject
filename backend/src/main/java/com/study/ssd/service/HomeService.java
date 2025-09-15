package com.study.ssd.service;

import com.study.ssd.dto.studyPost.StudyPostResponse;
import com.study.ssd.entity.StudyPost;
import com.study.ssd.repository.HomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeService {

    private final HomeRepository homeRepository;

    /**
     * 스터디 섹션에 따른 스터디 리스트 조회
     * @param studySections 표시할 스터디 종류 - 마감 임박 / 인기 / 최신 스터디
     * @param page 현재 페이지 (첫 페이지만 필요하니 0으로 고정)
     * @param size 한 페이지에 보여줄 게시글 개수 (마감 임박 / 인기 스터디는 6개, 최신 스터디는 9개)
     * @return Page<StudyPostResponse>
     */
    public Page<StudyPostResponse> getStudyListStudySections(String studySections, int page, int size) {

        // Spring Data JPA 의 findAll(Pageable pageable) 은 이미 정렬 조건을 Pageable 에서 받아서 동적으로 쿼리를 생성해 줍니다.
        // 따라서 deadline, popular, recent 같은 케이스는 Pageable의 Sort 조건만 바꾸면 충분합니다. - by gpt
        // properties 값은 DB의 컬럼명이 아닌 Entity java 파일의 변수명
        Pageable pageable = switch (studySections) {
            case "deadline" -> PageRequest.of(page, size, Sort.by("deadline").ascending());
            case "popular" -> PageRequest.of(page, size, Sort.by("wishCount").descending());
            case "recent" -> PageRequest.of(page, size, Sort.by("id").descending());
            default -> throw new IllegalArgumentException("잘못된 정렬 조건입니다.");
        };

        Page<StudyPost> posts = homeRepository.findAll(pageable);
        return posts.map(StudyPostResponse::fromEntity);
    }

    /**
     * 스터디 리스트 조회 (전체 / 각 카테고리)
     * @param category
     * @param pageable
     * @return
     */
    public Page<StudyPostResponse> getStudyList(String category, Pageable pageable) {
        // category가 all 이면 전체 조회
        if (category.equals("all")) {
            return homeRepository.findAllByOrderByIdDesc(pageable)
                    .map(StudyPostResponse::fromEntity);
        }

        // all 이 아니면 해당 카테고리로 조회
        return homeRepository.findByMainCategoryOrderByIdDesc(category, pageable)
                .map(StudyPostResponse::fromEntity);
    }

    /**
     * 검색 결과의 스터디 리스트 조회 (전체 / 각 카테고리)
     * @param category
     * @param keyword
     * @param pageable
     * @return
     */
    public Page<StudyPostResponse> getStudyListByKeyword(String category, String keyword, Pageable pageable) {
        // category가 all 이면 전체에서 검색 키워드로 조회
        if (category.equals("all")) {
            return homeRepository.findByTitleContainingIgnoreCase(keyword, pageable)
                    .map(StudyPostResponse::fromEntity);
        }

        // all 이 아니면 해당 카테고리에서 검색 키워드로 조회
        return homeRepository.findByMainCategoryAndTitleContainingIgnoreCase(category, keyword, pageable)
                .map(StudyPostResponse::fromEntity);
    }

    /**
     * 무한 스크롤 + 태그 필터링
     * @param tags
     * @param lastId
     * @param size
     * @return
     */
    public Slice<StudyPostResponse> getPostsByTags(List<String> tags, Long lastId, int size) {
        long tagCount = tags.size();
        Pageable pageable = PageRequest.of(0, size, Sort.by(Sort.Direction.DESC, "id"));

        return homeRepository
                .findByAllTagsWithCursor(tags, tagCount, lastId, pageable)
                .map(StudyPostResponse::fromEntity);
    }
}
