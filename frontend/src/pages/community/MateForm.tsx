import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Type, MapPin, Calendar, AlignLeft, Send, X } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import AuthInput from '@/components/ui/AuthInput';
import AuthButton from '@/components/ui/AuthButton';

export default function MateForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    content: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock 제출 로직
    console.log('Submitting Mate Post:', formData);
    alert('모집글이 성공적으로 등록되었습니다!');
    navigate('/community/mates');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader 
        title="운동 메이트 모집하기"
        breadcrumbs={[
          { label: '커뮤니티', href: '/community' },
          { label: '운동 메이트', href: '/community/mates' },
          { label: '모집 작성' }
        ]}
      />

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6 shadow-xl">
          <AuthInput 
            label="모집 제목"
            icon={Type}
            placeholder="예: 오늘 저녁 강남역 헬스장 같이 가실 분!"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AuthInput 
              label="장소"
              icon={MapPin}
              placeholder="예: 서울시 강남구"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
            <AuthInput 
              label="운동 날짜"
              icon={Calendar}
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2 ml-1">
              <AlignLeft size={16} className="text-neon-500" /> 상세 설명
            </label>
            <textarea
              className="w-full h-48 px-4 py-3 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-neon-500 focus:border-transparent outline-none transition-all placeholder:text-gray-500 text-white text-sm bg-zinc-900/50 backdrop-blur-sm resize-none"
              placeholder="함께 하고 싶은 운동 종류, 시간대, 준비물 등을 자유롭게 적어주세요."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <AuthButton 
              type="button"
              onClick={() => navigate('/community/mates')}
              className="bg-zinc-800 text-white hover:bg-zinc-700 shadow-none"
              icon={X}
            >
              취소
            </AuthButton>
            <AuthButton 
              type="submit"
              icon={Send}
            >
              모집 시작하기
            </AuthButton>
          </div>
        </form>
      </div>
    </div>
  );
}
