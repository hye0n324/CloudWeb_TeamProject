package com.example.fitness.community.repository;

import com.example.fitness.community.entity.MateApplication;
import com.example.fitness.community.entity.MatePost;
import com.example.fitness.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MateApplicationRepository extends JpaRepository<MateApplication, Long> {

    boolean existsByPostAndUser(MatePost post, User user);

    Optional<MateApplication> findByPostAndUser(MatePost post, User user);

    List<MateApplication> findAllByPost(MatePost post);

    void deleteByPost(MatePost post);
}
