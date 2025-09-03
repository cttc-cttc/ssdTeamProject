package com.study.ssd.service;

import com.study.ssd.entity.TestEntity;
import com.study.ssd.repository.TestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestService {

    private final TestRepository testRepository;

    public TestEntity createTest(TestEntity test) {
        return testRepository.save(test);
    }

    public List<TestEntity> getAll() {
        return testRepository.findAll();
    }
}
