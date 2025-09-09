package com.study.ssd.service;

import com.study.ssd.dto.StudyPostResponse;
import com.study.ssd.entity.StudyPost;
import com.study.ssd.repository.HomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HomeService {

    private final HomeRepository homeRepository;

    public Page<StudyPostResponse> getStudyList(String category, Pageable pageable) {
        Page<StudyPost> entityList = homeRepository.findPageByCategory(category, pageable);
        return entityList
                .map(entity -> {
                    new StudyPostResponse();
                    return StudyPostResponse.builder()
                            .id(entity.getId())
                            .title(entity.getTitle())
                            .category(entity.getCategory())
                            .content(entity.getContent())
                            .deadline(entity.getDeadline())
                            .created(entity.getCreatedAt())
                            .currentCont(entity.getCurrentCont())
                            .maxCount(entity.getMaxCount())
                            .wishCount(entity.getWishCount())
                            .build();
                });
    }
}
