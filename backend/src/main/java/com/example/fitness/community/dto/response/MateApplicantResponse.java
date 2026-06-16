package com.example.fitness.community.dto.response;

import com.example.fitness.community.entity.MateApplication;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class MateApplicantResponse {
    private Long userId;
    private String nickname;
    private LocalDateTime appliedAt;

    public static MateApplicantResponse from(MateApplication app) {
        return MateApplicantResponse.builder()
                .userId(app.getUser().getId())
                .nickname(app.getUser().getName())
                .appliedAt(app.getCreatedAt())
                .build();
    }
}
