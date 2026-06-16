package com.example.fitness.community.service;

import com.example.fitness.community.dto.request.MatePostRequest;
import com.example.fitness.community.dto.response.MateApplicantResponse;
import com.example.fitness.community.dto.response.MatePostResponse;
import com.example.fitness.community.entity.MateApplication;
import com.example.fitness.community.entity.MatePost;
import com.example.fitness.community.entity.enums.RecruitStatus;
import com.example.fitness.community.repository.MateApplicationRepository;
import com.example.fitness.community.repository.MatePostRepository;
import com.example.fitness.entity.User;
import com.example.fitness.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MatePostService {

    private final MatePostRepository matePostRepository;
    private final MateApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<MatePostResponse> getPosts(String keyword, String status, String sort, String username) {
        RecruitStatus recruitStatus = (status != null) ? RecruitStatus.valueOf(status) : null;
        User currentUser = getOptionalUser(username);
        return matePostRepository.findAllWithFilter(keyword, recruitStatus, sort).stream()
                .map(post -> MatePostResponse.from(post,
                        currentUser != null ? applicationRepository.existsByPostAndUser(post, currentUser) : null))
                .collect(Collectors.toList());
    }

    public MatePostResponse createPost(MatePostRequest request, String username) {
        User author = getUser(username);
        MatePost post = MatePost.builder()
                .author(author)
                .title(request.getTitle())
                .content(request.getContent())
                .category(request.getCategory())
                .location(request.getLocation())
                .schedule(request.getSchedule())
                .maxMembers(request.getMaxMembers())
                .build();
        return MatePostResponse.from(matePostRepository.save(post), false);
    }

    @Transactional
    public MatePostResponse getPost(Long id, String username) {
        MatePost post = findPost(id);
        post.setViewCount(post.getViewCount() + 1);
        User currentUser = getOptionalUser(username);
        boolean applied = currentUser != null && applicationRepository.existsByPostAndUser(post, currentUser);
        return MatePostResponse.from(post, applied);
    }

    public MatePostResponse updatePost(Long id, MatePostRequest request, String username) {
        MatePost post = findPost(id);
        validateAuthor(post.getAuthor().getUsername(), username);
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setCategory(request.getCategory());
        post.setLocation(request.getLocation());
        post.setSchedule(request.getSchedule());
        post.setMaxMembers(request.getMaxMembers());
        return MatePostResponse.from(post, null);
    }

    public void deletePost(Long id, String username) {
        MatePost post = findPost(id);
        validateAuthor(post.getAuthor().getUsername(), username);
        applicationRepository.deleteByPost(post);
        matePostRepository.delete(post);
    }

    public Map<String, Object> toggleApply(Long id, String username) {
        MatePost post = findPost(id);
        User user = getUser(username);
        boolean alreadyApplied = applicationRepository.existsByPostAndUser(post, user);

        if (alreadyApplied) {
            applicationRepository.findByPostAndUser(post, user).ifPresent(applicationRepository::delete);
            post.setCurrentMembers(post.getCurrentMembers() - 1);
            if (post.getStatus() == RecruitStatus.마감 && post.getCurrentMembers() < post.getMaxMembers()) {
                post.setStatus(RecruitStatus.모집중);
            }
            return Map.of("applied", false, "currentMembers", post.getCurrentMembers());
        }

        if (post.getStatus() == RecruitStatus.마감) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "모집 정원이 가득 찼습니다.");
        }

        applicationRepository.save(MateApplication.builder().post(post).user(user).build());
        post.setCurrentMembers(post.getCurrentMembers() + 1);
        if (post.getCurrentMembers() >= post.getMaxMembers()) {
            post.setStatus(RecruitStatus.마감);
        }
        return Map.of("applied", true, "currentMembers", post.getCurrentMembers());
    }

    public Map<String, Object> closePost(Long id, String username) {
        MatePost post = findPost(id);
        validateAuthor(post.getAuthor().getUsername(), username);
        post.setStatus(RecruitStatus.마감);
        return Map.of("message", "모집이 마감되었습니다.", "status", "마감");
    }

    @Transactional(readOnly = true)
    public List<MateApplicantResponse> getApplicants(Long id, String username) {
        MatePost post = findPost(id);
        validateAuthor(post.getAuthor().getUsername(), username);
        return applicationRepository.findAllByPost(post).stream()
                .map(MateApplicantResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<String> getSuggestions(String keyword) {
        return matePostRepository.findTitleSuggestions(keyword).stream()
                .limit(5)
                .collect(Collectors.toList());
    }

    private MatePost findPost(Long id) {
        return matePostRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 게시글입니다."));
    }

    private User getUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "사용자를 찾을 수 없습니다."));
    }

    private User getOptionalUser(String username) {
        if (username == null) return null;
        return userRepository.findByUsername(username).orElse(null);
    }

    private void validateAuthor(String authorUsername, String currentUsername) {
        if (!authorUsername.equals(currentUsername)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "수정/삭제 권한이 없습니다.");
        }
    }
}
