import Link from "next/link";
import { Dumbbell, Users, ClipboardList, UserPlus, Sparkles } from "lucide-react";

export default function CommunityHome() {
  return (
    <div className="flex-1 w-full bg-background flex flex-col items-center py-20">
      <div className="mb-12 text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-neon-400 rounded-xl flex items-center justify-center text-black mb-6">
          <Dumbbell size={24} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">커뮤니티</h1>
        <p className="text-zinc-400">함께 운동하고, 루틴을 공유하고, 운동 메이트를 찾아보세요.</p>
      </div>

      <div className="w-full max-w-2xl space-y-6 px-4">
        <Link 
          href="/community/routines" 
          className="block group relative p-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="p-4 rounded-xl border border-zinc-800 bg-black text-neon-400">
              <ClipboardList size={32} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">루틴 공유</h2>
              <p className="text-zinc-400 mb-4">
                나만의 운동 루틴을 공유하고<br />
                다른 사람들의 루틴을 확인해보세요.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 text-sm text-zinc-300">
                <Users size={14} /> 다양한 루틴 보기
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-neon-400 flex items-center justify-center text-black group-hover:scale-110 transition-transform">
              <span className="font-bold">→</span>
            </div>
          </div>
        </Link>

        <Link 
          href="/community/mates" 
          className="block group relative p-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="p-4 rounded-xl border border-zinc-800 bg-black text-neon-400">
              <UserPlus size={32} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">운동 메이트 모집</h2>
              <p className="text-zinc-400 mb-4">
                함께 운동할 메이트를 찾고<br />
                건강한 습관을 함께 만들어가요.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 text-sm text-zinc-300">
                <Users size={14} /> 같이 운동해요
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-neon-400 flex items-center justify-center text-black group-hover:scale-110 transition-transform">
              <span className="font-bold">→</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-16 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-zinc-400">
          <Sparkles size={16} className="text-neon-400" />
          <span>건강한 습관은 함께할 때 더 오래갑니다.</span>
        </div>
        <p className="text-neon-400 font-medium">오늘도 함께 성장해요!</p>
      </div>
    </div>
  );
}
