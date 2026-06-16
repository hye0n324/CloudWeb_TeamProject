import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/ui/Navbar';
import Dashboard from '@/pages/Dashboard';
import LandingPage from '@/pages/LandingPage';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ForgotPassword from '@/pages/ForgotPassword';
import AddMeal from '@/pages/AddMeal';
import RecommendationPage from '@/pages/RecommendationPage';
import RoutinePage from '@/pages/RoutinePage';
import { RoutineProvider } from '@/context/RoutineContext';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

import CommunityHome from '@/pages/community/CommunityHome';
import RoutineList from '@/pages/community/RoutineList';
import RoutineDetail from '@/pages/community/RoutineDetail';
import RoutineForm from '@/pages/community/RoutineForm';
import MateList from '@/pages/community/MateList';
import MateDetail from '@/pages/community/MateDetail';
import MateForm from '@/pages/community/MateForm';

function App() {
  return (
    <AuthProvider>
      <RoutineProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar />
            <main className="flex-1 flex flex-col">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot" element={<ForgotPassword />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/meal/add" element={<ProtectedRoute><AddMeal /></ProtectedRoute>} />
                <Route path="/exercise/recommend" element={<ProtectedRoute><RecommendationPage /></ProtectedRoute>} />
                <Route path="/exercise/routines" element={<ProtectedRoute><RoutinePage /></ProtectedRoute>} />

                {/* 커뮤니티 라우트 */}
                <Route path="/community" element={<ProtectedRoute><CommunityHome /></ProtectedRoute>} />
                <Route path="/community/routines" element={<ProtectedRoute><RoutineList /></ProtectedRoute>} />
                <Route path="/community/routines/new" element={<ProtectedRoute><RoutineForm /></ProtectedRoute>} />
                <Route path="/community/routines/:id" element={<ProtectedRoute><RoutineDetail /></ProtectedRoute>} />
                <Route path="/community/mates" element={<ProtectedRoute><MateList /></ProtectedRoute>} />
                <Route path="/community/mates/new" element={<ProtectedRoute><MateForm /></ProtectedRoute>} />
                <Route path="/community/mates/:id" element={<ProtectedRoute><MateDetail /></ProtectedRoute>} />
              </Routes>
            </main>
          </div>
        </Router>
      </RoutineProvider>
    </AuthProvider>
  );
}

export default App;
