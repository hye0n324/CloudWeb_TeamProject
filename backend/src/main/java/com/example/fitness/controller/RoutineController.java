package com.example.fitness.controller;


import com.example.fitness.dto.routine.RoutineDto;
import com.example.fitness.service.routine.AiRoutineService;
import com.example.fitness.service.routine.RoutineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RoutineController {

    private final RoutineService routineService;
    private final AiRoutineService aiRoutineService;

    // 화면 1용 API
    // 1. 기초 데이터 조회 (목표/수준/장비 리스트)
    @GetMapping("/api/routines/basic-data")
    public ResponseEntity<RoutineDto.BasicDataResponse> getBasicData() {
        return ResponseEntity.ok(routineService.getBasicData());
    }

    // 2. AI 루틴 추천
    @GetMapping("/api/routines/recommend")
    public ResponseEntity<RoutineDto.AiResponse> getAiRecommend(
            @ModelAttribute RoutineDto.AiRequest request
    ) {
        return ResponseEntity.ok(aiRoutineService.generateRoutine(request));
    }

    // 3. 루틴 저장 / 추가
    @PostMapping("/api/routines")
    public ResponseEntity<RoutineDto.Response> saveRoutine(
            Authentication authentication,
            @RequestBody RoutineDto.AiResponse request
    ) {
        String username = authentication.getName();
        return ResponseEntity.ok(routineService.saveRoutine(username, request));
    }

    // 화면 2용 API
    // 4. 내 운동 루틴 전체 조회
    @GetMapping("/api/routines/me")
    public ResponseEntity<List<RoutineDto.Response>> getMyRoutines(
            Authentication authentication
    ) {
        String username = authentication.getName();
        return ResponseEntity.ok(routineService.getMyRoutines(username));
    }

    // 5. 운동 마스터 데이터 가져오기
    @GetMapping("/api/exercises")
    public ResponseEntity<List<RoutineDto.MasterExerciseResponse>> getMasterExercises() {
        return ResponseEntity.ok(routineService.getMasterExercises());
    }

    // 6. 내 운동 루틴 삭제
    @DeleteMapping("/api/routines/{routineId}")
    public ResponseEntity<Void> deleteRoutine(
            Authentication authentication,
            @PathVariable Long routineId
    ) {
        String username = authentication.getName();
        routineService.deleteRoutine(username, routineId);
        return ResponseEntity.ok().build();
    }

    // 7. 내 운동 루틴 수정
    @PutMapping("/api/routines/{routineId}")
    public ResponseEntity<RoutineDto.Response> updateRoutine(
            Authentication authentication,
            @PathVariable Long routineId,
            @RequestBody RoutineDto.AiResponse request
    ) {
        String username = authentication.getName();
        return ResponseEntity.ok(routineService.updateRoutine(username, routineId, request));
    }
}
