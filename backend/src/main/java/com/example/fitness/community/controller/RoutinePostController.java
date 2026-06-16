package com.example.fitness.community.controller;

import com.example.fitness.community.dto.request.RoutinePostRequest;
import com.example.fitness.community.dto.response.RoutinePostResponse;
import com.example.fitness.community.service.RoutinePostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    public List<RoutinePostResponse> getPosts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String tag,
            @RequestParam(defaultValue = "latest") String sort) {
        return routinePostService.getPosts(search, tag, sort, getCurrentUsername());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createPost(@Valid @RequestBody RoutinePostRequest request) {
        RoutinePostResponse response = routinePostService.createPost(request, getCurrentUsername());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("id", response.getId(), "message", "게시글이 등록되었습니다."));
    }

    @GetMapping("/{id}")
    public RoutinePostResponse getPost(@PathVariable Long id) {
        return routinePostService.getPost(id, getCurrentUsername());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, String>> updatePost(
            @PathVariable Long id,
            @Valid @RequestBody RoutinePostRequest request) {
        routinePostService.updatePost(id, request, getCurrentUsername());
        return ResponseEntity.ok(Map.of("message", "수정되었습니다."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePost(@PathVariable Long id) {
        routinePostService.deletePost(id, getCurrentUsername());
        return ResponseEntity.ok(Map.of("message", "삭제되었습니다."));
    }

    @PostMapping("/{id}/like")
    public Object toggleLike(@PathVariable Long id) {
        return routinePostService.toggleLike(id, getCurrentUsername());
    }

    @PostMapping("/{id}/bookmark")
    public Object toggleBookmark(@PathVariable Long id) {
        return routinePostService.toggleBookmark(id, getCurrentUsername());
    }

    @GetMapping("/suggestions")
    public List<String> getSuggestions(@RequestParam String keyword) {
        return routinePostService.getSuggestions(keyword);
    }

    @GetMapping("/bookmarks")
    public List<RoutinePostResponse> getMyBookmarks() {
        return routinePostService.getMyBookmarks(getCurrentUsername());
    }

    private String getCurrentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            return null;
        }
        return (String) auth.getPrincipal();
    }
}
