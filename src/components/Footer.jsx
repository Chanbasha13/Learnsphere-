import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Terminal, ShieldCheck, Heart } from 'lucide-react';
import { DEPARTMENTS } from '../data/departmentsData';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)',
      padding: '60px 24px 30px',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#07090e'
              }}>
                <Sparkles size={18} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                Learn<span style={{ color: 'var(--accent-cyan)' }}>Sphere</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '16px' }}>
              An immersive 3D digital university campus and interactive Learning Management System built for next-generation academic exploration.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--accent-emerald)' }}>
              <ShieldCheck size={14} /> Academic Demo Verified • LocalStorage Active
            </div>
          </div>

          {/* Departments Col */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '16px' }}>
              University Departments
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {DEPARTMENTS.map(d => (
                <Link key={d.id} to={`/courses?department=${d.id}`} style={{ transition: 'color 0.2s ease' }}>
                  {d.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Academic Portals */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Student & Faculty Hubs
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <Link to="/courses">Academic Course Catalog</Link>
              <Link to="/student-dashboard">Student Virtual Pod</Link>
              <Link to="/instructor-dashboard">Faculty Command Center</Link>
              <Link to="/admin-dashboard">Senate Administration</Link>
              <Link to="/assignments">Course Assignments</Link>
              <Link to="/certificates">Certificate Verification</Link>
            </div>
          </div>

          {/* Tech Stack for Viva */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Viva Project Specs
            </h4>
            <div style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              fontSize: '0.8rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div><strong style={{ color: 'var(--accent-cyan)' }}>Framework:</strong> React.js 18 + Vite 5</div>
              <div><strong style={{ color: 'var(--accent-cyan)' }}>3D Engine:</strong> CSS3 3D Transforms + Three.js</div>
              <div><strong style={{ color: 'var(--accent-cyan)' }}>Audio:</strong> Web Audio API Synthesizer</div>
              <div><strong style={{ color: 'var(--accent-cyan)' }}>Storage:</strong> LocalStorage Browser Persistence</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} LearnSphere LMS. Designed for Academic Evaluation & Presentation.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Built with React, HTML5, CSS3 3D & JavaScript
          </div>
        </div>
      </div>
    </footer>
  );
}
