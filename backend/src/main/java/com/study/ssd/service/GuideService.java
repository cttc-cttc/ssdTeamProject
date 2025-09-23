package com.study.ssd.service;

import com.study.ssd.entity.Guide;
import com.study.ssd.repository.GuideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GuideService {
    private final GuideRepository guideRepository;

    public Guide getGuideByType(String type) {
        return guideRepository.findByType(type)
                .orElseThrow(() -> new RuntimeException("해당 가이드를 찾을 수 없습니다: " + type));
    }
}
