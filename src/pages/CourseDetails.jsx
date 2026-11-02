import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Star, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Users, 
  ArrowRight,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';
import { useCourses } from '../context/CourseContext';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourseById, isEnrolled, enroll } = useCourses();

  const course = getCourseById(id);
  const enrolled = isEnrolled(id);

  // Accordion open/close state
  const [openModuleId, setOpenModuleId] = useState('mod-1');

  if (!course) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Course not found</h2>
        <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}>
          The requested course record does not exist or has been archived.
        </p>
        <Link to="/courses" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Course Catalog
        </Link>
      </div>
    );
  }

  const handleEnrollClick = () => {
    if (!enrolled) {
      enroll(course.id);
    }
    navigate(`/classroom/${course.id}`);
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: 'calc(100vh - var(--navbar-height))', paddingBottom: '80px' }}>
      {/* Course Hero Banner */}
      <section style={{
        background: 'linear-gradient(180deg, #0d1627 0%, var(--bg-primary) 100%)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '60px 0 50px'
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span className="badge badge-cyan">{course.departmentName}</span>
                <span className="badge badge-amber">{course.difficulty}</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '16px', lineHeight: '1.2' }}>
                {course.title}
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
                {course.description}
              </p>

              {/* Course Meta Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '32px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={16} style={{ color: 'var(--accent-amber)', fill: 'var(--accent-amber)' }} />
                  <strong>{course.rating}</strong>
                  <span style={{ color: 'var(--text-muted)' }}>({course.reviewsCount || 120} reviews)</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={16} style={{ color: 'var(--accent-cyan)' }} />
                  <span>{course.duration}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={16} style={{ color: 'var(--accent-emerald)' }} />
                  <span>{course.enrolledCount || 850}+ Scholars</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <button onClick={handleEnrollClick} className="btn btn-primary btn-lg">
                  {enrolled ? (
                    <>
                      <Play size={18} /> Continue Learning in Classroom
                    </>
                  ) : (
                    <>
                      <GraduationCap size={18} /> Enroll in Degree Course
                    </>
                  )}
                </button>

                <Link to={`/quiz/${course.id}`} className="btn btn-secondary btn-lg">
                  <Award size={18} /> Take Examination
                </Link>
              </div>
            </div>

            {/* Course Card Preview Column */}
            <div className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
              <img 
                src={course.image} 
                alt={course.title} 
                style={{ width: '160px', height: '160px', objectFit: 'contain', margin: '0 auto 20px', filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.5))' }} 
              />
              <div style={{
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                textAlign: 'left',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '6px' }}>
                  Distinguished Faculty Lead
                </div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{course.instructor}</div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {course.instructorRole}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Course Details Content */}
      <section style={{ paddingTop: '50px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            {/* Left Column: Learning Objectives & Curriculum */}
            <div style={{ gridColumn: 'span 2' }}>
              {/* What you will learn */}
              <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '18px' }}>
                  What You Will Learn
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                  {course.whatYouWillLearn?.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum Breakdown */}
              <div className="glass-panel" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem' }}>Curriculum Syllabus</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {course.modules?.length || 1} Modules • {course.lessonsCount || 10} Structured Video Lessons
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {course.modules?.map((mod) => {
                    const isOpen = openModuleId === mod.id;

                    return (
                      <div key={mod.id} className="curriculum-module-card">
                        <button 
                          className="module-header-btn"
                          onClick={() => setOpenModuleId(isOpen ? null : mod.id)}
                        >
                          <span>{mod.title}</span>
                          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>

                        {isOpen && (
                          <div className="module-lessons-group">
                            {mod.lessons.map(lesson => (
                              <div 
                                key={lesson.id}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '10px 14px',
                                  borderBottom: '1px solid var(--border-subtle)',
                                  fontSize: '0.875rem'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <Play size={14} style={{ color: 'var(--accent-cyan)' }} />
                                  <span>{lesson.title}</span>
                                </div>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                  {lesson.duration}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Prerequisites & Academic Verification */}
            <div>
              <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '14px' }}>Prerequisites</h3>
                <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {course.prerequisites?.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="glass-panel" style={{ padding: '28px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(251, 191, 36, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-amber)',
                  marginBottom: '14px'
                }}>
                  <Award size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Official Degree Certificate</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
                  Complete the modules and pass the final certification examination with at least 60% to receive an official verifiable credential signed by faculty.
                </p>
                <Link to={`/quiz/${course.id}`} className="btn btn-outline btn-sm" style={{ width: '100%' }}>
                  Preview Examination
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
