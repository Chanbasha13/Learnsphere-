import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Flame, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Sparkles, 
  AlertCircle,
  TrendingUp,
  FileText
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { ACHIEVEMENTS } from '../data/achievementsData';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { enrolledCourses, progress, quizResults, assignments, courses } = useCourses();
  const navigate = useNavigate();

  // Recommended courses: those not enrolled
  const recommended = courses.filter(c => !enrolledCourses.some(e => e.id === c.id)).slice(0, 2);

  // Pending assignments
  const pendingAssignments = assignments.filter(a => a.status === 'Pending').slice(0, 2);

  // Completed quizzes count
  const passedQuizzesCount = Object.values(quizResults).filter(q => q.passed).length;

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        {/* Welcome Header */}
        <div className="dashboard-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-cyan">
                Student ID: {user?.studentId || 'LS-2026-904'}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                • {user?.department || 'Programming Academy'}
              </span>
            </div>
            <h1 className="welcome-title">
              Welcome back, {user?.name?.split(' ')[0] || 'Scholar'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Track your computational research, resume your active modules, and prepare for academic certification.
            </p>
          </div>

          <Link to="/courses" className="btn btn-primary btn-sm">
            <BookOpen size={15} /> Browse Full Catalog
          </Link>
        </div>

        {/* 4 Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)' }}>
              <BookOpen size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">{enrolledCourses.length}</span>
              <span className="stat-name">Enrolled Courses</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
              <Flame size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">{user?.streak || 5} Days</span>
              <span className="stat-name">Campus Study Streak</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
              <CheckCircle2 size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">{passedQuizzesCount}</span>
              <span className="stat-name">Quizzes Passed</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(129, 140, 248, 0.15)', color: 'var(--accent-indigo)' }}>
              <Award size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">{passedQuizzesCount >= 1 ? '1' : '0'}</span>
              <span className="stat-name">Certificates Ready</span>
            </div>
          </div>
        </div>

        {/* Streak & Consistency Bar */}
        <div className="streak-banner">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Flame size={20} style={{ color: 'var(--accent-amber)' }} />
              <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                {user?.streak || 5}-Day Academic Consistency Streak!
              </strong>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              You're only 2 days away from unlocking the "Persistent Scholar" campus badge. Keep studying daily!
            </p>
          </div>

          <div className="streak-days-track">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
              <div 
                key={idx} 
                className={`streak-day-dot ${idx < 5 ? 'active' : ''}`}
                title={`Day ${idx + 1}: ${idx < 5 ? 'Completed' : 'Upcoming'}`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Active Enrolled Courses */}
        <div style={{ marginBottom: '40px' }}>
          <div className="section-title-row">
            <div>
              <h2 style={{ fontSize: '1.35rem' }}>Active Enrolled Courses</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Pick up right where you left off
              </p>
            </div>
            <Link to="/my-courses" className="btn btn-outline btn-sm">
              View All Enrolled ({enrolledCourses.length})
            </Link>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="glass-panel" style={{ padding: '36px', textAlign: 'center' }}>
              <p style={{ marginBottom: '16px' }}>You haven't enrolled in any courses yet.</p>
              <Link to="/courses" className="btn btn-primary btn-sm">
                Explore Course Catalog
              </Link>
            </div>
          ) : (
            <div className="courses-grid-3d">
              {enrolledCourses.map(course => {
                const currentPct = progress[course.id] || 0;
                const quizScore = quizResults[course.id];

                return (
                  <div key={course.id} className="course-card-3d">
                    <div className="course-card-banner">
                      <img src={course.image} alt={course.title} className="course-card-img" />
                      <span className="badge badge-cyan" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        {course.departmentName}
                      </span>
                    </div>

                    <div className="course-card-content">
                      <h3 className="course-card-title">{course.title}</h3>
                      <div className="course-card-meta">
                        <span>Instructor: {course.instructor}</span>
                      </div>

                      {/* Progress bar */}
                      <div className="course-progress-track">
                        <div className="course-progress-fill" style={{ width: `${currentPct}%` }}></div>
                      </div>
                      <div className="course-progress-label">
                        <span>Course Completion</span>
                        <strong style={{ color: currentPct === 100 ? 'var(--accent-emerald)' : 'var(--accent-cyan)' }}>
                          {currentPct}%
                        </strong>
                      </div>

                      {/* Quiz result status badge if taken */}
                      {quizScore && (
                        <div style={{
                          padding: '6px 10px',
                          background: quizScore.passed ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.12)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.78rem',
                          marginBottom: '14px',
                          color: quizScore.passed ? 'var(--accent-emerald)' : 'var(--accent-rose)'
                        }}>
                          Quiz: {quizScore.score}/{quizScore.total} ({quizScore.percentage}%) • {quizScore.passed ? 'Passed' : 'Needs Retake'}
                        </div>
                      )}

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto' }}>
                        <Link 
                          to={`/classroom/${course.id}`}
                          className="btn btn-primary btn-sm"
                          style={{ fontSize: '0.8rem' }}
                        >
                          <Play size={13} /> Resume
                        </Link>
                        <Link 
                          to={`/quiz/${course.id}`}
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '0.8rem' }}
                        >
                          Exam Quiz
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Two-Column Lower Section: Pending Assignments & Academic Achievements */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {/* Assignments Alert Card */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} style={{ color: 'var(--accent-cyan)' }} />
                <h3 style={{ fontSize: '1.15rem' }}>Pending Coursework</h3>
              </div>
              <Link to="/assignments" className="btn btn-outline btn-sm" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                All Assignments
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pendingAssignments.map(assign => (
                <div 
                  key={assign.id}
                  style={{
                    padding: '14px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span className="badge badge-amber" style={{ fontSize: '0.68rem' }}>Due {assign.dueDate}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{assign.points} pts</span>
                  </div>
                  <h4 style={{ fontSize: '0.925rem', marginBottom: '4px' }}>{assign.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    {assign.course}
                  </p>
                  <Link to="/assignments" className="btn btn-outline btn-sm" style={{ width: '100%', fontSize: '0.78rem' }}>
                    Submit Work <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Achievements Showcase */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} style={{ color: 'var(--accent-amber)' }} />
                <h3 style={{ fontSize: '1.15rem' }}>Campus Achievements</h3>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                3 of 6 Unlocked
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {ACHIEVEMENTS.slice(0, 3).map(badge => (
                <div 
                  key={badge.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: badge.unlocked ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-secondary)',
                    color: badge.unlocked ? 'var(--accent-emerald)' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Award size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>{badge.title}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                        {badge.unlocked ? 'Unlocked' : `${badge.progress}%`}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {badge.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
