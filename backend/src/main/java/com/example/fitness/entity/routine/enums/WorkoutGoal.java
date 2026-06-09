package com.example.fitness.entity.routine.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.stream.Stream;

public enum WorkoutGoal {
    MUSCLE_GAIN("근성장"),
    DIET("다이어트"),
    STRENGTH("스트레칭/유연성"),
    STAMINA("체력 증진");

    private final String description;

    WorkoutGoal(String description) { this.description = description; }

    @JsonValue
    public String getDescription() {
        return description;
    }

    @JsonCreator
    public static WorkoutGoal fromString(String value) {
        return Stream.of(WorkoutGoal.values())
                .filter(goal -> goal.toString().equals(value)
                        || goal.description.equals(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown WorkoutGoal : " + value));
    }
}
