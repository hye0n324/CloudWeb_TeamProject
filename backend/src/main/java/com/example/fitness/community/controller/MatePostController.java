package com.example.fitness.community.controller;

import com.example.fitness.community.dto.request.MatePostRequest;
import com.example.fitness.community.dto.response.MateApplicantResponse;
import com.example.fitness.community.dto.response.MatePostResponse;
import com.example.fitness.community.entity.enums.RecruitStatus;
import com.example.fitness.community.service.MatePostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<MatePostResponse>> getPosts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) RecruitStatus status,
            @RequestParam(defaultValue = "latest") String sort) {
        return ResponseEntity.ok(matePostService.getPosts(search, status, sort, getCurrentUsername()));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createPost(@RequestBody MatePostRequest request) {
        MatePostResponse response = matePostService.createPost(request, getCurrentUsername());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("id", response.getId(), "message", "메이트 게시글이 등록되었습니다."));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatePostResponse> getPost(@PathVariable Long id) {
        return ResponseEntity.ok(matePostService.getPost(id, getCurrentUsername()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, String>> updatePost(@PathVariable Long id,
                                                          @RequestBody MatePostRequest request) {
        matePostService.updatePost(id, request, getCurrentUsername());
        return ResponseEntity.ok(Map.of("message", "메이트 게시글이 수정되었습니다."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePost(@PathVariable Long id) {
        matePostService.deletePost(id, getCurrentUsername());
        return ResponseEntity.ok(Map.of("message", "메이트 게시글이 삭제되었습니다."));
    }

    @PostMapping("/{id}/apply")
    public ResponseEntity<Map<String, Object>> toggleApply(@PathVariable Long id) {
        return ResponseEntity.ok(matePostService.toggleApply(id, getCurrentUsername()));
    }

    @PatchMapping("/{id}/close")
    public ResponseEntity<Map<String, String>> closePost(@PathVariable Long id) {
        matePostService.closePost(id, getCurrentUsername());
        return ResponseEntity.ok(Map.of("message", "모집이 마감되었습니다.", "status", "CLOSED"));
    }

    @GetMapping("/{id}/applicants")
    public ResponseEntity<List<MateApplicantResponse>> getApplicants(@PathVariable Long id) {
        return ResponseEntity.ok(matePostService.getApplicants(id, getCurrentUsername()));
    }

    @GetMapping("/suggestions")
    public ResponseEntity<List<String>> getSuggestions(@RequestParam String keyword) {
        return ResponseEntity.ok(matePostService.getSuggestions(keyword));
    }

    private String getCurrentUsername() {
        return (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
