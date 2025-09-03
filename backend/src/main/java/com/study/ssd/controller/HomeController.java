package com.study.ssd.controller;

import com.study.ssd.entity.TestEntity;
import com.study.ssd.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class HomeController {

    private final TestService testService;

    @GetMapping("/home")
    public ResponseEntity<String> connectionTest() {
        return ResponseEntity.ok("hi react");
    }

    @PostMapping("/test")
    public ResponseEntity<TestEntity> createTest(@RequestBody TestEntity test) {
        return ResponseEntity.ok(testService.createTest(test));
    }

    @GetMapping("/test")
    public ResponseEntity<List<TestEntity>> getAll() {
        return ResponseEntity.ok(testService.getAll());
    }
}
