import Link from "next/link";
import { Users, Search, Plus, MapPin, Calendar, User, Activity, Bike, Dumbbell as DumbbellIcon, Mountain } from "lucide-react";

export default function MateRecruitment() {
  const tabs = ["전체", "러닝", "헬스", "요가", "자전거", "등산", "기타"];
  
  const mockMates = [
    {
      id: 1,
      type: "러닝",
      title: "강남 러닝 메이트 구해요!",
      location: "서울 강남구",
      time: "매주 화, 목 저녁 7시",
      participants: "2/5명",
      description: "퇴근 후 함께 5km 러닝 하실 분 구해요! 페이스 크게 상관없습니다 🏃‍♂️",
      status: "모집중",
      date: "2024.05.30",
      icon: Activity
    },
    {
      id: 2,
      type: "헬스",
      title: "같이 헬스 하실 분 찾습니다 💪",
      location: "서울 송파구",
      time: "매주 월, 수, 금 오전 9시",
      participants: "1/3명",
      description: "초보 환영! 서로 루틴 공유하고 함께 성장해요.",
      status: "모집중",
      date: "2024.05.29",
      icon: DumbbellIcon
    },
    {
      id: 3,
      type: "요가",
      title: "요가 초보 함께해요 🙏",
      location: "서울 마포구",
      time: "매주 토요일 오전 10시",
      participants: "3/4명",
      description: "요가 초보라 함께 배우고 오래 꾸준히 하실 분 찾습니다!",
      status: "모집중",
      date: "2024.05.28",
      icon: Users
    },
    {
      id: 4,
      type: "자전거",
      title: "주말 자전거 라이딩 메이트 모집 🚴‍♂️",
      location: "경기 하남시",
      time: "매주 일요일 오전 8시",
      participants: "2/6명",
      description: "미사~팔당 코스 같이 라이딩 하실 분 구합니다!",
      status: "모집중",
      date: "2024.05.27",
      icon: Bike
    },
  ];

  return (
    <div className="flex-1 w-full bg-background flex flex-col items-center py-12 px-4">
      <div className="mb-10 text-center space-y-4">
        <div className="mx-auto w-10 h-10 bg-neon-400 rounded-lg flex items-center justify-center text-black mb-4">
          <Users size={20} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">운동 메이트 모집</h1>
        <p className="text-zinc-400">같이 운동할 메이트를 찾고 건강한 습관을 함께 만들어가요.</p>
      </div>

      <div className="w-full max-w-4xl space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="메이트 모집 검색 (예: 러닝, 헬스, 요가, 지역)" 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-neon-400 transition-colors placeholder:text-zinc-600 text-white"
            />
          </div>
          <button className="flex items-center gap-2 bg-neon-400 text-black px-6 py-3 rounded-full font-bold hover:bg-neon-500 transition-colors shrink-0 w-full sm:w-auto justify-center">
            <Plus size={18} /> 모집글 작성하기
          </button>
        </div>

        <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab, i) => (
              <button 
                key={tab} 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  i === 0 
                    ? "bg-neon-400 text-black" 
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="ml-4 pl-4 border-l border-zinc-800 min-w-max">
            <select className="bg-transparent text-sm text-zinc-400 outline-none cursor-pointer hover:text-white">
              <option>최신순</option>
              <option>마감임박순</option>
            </select>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          {mockMates.map((mate) => {
            const Icon = mate.icon;
            return (
              <Link 
                href={`/community/mates/${mate.id}`} 
                key={mate.id}
                className="block group bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 hover:bg-zinc-900 transition-all flex flex-col sm:flex-row gap-6"
              >
                <div className="flex items-center sm:items-start gap-6 flex-1 min-w-0">
                  <div className="p-4 rounded-xl border border-zinc-800 bg-black text-neon-400 shrink-0 self-start">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-neon-400 font-medium">
                        {mate.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 truncate group-hover:text-neon-400 transition-colors">
                      {mate.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-zinc-400 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} /> {mate.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} /> {mate.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} /> {mate.participants}
                      </div>
                    </div>
                    <p className="text-sm text-zinc-500 line-clamp-1">
                      {mate.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between pt-4 sm:pt-0 border-t sm:border-t-0 border-zinc-800 sm:min-w-[120px] shrink-0">
                  <div className="px-3 py-1 rounded-full border border-green-900 bg-green-900/20 text-green-400 text-xs font-bold mb-0 sm:mb-4">
                    {mate.status}
                  </div>
                  <div className="flex items-center justify-between sm:justify-end w-full">
                    <span className="text-xs text-zinc-600 sm:hidden block">{mate.date}</span>
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-neon-400 group-hover:text-black transition-all">
                      <span className="font-bold">→</span>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-600 hidden sm:block mt-2">{mate.date}</span>
                </div>
              </Link>
            );
          })}
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
