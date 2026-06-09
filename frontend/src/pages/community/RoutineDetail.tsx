import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Calendar, Clock, ChevronLeft, Activity, Shirt, PersonStanding, Focus, AlignJustify, MoveHorizontal } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import AuthButton from '@/components/ui/AuthButton';
import { BodyPart, RoutinePost } from '@/types/community';
import { getRoutine, deleteRoutine, formatDate } from '@/lib/communityApi';

const BODY_PART_ICONS: Record<BodyPart, any> = {
  '전신': Activity,
  '상체': Shirt,
  '하체': PersonStanding,
  '가슴': Focus,
  '등': AlignJustify,
  '어깨': MoveHorizontal,
};

const BODY_PART_COLORS: Record<BodyPart, string> = {
  '전신': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  '상체': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  '하체': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  '가슴': 'bg-red-500/10 text-red-400 border-red-500/20',
  '등': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  '어깨': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
};

export default function RoutineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [routine, setRoutine] = useState<RoutinePost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getRoutine(Number(id))
      .then(setRoutine)
      .catch(() => setRoutine(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!routine) return;
    if (!window.confirm('정말 이 루틴을 삭제하시겠습니까?')) return;
    try {
      await deleteRoutine(routine.id);
      navigate('/community/routines');
    } catch {
      alert('삭제에 실패했습니다.');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-20 text-center"><p className="text-zinc-500">불러오는 중...</p></div>;
  }

  if (!routine) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">루틴을 찾을 수 없습니다.</h2>
        <AuthButton onClick={() => navigate('/community/routines')} className="w-auto px-6 mx-auto">
          목록으로 돌아가기
        </AuthButton>
      </div>
    );
  }

  const Icon = BODY_PART_ICONS[routine.bodyPart];
  const colorClass = BODY_PART_COLORS[routine.bodyPart];

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title={routine.title}
        breadcrumbs={[
          { label: '커뮤니티', href: '/community' },
          { label: '루틴 공유', href: '/community/routines' },
          { label: '상세 보기' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl">
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-400">
                <User size={18} className="text-neon-400" />
                <span className="font-medium text-white">{routine.author}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Calendar size={18} />
                <span>{formatDate(routine.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-sm border ${colorClass}`}>
                  <Icon size={16} />
                  {routine.bodyPart}
                </span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-lg">{routine.content}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <AuthButton
              onClick={() => navigate('/community/routines')}
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
                onClick={handleDelete}
                className="w-auto px-6 bg-red-500/10 text-red-500 hover:bg-red-500/20 shadow-none border border-red-500/20"
              >
                삭제
              </AuthButton>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Clock size={20} className="text-neon-400" />
              운동 정보 요약
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-zinc-800/50">
                <span className="text-zinc-500">운동 부위</span>
                <span className="text-white font-medium">{routine.bodyPart}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-800/50">
                <span className="text-zinc-500">작성자</span>
                <span className="text-white font-medium">{routine.author}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-500">등록일</span>
                <span className="text-white font-medium">{formatDate(routine.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
