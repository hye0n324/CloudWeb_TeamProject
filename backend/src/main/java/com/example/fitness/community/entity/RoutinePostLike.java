package com.example.fitness.community.entity;

import com.example.fitness.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "routine_post_likes",
       uniqueConstraints = @UniqueConstraint(columnNames = {"post_id", "user_id"}))
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoutinePostLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private RoutinePost post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
