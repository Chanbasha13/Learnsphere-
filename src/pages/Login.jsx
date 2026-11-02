import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, LogIn, ShieldAlert, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, loginAs } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Destination after login if redirected from a protected route
  const from = location.state?.from?.pathname || null;

  const redirectByRole = (userRole) => {
    if (from) {
      navigate(from, { replace: true });
      return;
    }
    if (userRole === 'admin') {
      navigate('/admin-dashboard');
    } else if (userRole === 'instructor') {
      navigate('/instructor-dashboard');
    } else {
      navigate('/student-dashboard');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both your academic email and password.');
      return;
    }

    const res = login(email, password);
    if (res.success) {
      redirectByRole(res.user.role);
    } else {
      setError(res.message);
    }
  };

  const handleDemoLogin = (role) => {
    const res = loginAs(role);
    if (res.success) {
      redirectByRole(res.user.role);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - var(--navbar-height))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'radial-gradient(circle at 50% 20%, #0d1627 0%, #06080e 80%)'
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '460px', padding: '36px' }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#07090e',
            marginBottom: '12px'
          }}>
            <Sparkles size={22} />
          </div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '6px' }}>Portal Authentication</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Sign into your LearnSphere digital university account
          </p>
        </div>

        {/* 3 Role Demo Fast Login Buttons */}
        <div style={{
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
          marginBottom: '22px'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase' }}>
            Instant Viva Evaluation Access:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
            <button 
              type="button" 
              onClick={() => handleDemoLogin('student')}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.75rem', padding: '6px 4px' }}
              title="alex@learnsphere.edu / password123"
            >
              <UserCheck size={12} /> Student
            </button>
            <button 
              type="button" 
              onClick={() => handleDemoLogin('instructor')}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.75rem', padding: '6px 4px' }}
              title="instructor@learnsphere.edu / password123"
            >
              <ShieldCheck size={12} /> Instructor
            </button>
            <button 
              type="button" 
              onClick={() => handleDemoLogin('admin')}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.75rem', padding: '6px 4px', borderColor: 'rgba(244, 63, 94, 0.4)', color: 'var(--accent-rose)' }}
              title="admin@learnsphere.edu / password123"
            >
              <ShieldAlert size={12} /> Admin
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            padding: '12px 14px',
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--accent-rose)',
            fontSize: '0.85rem',
            marginBottom: '18px'
          }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Academic Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="e.g. alex@learnsphere.edu or admin@learnsphere.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Access Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="form-input" 
                placeholder="Enter password (default: password123)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ paddingRight: '40px' }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(p => !p)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            <LogIn size={16} /> Enter LearnSphere
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Don't have an academic record?{' '}
          <Link to="/signup" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
