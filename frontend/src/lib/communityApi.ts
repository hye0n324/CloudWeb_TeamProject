import apiClient from './apiClient';
import { RoutinePost, MatePost, BodyPart, MateStatus } from '../types/community';

// LocalDateTime이 배열로 오는 경우도 처리
export function formatDate(date: any): string {
  if (Array.isArray(date)) {
    const [year, month, day] = date;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }
  return String(date).slice(0, 10);
}

export const getRoutines = (tag?: BodyPart, sort = 'latest') =>
  apiClient.get<RoutinePost[]>('/community/routines', {
    params: { ...(tag && { tag }), sort },
  }).then(r => r.data);

export const getRoutine = (id: number) =>
  apiClient.get<RoutinePost>(`/community/routines/${id}`).then(r => r.data);

export const createRoutine = (data: { title: string; content: string; bodyPart: BodyPart }) =>
  apiClient.post<{ id: number; message: string }>('/community/routines', data).then(r => r.data);

export const deleteRoutine = (id: number) =>
  apiClient.delete<{ message: string }>(`/community/routines/${id}`).then(r => r.data);

export const toggleRoutineLike = (id: number) =>
  apiClient.post<{ liked: boolean; likesCount: number }>(`/community/routines/${id}/like`).then(r => r.data);

export const getMates = (status?: MateStatus, sort = 'latest') =>
  apiClient.get<MatePost[]>('/community/mates', {
    params: { ...(status && { status }), sort },
  }).then(r => r.data);

export const getMate = (id: number) =>
  apiClient.get<MatePost>(`/community/mates/${id}`).then(r => r.data);

export const createMate = (data: {
  title: string;
  content: string;
  location: string;
  date: string;
  maxMembers?: number;
}) =>
  apiClient.post<{ id: number; message: string }>('/community/mates', data).then(r => r.data);

export const deleteMate = (id: number) =>
  apiClient.delete<{ message: string }>(`/community/mates/${id}`).then(r => r.data);

export const toggleMateApply = (id: number) =>
  apiClient.post<{ applied: boolean; currentMembers: number }>(`/community/mates/${id}/apply`).then(r => r.data);

export const closeMatePost = (id: number) =>
  apiClient.patch<{ message: string; status: string }>(`/community/mates/${id}/close`).then(r => r.data);
