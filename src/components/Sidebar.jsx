import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  Award, 
  User, 
  Users, 
  ShieldAlert,
  ArrowRightLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { soundEngine } from '../utils/sound';

export default function Sidebar() {
  const { user, role, loginAs } = useAuth();
  const navigate = useNavigate();

  const handleNavClick = () => {
    soundEngine.playClick(750);
  };

  const toggleRole = () => {
    let nextRole = 'student';
    if (role === 'student') nextRole = 'instructor';
    else if (role === 'instructor') nextRole = 'admin';
    else nextRole = 'student';

    loginAs(nextRole);
    if (nextRole === 'admin') navigate('/admin-dashboard');
    else if (nextRole === 'instructor') navigate('/instructor-dashboard');
    else navigate('/student-dashboard');
  };

  const getRoleBadgeClass = () => {
    if (role === 'admin') return 'badge-rose';
    if (role === 'instructor') return 'badge-amber';
    return 'badge-cyan';
  };

  return (
    <aside className="dashboard-sidebar">
      {/* Role Indicator & 3-Way Quick Switcher for Viva Evaluation */}
      <div style={{
        padding: '12px',
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
            Active Interface
          </span>
          <span className={`badge ${getRoleBadgeClass()}`}>
            {role}
          </span>
        </div>
        <button 
          onClick={toggleRole}
          className="btn btn-outline btn-sm"
          style={{ width: '100%', fontSize: '0.75rem', padding: '6px' }}
          title="Switch view to evaluate Student / Instructor / Admin features"
        >
          <ArrowRightLeft size={12} /> Switch to {role === 'student' ? 'Instructor' : role === 'instructor' ? 'Admin' : 'Student'}
        </button>
      </div>

      {/* Navigation Items based on Role */}
      {role === 'admin' ? (
        /* Administrator Nav Items */
        <>
          <NavLink 
            to="/admin-dashboard" 
            onClick={handleNavClick}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
          >
            <ShieldAlert size={18} /> Admin Command Hub
          </NavLink>

          <NavLink 
            to="/courses" 
            onClick={handleNavClick}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
          >
            <BookOpen size={18} /> Course Catalog
          </NavLink>

          <NavLink 
            to="/admin-dashboard?tab=users" 
            onClick={handleNavClick}
            className="sidebar-nav-item"
          >
            <Users size={18} /> User Governance
          </NavLink>

          <NavLink 
            to="/progress" 
            onClick={handleNavClick}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
          >
            <TrendingUp size={18} /> Telemetry Analytics
          </NavLink>

          <NavLink 
            to="/profile" 
            onClick={handleNavClick}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
          >
            <User size={18} /> Senate Profile
          </NavLink>
        </>
      ) : role === 'instructor' ? (
        /* Faculty Instructor Nav Items */
        <>
          <NavLink 
            to="/instructor-dashboard" 
            onClick={handleNavClick}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} /> Faculty Dashboard
          </NavLink>

          <NavLink 
            to="/courses" 
            onClick={handleNavClick}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
          >
            <BookOpen size={18} /> Course Catalog
          </NavLink>

          <NavLink 
            to="/assignments" 
            onClick={handleNavClick}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
          >
            <FileText size={18} /> Assignments Review
          </NavLink>

          <NavLink 
            to="/profile" 
            onClick={handleNavClick}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
          >
            <User size={18} /> Faculty Profile
          </NavLink>
        </>
      ) : (
        /* Student Scholar Nav Items */
        <>
          <NavLink 
            to="/student-dashboard" 
            onClick={handleNavClick}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} /> Student Pod
          </NavLink>

          <NavLink 
            to="/my-courses" 
            onClick={handleNavClick}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
          >
            <BookOpen size={18} /> My Enrolled Courses
          </NavLink>

          <NavLink 
            to="/assignments" 
            onClick={handleNavClick}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
          >
            <FileText size={18} /> Assignments
          </NavLink>

          <NavLink 
            to="/progress" 
            onClick={handleNavClick}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
          >
            <TrendingUp size={18} /> Study Analytics
          </NavLink>

          <NavLink 
            to="/certificates" 
            onClick={handleNavClick}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
          >
            <Award size={18} /> Certificates
          </NavLink>

          <NavLink 
            to="/profile" 
            onClick={handleNavClick}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
          >
            <User size={18} /> Academic Profile
          </NavLink>
        </>
      )}

      {/* User Mini Card at bottom */}
      <div className="sidebar-user-card">
        <img 
          src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'} 
          alt={user?.name} 
          className="user-avatar-sm"
        />
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {user?.name}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {user?.department || 'LearnSphere'}
          </div>
        </div>
      </div>
    </aside>
  );
}
