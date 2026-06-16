package com.example.fitness.community.controller;

import com.example.fitness.community.entity.SearchHistory;
import com.example.fitness.community.repository.SearchHistoryRepository;
import com.example.fitness.entity.User;
import com.example.fitness.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/community/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchHistoryRepository searchHistoryRepository;
    private final UserRepository userRepository;

    @GetMapping("/history")
    @Transactional(readOnly = true)
    public List<String> getHistory() {
        User user = getUser();
        return searchHistoryRepository.findAllByUserOrderBySearchedAtDesc(user).stream()
                .map(SearchHistory::getKeyword)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/history/{keyword}")
    @Transactional
    public ResponseEntity<Map<String, String>> deleteHistory(@PathVariable String keyword) {
        User user = getUser();
        searchHistoryRepository.deleteByUserAndKeyword(user, keyword);
        return ResponseEntity.ok(Map.of("message", "삭제되었습니다."));
    }

    @GetMapping("/popular")
    @Transactional(readOnly = true)
    public List<String> getPopularKeywords() {
        return searchHistoryRepository.findPopularKeywords().stream()
                .limit(5)
                .map(row -> (String) row[0])
                .collect(Collectors.toList());
    }

    @PostMapping("/history")
    @Transactional
    public ResponseEntity<Void> saveHistory(@RequestParam String keyword) {
        User user = getUser();
        searchHistoryRepository.findByUserAndKeyword(user, keyword).ifPresentOrElse(
                existing -> {},
                () -> searchHistoryRepository.save(
                        SearchHistory.builder().user(user).keyword(keyword).build())
        );
        return ResponseEntity.ok().build();
    }

    private User getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = (String) auth.getPrincipal();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
    }
}
