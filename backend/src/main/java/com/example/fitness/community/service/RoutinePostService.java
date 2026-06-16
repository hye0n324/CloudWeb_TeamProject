package com.example.fitness.community.service;

import com.example.fitness.community.dto.request.RoutinePostRequest;
import com.example.fitness.community.dto.response.RoutinePostResponse;
import com.example.fitness.community.entity.RoutinePost;
import com.example.fitness.community.entity.RoutinePostLike;
import com.example.fitness.community.entity.enums.BodyTag;
import com.example.fitness.community.repository.RoutinePostLikeRepository;
import com.example.fitness.community.repository.RoutinePostRepository;
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
public class RoutinePostService {

    private final RoutinePostRepository routinePostRepository;
    private final RoutinePostLikeRepository likeRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<RoutinePostResponse> getPosts(String keyword, BodyTag tag, String sort, String username) {
        List<RoutinePost> posts = routinePostRepository.findAllWithFilter(keyword, tag, sort);
        User user = findUser(username);
        return posts.stream()
                .map(p -> RoutinePostResponse.from(p, likeRepository.existsByPostAndUser(p, user)))
                .collect(Collectors.toList());
    }

    @Transactional
    public RoutinePostResponse createPost(RoutinePostRequest request, String username) {
        User user = findUser(username);
        RoutinePost post = RoutinePost.builder()
                .author(user)
                .title(request.getTitle())
                .description(request.getContent())
                .tag(request.getBodyPart())
                .build();
        routinePostRepository.save(post);
        return RoutinePostResponse.from(post, false);
    }

    @Transactional
    public RoutinePostResponse getPost(Long id, String username) {
        RoutinePost post = findPost(id);
        post.setViewCount(post.getViewCount() + 1);
        User user = findUser(username);
        return RoutinePostResponse.from(post, likeRepository.existsByPostAndUser(post, user));
    }

    @Transactional
    public void updatePost(Long id, RoutinePostRequest request, String username) {
        RoutinePost post = findPost(id);
        validateAuthor(post.getAuthor().getUsername(), username);
        post.setTitle(request.getTitle());
        post.setDescription(request.getContent());
        post.setTag(request.getBodyPart());
    }

    @Transactional
    public void deletePost(Long id, String username) {
        RoutinePost post = findPost(id);
        validateAuthor(post.getAuthor().getUsername(), username);
        likeRepository.deleteByPost(post);
        routinePostRepository.delete(post);
    }

    @Transactional
    public Map<String, Object> toggleLike(Long id, String username) {
        RoutinePost post = findPost(id);
        User user = findUser(username);
        boolean liked;
        if (likeRepository.existsByPostAndUser(post, user)) {
            likeRepository.findByPostAndUser(post, user).ifPresent(likeRepository::delete);
            post.setLikesCount(post.getLikesCount() - 1);
            liked = false;
        } else {
            likeRepository.save(RoutinePostLike.builder().post(post).user(user).build());
            post.setLikesCount(post.getLikesCount() + 1);
            liked = true;
        }
        Map<String, Object> result = new HashMap<>();
        result.put("liked", liked);
        result.put("likesCount", post.getLikesCount());
        return result;
    }

    @Transactional(readOnly = true)
    public List<String> getSuggestions(String keyword) {
        if (keyword == null || keyword.isBlank()) return List.of();
        return routinePostRepository.findTitleSuggestions(keyword);
    }

    private RoutinePost findPost(Long id) {
        return routinePostRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "루틴 게시글을 찾을 수 없습니다."));
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
