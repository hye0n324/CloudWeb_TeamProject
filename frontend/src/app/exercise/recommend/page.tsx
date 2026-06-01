import Link from "next/link";
import { Sparkles, Save, ChevronDown, Activity, Settings2 } from "lucide-react";

export default function AIRecommend() {
  const mockGeneratedRoutine = [
    { name: "덤벨 벤치 프레스", target: "가슴", sets: 3, reps: 12 },
    { name: "덤벨 런지", target: "하체", sets: 3, reps: 12 },
    { name: "백 익스텐션", target: "등", sets: 3, reps: 12 },
    { name: "숄더 프레스", target: "어깨", sets: 3, reps: 12 },
    { name: "트라이셉 푸시다운", target: "삼두", sets: 3, reps: 12 },
    { name: "바벨 컬", target: "이두", sets: 3, reps: 12 },
  ];

  return (
    <div className="flex-1 w-full bg-background flex flex-col items-center py-12 px-4">
      {/* Header & Tabs */}
      <div className="w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="text-neon-400" />
          AI 운동 관리 서비스
        </h1>
        <div className="flex bg-black rounded-lg p-1 border border-zinc-800">
          <Link href="/exercise/recommend" className="px-6 py-2 rounded-md bg-zinc-800 text-white font-medium text-sm transition-colors">
            운동 추천 받기
          </Link>
          <Link href="/exercise/routines" className="px-6 py-2 rounded-md text-zinc-400 hover:text-white font-medium text-sm transition-colors">
            나의 운동 루틴
          </Link>
        </div>
      </div>

      <div className="mb-6 text-center">
        <p className="text-zinc-400">목표를 선택하면 최적의 루틴을 생성해 드립니다.</p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-end">
          <div className="flex-1 space-y-2 w-full">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <Activity size={16} /> 운동 목표
            </label>
            <div className="relative">
              <select className="w-full appearance-none bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-400 transition-colors">
                <option>근성장</option>
                <option>다이어트</option>
                <option>체력 증진</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
            </div>
          </div>
          <div className="flex-1 space-y-2 w-full">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <Settings2 size={16} /> 운동 수준
            </label>
            <div className="relative">
              <select className="w-full appearance-none bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-400 transition-colors">
                <option>초보</option>
                <option>중급</option>
                <option>고급</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
            </div>
          </div>
          <div className="flex-1 space-y-2 w-full">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <Sparkles size={16} /> 보유 장비
            </label>
            <div className="relative">
              <select className="w-full appearance-none bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-400 transition-colors">
                <option>전체 (헬스장)</option>
                <option>덤벨</option>
                <option>맨몸</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
            </div>
          </div>
          <button className="w-full md:w-auto bg-neon-400 text-black px-8 py-3 rounded-xl font-bold hover:bg-neon-500 transition-colors shrink-0">
            AI 추천 루틴 생성하기
          </button>
        </div>
      </div>

      {/* Generated Routine Card */}
      <div className="w-full max-w-4xl bg-black border border-neon-400/30 rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(225,255,0,0.1)]">
        <div className="bg-zinc-900/50 border-b border-zinc-800 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-bold text-neon-400">초보 근성장 루틴</h2>
          <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Save size={16} /> 내 루틴으로 저장
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-3">
            {mockGeneratedRoutine.map((exercise, i) => (
              <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500 font-mono w-6 text-center">{i + 1}</span>
                  <div className="h-4 w-px bg-zinc-800"></div>
                  <div>
                    <span className="font-medium">{exercise.name}</span>
                    <span className="text-zinc-500 text-sm ml-2">({exercise.target})</span>
                  </div>
                </div>
                <div className="text-neon-400 font-medium text-sm bg-black px-3 py-1 rounded-md border border-zinc-800">
                  {exercise.sets}세트 × {exercise.reps}회
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
