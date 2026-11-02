import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Import Design System & Styles
import './styles/index.css';
import './styles/campus3d.css';
import './styles/dashboard.css';
import './styles/classroom.css';

// Import Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';

// Import Structural Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Import Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Learning from './pages/Learning';
import Quiz from './pages/Quiz';
import Assignments from './pages/Assignments';
import Progress from './pages/Progress';
import Certificates from './pages/Certificates';
import MyCourses from './pages/MyCourses';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';

function AppLayout() {
  const location = useLocation();
  const isClassroom = location.pathname.startsWith('/classroom/');

  return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          {/* Public & Academic Exploration Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/classroom/:id" element={<Learning />} />
          <Route path="/quiz/:id" element={<Quiz />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Student Hub Routes (Protected) */}
          <Route 
            path="/student-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['student', 'admin', 'instructor']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-courses" 
            element={
              <ProtectedRoute allowedRoles={['student', 'admin', 'instructor']}>
                <MyCourses />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/assignments" 
            element={
              <ProtectedRoute allowedRoles={['student', 'admin', 'instructor']}>
                <Assignments />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/progress" 
            element={
              <ProtectedRoute allowedRoles={['student', 'admin', 'instructor']}>
                <Progress />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/certificates" 
            element={
              <ProtectedRoute allowedRoles={['student', 'admin', 'instructor']}>
                <Certificates />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute allowedRoles={['student', 'admin', 'instructor']}>
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* Faculty Instructor Hub (Protected) */}
          <Route 
            path="/instructor-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                <InstructorDashboard />
              </ProtectedRoute>
            } 
          />

          {/* University Administration Hub (Protected strictly for Admin) */}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {!isClassroom && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CourseProvider>
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </CourseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
