export type BodyPart = '전신' | '상체' | '하체' | '가슴' | '등' | '어깨';

export type MateStatus = 'OPEN' | 'CLOSED';

export interface RoutinePost {
  id: string;
  title: string;
  bodyPart: BodyPart;
  content: string;
  author: string;
  createdAt: string;
}

export interface MatePost {
  id: string;
  title: string;
  location: string;
  date: string;
  content: string;
  status: MateStatus;
  author: string;
  createdAt: string;
}
