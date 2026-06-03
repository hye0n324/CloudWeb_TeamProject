import { useState } from 'react';
import { Dumbbell, Shirt, PersonStanding, Focus, AlignJustify, MoveHorizontal, Activity } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import PostCard from '@/components/ui/PostCard';
import FilterBar from '@/components/ui/FilterBar';
import { DUMMY_ROUTINES } from '@/lib/dummy-community';
import { BodyPart } from '@/types/community';

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

export default function RoutineList() {
  const [selectedPart, setSelectedPart] = useState('ALL');

  const filterOptions = [
    { label: '전체', value: 'ALL' },
    { label: '전신', value: '전신' },
    { label: '상체', value: '상체' },
    { label: '하체', value: '하체' },
    { label: '가슴', value: '가슴' },
    { label: '등', value: '등' },
    { label: '어깨', value: '어깨' },
  ];

  const filteredRoutines = selectedPart === 'ALL' 
    ? DUMMY_ROUTINES 
    : DUMMY_ROUTINES.filter(r => r.bodyPart === selectedPart);

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader 
        title="루틴 공유"
        breadcrumbs={[
          { label: '커뮤니티', href: '/community' },
          { label: '루틴 공유' }
        ]}
        action={{
          label: '루틴 등록',
          href: '/community/routines/new'
        }}
      />

      <FilterBar 
        options={filterOptions}
        selectedValue={selectedPart}
        onSelect={setSelectedPart}
      />

      {filteredRoutines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutines.map((routine) => (
            <PostCard
              key={routine.id}
              id={routine.id}
              title={routine.title}
              author={routine.author}
              date={routine.createdAt}
              tag={routine.bodyPart}
              tagIcon={BODY_PART_ICONS[routine.bodyPart]}
              tagColor={BODY_PART_COLORS[routine.bodyPart]}
              href={`/community/routines/${routine.id}`}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-zinc-800 rounded-3xl">
          <p className="text-zinc-500">해당 부위의 루틴이 아직 없습니다. 첫 번째 루틴을 공유해보세요!</p>
        </div>
      )}
    </div>
  );
}
