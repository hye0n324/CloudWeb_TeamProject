package com.example.fitness.community.service;

import com.example.fitness.community.dto.request.RoutinePostRequest;
import com.example.fitness.community.dto.response.RoutinePostResponse;
import com.example.fitness.community.entity.RoutinePost;
import com.example.fitness.community.entity.RoutinePostBookmark;
import com.example.fitness.community.entity.RoutinePostLike;
import com.example.fitness.community.entity.enums.BodyTag;
import com.example.fitness.community.repository.RoutinePostBookmarkRepository;
import com.example.fitness.community.repository.RoutinePostLikeRepository;
import com.example.fitness.community.repository.RoutinePostRepository;
import com.example.fitness.entity.User;
import com.example.fitness.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class RoutinePostService {

    private final RoutinePostRepository routinePostRepository;
    private final RoutinePostLikeRepository likeRepository;
    private final RoutinePostBookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<RoutinePostResponse> getPosts(String keyword, String tag, String sort, String username) {
        BodyTag bodyTag = (tag != null) ? BodyTag.valueOf(tag) : null;
        User currentUser = getOptionalUser(username);
        return routinePostRepository.findAllWithFilter(keyword, bodyTag, sort).stream()
                .map(post -> toListResponse(post, currentUser))
                .collect(Collectors.toList());
    }

    public RoutinePostResponse createPost(RoutinePostRequest request, String username) {
        User author = getUser(username);
        RoutinePost post = RoutinePost.builder()
                .author(author)
                .title(request.getTitle())
                .description(request.getDescription())
                .tag(request.getTag())
                .build();
        return RoutinePostResponse.from(routinePostRepository.save(post), false, false);
    }

    @Transactional
    public RoutinePostResponse getPost(Long id, String username) {
        RoutinePost post = findPost(id);
        post.setViewCount(post.getViewCount() + 1);
        User currentUser = getOptionalUser(username);
        boolean liked = currentUser != null && likeRepository.existsByPostAndUser(post, currentUser);
        boolean bookmarked = currentUser != null && bookmarkRepository.existsByPostAndUser(post, currentUser);
        return RoutinePostResponse.from(post, liked, bookmarked);
    }

    public RoutinePostResponse updatePost(Long id, RoutinePostRequest request, String username) {
        RoutinePost post = findPost(id);
        validateAuthor(post.getAuthor().getUsername(), username);
        post.setTitle(request.getTitle());
        post.setDescription(request.getDescription());
        post.setTag(request.getTag());
        return RoutinePostResponse.from(post, null, null);
    }

    public void deletePost(Long id, String username) {
        RoutinePost post = findPost(id);
        validateAuthor(post.getAuthor().getUsername(), username);
        likeRepository.deleteByPost(post);
        bookmarkRepository.deleteByPost(post);
        routinePostRepository.delete(post);
    }

    public Object toggleLike(Long id, String username) {
        RoutinePost post = findPost(id);
        User user = getUser(username);
        boolean liked = likeRepository.existsByPostAndUser(post, user);
        if (liked) {
            likeRepository.findByPostAndUser(post, user).ifPresent(likeRepository::delete);
            post.setLikesCount(post.getLikesCount() - 1);
            return new java.util.HashMap<String, Object>() {{ put("liked", false); put("likesCount", post.getLikesCount()); }};
        } else {
            likeRepository.save(RoutinePostLike.builder().post(post).user(user).build());
            post.setLikesCount(post.getLikesCount() + 1);
            return new java.util.HashMap<String, Object>() {{ put("liked", true); put("likesCount", post.getLikesCount()); }};
        }
    }

    public Object toggleBookmark(Long id, String username) {
        RoutinePost post = findPost(id);
        User user = getUser(username);
        boolean bookmarked = bookmarkRepository.existsByPostAndUser(post, user);
        if (bookmarked) {
            bookmarkRepository.findByPostAndUser(post, user).ifPresent(bookmarkRepository::delete);
            return new java.util.HashMap<String, Object>() {{ put("bookmarked", false); }};
        } else {
            bookmarkRepository.save(RoutinePostBookmark.builder().post(post).user(user).build());
            return new java.util.HashMap<String, Object>() {{ put("bookmarked", true); }};
        }
    }

    @Transactional(readOnly = true)
    public List<RoutinePostResponse> getMyBookmarks(String username) {
        User user = getUser(username);
        return bookmarkRepository.findAllByUser(user).stream()
                .map(b -> toListResponse(b.getPost(), user))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<String> getSuggestions(String keyword) {
        return routinePostRepository.findTitleSuggestions(keyword).stream()
                .limit(5)
                .collect(Collectors.toList());
    }

    private RoutinePostResponse toListResponse(RoutinePost post, User currentUser) {
        boolean liked = currentUser != null && likeRepository.existsByPostAndUser(post, currentUser);
        boolean bookmarked = currentUser != null && bookmarkRepository.existsByPostAndUser(post, currentUser);
        return RoutinePostResponse.from(post, liked, bookmarked);
    }

    private RoutinePost findPost(Long id) {
        return routinePostRepository.findById(id)
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
