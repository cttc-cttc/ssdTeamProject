package com.study.ssd.controller;

import com.study.ssd.entity.Guide;
import com.study.ssd.service.GuideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/guides")
@RequiredArgsConstructor
public class GuideController {

    private final GuideService guideService;

    @GetMapping("/{type}")
    public ResponseEntity<Guide> getGuide(@PathVariable String type) {
        Guide guide = guideService.getGuideByType(type);
        return ResponseEntity.ok(guideService.getGuideByType(type));
    }
}
