import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Compass, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Award, 
  User, 
  LogOut, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { soundEngine } from '../utils/sound';

export default function Navbar() {
  const { user, role, isAuthenticated, logout, loginAs } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const getDashboardPath = () => {
    if (role === 'admin') return '/admin-dashboard';
    if (role === 'instructor') return '/instructor-dashboard';
    return '/student-dashboard';
  };

  const getRoleBadgeStyle = () => {
    if (role === 'admin') return 'badge-rose';
    if (role === 'instructor') return 'badge-amber';
    return 'badge-cyan';
  };

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: 'var(--navbar-height)',
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 28px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Brand Identity */}
        <Link 
          to="/" 
          onClick={() => soundEngine.playClick(800)}
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#07090e',
            boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Learn<span style={{ color: 'var(--accent-cyan)' }}>Sphere</span>
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)'
            }}>
              3D University LMS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="desktop-nav-links">
          <Link 
            to="/" 
            className={`btn btn-outline btn-sm ${isActive('/') ? 'active-nav' : ''}`}
            style={{ 
              border: 'none', 
              color: isActive('/') ? 'var(--accent-cyan)' : 'var(--text-secondary)'
            }}
          >
            <Compass size={16} /> 3D Campus
          </Link>

          <Link 
            to="/courses" 
            className={`btn btn-outline btn-sm ${isActive('/courses') ? 'active-nav' : ''}`}
            style={{ 
              border: 'none', 
              color: isActive('/courses') ? 'var(--accent-cyan)' : 'var(--text-secondary)' 
            }}
          >
            <BookOpen size={16} /> Course Catalog
          </Link>

          {isAuthenticated && (
            <>
              <Link 
                to={getDashboardPath()} 
                className="btn btn-outline btn-sm"
                style={{ 
                  border: 'none', 
                  color: (isActive('/student-dashboard') || isActive('/instructor-dashboard') || isActive('/admin-dashboard')) 
                    ? 'var(--accent-cyan)' 
                    : 'var(--text-secondary)' 
                }}
              >
                {role === 'admin' ? <ShieldAlert size={16} /> : <LayoutDashboard size={16} />} Dashboard
              </Link>

              <Link 
                to="/assignments" 
                className="btn btn-outline btn-sm"
                style={{ 
                  border: 'none', 
                  color: isActive('/assignments') ? 'var(--accent-cyan)' : 'var(--text-secondary)' 
                }}
              >
                <FileText size={16} /> Assignments
              </Link>

              <Link 
                to="/certificates" 
                className="btn btn-outline btn-sm"
                style={{ 
                  border: 'none', 
                  color: isActive('/certificates') ? 'var(--accent-cyan)' : 'var(--text-secondary)' 
                }}
              >
                <Award size={16} /> Certificates
              </Link>
            </>
          )}
        </div>

        {/* Right Action Icons & Auth Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="btn btn-outline btn-sm"
            style={{ padding: '8px', borderRadius: '50%', width: '36px', height: '36px' }}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {isAuthenticated ? (
            /* User Profile Dropdown */
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setProfileDropdownOpen(prev => !prev)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '4px 10px 4px 6px', gap: '8px', borderRadius: '999px' }}
              >
                <img 
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'} 
                  alt={user?.name} 
                  style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} 
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user?.name?.split(' ')[0]}</span>
                <span className={`badge ${getRoleBadgeStyle()}`} style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                  {role}
                </span>
                <ChevronDown size={14} />
              </button>

              {profileDropdownOpen && (
                <div 
                  onClick={() => setProfileDropdownOpen(false)}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '46px',
                    width: '230px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    zIndex: 200
                  }}
                >
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '4px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user?.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.email}</div>
                  </div>

                  <Link 
                    to={getDashboardPath()}
                    className="sidebar-nav-item"
                    style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                  >
                    <LayoutDashboard size={15} /> Dashboard
                  </Link>

                  <Link 
                    to="/profile"
                    className="sidebar-nav-item"
                    style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                  >
                    <User size={15} /> My Profile
                  </Link>

                  <button 
                    onClick={handleLogout}
                    className="sidebar-nav-item"
                    style={{ 
                      padding: '8px 12px', 
                      fontSize: '0.85rem', 
                      color: 'var(--accent-rose)', 
                      background: 'transparent', 
                      border: 'none', 
                      width: '100%', 
                      cursor: 'pointer' 
                    }}
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Guest Actions */
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                onClick={() => {
                  loginAs('student');
                  navigate('/student-dashboard');
                }}
                className="btn btn-outline btn-sm"
                title="Instant Demo Student Access"
              >
                Demo Student
              </button>
              <button 
                onClick={() => {
                  loginAs('admin');
                  navigate('/admin-dashboard');
                }}
                className="btn btn-outline btn-sm"
                style={{ borderColor: 'rgba(244, 63, 94, 0.4)', color: 'var(--accent-rose)' }}
                title="Instant Demo Admin Access"
              >
                Demo Admin
              </button>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Log In
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button 
            className="btn btn-outline btn-sm mobile-menu-btn"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            style={{ display: 'none', padding: '8px' }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 'var(--navbar-height)',
          left: 0,
          right: 0,
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 99
        }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="sidebar-nav-item">
            <Compass size={18} /> 3D Campus
          </Link>
          <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className="sidebar-nav-item">
            <BookOpen size={18} /> Course Catalog
          </Link>
          {isAuthenticated && (
            <>
              <Link to={getDashboardPath()} onClick={() => setMobileMenuOpen(false)} className="sidebar-nav-item">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <Link to="/assignments" onClick={() => setMobileMenuOpen(false)} className="sidebar-nav-item">
                <FileText size={18} /> Assignments
              </Link>
              <Link to="/certificates" onClick={() => setMobileMenuOpen(false)} className="sidebar-nav-item">
                <Award size={18} /> Certificates
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
