import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent-cyan)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '32px',
            height: '32px',
            border: '3px solid rgba(56, 189, 248, 0.2)',
            borderTopColor: 'var(--accent-cyan)',
            borderRadius: '50%',
            animation: 'spinSlow 1s linear infinite',
            margin: '0 auto 12px'
          }}></div>
          <span style={{ fontSize: '0.85rem' }}>Authenticating Session...</span>
        </div>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is not authorized for this route
  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (role === 'instructor') {
      return <Navigate to="/instructor-dashboard" replace />;
    } else {
      return <Navigate to="/student-dashboard" replace />;
    }
  }

  return children;
}

