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
public class MatePostService {

    private final MatePostRepository matePostRepository;
    private final MateApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<MatePostResponse> getPosts(String keyword, RecruitStatus status, String sort, String username) {
        List<MatePost> posts = matePostRepository.findAllWithFilter(keyword, status, sort);
        User user = findUser(username);
        return posts.stream()
                .map(p -> MatePostResponse.from(p, applicationRepository.existsByPostAndUser(p, user)))
                .collect(Collectors.toList());
    }

    @Transactional
    public MatePostResponse createPost(MatePostRequest request, String username) {
        User user = findUser(username);
        MatePost post = MatePost.builder()
                .author(user)
                .title(request.getTitle())
                .content(request.getContent())
                .location(request.getLocation())
                .date(request.getDate())
                .maxMembers(request.getMaxMembers() > 0 ? request.getMaxMembers() : 10)
                .build();
        matePostRepository.save(post);
        return MatePostResponse.from(post, false);
    }

    @Transactional
    public MatePostResponse getPost(Long id, String username) {
        MatePost post = findPost(id);
        post.setViewCount(post.getViewCount() + 1);
        User user = findUser(username);
        return MatePostResponse.from(post, applicationRepository.existsByPostAndUser(post, user));
    }

    @Transactional
    public void updatePost(Long id, MatePostRequest request, String username) {
        MatePost post = findPost(id);
        validateAuthor(post.getAuthor().getUsername(), username);
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setLocation(request.getLocation());
        post.setDate(request.getDate());
        if (request.getMaxMembers() > 0) post.setMaxMembers(request.getMaxMembers());
    }

    @Transactional
    public void deletePost(Long id, String username) {
        MatePost post = findPost(id);
        validateAuthor(post.getAuthor().getUsername(), username);
        applicationRepository.deleteByPost(post);
        matePostRepository.delete(post);
    }

    @Transactional
    public Map<String, Object> toggleApply(Long id, String username) {
        MatePost post = findPost(id);
        if (post.getStatus() == RecruitStatus.CLOSED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "모집이 마감된 게시글입니다.");
        }
        User user = findUser(username);
        boolean applied;
        if (applicationRepository.existsByPostAndUser(post, user)) {
            applicationRepository.findByPostAndUser(post, user).ifPresent(applicationRepository::delete);
            post.setCurrentMembers(post.getCurrentMembers() - 1);
            applied = false;
        } else {
            applicationRepository.save(MateApplication.builder().post(post).user(user).build());
            post.setCurrentMembers(post.getCurrentMembers() + 1);
            applied = true;
            if (post.getCurrentMembers() >= post.getMaxMembers()) {
                post.setStatus(RecruitStatus.CLOSED);
            }
        }
        Map<String, Object> result = new HashMap<>();
        result.put("applied", applied);
        result.put("currentMembers", post.getCurrentMembers());
        return result;
    }

    @Transactional
    public void closePost(Long id, String username) {
        MatePost post = findPost(id);
        validateAuthor(post.getAuthor().getUsername(), username);
        post.setStatus(RecruitStatus.CLOSED);
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
        if (keyword == null || keyword.isBlank()) return List.of();
        return matePostRepository.findTitleSuggestions(keyword);
    }

    private MatePost findPost(Long id) {
        return matePostRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "메이트 게시글을 찾을 수 없습니다."));
    }

    private User findUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."));
    }

    private void validateAuthor(String authorUsername, String currentUsername) {
        if (!authorUsername.equals(currentUsername)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "작성자만 수정/삭제할 수 있습니다.");
        }
    }
}
