// import axios from 'axios';
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// 유틸리티: 임의의 딜레이(가짜 통신 지연)를 생성하는 함수
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const login = async (username: string, password: string) => {
  await delay(1000);
  
  // 가짜 로그인 성공 조건
  if (username === "admin" && password === "Admin123!") {
    return {
      ok: true,
      accessToken: "fake-access-token",
      refreshToken: "fake-refresh-token",
      user: {
        id: "1",
        username: "admin",
        email: "admin@kcal.com",
        ownerName: "관리자",
      },
    };
  }
  
  return {
    ok: false,
    message: "아이디 또는 비밀번호가 일치하지 않습니다. (테스트 계정: admin / Admin123!)",
  };
};

export const checkIdAvailability = async (username: string) => {
  await delay(500);
  if (username === "admin" || username === "test") {
    return { ok: false, message: "이미 사용 중인 아이디입니다." };
  }
  return { ok: true };
};

export const requestEmailVerification = async (email: string, type: string): Promise<{ok: boolean, message?: string}> => {
  await delay(1000);
  console.log(`[Mock API] ${email}로 인증번호 전송 완료 (타입: ${type})`);
  return { ok: true };
};

export const verifyEmailCode = async (email: string, code: string, type: string) => {
  await delay(1000);
  // 데모용 고정 인증번호
  if (code === "123456") {
    return { ok: true, signupToken: "fake-signup-token" };
  }
  return { ok: false, message: "인증번호가 일치하지 않습니다. (데모: 123456)" };
};

export const signup = async (data: any, signupToken: string): Promise<{ok: boolean, message?: string}> => {
  await delay(1500);
  console.log("[Mock API] 회원가입 요청 데이터:", data, "토큰:", signupToken);
  return { ok: true };
};
