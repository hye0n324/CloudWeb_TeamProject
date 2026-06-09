package com.example.fitness.community.repository;

import com.example.fitness.community.entity.SearchHistory;
import com.example.fitness.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {

    List<SearchHistory> findAllByUserOrderBySearchedAtDesc(User user);

    Optional<SearchHistory> findByUserAndKeyword(User user, String keyword);

    void deleteByUserAndKeyword(User user, String keyword);

    @Query("SELECT h.keyword FROM SearchHistory h GROUP BY h.keyword ORDER BY COUNT(h.keyword) DESC")
    List<String> findPopularKeywords(Pageable pageable);
}
