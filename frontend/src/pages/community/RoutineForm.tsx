import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Type, Tag, AlignLeft, Send, X } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import AuthInput from '@/components/ui/AuthInput';
import AuthButton from '@/components/ui/AuthButton';
import { BodyPart } from '@/types/community';

export default function RoutineForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    bodyPart: '전신' as BodyPart,
    content: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock 제출 로직
    console.log('Submitting Routine:', formData);
    alert('루틴이 성공적으로 등록되었습니다!');
    navigate('/community/routines');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader 
        title="새 루틴 등록"
        breadcrumbs={[
          { label: '커뮤니티', href: '/community' },
          { label: '루틴 공유', href: '/community/routines' },
          { label: '루틴 작성' }
        ]}
      />

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6 shadow-xl">
          <AuthInput 
            label="루틴 제목"
            icon={Type}
            placeholder="예: 초보자를 위한 상체 집중 루틴"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2 ml-1">
              <Tag size={16} className="text-neon-500" /> 운동 부위
            </label>
            <select
              className="w-full px-4 py-3 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-neon-500 focus:border-transparent outline-none transition-all text-white text-sm bg-zinc-900/50 backdrop-blur-sm"
              value={formData.bodyPart}
              onChange={(e) => setFormData({ ...formData, bodyPart: e.target.value as BodyPart })}
            >
              <option value="전신">전신</option>
              <option value="상체">상체</option>
              <option value="하체">하체</option>
              <option value="가슴">가슴</option>
              <option value="등">등</option>
              <option value="어깨">어깨</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2 ml-1">
              <AlignLeft size={16} className="text-neon-500" /> 상세 내용
            </label>
            <textarea
              className="w-full h-48 px-4 py-3 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-neon-500 focus:border-transparent outline-none transition-all placeholder:text-gray-500 text-white text-sm bg-zinc-900/50 backdrop-blur-sm resize-none"
              placeholder="운동 순서, 세트 수, 휴식 시간 등 상세한 루틴을 공유해주세요."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <AuthButton 
              type="button"
              onClick={() => navigate('/community/routines')}
              className="bg-zinc-800 text-white hover:bg-zinc-700 shadow-none"
              icon={X}
            >
              취소
            </AuthButton>
            <AuthButton 
              type="submit"
              icon={Send}
            >
              등록하기
            </AuthButton>
          </div>
        </form>
      </div>
    </div>
  );
}
