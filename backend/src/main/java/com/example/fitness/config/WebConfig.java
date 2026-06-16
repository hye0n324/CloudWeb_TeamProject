package com.example.fitness.config;

import com.example.fitness.entity.routine.enums.EquipmentType;
import com.example.fitness.entity.routine.enums.WorkoutGoal;
import com.example.fitness.entity.routine.enums.WorkoutLevel;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
        // WorkoutGoal 변환기 등록 ("근성장" -> WorkoutGoal.MUSCLE_GAIN)
        registry.addConverter(String.class, WorkoutGoal.class, WorkoutGoal::fromString);

        // WorkoutLevel 변환기 등록 ("초급자" -> WorkoutLevel.BEGINNER)
        registry.addConverter(String.class, WorkoutLevel.class, WorkoutLevel::fromString);

        // EquipmentType 변환기 등록 ("맨몸" -> EquipmentType.BODYWEIGHT)
        registry.addConverter(String.class, EquipmentType.class, EquipmentType::fromString);
    }

}
