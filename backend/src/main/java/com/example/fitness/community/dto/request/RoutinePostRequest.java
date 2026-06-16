package com.example.fitness.community.dto.request;

import com.example.fitness.community.entity.enums.BodyTag;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoutinePostRequest {
    @NotBlank(message = "제목을 입력해주세요.")
    private String title;

    @NotBlank(message = "내용을 입력해주세요.")
    private String description;

    @NotNull(message = "운동 부위를 선택해주세요.")
    private BodyTag tag;
}
