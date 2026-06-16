package com.example.fitness.community.repository;

import com.example.fitness.community.entity.RoutinePost;
import com.example.fitness.community.entity.RoutinePostLike;
import com.example.fitness.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoutinePostLikeRepository extends JpaRepository<RoutinePostLike, Long> {
    boolean existsByPostAndUser(RoutinePost post, User user);
    Optional<RoutinePostLike> findByPostAndUser(RoutinePost post, User user);
    void deleteByPost(RoutinePost post);
}
