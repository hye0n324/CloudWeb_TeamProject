package com.example.fitness.community.dto.request;

import com.example.fitness.community.entity.enums.SportCategory;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MatePostRequest {
    @NotBlank(message = "제목을 입력해주세요.")
    private String title;

    @NotBlank(message = "내용을 입력해주세요.")
    private String content;

    @NotNull(message = "카테고리를 선택해주세요.")
    private SportCategory category;

    @NotBlank(message = "지역을 입력해주세요.")
    private String location;

    @NotBlank(message = "일정을 입력해주세요.")
    private String schedule;

    @Min(value = 2, message = "최소 2명 이상이어야 합니다.")
    private int maxMembers;
}
