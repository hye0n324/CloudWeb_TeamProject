import { useState, type FC } from 'react';
import axios from 'axios';
import { useRoutines, type Routine } from '../context/RoutineContext';
import { Sparkles, Save, Dumbbell, Target, Gauge } from 'lucide-react';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

const RecommendationPage: FC = () => {
  const { addRoutine } = useRoutines();
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Routine | null>(null);
  const [form, setForm] = useState({
    goal: '근성장',
    level: '초보',
    equipment: '전체'
  });

  const fetchRecommendation = async () => {
    setLoading(true);
    const prompt = `운동 목표: ${form.goal}, 수준: ${form.level}, 장비: ${form.equipment}. 
    이 조건에 맞는 운동 루틴 1개를 JSON 형식으로 추천해줘. 
    반드시 모든 필드(운동명 포함)는 한국어로 작성해. 일본어나 영어는 사용하지 마.
    형식: { "title": "루틴이름", "exercises": [ { "name": "운동명", "sets": 3, "reps": 12, "rest": 60, "target": "타겟부위" } ] }
    JSON 데이터만 출력해.`;

    try {
      const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      }, {
        headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }
      });

      const content = JSON.parse(response.data.choices[0].message.content);
      const newRoutine: Routine = {
        id: Date.now().toString(),
        title: content.title || "AI 추천 루틴",
        exercises: content.exercises.map((ex: any, idx: number) => ({
          id: `${Date.now()}-${idx}`,
          name: ex.name, sets: ex.sets, reps: ex.reps, rest: ex.rest, target: ex.target
        })),
        createdAt: new Date().toISOString()
      };
      setRecommendation(newRoutine);
    } catch (error: any) {
      alert(`오류: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-neon-400 text-sm font-medium mb-4">
          <Sparkles size={16} />
          <span>AI Custom Recommendation</span>
        </div>
        <h2 className="text-4xl font-bold mb-4">AI 맞춤형 운동 추천</h2>
        <p className="text-zinc-400">당신의 목표와 수준에 맞는 최적의 루틴을 AI가 즉시 설계해 드립니다.</p>
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 mb-12">
        <form onSubmit={(e) => { e.preventDefault(); fetchRecommendation(); }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                <Target size={16} /> 운동 목표
              </label>
              <select 
                value={form.goal} 
                onChange={(e) => setForm({...form, goal: e.target.value})}
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-400 transition-colors appearance-none text-white"
              >
                <option value="다이어트">다이어트</option>
                <option value="근성장">근성장</option>
                <option value="체력증진">체력 증진</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                <Gauge size={16} /> 운동 수준
              </label>
              <select 
                value={form.level} 
                onChange={(e) => setForm({...form, level: e.target.value})}
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-400 transition-colors appearance-none text-white"
              >
                <option value="초보">초보</option>
                <option value="중급">중급</option>
                <option value="상급">상급</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                <Dumbbell size={16} /> 보유 장비
              </label>
              <select 
                value={form.equipment} 
                onChange={(e) => setForm({...form, equipment: e.target.value})}
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-400 transition-colors appearance-none text-white"
              >
                <option value="전체">전체 (헬스장)</option>
                <option value="덤벨">덤벨/바벨</option>
                <option value="맨몸">맨몸</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-neon-400 text-black py-4 rounded-xl font-bold text-lg hover:bg-neon-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                AI 엔진 분석 중...
              </>
            ) : (
              <>
                <Sparkles size={20} /> AI 추천 루틴 생성하기
              </>
            )}
          </button>
        </form>
      </div>

      {recommendation && (
        <div className="bg-zinc-900 border-2 border-neon-400 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-neon-400 mb-1">{recommendation.title}</h3>
              <p className="text-zinc-500 text-sm">AI가 생성한 최적의 루틴입니다.</p>
            </div>
            <button 
              onClick={() => { addRoutine(recommendation); alert('나의 루틴에 저장되었습니다!'); setRecommendation(null); }} 
              className="flex items-center gap-2 bg-zinc-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-zinc-700 transition-colors"
            >
              <Save size={18} /> 내 루틴으로 저장
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendation.exercises.map(ex => (
              <div key={ex.id} className="p-5 rounded-2xl bg-black border border-zinc-800 group hover:border-neon-400/50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-lg">{ex.name}</h4>
                  <span className="text-xs px-2 py-1 rounded-md bg-zinc-900 text-zinc-400 uppercase tracking-wider font-semibold">{ex.target}</span>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 p-3 rounded-xl bg-zinc-900/50 text-center">
                    <div className="text-xs text-zinc-500 mb-1 uppercase">Sets</div>
                    <div className="text-xl font-black text-neon-400">{ex.sets}</div>
                  </div>
                  <div className="flex-1 p-3 rounded-xl bg-zinc-900/50 text-center">
                    <div className="text-xs text-zinc-500 mb-1 uppercase">Reps</div>
                    <div className="text-xl font-black text-neon-400">{ex.reps}</div>
                  </div>
                  <div className="flex-1 p-3 rounded-xl bg-zinc-900/50 text-center">
                    <div className="text-xs text-zinc-500 mb-1 uppercase">Rest</div>
                    <div className="text-xl font-black text-neon-400">{ex.rest}s</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationPage;
