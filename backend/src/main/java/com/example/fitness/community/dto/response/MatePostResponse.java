package com.example.fitness.community.dto.response;

import com.example.fitness.community.entity.MatePost;
import com.example.fitness.community.entity.enums.RecruitStatus;
import com.example.fitness.community.entity.enums.SportCategory;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class MatePostResponse {
    private Long id;
    private String title;
    private String content;
    private SportCategory category;
    private String location;
    private String schedule;
    private int currentMembers;
    private int maxMembers;
    private RecruitStatus status;
    private int viewCount;
    private Boolean appliedByMe;
    private String authorNickname;
    private LocalDateTime createdAt;

    public static MatePostResponse from(MatePost post, Boolean appliedByMe) {
        return MatePostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .category(post.getCategory())
                .location(post.getLocation())
                .schedule(post.getSchedule())
                .currentMembers(post.getCurrentMembers())
                .maxMembers(post.getMaxMembers())
                .status(post.getStatus())
                .viewCount(post.getViewCount())
                .appliedByMe(appliedByMe)
                .authorNickname(post.getAuthor().getName())
                .createdAt(post.getCreatedAt())
                .build();
    }
}
