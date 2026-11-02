import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Play, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Menu,
  Sparkles
} from 'lucide-react';
import { useCourses } from '../context/CourseContext';

export default function Learning() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourseById, isLessonCompleted, markLessonComplete, progress } = useCourses();

  const course = getCourseById(id);

  // Flatten lessons from all modules
  const allLessons = course?.modules?.flatMap(m => m.lessons) || [];

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('notes'); // notes | resources | discussion
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!course) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Course Classroom Unavailable</h2>
        <Link to="/courses" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Courses
        </Link>
      </div>
    );
  }

  const currentLesson = allLessons[activeLessonIndex] || {
    id: 'default',
    title: 'Orientation Lecture',
    duration: '15:00',
    videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU'
  };

  const isCompleted = isLessonCompleted(currentLesson.id);
  const coursePct = progress[course.id] || 0;

  const handleToggleComplete = () => {
    markLessonComplete(currentLesson.id, course.id, allLessons.length);
  };

  const handleNext = () => {
    if (activeLessonIndex < allLessons.length - 1) {
      setActiveLessonIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex(prev => prev - 1);
    }
  };

  return (
    <div className="classroom-container">
      {/* Sidebar: Curriculum Tree */}
      {sidebarOpen && (
        <aside className="classroom-sidebar">
          <div className="classroom-sidebar-header">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>Classroom Syllabus</span>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="btn btn-outline btn-sm"
                style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                title="Hide Syllabus Drawer"
              >
                Hide
              </button>
            </div>
            <h3 style={{ fontSize: '1rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {course.title}
            </h3>
            {/* Overall progress bar */}
            <div className="course-progress-track" style={{ marginTop: '12px' }}>
              <div className="course-progress-fill" style={{ width: `${coursePct}%` }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>{coursePct}% Completed</span>
              <span>{allLessons.length} Total Lessons</span>
            </div>
          </div>

          <div className="classroom-modules-list">
            {course.modules?.map((mod, modIdx) => (
              <div key={mod.id} className="curriculum-module-card">
                <div style={{ padding: '10px 14px', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {mod.title}
                </div>

                <div className="module-lessons-group">
                  {mod.lessons.map(lesson => {
                    const globalIdx = allLessons.findIndex(l => l.id === lesson.id);
                    const isActive = globalIdx === activeLessonIndex;
                    const done = isLessonCompleted(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        className={`lesson-nav-btn ${isActive ? 'active' : ''}`}
                        onClick={() => setActiveLessonIndex(globalIdx)}
                      >
                        <div className={`lesson-check-icon ${done ? 'completed' : ''}`}>
                          {done ? '✓' : ''}
                        </div>
                        <span style={{ flex: 1, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                          {lesson.title}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {lesson.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '16px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)' }}>
            <Link 
              to={`/quiz/${course.id}`}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', fontSize: '0.8rem' }}
            >
              <Award size={14} /> Course Examination Quiz
            </Link>
          </div>
        </aside>
      )}

      {/* Main Video & Content Stage */}
      <main className="classroom-stage">
        {/* Toggle sidebar button if hidden */}
        {!sidebarOpen && (
          <div style={{ marginBottom: '14px' }}>
            <button 
              onClick={() => setSidebarOpen(true)}
              className="btn btn-outline btn-sm"
            >
              <Menu size={14} /> Open Curriculum Syllabus
            </button>
          </div>
        )}

        {/* Video Player */}
        <div className="video-frame-container">
          <iframe 
            src={currentLesson.videoUrl}
            title={currentLesson.title}
            className="video-iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Stage Navigation & Actions Bar */}
        <div className="stage-controls-bar">
          <div>
            <h1 style={{ fontSize: '1.4rem', marginBottom: '4px' }}>
              {currentLesson.title}
            </h1>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Lesson {activeLessonIndex + 1} of {allLessons.length} • Duration: {currentLesson.duration}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Mark complete toggle */}
            <button 
              onClick={handleToggleComplete}
              className={`btn btn-sm ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
              style={{ borderColor: isCompleted ? 'var(--accent-emerald)' : 'transparent', color: isCompleted ? 'var(--accent-emerald)' : '#07090e' }}
            >
              <CheckCircle2 size={16} /> {isCompleted ? 'Completed' : 'Mark Complete'}
            </button>

            {/* Prev & Next */}
            <button 
              onClick={handlePrev} 
              disabled={activeLessonIndex === 0}
              className="btn btn-outline btn-sm"
            >
              <ChevronLeft size={16} /> Prev
            </button>

            <button 
              onClick={handleNext} 
              disabled={activeLessonIndex === allLessons.length - 1}
              className="btn btn-outline btn-sm"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="lesson-tabs-nav">
          <button 
            className={`lesson-tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            <BookOpen size={15} /> Lecture Notes
          </button>
          <button 
            className={`lesson-tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            <Download size={15} /> Resources
          </button>
          <button 
            className={`lesson-tab-btn ${activeTab === 'discussion' ? 'active' : ''}`}
            onClick={() => setActiveTab('discussion')}
          >
            <MessageSquare size={15} /> Academic Forum
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-pane-content">
          {activeTab === 'notes' && (
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Lecture Summary & Code Directives</h3>
              <p style={{ marginBottom: '16px' }}>
                In this lecture on <strong>{currentLesson.title}</strong>, we study foundational architecture, memory abstractions, and implementation patterns under <strong>{course.title}</strong>.
              </p>
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--accent-cyan)'
              }}>
                // Key Architectural Takeaway<br />
                const architecture = &#123;<br />
                &nbsp;&nbsp;department: "{course.departmentName}",<br />
                &nbsp;&nbsp;topic: "{currentLesson.title}",<br />
                &nbsp;&nbsp;status: "{isCompleted ? 'Verified Mastered' : 'In Study'}"<br />
                &#125;;
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Downloadable Reference Assets</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={18} style={{ color: 'var(--accent-cyan)' }} />
                    <span style={{ fontSize: '0.9rem' }}>Lecture Slides (PDF) — {currentLesson.title}</span>
                  </div>
                  <button className="btn btn-outline btn-sm" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                    <Download size={13} /> Download PDF
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={18} style={{ color: 'var(--accent-emerald)' }} />
                    <span style={{ fontSize: '0.9rem' }}>Laboratory Source Code Repository (.zip)</span>
                  </div>
                  <button className="btn btn-outline btn-sm" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                    <Download size={13} /> Download Code
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'discussion' && (
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Course Cohort Discussion</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                <div style={{ padding: '14px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <strong>Alex Morgan (Scholar)</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2 hours ago</span>
                  </div>
                  <p style={{ fontSize: '0.85rem' }}>
                    Can someone clarify how the time complexity bounds apply when this algorithm encounters an unbalanced input array?
                  </p>
                </div>
              </div>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Post a query to the faculty instructor..." 
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
