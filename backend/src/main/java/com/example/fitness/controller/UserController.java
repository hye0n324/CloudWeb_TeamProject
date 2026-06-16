package com.example.fitness.controller;

import com.example.fitness.config.JwtTokenProvider;
import com.example.fitness.dto.LoginRequest;
import com.example.fitness.entity.User;
import com.example.fitness.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        userService.join(user);
        return "회원가입 성공";
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        boolean isAuthenticated = userService.login(loginRequest.getUsername(), loginRequest.getPassword());

        if (isAuthenticated) {
            String token = jwtTokenProvider.createToken(loginRequest.getUsername());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(401).body("로그인 실패: 아이디나 비밀번호를 확인하세요.");
        }
    }
}
