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

    public static MateApplicantResponse from(MateApplication application) {
        return MateApplicantResponse.builder()
                .userId(application.getUser().getId())
                .nickname(application.getUser().getName())
                .appliedAt(application.getCreatedAt())
                .build();
    }
}
