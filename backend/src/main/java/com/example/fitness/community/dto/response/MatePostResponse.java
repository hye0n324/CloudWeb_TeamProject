package com.example.fitness.community.dto.response;

import com.example.fitness.community.entity.MatePost;
import com.example.fitness.community.entity.enums.RecruitStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class MatePostResponse {
    private Long id;
    private String title;
    private String content;
    private String location;
    private String date;
    private int currentMembers;
    private int maxMembers;
    private RecruitStatus status;
    private int viewCount;
    private Boolean appliedByMe;
    private String author;
    private LocalDateTime createdAt;

    public static MatePostResponse from(MatePost post, Boolean appliedByMe) {
        return MatePostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .location(post.getLocation())
                .date(post.getDate())
                .currentMembers(post.getCurrentMembers())
                .maxMembers(post.getMaxMembers())
                .status(post.getStatus())
                .viewCount(post.getViewCount())
                .appliedByMe(appliedByMe)
                .author(post.getAuthor().getName())
                .createdAt(post.getCreatedAt())
                .build();
    }
}
