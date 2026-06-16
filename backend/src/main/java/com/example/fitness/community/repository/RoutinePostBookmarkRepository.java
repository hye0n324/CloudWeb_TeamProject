package com.example.fitness.community.repository;

import com.example.fitness.community.entity.RoutinePost;
import com.example.fitness.community.entity.RoutinePostBookmark;
import com.example.fitness.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoutinePostBookmarkRepository extends JpaRepository<RoutinePostBookmark, Long> {
    boolean existsByPostAndUser(RoutinePost post, User user);
    Optional<RoutinePostBookmark> findByPostAndUser(RoutinePost post, User user);
    List<RoutinePostBookmark> findAllByUser(User user);
    void deleteByPost(RoutinePost post);
}
