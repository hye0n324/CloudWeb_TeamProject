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
    private String description;
    private BodyTag tag;
    private String authorNickname;
    private int likesCount;
    private int viewCount;
    private Boolean likedByMe;
    private Boolean bookmarkedByMe;
    private LocalDateTime createdAt;

    public static RoutinePostResponse from(RoutinePost post, Boolean likedByMe, Boolean bookmarkedByMe) {
        return RoutinePostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .description(post.getDescription())
                .tag(post.getTag())
                .authorNickname(post.getAuthor().getName())
                .likesCount(post.getLikesCount())
                .viewCount(post.getViewCount())
                .likedByMe(likedByMe)
                .bookmarkedByMe(bookmarkedByMe)
                .createdAt(post.getCreatedAt())
                .build();
    }
}
