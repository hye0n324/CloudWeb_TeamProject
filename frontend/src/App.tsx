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
import { AuthProvider } from '@/context/AuthContext';

function App() {
  return (
    <AuthProvider>
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
              <Route path="/community" element={<PlaceholderPage title="커뮤니티" />} />
              <Route path="/community/routines" element={<PlaceholderPage title="루틴 공유" />} />
              <Route path="/community/mates" element={<PlaceholderPage title="운동 메이트" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RoutineProvider>
    </AuthProvider>
  );
}

export default App;
