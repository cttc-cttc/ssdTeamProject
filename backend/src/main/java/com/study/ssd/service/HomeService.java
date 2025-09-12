package com.study.ssd.service;

import com.study.ssd.dto.StudyPostResponse;
import com.study.ssd.entity.StudyPost;
import com.study.ssd.repository.HomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HomeService {

    private final HomeRepository homeRepository;

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
}
