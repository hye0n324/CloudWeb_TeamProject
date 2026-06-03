import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import PostCard from '@/components/ui/PostCard';
import FilterBar from '@/components/ui/FilterBar';
import { DUMMY_MATES } from '@/lib/dummy-community';

export default function MateList() {
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const filterOptions = [
    { label: '전체', value: 'ALL' },
    { label: '모집 중', value: 'OPEN' },
    { label: '모집 완료', value: 'CLOSED' },
  ];

  const filteredMates = selectedStatus === 'ALL'
    ? DUMMY_MATES
    : DUMMY_MATES.filter(m => m.status === selectedStatus);

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader 
        title="운동 메이트 모집"
        breadcrumbs={[
          { label: '커뮤니티', href: '/community' },
          { label: '운동 메이트' }
        ]}
        action={{
          label: '메이트 찾기',
          href: '/community/mates/new'
        }}
      />

      <FilterBar 
        options={filterOptions}
        selectedValue={selectedStatus}
        onSelect={setSelectedStatus}
      />

      {filteredMates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMates.map((mate) => (
            <PostCard
              key={mate.id}
              id={mate.id}
              title={mate.title}
              author={mate.author}
              date={mate.createdAt}
              tag={mate.status === 'OPEN' ? '모집 중' : '모집 완료'}
              tagType={mate.status === 'OPEN' ? 'status-open' : 'status-closed'}
              location={mate.location}
              href={`/community/mates/${mate.id}`}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-zinc-800 rounded-3xl">
          <p className="text-zinc-500">조건에 맞는 모집글이 없습니다. 새로운 메이트를 찾아보세요!</p>
        </div>
      )}
    </div>
  );
}
