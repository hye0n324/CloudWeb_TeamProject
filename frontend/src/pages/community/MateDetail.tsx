import { useParams, useNavigate } from 'react-router-dom';
import { User, Calendar, MapPin, Clock, ChevronLeft, Users } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { DUMMY_MATES } from '@/lib/dummy-community';
import AuthButton from '@/components/ui/AuthButton';

export default function MateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mate = DUMMY_MATES.find((m) => m.id === id);

  if (!mate) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">모집글을 찾을 수 없습니다.</h2>
        <AuthButton onClick={() => navigate('/community/mates')} className="w-auto px-6 mx-auto">
          목록으로 돌아가기
        </AuthButton>
      </div>
    );
  }

  const isOpen = mate.status === 'OPEN';

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader 
        title={mate.title}
        breadcrumbs={[
          { label: '커뮤니티', href: '/community' },
          { label: '운동 메이트', href: '/community/mates' },
          { label: '상세 보기' }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl">
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-400">
                <User size={18} className="text-neon-400" />
                <span className="font-medium text-white">{mate.author}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Calendar size={18} />
                <span>등록일: {mate.createdAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                  isOpen 
                    ? 'bg-neon-500/10 text-neon-400 border-neon-500/20' 
                    : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                }`}>
                  {isOpen ? '모집 중' : '모집 완료'}
                </span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-lg">
                {mate.content}
              </p>
            </div>

            <AuthButton 
              disabled={!isOpen}
              onClick={() => alert('참여 신청이 완료되었습니다!')}
              className="sm:w-auto px-10"
            >
              {isOpen ? '참여 신청하기' : '모집이 완료되었습니다'}
            </AuthButton>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-8">
            <AuthButton 
              onClick={() => navigate('/community/mates')}
              className="w-auto px-8 bg-zinc-800 text-white hover:bg-zinc-700 shadow-none"
              icon={ChevronLeft}
            >
              목록으로
            </AuthButton>
            <div className="flex gap-4 ml-auto">
              <AuthButton 
                onClick={() => alert('수정 페이지로 이동합니다. (기능 준비 중)')}
                className="w-auto px-6 bg-zinc-800 text-white hover:bg-zinc-700 shadow-none border border-zinc-700"
              >
                수정
              </AuthButton>
              <AuthButton 
                onClick={() => {
                  if (window.confirm('정말 이 모집글을 삭제하시겠습니까?')) {
                    alert('모집글이 삭제되었습니다.');
                    navigate('/community/mates');
                  }
                }}
                className="w-auto px-6 bg-red-500/10 text-red-500 hover:bg-red-500/20 shadow-none border border-red-500/20"
              >
                삭제
              </AuthButton>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Clock size={20} className="text-neon-400" />
              모집 정보
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start justify-between py-2 border-b border-zinc-800/50">
                <div className="flex items-center gap-2 text-zinc-500">
                  <MapPin size={16} />
                  <span>장소</span>
                </div>
                <span className="text-white font-medium text-right">{mate.location}</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-zinc-800/50">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Calendar size={16} />
                  <span>운동 날짜</span>
                </div>
                <span className="text-white font-medium">{mate.date}</span>
              </div>
              <div className="flex items-start justify-between py-2">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Users size={16} />
                  <span>작성자</span>
                </div>
                <span className="text-white font-medium">{mate.author}</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-neon-500/5 border border-neon-500/10 rounded-3xl">
            <p className="text-sm text-zinc-400 leading-relaxed">
              메이트와 매칭되면 채팅을 통해 세부 일정을 조율할 수 있습니다. 매너 있는 운동 문화를 함께 만들어가요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
