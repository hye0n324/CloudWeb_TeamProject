import React, { createContext, useContext, useState, useEffect } from 'react';

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
  addRoutine: (routine: Routine) => void;
  updateRoutine: (id: string, updatedRoutine: Routine) => void;
  deleteRoutine: (id: string) => void;
}

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export const RoutineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [routines, setRoutines] = useState<Routine[]>(() => {
    const saved = localStorage.getItem('my-routines');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('my-routines', JSON.stringify(routines));
  }, [routines]);

  const addRoutine = (routine: Routine) => {
    setRoutines(prev => [...prev, routine]);
  };

  const updateRoutine = (id: string, updatedRoutine: Routine) => {
    setRoutines(prev => prev.map(r => r.id === id ? updatedRoutine : r));
  };

  const deleteRoutine = (id: string) => {
    setRoutines(prev => prev.filter(r => r.id !== id));
  };

  return (
    <RoutineContext.Provider value={{ routines, addRoutine, updateRoutine, deleteRoutine }}>
      {children}
    </RoutineContext.Provider>
  );
};

export const useRoutines = () => {
  const context = useContext(RoutineContext);
  if (!context) throw new Error('useRoutines must be used within a RoutineProvider');
  return context;
};
