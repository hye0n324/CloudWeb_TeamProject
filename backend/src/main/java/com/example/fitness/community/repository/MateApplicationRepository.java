package com.example.fitness.community.repository;

import com.example.fitness.community.entity.MateApplication;
import com.example.fitness.community.entity.MatePost;
import com.example.fitness.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MateApplicationRepository extends JpaRepository<MateApplication, Long> {
    boolean existsByPostAndUser(MatePost post, User user);
    Optional<MateApplication> findByPostAndUser(MatePost post, User user);
    void deleteByPost(MatePost post);

    @Query("SELECT a FROM MateApplication a JOIN FETCH a.user WHERE a.post = :post")
    List<MateApplication> findAllByPost(@Param("post") MatePost post);
}
