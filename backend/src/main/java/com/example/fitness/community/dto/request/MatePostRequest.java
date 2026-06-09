package com.example.fitness.community.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MatePostRequest {
    private String title;
    private String content;
    private String location;
    private String date;
    private int maxMembers = 10;
}
