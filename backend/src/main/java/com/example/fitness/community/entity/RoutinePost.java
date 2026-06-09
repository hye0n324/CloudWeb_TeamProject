package com.example.fitness.community.entity;

import com.example.fitness.community.entity.enums.BodyTag;
import com.example.fitness.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "routine_posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoutinePost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User author;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BodyTag tag;

    @Column(nullable = false)
    @Builder.Default
    private int likesCount = 0;

    @Column(nullable = false)
    @Builder.Default
    private int viewCount = 0;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
