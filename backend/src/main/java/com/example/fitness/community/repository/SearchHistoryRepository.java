package com.example.fitness.community.repository;

import com.example.fitness.community.entity.SearchHistory;
import com.example.fitness.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {
    List<SearchHistory> findAllByUserOrderBySearchedAtDesc(User user);
    Optional<SearchHistory> findByUserAndKeyword(User user, String keyword);
    void deleteByUserAndKeyword(User user, String keyword);

    @Query("SELECT s.keyword, COUNT(s) as cnt FROM SearchHistory s GROUP BY s.keyword ORDER BY cnt DESC")
    List<Object[]> findPopularKeywords();
}
