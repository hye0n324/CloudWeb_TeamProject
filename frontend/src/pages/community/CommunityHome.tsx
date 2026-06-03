import { useNavigate } from 'react-router-dom';
import { ClipboardList, UserPlus, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';

export default function CommunityHome() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: '루틴 공유',
      description: 'AI-Fit 멤버들이 공유하는 효과적인 운동 루틴을 확인하고 나만의 루틴을 공유해보세요.',
      icon: ClipboardList,
      path: '/community/routines',
      color: 'blue'
    },
    {
      title: '운동 메이트 모집',
      description: '혼자 하는 운동이 지루하시나요? 내 주변의 운동 메이트를 찾고 함께 득근해보세요.',
      icon: UserPlus,
      path: '/community/mates',
      color: 'neon'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader 
        title="커뮤니티"
        breadcrumbs={[{ label: '커뮤니티' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {menuItems.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            className="group relative p-8 rounded-3xl bg-zinc-900 border border-zinc-800 cursor-pointer hover:border-neon-500/50 transition-all hover:shadow-2xl hover:shadow-neon-500/10 overflow-hidden"
          >
            {/* Background Decoration */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity ${
              item.color === 'neon' ? 'bg-neon-500' : 'bg-blue-500'
            }`} />
            
            <div className="relative z-10">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${
                item.color === 'neon' ? 'bg-neon-500/10 text-neon-400' : 'bg-blue-500/10 text-blue-400'
              }`}>
                <item.icon size={32} />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                {item.title}
                <ChevronRight size={20} className="text-zinc-600 group-hover:text-neon-400 group-hover:translate-x-1 transition-all" />
              </h2>
              
              <p className="text-zinc-400 leading-relaxed mb-6">
                {item.description}
              </p>

              <div className={`text-sm font-bold flex items-center gap-2 ${
                item.color === 'neon' ? 'text-neon-400' : 'text-blue-400'
              }`}>
                자세히 보기
                <div className={`h-1 flex-1 rounded-full opacity-20 ${
                  item.color === 'neon' ? 'bg-neon-500' : 'bg-blue-500'
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-12 p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 text-center">
        <p className="text-zinc-500 text-sm">
          AI-Fit 커뮤니티는 건강한 운동 문화를 지향합니다. 서로를 응원하며 함께 성장해봐요!
        </p>
      </div>
    </div>
  );
}
