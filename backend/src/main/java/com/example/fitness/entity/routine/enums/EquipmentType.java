package com.example.fitness.entity.routine.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.stream.Stream;

public enum EquipmentType {
    ALL_GYM("전체 (헬스장)"),
    DUMBBELL_ONLY("덤벨만"),
    BODYWEIGHT("맨몸");

    private final String description;

    EquipmentType(String description) {
        this.description = description;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }

    @JsonCreator
    public static EquipmentType fromString(String value) {
        return Stream.of(EquipmentType.values())
                .filter(type -> type.toString().equals(value)
                        || type.description.equals(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown EquipmentType : " + value));
    }
}
