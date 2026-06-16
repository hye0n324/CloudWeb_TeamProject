import { useState, useEffect, type FC } from 'react';
import { useRoutines, type Routine, type Exercise } from '../context/RoutineContext';
import { Timer, Play, Pause, RotateCcw, Plus, Edit2, Trash2, X, Check, Dumbbell } from 'lucide-react';

const RoutinePage: FC = () => {
  const { routines, deleteRoutine, addRoutine, updateRoutine, isLoading } = useRoutines();
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m}:${rs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-neon-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12">
      {/* Timer Section */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-black border border-zinc-800 rounded-2xl flex items-center justify-center text-neon-400">
            <Timer size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold">워크아웃 타이머</h3>
            <p className="text-zinc-500 text-sm">현재 운동 진행 시간을 측정합니다.</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl font-black text-white tabular-nums tracking-tighter">
            {formatTime(timer)}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors ${
                isTimerRunning 
                ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20' 
                : 'bg-neon-400 text-black hover:bg-neon-500'
              }`}
            >
              {isTimerRunning ? <><Pause size={20} /> 정지</> : <><Play size={20} /> 시작</>}
            </button>
            <button 
              onClick={() => { setTimer(0); setIsTimerRunning(false); }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
            >
              <RotateCcw size={20} /> 초기화
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">나의 운동 루틴</h2>
          <p className="text-zinc-500">저장된 모든 루틴을 관리하고 수행하세요.</p>
        </div>
        <button 
          onClick={() => {
            const nr = { 
              id: 'new-' + Date.now(), 
              title: "", 
              exercises: [], 
              createdAt: new Date().toISOString() 
            };
            setEditingRoutine(nr);
          }} 
          className="flex items-center gap-2 bg-neon-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-neon-500 transition-colors"
        >
          <Plus size={20} /> 루틴 직접 추가
        </button>
      </div>

      {/* Routine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routines.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl">
            <Dumbbell size={48} className="mx-auto mb-4 text-zinc-700" />
            <p className="text-zinc-500 text-lg">저장된 루틴이 없습니다. AI 추천을 받아보세요!</p>
          </div>
        ) : (
          routines.map(routine => (
            <div key={routine.id} className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-6 group hover:border-zinc-700 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-neon-400 transition-colors">{routine.title}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{new Date(routine.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setEditingRoutine({...routine})} 
                    className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={async () => {
                      if(confirm('정말 삭제하시겠습니까?')) {
                        await deleteRoutine(routine.id);
                      }
                    }} 
                    className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {routine.exercises.map(ex => (
                  <div key={ex.id} className="flex justify-between items-center p-3 rounded-xl bg-black/40 border border-zinc-800/50">
                    <span className="font-medium text-zinc-300">{ex.name}</span>
                    <span className="text-sm font-bold text-neon-400">{ex.sets}s × {ex.reps}r</span>
                  </div>
                ))}
                {routine.exercises.length === 0 && (
                  <p className="text-zinc-600 text-xs italic">운동이 아직 추가되지 않았습니다.</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit/Create Modal */}
      {editingRoutine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-xl rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">
                {editingRoutine.id.startsWith('new-') ? '새 루틴 생성' : '루틴 정보 수정'}
              </h3>
              <button onClick={() => setEditingRoutine(null)} className="text-zinc-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">루틴 이름</label>
                <input 
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-400 transition-colors text-white text-lg font-bold" 
                  value={editingRoutine.title} 
                  onChange={e => setEditingRoutine({...editingRoutine, title: e.target.value})} 
                  placeholder="예: 월요일 가슴 운동"
                />
              </div>
              
              <div className="space-y-4">
                <label className="text-sm font-medium text-zinc-400">운동 종목 리스트</label>
                <div className="max-h-60 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                  {editingRoutine.exercises.map(ex => (
                    <div key={ex.id} className="flex gap-2 items-center">
                      <input 
                        className="flex-1 min-w-[120px] bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-neon-400 transition-colors" 
                        placeholder="운동명" 
                        value={ex.name} 
                        onChange={e => {
                          setEditingRoutine({...editingRoutine, exercises: editingRoutine.exercises.map(item => item.id === ex.id ? {...item, name: e.target.value} : item)});
                        }} 
                      />
                      <div className="flex items-center gap-1">
                        <input 
                          className="w-14 bg-black border border-zinc-800 rounded-lg px-2 py-2 text-sm text-center focus:border-neon-400 transition-colors" 
                          type="number" 
                          placeholder="세트" 
                          value={ex.sets} 
                          onChange={e => {
                            setEditingRoutine({...editingRoutine, exercises: editingRoutine.exercises.map(item => item.id === ex.id ? {...item, sets: parseInt(e.target.value) || 0} : item)});
                          }} 
                        />
                        <span className="text-xs text-zinc-600">S</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input 
                          className="w-14 bg-black border border-zinc-800 rounded-lg px-2 py-2 text-sm text-center focus:border-neon-400 transition-colors" 
                          type="number" 
                          placeholder="회" 
                          value={ex.reps} 
                          onChange={e => {
                            setEditingRoutine({...editingRoutine, exercises: editingRoutine.exercises.map(item => item.id === ex.id ? {...item, reps: parseInt(e.target.value) || 0} : item)});
                          }} 
                        />
                        <span className="text-xs text-zinc-600">R</span>
                      </div>
                      <button 
                        onClick={() => {
                          setEditingRoutine({...editingRoutine, exercises: editingRoutine.exercises.filter(item => item.id !== ex.id)});
                        }} 
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  {editingRoutine.exercises.length === 0 && (
                    <p className="text-center py-4 text-zinc-600 text-sm">추가된 운동이 없습니다.</p>
                  )}
                </div>
                
                <button 
                  onClick={() => {
                    const ne = { id: Date.now().toString(), name: "새 운동", sets: 3, reps: 12, rest: 60, target: "전신" };
                    setEditingRoutine({...editingRoutine, exercises: [...editingRoutine.exercises, ne]});
                  }} 
                  className="w-full py-3 border border-dashed border-zinc-700 rounded-xl text-zinc-400 hover:text-white hover:border-zinc-500 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={18} /> 운동 종목 추가
                </button>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={async () => { 
                    if (editingRoutine.id.startsWith('new-')) {
                      await addRoutine(editingRoutine);
                    } else {
                      await updateRoutine(editingRoutine.id, editingRoutine);
                    }
                    setEditingRoutine(null); 
                  }} 
                  className="flex-1 bg-neon-400 text-black py-4 rounded-xl font-bold text-lg hover:bg-neon-500 transition-colors flex items-center justify-center gap-2"
                >
                  <Check size={20} /> 저장 완료
                </button>
                <button 
                  onClick={() => setEditingRoutine(null)} 
                  className="flex-1 bg-zinc-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-zinc-700 transition-colors"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutinePage;
