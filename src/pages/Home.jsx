import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  BookOpen, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Code2, 
  Cpu, 
  Palette, 
  TrendingUp, 
  ShieldCheck, 
  Users,
  GraduationCap
} from 'lucide-react';
import Campus3DScene from '../scenes/Campus3DScene';
import { DEPARTMENTS } from '../data/departmentsData';
import { coursesData } from '../data/coursesData';
import { useAuth } from '../context/AuthContext';
import { soundEngine } from '../utils/sound';

export default function Home() {
  const { isAuthenticated, role, loginAs } = useAuth();
  const navigate = useNavigate();

  // Pick top 3 featured courses
  const featuredCourses = coursesData.slice(0, 3);

  return (
    <div className="home-page-wrapper">
      {/* 3D Campus Experience Hero */}
      <Campus3DScene />

      {/* Quick Action Banner */}
      <section style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '24px 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(56, 189, 248, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)'
            }}>
              <GraduationCap size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>Spring 2026 Academic Cohort</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Admissions open across all 6 specialized digital computing departments.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link to="/courses" className="btn btn-outline btn-sm">
              <BookOpen size={15} /> View All 10 Courses
            </Link>
            {!isAuthenticated ? (
              <button 
                onClick={() => {
                  loginAs('student');
                  navigate('/student-dashboard');
                }}
                className="btn btn-primary btn-sm"
              >
                Instant Student Access <ArrowRight size={14} />
              </button>
            ) : (
              <Link 
                to={role === 'admin' ? '/admin-dashboard' : role === 'instructor' ? '/instructor-dashboard' : '/student-dashboard'}
                className="btn btn-primary btn-sm"
              >
                Go to My Dashboard <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* University Departments Grid */}
      <section style={{ padding: '80px 0', background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 50px' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '12px' }}>
              Academic Structure
            </span>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
              Six Centers of Computational Excellence
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
              Each department features custom designed research facilities, interactive 3D simulations, and accredited curricula designed by domain authorities.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {DEPARTMENTS.map(dept => (
              <div 
                key={dept.id}
                className="glass-panel"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: dept.accentColor
                }}></div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span className="badge" style={{ background: dept.accentGlow, color: dept.accentColor, borderColor: dept.accentColor }}>
                    {dept.code}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {dept.landmark}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
                  {dept.name}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.6', flex: 1 }}>
                  {dept.tagline}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-subtle)',
                  marginTop: 'auto'
                }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <strong>{dept.stats.coursesCount}</strong> Degree Programs
                  </span>
                  <Link 
                    to={`/courses?department=${dept.id}`}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.8rem' }}
                  >
                    View Courses <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Showcase */}
      <section style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <span className="badge badge-emerald" style={{ marginBottom: '8px' }}>
                Accredited Curriculum
              </span>
              <h2 style={{ fontSize: '2rem' }}>Featured Academic Programs</h2>
            </div>
            <Link to="/courses" className="btn btn-outline btn-sm">
              Explore All Programs <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {featuredCourses.map(course => (
              <div key={course.id} className="course-card-3d">
                <div className="course-card-banner">
                  <img src={course.image} alt={course.title} className="course-card-img" />
                  <span 
                    className="badge badge-cyan" 
                    style={{ position: 'absolute', top: '12px', right: '12px' }}
                  >
                    {course.badge}
                  </span>
                </div>

                <div className="course-card-content">
                  <span className="course-card-dept">{course.departmentName}</span>
                  <h3 className="course-card-title">{course.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px', flex: 1 }}>
                    {course.description.slice(0, 105)}...
                  </p>

                  <div className="course-card-meta">
                    <span>★ {course.rating} ({course.reviewsCount})</span>
                    <span>• {course.duration}</span>
                    <span>• {course.difficulty}</span>
                  </div>

                  <Link 
                    to={`/course/${course.id}`}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%' }}
                  >
                    View Syllabus & Enroll <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Innovation & Architecture Pillars */}
      <section style={{ padding: '80px 0', background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            <div className="glass-panel" style={{ padding: '32px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(56, 189, 248, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-cyan)',
                marginBottom: '18px'
              }}>
                <Sparkles size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Immersive Spatial Learning</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Move beyond flat, static course lists. LearnSphere turns academic education into an architectural journey with real 3D perspectives, ambient soundscapes, and digital department towers.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '32px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-emerald)',
                marginBottom: '18px'
              }}>
                <CheckCircle2 size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Verified Certifications</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Every course culminates in rigorous interactive examinations. Pass the academic threshold to generate official, cryptographically verifiable certificates formatted for print and verification.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '32px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(129, 140, 248, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-indigo)',
                marginBottom: '18px'
              }}>
                <ShieldCheck size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>100% Client Persistence</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Complete zero-friction demo environment powered by browser LocalStorage. Progress, quiz scores, assignment submissions, and instructor course creation persist safely between browser refreshes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
