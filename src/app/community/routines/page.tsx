import Link from "next/link";
import { Dumbbell, Search, Plus, Heart, User } from "lucide-react";

export default function RoutineShare() {
  const mockRoutines = [
    {
      id: 1,
      type: "상체",
      title: "가슴 집중 루틴",
      description: "가슴 근육을 자극하는 운동들로 구성한 루틴입니다.",
      author: "헬린이123",
      date: "2024.05.30",
      likes: 32,
    },
    {
      id: 2,
      type: "하체",
      title: "하체 근력 강화 루틴",
      description: "스쿼트, 런지 중심의 하체 강화 루틴입니다.",
      author: "운동하는중",
      date: "2024.05.28",
      likes: 28,
    },
    {
      id: 3,
      type: "상체",
      title: "어깨 & 삼두 루틴",
      description: "어깨와 삼두를 집중적으로 단련하는 루틴입니다.",
      author: "피트니스매니아",
      date: "2024.05.26",
      likes: 21,
    },
    {
      id: 4,
      type: "전신",
      title: "초보자를 위한 전신 루틴",
      description: "헬스장을 처음 가는 분들을 위한 전신 루틴입니다.",
      author: "헬스초보",
      date: "2024.05.24",
      likes: 19,
    },
  ];

  return (
    <div className="flex-1 w-full bg-background flex flex-col items-center py-12 px-4">
      <div className="mb-10 text-center space-y-4">
        <div className="mx-auto w-10 h-10 bg-neon-400 rounded-lg flex items-center justify-center text-black mb-4">
          <Dumbbell size={20} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">루틴 공유</h1>
        <p className="text-zinc-400">다양한 사람들의 운동 루틴을 공유하고 영감을 받아보세요.</p>
      </div>

      <div className="w-full max-w-3xl space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="루틴 검색 (예: 가슴, 하체, 홈트)" 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-neon-400 transition-colors placeholder:text-zinc-600 text-white"
            />
          </div>
          <button className="flex items-center gap-2 bg-neon-400 text-black px-6 py-3 rounded-full font-bold hover:bg-neon-500 transition-colors shrink-0 w-full sm:w-auto justify-center">
            <Plus size={18} /> 루틴 작성하기
          </button>
        </div>

        <div className="space-y-4">
          {mockRoutines.map((routine) => (
            <Link 
              href={`/community/routines/${routine.id}`} 
              key={routine.id}
              className="block group bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 hover:bg-zinc-900 transition-all flex items-center gap-6"
            >
              <div className="p-4 rounded-xl border border-zinc-800 bg-black text-neon-400 shrink-0">
                <Dumbbell size={32} strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-neon-400 font-medium">
                    {routine.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 truncate group-hover:text-neon-400 transition-colors">
                  {routine.title}
                </h3>
                <p className="text-sm text-zinc-400 mb-4 truncate">
                  {routine.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <div className="flex items-center gap-1">
                    <User size={14} /> {routine.author}
                  </div>
                  <span>•</span>
                  <span>{routine.date}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Heart size={14} /> {routine.likes}
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-neon-400 group-hover:text-black transition-all shrink-0">
                <span className="font-bold">→</span>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Pagination mock */}
        <div className="flex justify-center gap-2 pt-8">
          <button className="w-8 h-8 rounded-md border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700">{'<'}</button>
          <button className="w-8 h-8 rounded-md border border-neon-400 text-neon-400 flex items-center justify-center font-bold">1</button>
          <button className="w-8 h-8 rounded-md border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700">2</button>
          <button className="w-8 h-8 rounded-md border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700">3</button>
          <button className="w-8 h-8 rounded-md border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700">{'>'}</button>
        </div>
      </div>
    </div>
  );
}
