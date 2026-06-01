import Link from 'next/link';
import { Dumbbell, ClipboardList, UserPlus } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-neon-400 flex items-center justify-center text-black">
            <Dumbbell size={20} />
          </div>
          <span>AI-Fit</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-zinc-300">
          <Link href="/" className="hover:text-neon-400 transition-colors">대시보드</Link>
          <Link href="/meal/add" className="hover:text-neon-400 transition-colors">식단 관리</Link>
          <Link href="/exercise/recommend" className="hover:text-neon-400 transition-colors">AI 루틴</Link>
          
          <div className="relative group py-5">
            <Link href="/community" className="flex items-center gap-1 hover:text-neon-400 transition-colors">
              커뮤니티
            </Link>
            
            {/* Dropdown Menu */}
            <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top translate-y-2 group-hover:translate-y-0 z-50">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col p-2">
                <Link 
                  href="/community/routines" 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800 hover:text-neon-400 transition-colors text-zinc-300"
                >
                  <ClipboardList size={16} />
                  <span>루틴 공유</span>
                </Link>
                <Link 
                  href="/community/mates" 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800 hover:text-neon-400 transition-colors text-zinc-300"
                >
                  <UserPlus size={16} />
                  <span>운동 메이트 모집</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/login" className="text-zinc-300 hover:text-white transition-colors">로그인</Link>
          <Link href="/signup" className="px-4 py-2 rounded-md bg-neon-400 text-black hover:bg-neon-500 transition-colors font-semibold">
            시작하기
          </Link>
        </div>
      </div>
    </nav>
  );
}
