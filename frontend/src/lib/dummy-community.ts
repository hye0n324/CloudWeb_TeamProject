import { RoutinePost, MatePost } from '../types/community';

export const DUMMY_ROUTINES: RoutinePost[] = [
  {
    id: '1',
    title: '초보자를 위한 3분할 루틴',
    bodyPart: '전신',
    content: '매일매일 꾸준히 할 수 있는 전신 루틴입니다.',
    author: '김운동',
    createdAt: '2026-06-01',
  },
  {
    id: '2',
    title: '강력한 어깨를 만드는 비법',
    bodyPart: '어깨',
    content: '밀리터리 프레스 중심의 루틴입니다.',
    author: '헬창인생',
    createdAt: '2026-06-03',
  },
];

export const DUMMY_MATES: MatePost[] = [
  {
    id: '1',
    title: '오늘 저녁 강남역 헬스장 같이 가실 분',
    location: '서울시 강남구',
    date: '2026-06-10',
    content: '혼자 운동하기 심심해서 메이트 구합니다.',
    status: 'OPEN',
    author: '강남운동광',
    createdAt: '2026-06-05',
  },
  {
    id: '2',
    title: '분당 정자역 근처 아침 운동 메이트',
    location: '경기도 성남시',
    date: '2026-06-12',
    content: '오전 7시에 같이 운동하실 분!',
    status: 'CLOSED',
    author: '모닝헬스',
    createdAt: '2026-06-04',
  },
];
