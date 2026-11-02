import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Play, CheckCircle2, Award, Clock } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useCourses } from '../context/CourseContext';

export default function MyCourses() {
  const { enrolledCourses, progress, quizResults } = useCourses();
  const [filter, setFilter] = useState('all'); // all | in-progress | completed

  const filtered = enrolledCourses.filter(course => {
    const pct = progress[course.id] || 0;
    if (filter === 'completed') return pct === 100;
    if (filter === 'in-progress') return pct < 100;
    return true;
  });

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>Enrolled Degrees</span>
            <h1 className="welcome-title">My Academic Courses</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Manage your active enrollments, resume lessons, and track syllabus progress.
            </p>
          </div>

          <Link to="/courses" className="btn btn-outline btn-sm">
            <BookOpen size={15} /> Catalog
          </Link>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {['all', 'in-progress', 'completed'].map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`btn btn-sm ${filter === t ? 'btn-primary' : 'btn-outline'}`}
              style={{ textTransform: 'capitalize' }}
            >
              {t.replace('-', ' ')}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <p style={{ marginBottom: '16px' }}>No courses found under this filter.</p>
            <Link to="/courses" className="btn btn-primary btn-sm">Explore Courses</Link>
          </div>
        ) : (
          <div className="courses-grid-3d">
            {filtered.map(course => {
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

                    <div className="course-progress-track">
                      <div className="course-progress-fill" style={{ width: `${currentPct}%` }}></div>
                    </div>
                    <div className="course-progress-label">
                      <span>Completion</span>
                      <strong style={{ color: currentPct === 100 ? 'var(--accent-emerald)' : 'var(--accent-cyan)' }}>
                        {currentPct}%
                      </strong>
                    </div>

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
                        Exam
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

