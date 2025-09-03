package com.study.ssd.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class HomeController {

    @GetMapping("/home")
    public ResponseEntity<String> connectionTest() {
        return ResponseEntity.ok("hi react");
    }
}
