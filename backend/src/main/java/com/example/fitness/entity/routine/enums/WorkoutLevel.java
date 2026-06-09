package com.example.fitness.entity.routine.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.stream.Stream;

public enum WorkoutLevel {
    BEGINNER("초급자"),
    INTERMEDIATE("중급자"),
    ADVANCED("상급자");

    private final String description;

    WorkoutLevel(String description) {
        this.description = description;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }

    @JsonCreator
    public static WorkoutLevel fromString(String value) {
        return Stream.of(WorkoutLevel.values())
                .filter(level -> level.toString().equals(value)
                        || level.description.equals(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown WorkoutLevel : " + value));
    }
}
