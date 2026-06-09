package com.example.fitness.community.dto.response;

import com.example.fitness.community.entity.RoutinePost;
import com.example.fitness.community.entity.enums.BodyTag;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class RoutinePostResponse {
    private Long id;
    private String title;
    private String content;
    private BodyTag bodyPart;
    private String author;
    private int likesCount;
    private int viewCount;
    private Boolean likedByMe;
    private LocalDateTime createdAt;

    public static RoutinePostResponse from(RoutinePost post, Boolean likedByMe) {
        return RoutinePostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getDescription())
                .bodyPart(post.getTag())
                .author(post.getAuthor().getName())
                .likesCount(post.getLikesCount())
                .viewCount(post.getViewCount())
                .likedByMe(likedByMe)
                .createdAt(post.getCreatedAt())
                .build();
    }
}
