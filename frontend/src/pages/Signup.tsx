import { Link } from "react-router-dom";
import { User, Mail, Phone, Lock, UserCircle, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

import AuthInput from "@/components/ui/AuthInput";
import AuthButton from "@/components/ui/AuthButton";
import { useSignupForm } from "@/hooks/useSignupForm";

export default function Signup() {
  const { form, emailAuth, status, actions } = useSignupForm();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">회원가입</h2>
          <p className="mt-2 text-sm text-zinc-400 font-medium">
            이메일 인증을 통해 체계적인 피트니스 관리를 시작하세요.
          </p>
        </div>

        <form className="space-y-6" onSubmit={form.handleSubmit}>
          <div className="space-y-4">
            <AuthInput
              label="아이디"
              icon={User}
              name="username"
              type="text"
              required
              placeholder="아이디 입력"
              value={form.data.username}
              onChange={form.handleChange}
              error={form.errors.username}
              success={form.success.username}
            />

            <AuthInput
              label="이메일"
              icon={Mail}
              name="email"
              type="email"
              required
              placeholder="example@mail.com"
              value={form.data.email}
              onChange={form.handleChange}
              error={form.errors.email}
              success={form.success.email}
            />

            <AuthInput
              label="휴대폰 번호"
              icon={Phone}
              name="phone"
              type="tel"
              required
              placeholder="010-1234-5678"
              value={form.data.phone}
              onChange={form.handleChange}
              error={form.errors.phone}
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
                value={form.data.password}
                onChange={form.handleChange}
                error={form.errors.password}
                success={form.success.password}
              />
              <AuthInput
                label="비밀번호 확인"
                icon={CheckCircle2}
                name="confirmPassword"
                type="password"
                required
                placeholder="재입력"
                value={form.data.confirmPassword}
                onChange={form.handleChange}
                error={form.errors.confirmPassword}
                success={
                  form.data.password && form.data.confirmPassword && form.data.password === form.data.confirmPassword
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
              value={form.data.ownerName}
              onChange={form.handleChange}
              error={form.errors.ownerName}
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
