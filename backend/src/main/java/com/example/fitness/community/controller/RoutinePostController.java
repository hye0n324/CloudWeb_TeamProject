package com.example.fitness.community.controller;

import com.example.fitness.community.dto.request.RoutinePostRequest;
import com.example.fitness.community.dto.response.RoutinePostResponse;
import com.example.fitness.community.entity.enums.BodyTag;
import com.example.fitness.community.service.RoutinePostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/community/routines")
@RequiredArgsConstructor
public class RoutinePostController {

    private final RoutinePostService routinePostService;

    @GetMapping
    public ResponseEntity<List<RoutinePostResponse>> getPosts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) BodyTag tag,
            @RequestParam(defaultValue = "latest") String sort) {
        return ResponseEntity.ok(routinePostService.getPosts(search, tag, sort, getCurrentUsername()));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createPost(@RequestBody RoutinePostRequest request) {
        RoutinePostResponse response = routinePostService.createPost(request, getCurrentUsername());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("id", response.getId(), "message", "루틴 게시글이 등록되었습니다."));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoutinePostResponse> getPost(@PathVariable Long id) {
        return ResponseEntity.ok(routinePostService.getPost(id, getCurrentUsername()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, String>> updatePost(@PathVariable Long id,
                                                          @RequestBody RoutinePostRequest request) {
        routinePostService.updatePost(id, request, getCurrentUsername());
        return ResponseEntity.ok(Map.of("message", "루틴 게시글이 수정되었습니다."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePost(@PathVariable Long id) {
        routinePostService.deletePost(id, getCurrentUsername());
        return ResponseEntity.ok(Map.of("message", "루틴 게시글이 삭제되었습니다."));
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Map<String, Object>> toggleLike(@PathVariable Long id) {
        return ResponseEntity.ok(routinePostService.toggleLike(id, getCurrentUsername()));
    }

    @GetMapping("/suggestions")
    public ResponseEntity<List<String>> getSuggestions(@RequestParam String keyword) {
        return ResponseEntity.ok(routinePostService.getSuggestions(keyword));
    }

    private String getCurrentUsername() {
        return (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
