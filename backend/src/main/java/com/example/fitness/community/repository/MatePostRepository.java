package com.example.fitness.community.repository;

import com.example.fitness.community.entity.MatePost;
import com.example.fitness.community.entity.enums.RecruitStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MatePostRepository extends JpaRepository<MatePost, Long> {

    @Query("SELECT p FROM MatePost p WHERE " +
           "(:keyword IS NULL OR p.title LIKE %:keyword%) AND " +
           "(:status IS NULL OR p.status = :status) " +
           "ORDER BY " +
           "CASE WHEN :sort = 'views' THEN p.viewCount END DESC, " +
           "p.createdAt DESC")
    List<MatePost> findAllWithFilter(
            @Param("keyword") String keyword,
            @Param("status") RecruitStatus status,
            @Param("sort") String sort
    );

    @Query("SELECT DISTINCT p.title FROM MatePost p WHERE p.title LIKE %:keyword% ORDER BY p.title")
    List<String> findTitleSuggestions(@Param("keyword") String keyword);
}
