package com.study.ssd.dto.home;

/**
 * Java 16 이후 도입된 record는 불변 데이터 객체(immutable data carrier)를 간단히 선언할 수 있는 특별한 클래스
 * - 특징 -
 * 불변성      모든 필드가 final → 생성 후 변경 불가
 * 간결성      일반 클래스보다 선언 코드가 훨씬 짧음
 * DTO 용도    조회용 데이터를 담아 전달하는 객체로 최적
 * 자동 메서드  equals, hashCode, toString 자동 생성
 *
 * @param name
 * @param usageCount
 */
public record TagDto(String name, Long usageCount) {
}
