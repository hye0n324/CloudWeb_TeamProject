package com.example.fitness.community.controller;

import com.example.fitness.community.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/community/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/history")
    public ResponseEntity<List<String>> getHistory() {
        return ResponseEntity.ok(searchService.getHistory(getCurrentUsername()));
    }

    @PostMapping("/history")
    public ResponseEntity<Map<String, String>> saveHistory(@RequestParam String keyword) {
        searchService.saveHistory(getCurrentUsername(), keyword);
        return ResponseEntity.ok(Map.of("message", "검색 기록이 저장되었습니다."));
    }

    @DeleteMapping("/history/{keyword}")
    public ResponseEntity<Map<String, String>> deleteHistory(@PathVariable String keyword) {
        searchService.deleteHistory(getCurrentUsername(), keyword);
        return ResponseEntity.ok(Map.of("message", "검색 기록이 삭제되었습니다."));
    }

    @GetMapping("/popular")
    public ResponseEntity<List<String>> getPopularKeywords() {
        return ResponseEntity.ok(searchService.getPopularKeywords());
    }

    private String getCurrentUsername() {
        return (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
