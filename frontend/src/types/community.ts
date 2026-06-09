export type BodyPart = '전신' | '상체' | '하체' | '가슴' | '등' | '어깨';

export type MateStatus = 'OPEN' | 'CLOSED';

export interface RoutinePost {
  id: number;
  title: string;
  bodyPart: BodyPart;
  content: string;
  author: string;
  likesCount: number;
  viewCount: number;
  likedByMe: boolean;
  createdAt: any;
}

export interface MatePost {
  id: number;
  title: string;
  location: string;
  date: string;
  content: string;
  status: MateStatus;
  currentMembers: number;
  maxMembers: number;
  viewCount: number;
  appliedByMe: boolean;
  author: string;
  createdAt: any;
}
