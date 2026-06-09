import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/ui/Navbar';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ForgotPassword from '@/pages/ForgotPassword';
import AddMeal from '@/pages/AddMeal';
import RecommendationPage from '@/pages/RecommendationPage';
import RoutinePage from '@/pages/RoutinePage';
import PlaceholderPage from '@/pages/Placeholder';
import { RoutineProvider } from '@/context/RoutineContext';

import CommunityHome from '@/pages/community/CommunityHome';
import RoutineList from '@/pages/community/RoutineList';
import RoutineDetail from '@/pages/community/RoutineDetail';
import RoutineForm from '@/pages/community/RoutineForm';
import MateList from '@/pages/community/MateList';
import MateDetail from '@/pages/community/MateDetail';
import MateForm from '@/pages/community/MateForm';

function App() {
  return (
    <RoutineProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Navbar />
          <main className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route path="/meal/add" element={<AddMeal />} />
              <Route path="/exercise/recommend" element={<RecommendationPage />} />
              <Route path="/exercise/routines" element={<RoutinePage />} />
              
              {/* 커뮤니티 라우트 */}
              <Route path="/community" element={<CommunityHome />} />
              <Route path="/community/routines" element={<RoutineList />} />
              <Route path="/community/routines/new" element={<RoutineForm />} />
              <Route path="/community/routines/:id" element={<RoutineDetail />} />
              <Route path="/community/mates" element={<MateList />} />
              <Route path="/community/mates/new" element={<MateForm />} />
              <Route path="/community/mates/:id" element={<MateDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RoutineProvider>
  );
}

export default App;
