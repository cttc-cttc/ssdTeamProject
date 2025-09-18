package com.study.ssd.service;

import com.study.ssd.dto.NoticeRequest;
import com.study.ssd.dto.NoticeResponse;
import com.study.ssd.entity.Notice;
import com.study.ssd.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    // 전체 공지사항 조회 → DTO 변환
    public List<NoticeResponse> getAllNotices() {
        return noticeRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(NoticeResponse::new) // Notice → NoticeResponse 변환
                .collect(Collectors.toList());
    }

    public NoticeResponse createNotice(NoticeRequest request) {
        Notice notice = request.toEntity();
        Notice savedNotice = noticeRepository.save(notice);
        return new NoticeResponse(savedNotice);
    }

    public NoticeResponse getNoticeById(Long id) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("공지사항을 찾을 수 없습니다. id=" + id));
        return new NoticeResponse(notice);
    }

    public List<NoticeResponse> searchNotices(String keyword) {
        return noticeRepository.findByTitleContaining(keyword)
                .stream()
                .map(NoticeResponse::new)
                .toList();
    }
    // 공지사항 삭제
    public void deleteNotice(Long id) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("공지사항을 찾을 수 없습니다. id=" + id));
        noticeRepository.delete(notice);
    }


}