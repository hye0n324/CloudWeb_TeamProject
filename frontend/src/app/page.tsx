import Link from "next/link";
import { Sparkles, Users, Utensils, ArrowRight, Dumbbell } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 w-full bg-background flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center text-center px-4 py-32 md:py-48 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-400/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-neon-400 text-sm font-medium mb-8">
          <Sparkles size={16} />
          <span>AI 기반 맞춤형 헬스케어 플랫폼</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          가장 완벽한<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-400 to-neon-600">
            나만의 운동 습관
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12">
          AI가 당신의 체형과 목표에 맞는 최적의 운동 루틴을 설계합니다.
          식단부터 운동 파트너까지, AI-Fit 하나로 시작하세요.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
          <Link href="/exercise/recommend" className="flex items-center justify-center gap-2 bg-neon-400 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-neon-500 transition-colors w-full sm:w-auto">
            AI 루틴 추천받기 <ArrowRight size={20} />
          </Link>
          <Link href="/community" className="flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-zinc-800 hover:border-zinc-700 transition-colors w-full sm:w-auto">
            커뮤니티 둘러보기
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl px-4 py-24 border-t border-zinc-800/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Link href="/exercise/recommend" className="group p-8 rounded-3xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/80 transition-all text-left">
            <div className="w-14 h-14 bg-black border border-zinc-800 rounded-2xl flex items-center justify-center text-neon-400 mb-6 group-hover:scale-110 transition-transform">
              <Dumbbell size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3">AI 운동 추천</h3>
            <p className="text-zinc-400 leading-relaxed">
              목표, 운동 수준, 보유 장비만 선택하면 AI가 최적의 근성장 및 다이어트 루틴을 즉시 생성합니다.
            </p>
          </Link>

          {/* Feature 2 */}
          <Link href="/meal/add" className="group p-8 rounded-3xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/80 transition-all text-left">
            <div className="w-14 h-14 bg-black border border-zinc-800 rounded-2xl flex items-center justify-center text-neon-400 mb-6 group-hover:scale-110 transition-transform">
              <Utensils size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3">스마트 식단 관리</h3>
            <p className="text-zinc-400 leading-relaxed">
              매일의 식사를 기록하고 영양소를 분석하세요. 하루 목표 칼로리와 섭취량을 한눈에 확인할 수 있습니다.
            </p>
          </Link>

          {/* Feature 3 */}
          <Link href="/community" className="group p-8 rounded-3xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/80 transition-all text-left">
            <div className="w-14 h-14 bg-black border border-zinc-800 rounded-2xl flex items-center justify-center text-neon-400 mb-6 group-hover:scale-110 transition-transform">
              <Users size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3">운동 커뮤니티</h3>
            <p className="text-zinc-400 leading-relaxed">
              자신만의 꿀팁 루틴을 공유하고, 동기부여가 될 새로운 운동 메이트를 지역별로 찾아보세요.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
