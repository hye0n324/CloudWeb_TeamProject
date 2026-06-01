import Link from "next/link";
import { Sparkles, Play, RotateCcw, Plus, Edit2, Trash2 } from "lucide-react";

export default function MyRoutines() {
  const mockRoutine = [
    { name: "하이 바 스쿼트", sets: 3, reps: 12 },
    { name: "푸시 업", sets: 3, reps: 12 },
    { name: "런지", sets: 3, reps: 12 },
    { name: "레그 프레스", sets: 3, reps: 12 },
    { name: "등 펴기", sets: 3, reps: 12 },
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
          <Link href="/exercise/recommend" className="px-6 py-2 rounded-md text-zinc-400 hover:text-white font-medium text-sm transition-colors">
            운동 추천 받기
          </Link>
          <Link href="/exercise/routines" className="px-6 py-2 rounded-md bg-zinc-800 text-white font-medium text-sm transition-colors">
            나의 운동 루틴
          </Link>
        </div>
      </div>

      {/* Timer Section */}
      <div className="w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl p-10 mb-8 flex flex-col items-center justify-center">
        <p className="text-zinc-400 mb-6 font-medium">현재 운동 진행 시간</p>
        <div className="text-7xl md:text-8xl font-bold font-mono text-neon-400 mb-10 tracking-widest text-shadow-neon">
          0:00
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-neon-400 text-black px-8 py-3 rounded-xl font-bold hover:bg-neon-500 transition-colors">
            <Play size={18} fill="currentColor" /> 운동 시작
          </button>
          <button className="flex items-center gap-2 bg-zinc-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-zinc-700 transition-colors">
            <RotateCcw size={18} /> 초기화
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl flex justify-end mb-4">
        <button className="flex items-center gap-2 bg-neon-400 text-black px-6 py-2.5 rounded-lg font-bold hover:bg-neon-500 transition-colors text-sm">
          <Plus size={16} /> 루틴 직접 추가
        </button>
      </div>

      {/* Current Routine Details */}
      <div className="w-full max-w-4xl bg-black border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="bg-zinc-900/50 border-b border-zinc-800 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">초보자를 위한 근성장 루틴</h2>
            <p className="text-xs text-zinc-500">2026. 6. 1.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors">
              <Edit2 size={14} /> 수정
            </button>
            <button className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-3 py-1.5 rounded-md text-xs font-medium transition-colors">
              <Trash2 size={14} /> 삭제
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-3">
            {mockRoutine.map((exercise, i) => (
              <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-neon-400/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full border border-zinc-700 group-hover:border-neon-400 flex items-center justify-center">
                    {/* Checkbox circle */}
                  </div>
                  <span className="font-medium group-hover:text-white transition-colors">{exercise.name}</span>
                </div>
                <div className="text-zinc-400 font-medium text-sm">
                  {exercise.sets}세트 × {exercise.reps}회
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Note about Next.js custom text-shadow in Tailwind */}
      <style dangerouslySetInnerHTML={{__html: `
        .text-shadow-neon {
          text-shadow: 0 0 10px rgba(225,255,0,0.3), 0 0 20px rgba(225,255,0,0.2);
        }
      `}} />
    </div>
  );
}
