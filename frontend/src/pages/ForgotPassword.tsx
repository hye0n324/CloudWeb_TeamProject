import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Mail, ShieldCheck, Lock, CheckCircle2, ArrowRight } from "lucide-react";

import AuthInput from "@/components/ui/AuthInput";
import AuthButton from "@/components/ui/AuthButton";

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type"); // "find-id" | "reset-pw"
  const isFindId = type === "find-id";
  const pageTitle = isFindId ? "아이디 찾기" : "비밀번호 재설정";

  const [step, setStep] = useState<"email" | "code" | "reset" | "success">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [foundId, setFoundId] = useState("");

  const handleRequestCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("code");
    }, 1000);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (isFindId) {
        setFoundId("user_titan123"); // Mock ID
        setStep("success");
      } else {
        setStep("reset");
      }
    }, 1000);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {step === "email" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-white tracking-tight">{pageTitle}</h2>
              <p className="mt-2 text-sm text-zinc-400 font-medium">
                가입 시 등록한 이메일을 입력해 주세요.
              </p>
            </div>

            <form onSubmit={handleRequestCode} className="space-y-6">
              <AuthInput
                label="이메일"
                icon={Mail}
                name="email"
                type="email"
                required
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="pt-2">
                <AuthButton type="submit" isLoading={isLoading}>
                  인증번호 받기
                </AuthButton>
              </div>
            </form>

            <div className="mt-8 text-center text-sm font-medium">
              <Link to="/login" className="text-zinc-400 hover:text-neon-500 transition-colors">
                로그인으로 돌아가기
              </Link>
            </div>
          </div>
        )}

        {step === "code" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-white tracking-tight">인증번호 입력</h2>
              <p className="mt-2 text-sm text-zinc-400 font-medium">
                <span className="text-neon-500">{email}</span>으로<br />전송된 6자리 인증번호를 입력해 주세요.
              </p>
            </div>

            <form onSubmit={handleVerifyCode} className="space-y-6">
              <AuthInput
                label="인증번호"
                icon={ShieldCheck}
                name="code"
                type="text"
                required
                maxLength={6}
                placeholder="인증번호 6자리"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <div className="pt-2">
                <AuthButton type="submit" isLoading={isLoading}>
                  인증번호 확인
                </AuthButton>
              </div>
            </form>

            <div className="mt-8 text-center text-sm font-medium">
              <Link to="/login" className="text-zinc-400 hover:text-neon-500 transition-colors">
                로그인으로 돌아가기
              </Link>
            </div>
          </div>
        )}

        {step === "reset" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-white tracking-tight">새 비밀번호 설정</h2>
              <p className="mt-2 text-sm text-zinc-400 font-medium">
                새롭게 사용할 비밀번호를 입력해 주세요.
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <AuthInput
                label="새 비밀번호"
                icon={Lock}
                name="password"
                type="password"
                required
                placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <AuthInput
                label="비밀번호 확인"
                icon={CheckCircle2}
                name="confirmPassword"
                type="password"
                required
                placeholder="재입력"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                success={
                  password && confirmPassword && password === confirmPassword
                    ? "비밀번호가 일치합니다"
                    : undefined
                }
              />
              <div className="pt-4">
                <AuthButton type="submit" isLoading={isLoading} icon={ArrowRight}>
                  비밀번호 변경하기
                </AuthButton>
              </div>
            </form>
          </div>
        )}

        {step === "success" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-neon-500/10 rounded-full flex items-center justify-center border border-neon-500/30">
                <CheckCircle2 className="w-8 h-8 text-neon-500" />
              </div>
            </div>
            
            {isFindId ? (
              <>
                <h2 className="text-2xl font-extrabold text-white mb-2">아이디 찾기 완료</h2>
                <p className="text-sm text-zinc-400 mb-6">고객님의 아이디 정보입니다.</p>
                <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 mb-8">
                  <p className="text-lg font-bold text-white tracking-wider">{foundId}</p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-extrabold text-white mb-2">비밀번호 변경 완료</h2>
                <p className="text-sm text-zinc-400 mb-8">
                  비밀번호가 성공적으로 변경되었습니다.<br />새로운 비밀번호로 로그인해 주세요.
                </p>
              </>
            )}

            <AuthButton to="/login" icon={ArrowRight}>
              로그인하러 가기
            </AuthButton>
          </div>
        )}
      </div>
    </div>
  );
}
