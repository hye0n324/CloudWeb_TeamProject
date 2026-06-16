package com.example.fitness.community.repository;

import com.example.fitness.community.entity.RoutinePost;
import com.example.fitness.community.entity.enums.BodyTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoutinePostRepository extends JpaRepository<RoutinePost, Long> {

    @Query("SELECT p FROM RoutinePost p WHERE " +
           "(:keyword IS NULL OR p.title LIKE %:keyword%) AND " +
           "(:tag IS NULL OR p.tag = :tag) " +
           "ORDER BY " +
           "CASE WHEN :sort = 'popular' THEN p.likesCount END DESC, " +
           "CASE WHEN :sort = 'views' THEN p.viewCount END DESC, " +
           "p.createdAt DESC")
    List<RoutinePost> findAllWithFilter(
            @Param("keyword") String keyword,
            @Param("tag") BodyTag tag,
            @Param("sort") String sort
    );

    @Query("SELECT DISTINCT p.title FROM RoutinePost p WHERE p.title LIKE %:keyword% ORDER BY p.title")
    List<String> findTitleSuggestions(@Param("keyword") String keyword);
}
