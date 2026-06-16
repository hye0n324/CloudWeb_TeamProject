import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";

import AuthInput from "@/components/ui/AuthInput";
import AuthButton from "@/components/ui/AuthButton";
import { useLoginForm } from "@/hooks/useLoginForm";

export default function Login() {
  const { form, status } = useLoginForm();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md animate-in fade-in duration-200">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">로그인</h2>
          <p className="mt-2 text-sm text-zinc-400 font-medium">피트니스 관리 프로그램에 오신 것을 환영합니다.</p>

          {form.error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-2 text-red-400 text-sm font-medium animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={16} />
              {form.error}
            </div>
          )}
        </div>

        <form className="space-y-5" onSubmit={form.handleSubmit}>
          <AuthInput
            label="로그인 아이디"
            icon={Mail}
            name="username"
            type="text"
            placeholder="아이디를 입력하세요"
            value={form.data.username}
            onChange={form.handleChange}
            required
          />
          <div className="space-y-2">
            <AuthInput
              label="비밀번호"
              icon={Lock}
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={form.data.password}
              onChange={form.handleChange}
              required
            />
            <div className="flex justify-center items-center gap-3 mt-4 font-medium">
              <Link
                to="/forgot?type=find-id"
                className="text-xs text-zinc-400 hover:text-neon-500 transition-colors"
              >
                아이디를 잊으셨나요?
              </Link>
              <span className="w-1 h-1 bg-zinc-700 rounded-full" />
              <Link
                to="/forgot?type=reset-pw"
                className="text-xs text-zinc-400 hover:text-neon-500 transition-colors"
              >
                비밀번호를 잊으셨나요?
              </Link>
            </div>
          </div>

          <div className="pt-2">
            <AuthButton type="submit" isLoading={status.isLoading} icon={ArrowRight}>
              로그인하기
            </AuthButton>
          </div>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-zinc-400 font-medium">
            아직 계정이 없으신가요?{" "}
            <Link to="/signup" className="text-neon-500 hover:text-neon-400 font-bold ml-1 transition-colors">
              무료로 가입하기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
