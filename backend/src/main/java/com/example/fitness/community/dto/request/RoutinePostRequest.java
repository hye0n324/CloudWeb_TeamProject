package com.example.fitness.community.dto.request;

import com.example.fitness.community.entity.enums.BodyTag;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RoutinePostRequest {
    private String title;
    private String content;
    private BodyTag bodyPart;
}
