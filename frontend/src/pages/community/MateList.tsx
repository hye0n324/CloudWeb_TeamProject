import { useState, useEffect } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import PostCard from '@/components/ui/PostCard';
import FilterBar from '@/components/ui/FilterBar';
import { MatePost, MateStatus } from '@/types/community';
import { getMates, formatDate } from '@/lib/communityApi';

const filterOptions = [
  { label: '전체', value: 'ALL' },
  { label: '모집 중', value: 'OPEN' },
  { label: '모집 완료', value: 'CLOSED' },
];

export default function MateList() {
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [mates, setMates] = useState<MatePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const status = selectedStatus !== 'ALL' ? (selectedStatus as MateStatus) : undefined;
    getMates(status)
      .then(setMates)
      .catch(() => setError('모집 목록을 불러오는데 실패했습니다.'))
      .finally(() => setLoading(false));
  }, [selectedStatus]);

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="운동 메이트 모집"
        breadcrumbs={[
          { label: '커뮤니티', href: '/community' },
          { label: '운동 메이트' },
        ]}
        action={{ label: '메이트 찾기', href: '/community/mates/new' }}
      />

      <FilterBar options={filterOptions} selectedValue={selectedStatus} onSelect={setSelectedStatus} />

      {loading ? (
        <div className="py-20 text-center">
          <p className="text-zinc-500">불러오는 중...</p>
        </div>
      ) : error ? (
        <div className="py-20 text-center">
          <p className="text-red-400">{error}</p>
        </div>
      ) : mates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mates.map((mate) => (
            <PostCard
              key={mate.id}
              id={String(mate.id)}
              title={mate.title}
              author={mate.author}
              date={formatDate(mate.createdAt)}
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
