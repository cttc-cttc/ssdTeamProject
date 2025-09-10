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

    public Page<StudyPostResponse> getStudyList(String category, Pageable pageable) {
        // category가 all 이면 전체 조회
        if (category.equals("all")) {
            return homeRepository.findAllByOrderByIdDesc(pageable)
                    .map(StudyPostResponse::fromEntity);
        }

        // all 이 아니면 해당 카테고리로 조회
        return homeRepository.findByCategoryOrderByIdDesc(category, pageable)
                .map(StudyPostResponse::fromEntity);
    }
}
