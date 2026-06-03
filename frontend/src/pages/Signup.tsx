import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Phone, Lock, UserCircle, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

import AuthInput from "@/components/ui/AuthInput";
import AuthButton from "@/components/ui/AuthButton";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    verificationCode: "",
    phone: "",
    password: "",
    confirmPassword: "",
    ownerName: ""
  });
  const [status, setStatus] = useState({
    isIdChecking: false,
    isEmailSending: false,
    isCodeVerifying: false,
    isLoading: false
  });
  const [emailAuth, setEmailAuth] = useState({
    isSent: false,
    isVerified: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckId = () => {
    setStatus({ ...status, isIdChecking: true });
    setTimeout(() => setStatus({ ...status, isIdChecking: false }), 1000);
  };

  const handleSendEmail = () => {
    setStatus({ ...status, isEmailSending: true });
    setTimeout(() => {
      setStatus({ ...status, isEmailSending: false });
      setEmailAuth({ ...emailAuth, isSent: true });
    }, 1000);
  };

  const handleVerifyCode = () => {
    setStatus({ ...status, isCodeVerifying: true });
    setTimeout(() => {
      setStatus({ ...status, isCodeVerifying: false });
      setEmailAuth({ ...emailAuth, isVerified: true });
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ ...status, isLoading: true });
    setTimeout(() => setStatus({ ...status, isLoading: false }), 1500);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">회원가입</h2>
          <p className="mt-2 text-sm text-zinc-400 font-medium">
            이메일 인증을 통해 체계적인 피트니스 관리를 시작하세요.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <AuthInput
              label="아이디"
              icon={User}
              name="username"
              type="text"
              required
              placeholder="아이디 입력"
              value={formData.username}
              onChange={handleChange}
            >
              <button
                type="button"
                onClick={handleCheckId}
                disabled={status.isIdChecking}
                className="px-4 py-2.5 bg-neon-500/10 text-neon-500 border border-neon-500/30 rounded-xl text-sm font-bold hover:bg-neon-500/20 transition-colors whitespace-nowrap disabled:opacity-50"
              >
                {status.isIdChecking ? "확인 중..." : "중복확인"}
              </button>
            </AuthInput>

            <AuthInput
              label="이메일"
              icon={Mail}
              name="email"
              type="email"
              required
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              readOnly={emailAuth.isSent || emailAuth.isVerified}
            >
              {!emailAuth.isVerified ? (
                <button
                  type="button"
                  onClick={handleSendEmail}
                  disabled={status.isEmailSending}
                  className="px-4 py-2.5 bg-neon-500/10 text-neon-500 border border-neon-500/30 rounded-xl text-sm font-bold hover:bg-neon-500/20 transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {status.isEmailSending ? "발송 중..." : emailAuth.isSent ? "재발송" : "인증 요청"}
                </button>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-2 bg-green-500/10 text-green-400 border border-green-500/30 rounded-xl text-xs font-bold">
                  <CheckCircle2 size={14} /> 인증됨
                </div>
              )}
            </AuthInput>

            {emailAuth.isSent && !emailAuth.isVerified && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <AuthInput
                  label="인증번호"
                  icon={ShieldCheck}
                  name="verificationCode"
                  type="text"
                  maxLength={6}
                  placeholder="인증번호 6자리"
                  value={formData.verificationCode}
                  onChange={handleChange}
                >
                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={status.isCodeVerifying}
                    className="px-4 py-2.5 bg-zinc-800 text-white rounded-xl text-sm font-bold hover:bg-zinc-700 border border-zinc-700 transition-colors whitespace-nowrap disabled:opacity-50"
                  >
                    {status.isCodeVerifying ? "확인 중..." : "번호 확인"}
                  </button>
                </AuthInput>
              </div>
            )}

            <AuthInput
              label="휴대폰 번호"
              icon={Phone}
              name="phone"
              type="tel"
              required
              placeholder="010-1234-5678"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <AuthInput
                label="비밀번호"
                icon={Lock}
                name="password"
                type="password"
                required
                placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                value={formData.password}
                onChange={handleChange}
              />
              <AuthInput
                label="비밀번호 확인"
                icon={CheckCircle2}
                name="confirmPassword"
                type="password"
                required
                placeholder="재입력"
                value={formData.confirmPassword}
                onChange={handleChange}
                success={
                  formData.password && formData.confirmPassword && formData.password === formData.confirmPassword
                    ? "비밀번호가 일치합니다"
                    : undefined
                }
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <AuthInput
              label="이름"
              icon={UserCircle}
              name="ownerName"
              type="text"
              required
              placeholder="이름을 입력해주세요"
              value={formData.ownerName}
              onChange={handleChange}
            />
          </div>

          <div className="pt-2">
            <AuthButton type="submit" isLoading={status.isLoading} icon={ArrowRight}>
              회원가입하기
            </AuthButton>
          </div>
        </form>

        <div className="mt-8 text-center text-sm font-medium">
          <p className="text-zinc-400">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="text-neon-500 hover:text-neon-400 font-bold ml-1 transition-colors underline underline-offset-4">
              로그인하기
            </Link>
          </p>
        </div>

        <p className="mt-10 text-center text-[10px] text-zinc-600 leading-relaxed px-4">
          가입 시 이용약관 및 개인정보처리방침에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
}
