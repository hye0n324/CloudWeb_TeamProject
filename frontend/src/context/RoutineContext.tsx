import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/apiClient';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  rest: number; // seconds
  target: string;
}

export interface Routine {
  id: string;
  title: string;
  exercises: Exercise[];
  createdAt: string;
}

interface RoutineContextType {
  routines: Routine[];
  addRoutine: (routine: Routine) => Promise<void>;
  updateRoutine: (id: string, updatedRoutine: Routine) => Promise<void>;
  deleteRoutine: (id: string) => Promise<void>;
  isLoading: boolean;
}

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

// Mapping Helpers
const mapBackendToFrontend = (b: any): Routine => {
  if (!b) return null as any;
  return {
    id: (b.routineId || '').toString(),
    title: b.routineName || '제목 없음',
    exercises: (b.exercises || []).map((e: any, idx: number) => ({
      id: `ex-${idx}-${Date.now()}`,
      name: e.name || '운동',
      sets: e.sets || 0,
      reps: e.reps || 0,
      rest: 60,
      target: e.targetPart || '전신'
    })),
    createdAt: new Date().toISOString()
  };
};

const mapFrontendToBackend = (f: Routine) => ({
  routineName: f.title,
  exercises: (f.exercises || []).map((e, idx) => ({
    sequence: idx + 1,
    name: e.name,
    targetPart: e.target,
    sets: e.sets,
    reps: e.reps
  }))
});

export const RoutineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  // Watch for changes in localStorage (login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = !!localStorage.getItem('accessToken');
      if (token !== isLoggedIn) {
        console.log('Login status changed:', token);
        setIsLoggedIn(token);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Interval check as a fallback because 'storage' event only fires from other tabs
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [isLoggedIn]);

  // Initial Load & Re-load on login change
  useEffect(() => {
    const loadRoutines = async () => {
      setIsLoading(true);
      try {
        if (isLoggedIn) {
          console.log('Attempting to fetch routines from Backend...');
          const response = await api.get('/routines/me');
          if (Array.isArray(response.data)) {
            const mappedRoutines = response.data
              .map(mapBackendToFrontend)
              .filter(r => r !== null);
            setRoutines(mappedRoutines);
            console.log('Successfully loaded from Backend:', mappedRoutines.length);
          } else {
            console.warn('Backend response is not an array:', response.data);
            setRoutines([]);
          }
        } else {
          console.log('Loading routines from LocalStorage...');
          const saved = localStorage.getItem('my-routines');
          setRoutines(saved ? JSON.parse(saved) : []);
        }
      } catch (error) {
        console.error('Failed to fetch routines:', error);
        // Fallback to localStorage if backend fails
        const saved = localStorage.getItem('my-routines');
        if (saved) {
          setRoutines(JSON.parse(saved));
        } else {
          setRoutines([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadRoutines();
  }, [isLoggedIn]);

  // Sync to LocalStorage (only for non-logged in users)
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem('my-routines', JSON.stringify(routines));
    }
  }, [routines, isLoggedIn]);

  const addRoutine = async (routine: Routine) => {
    if (isLoggedIn) {
      console.log('Saving routine to Backend:', routine.title);
      try {
        const response = await api.post('/routines', mapFrontendToBackend(routine));
        const newRoutine = mapBackendToFrontend(response.data);
        setRoutines(prev => [...prev, newRoutine]);
        console.log('Successfully saved to Backend');
      } catch (error) {
        console.error('Failed to save routine to backend:', error);
        alert('서버 저장에 실패했습니다.');
      }
    } else {
      console.log('Saving routine to LocalStorage:', routine.title);
      setRoutines(prev => [...prev, routine]);
    }
  };

  const updateRoutine = async (id: string, updatedRoutine: Routine) => {
    if (isLoggedIn) {
      try {
        const response = await api.put(`/routines/${id}`, mapFrontendToBackend(updatedRoutine));
        const mapped = mapBackendToFrontend(response.data);
        setRoutines(prev => prev.map(r => r.id === id ? mapped : r));
      } catch (error) {
        console.error('Failed to update routine on backend:', error);
        alert('서버 수정에 실패했습니다.');
      }
    } else {
      setRoutines(prev => prev.map(r => r.id === id ? updatedRoutine : r));
    }
  };

  const deleteRoutine = async (id: string) => {
    if (isLoggedIn) {
      try {
        await api.delete(`/routines/${id}`);
        setRoutines(prev => prev.filter(r => r.id !== id));
      } catch (error) {
        console.error('Failed to delete routine from backend:', error);
        alert('서버 삭제에 실패했습니다.');
      }
    } else {
      setRoutines(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <RoutineContext.Provider value={{ routines, addRoutine, updateRoutine, deleteRoutine, isLoading }}>
      {children}
    </RoutineContext.Provider>
  );
};

export const useRoutines = () => {
  const context = useContext(RoutineContext);
  if (!context) throw new Error('useRoutines must be used within a RoutineProvider');
  return context;
};
