package com.example.fitness.community.controller;

import com.example.fitness.community.dto.request.MatePostRequest;
import com.example.fitness.community.dto.response.MateApplicantResponse;
import com.example.fitness.community.dto.response.MatePostResponse;
import com.example.fitness.community.service.MatePostService;
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
@RequestMapping("/api/community/mates")
@RequiredArgsConstructor
public class MatePostController {

    private final MatePostService matePostService;

    @GetMapping
    public List<MatePostResponse> getPosts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "latest") String sort) {
        return matePostService.getPosts(search, status, sort, getCurrentUsername());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createPost(@Valid @RequestBody MatePostRequest request) {
        MatePostResponse response = matePostService.createPost(request, getCurrentUsername());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("id", response.getId(), "message", "모집글이 등록되었습니다."));
    }

    @GetMapping("/{id}")
    public MatePostResponse getPost(@PathVariable Long id) {
        return matePostService.getPost(id, getCurrentUsername());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, String>> updatePost(
            @PathVariable Long id,
            @Valid @RequestBody MatePostRequest request) {
        matePostService.updatePost(id, request, getCurrentUsername());
        return ResponseEntity.ok(Map.of("message", "수정되었습니다."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePost(@PathVariable Long id) {
        matePostService.deletePost(id, getCurrentUsername());
        return ResponseEntity.ok(Map.of("message", "삭제되었습니다."));
    }

    @PostMapping("/{id}/apply")
    public Map<String, Object> toggleApply(@PathVariable Long id) {
        return matePostService.toggleApply(id, getCurrentUsername());
    }

    @PatchMapping("/{id}/close")
    public Map<String, Object> closePost(@PathVariable Long id) {
        return matePostService.closePost(id, getCurrentUsername());
    }

    @GetMapping("/{id}/applicants")
    public List<MateApplicantResponse> getApplicants(@PathVariable Long id) {
        return matePostService.getApplicants(id, getCurrentUsername());
    }

    @GetMapping("/suggestions")
    public List<String> getSuggestions(@RequestParam String keyword) {
        return matePostService.getSuggestions(keyword);
    }

    private String getCurrentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            return null;
        }
        return (String) auth.getPrincipal();
    }
}
