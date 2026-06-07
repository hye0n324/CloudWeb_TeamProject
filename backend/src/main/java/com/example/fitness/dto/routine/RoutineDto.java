package com.example.fitness.dto.routine;

import com.example.fitness.entity.routine.enums.EquipmentType;
import com.example.fitness.entity.routine.enums.WorkoutGoal;
import com.example.fitness.entity.routine.enums.WorkoutLevel;

import java.util.List;

public class RoutineDto {


    // 운동 추천 받기 기초 데이터 [ 응답 데이터 ]
    public record BasicDataResponse(
            List<String> goals,         // 운동 목표 리스트
            List<String> levels,        // 사용자 수준 리스트
            List<String> equipmentTypes // 운동 환경 리스트
    ) {}

    // AI 루틴 추천 [ 요청 데이터 ]
    public record AiRequest(
            WorkoutGoal goal,           // 운동 목표
            WorkoutLevel level,         // 사용자 수준
            EquipmentType equipmentType // 운동 환경
    ) {}

    // AI 루틴 추천 [ 응답 데이터 ] , 루틴 저장/수정
    public record AiResponse(
            String routineName,           // 루틴 이름
            List<ExerciseInfo> exercises  // 상세 운동 목록
    ) {}

    // 운동 상세 정보
    public record ExerciseInfo (
            int sequence,       // 운동 순서
            String name,        // 운동 이름
            String targetPart,  // 타겟 부위
            int sets,           // 세트 수
            int reps            // 횟수
    ){}

    // 저장된 루틴 상세 [ 응답 데이터 ]
    public record Response(
            Long routineId,
            String routineName,
            List<ExerciseInfo> exercise
    ){}


    // 운동 마스터 데이터 [ 응답 데이터 ]
    public record MasterExerciseResponse(
            String name,
            String targetPart
    ) {}
}
