"use client";

import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-white selection:bg-neon-500 selection:text-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* 공통 로고 섹션 */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-neon-500 text-black p-2 rounded-xl shadow-[0_0_15px_rgba(212,255,0,0.4)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(212,255,0,0.6)] transition-all">
              <Dumbbell className="w-6 h-6" />
            </div>
          </Link>
        </div>

        {/* 공통 다크 카드 컨테이너 */}
        <div className="bg-zinc-900/80 backdrop-blur-xl py-10 px-6 sm:px-10 shadow-2xl shadow-black sm:rounded-3xl border border-zinc-800 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-neon-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-neon-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
