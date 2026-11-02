import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  Award, 
  CheckCircle2, 
  Flame, 
  BarChart3, 
  PieChart, 
  BookOpen 
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';

export default function Progress() {
  const { user } = useAuth();
  const { enrolledCourses, progress, quizResults } = useCourses();

  // Weekly study hours dataset (Mon - Sun)
  const weeklyHours = [
    { day: 'Mon', hours: 4.2 },
    { day: 'Tue', hours: 5.5 },
    { day: 'Wed', hours: 3.8 },
    { day: 'Thu', hours: 6.2 },
    { day: 'Fri', hours: 7.0 },
    { day: 'Sat', hours: 4.5 },
    { day: 'Sun', hours: 2.5 }
  ];

  const maxHours = Math.max(...weeklyHours.map(w => w.hours));

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>Academic Metrics</span>
            <h1 className="welcome-title">Learning Analytics & Progress</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Comprehensive performance telemetry across your university degree journey.
            </p>
          </div>
        </div>

        {/* Top 4 Metric Summaries */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)' }}>
              <Clock size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">{user?.studyHours || 42.5} hrs</span>
              <span className="stat-name">Total Lab Hours</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
              <TrendingUp size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">3.92 / 4.0</span>
              <span className="stat-name">Cumulative GPA</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
              <Flame size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">{user?.streak || 5} Days</span>
              <span className="stat-name">Active Streak</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(129, 140, 248, 0.15)', color: 'var(--accent-indigo)' }}>
              <Award size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">95%</span>
              <span className="stat-name">Exam Pass Rate</span>
            </div>
          </div>
        </div>

        {/* Weekly Study Hours Interactive SVG Bar Chart */}
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem' }}>Weekly Study Hours Telemetry</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Time spent active inside interactive 3D classrooms and code simulations
              </p>
            </div>
            <span className="badge badge-cyan">33.7 Total Hours this week</span>
          </div>

          {/* Responsive CSS Bar Chart */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '200px',
            paddingTop: '20px',
            borderBottom: '1px solid var(--border-medium)',
            gap: '12px'
          }}>
            {weeklyHours.map((item, idx) => {
              const heightPct = Math.round((item.hours / maxHours) * 100);

              return (
                <div 
                  key={idx}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'flex-end',
                    gap: '8px'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                    {item.hours}h
                  </span>
                  <div 
                    style={{
                      width: '100%',
                      maxWidth: '44px',
                      height: `${heightPct}%`,
                      background: 'linear-gradient(180deg, var(--accent-cyan) 0%, rgba(2, 132, 199, 0.6) 100%)',
                      borderRadius: '6px 6px 0 0',
                      transition: 'height 0.4s ease'
                    }}
                  ></div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enrolled Courses Detailed Mastery Breakdown */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '18px' }}>Subject Mastery & Syllabus Progress</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {enrolledCourses.map(course => {
              const pct = progress[course.id] || 0;
              const quizScore = quizResults[course.id];

              return (
                <div key={course.id} style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '1rem' }}>{course.title}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', marginLeft: '10px' }}>
                        {course.departmentName}
                      </span>
                    </div>
                    <span style={{ fontWeight: 800, color: pct === 100 ? 'var(--accent-emerald)' : 'var(--accent-cyan)' }}>
                      {pct}%
                    </span>
                  </div>

                  <div className="course-progress-track">
                    <div className="course-progress-fill" style={{ width: `${pct}%` }}></div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    <span>Instructor: {course.instructor}</span>
                    <span>
                      Examination Status:{' '}
                      <strong style={{ color: quizScore?.passed ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                        {quizScore ? `${quizScore.percentage}% (${quizScore.passed ? 'Certified' : 'Incomplete'})` : 'Not Attempted'}
                      </strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
