package com.example.fitness.community.service;

import com.example.fitness.community.entity.SearchHistory;
import com.example.fitness.community.repository.SearchHistoryRepository;
import com.example.fitness.entity.User;
import com.example.fitness.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final SearchHistoryRepository searchHistoryRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<String> getHistory(String username) {
        User user = findUser(username);
        return searchHistoryRepository.findAllByUserOrderBySearchedAtDesc(user).stream()
                .map(SearchHistory::getKeyword)
                .collect(Collectors.toList());
    }

    @Transactional
    public void saveHistory(String username, String keyword) {
        User user = findUser(username);
        searchHistoryRepository.findByUserAndKeyword(user, keyword)
                .ifPresent(searchHistoryRepository::delete);
        searchHistoryRepository.save(SearchHistory.builder().user(user).keyword(keyword).build());
    }

    @Transactional
    public void deleteHistory(String username, String keyword) {
        User user = findUser(username);
        searchHistoryRepository.deleteByUserAndKeyword(user, keyword);
    }

    @Transactional(readOnly = true)
    public List<String> getPopularKeywords() {
        return searchHistoryRepository.findPopularKeywords(PageRequest.of(0, 10));
    }

    private User findUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."));
    }
}
