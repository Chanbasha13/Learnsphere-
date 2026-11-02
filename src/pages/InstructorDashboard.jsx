import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  BookOpen, 
  Users, 
  Award, 
  Trash2, 
  Eye, 
  Sparkles, 
  TrendingUp, 
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { DEPARTMENTS } from '../data/departmentsData';

export default function InstructorDashboard() {
  const { user } = useAuth();
  const { courses, createCourse, removeCourse, assignments } = useCourses();

  // Create Course Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    departmentId: 'programming',
    difficulty: 'Intermediate',
    duration: '8 weeks',
    description: '',
    badge: 'Faculty Course'
  });
  const [msg, setMsg] = useState('');

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title.trim() || !newCourse.description.trim()) {
      return;
    }

    const dept = DEPARTMENTS.find(d => d.id === newCourse.departmentId);

    const created = createCourse({
      title: newCourse.title.trim(),
      departmentId: newCourse.departmentId,
      departmentName: dept ? dept.name : 'Computer Science',
      difficulty: newCourse.difficulty,
      duration: newCourse.duration,
      description: newCourse.description.trim(),
      badge: newCourse.badge,
      instructor: user?.name || 'Faculty Member',
      instructorRole: user?.headline || 'Senior Academic Lecturer',
      icon: '📚',
      image: '/assets/images/web-dev.svg',
      whatYouWillLearn: [
        'Fundamental architectural concepts of this curriculum',
        'Industry standard best practices and hands-on implementations',
        'Capstone project delivery and code review guidelines'
      ],
      prerequisites: ['Basic computational literacy'],
      modules: [
        {
          id: 'mod-custom-1',
          title: 'Module 1: Orientation & Foundations',
          lessons: [
            { id: 'custom-1-1', title: 'Curriculum Overview & Environment Setup', duration: '15:00', videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU', completed: false },
            { id: 'custom-1-2', title: 'Core Principles & Hands-on Lab', duration: '20:00', videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE', completed: false }
          ]
        }
      ]
    });

    setMsg(`Course "${created.title}" successfully published to the campus catalog!`);
    setTimeout(() => setMsg(''), 4000);
    setModalOpen(false);
    setNewCourse({
      title: '',
      departmentId: 'programming',
      difficulty: 'Intermediate',
      duration: '8 weeks',
      description: '',
      badge: 'Faculty Course'
    });
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to retire course "${title}" from the catalog?`)) {
      removeCourse(id);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        {/* Header Greeting */}
        <div className="dashboard-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-amber">
                Faculty ID: {user?.facultyId || 'FAC-7721'}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                • {user?.department || 'Programming Academy'}
              </span>
            </div>
            <h1 className="welcome-title">
              Faculty Command Hub — {user?.name}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Publish new academic curricula, monitor student cohorts, and manage assessment submissions.
            </p>
          </div>

          <button 
            onClick={() => setModalOpen(true)}
            className="btn btn-primary btn-sm"
          >
            <PlusCircle size={16} /> Publish New Course
          </button>
        </div>

        {/* Success Alert Banner */}
        {msg && (
          <div style={{
            padding: '14px 18px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--accent-emerald)',
            fontSize: '0.9rem',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={18} /> {msg}
          </div>
        )}

        {/* 4 Faculty Metrics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)' }}>
              <Users size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">1,240</span>
              <span className="stat-name">Active Scholars Enrolled</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
              <BookOpen size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">{courses.length}</span>
              <span className="stat-name">Published Curricula</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
              <Award size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">4.8 / 5.0</span>
              <span className="stat-name">Average Faculty Rating</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(129, 140, 248, 0.15)', color: 'var(--accent-indigo)' }}>
              <TrendingUp size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">96%</span>
              <span className="stat-name">Cohort Graduation Rate</span>
            </div>
          </div>
        </div>

        {/* Course Management Table */}
        <div style={{ marginBottom: '40px' }}>
          <div className="section-title-row">
            <div>
              <h2 style={{ fontSize: '1.35rem' }}>Course Catalog Management</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Inspect published courses, view enrolled cohorts, and create custom offerings.
              </p>
            </div>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Department</th>
                  <th>Level</th>
                  <th>Enrolled</th>
                  <th>Rating</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img 
                          src={course.image} 
                          alt="" 
                          style={{ width: '32px', height: '32px', objectFit: 'contain' }} 
                        />
                        <div>
                          <div style={{ fontWeight: 700 }}>{course.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{course.duration}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                        {course.departmentName}
                      </span>
                    </td>
                    <td>{course.difficulty}</td>
                    <td><strong>{course.enrolledCount || 120}</strong> scholars</td>
                    <td>★ {course.rating}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <Link 
                          to={`/course/${course.id}`} 
                          className="btn btn-outline btn-sm"
                          style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                          title="Preview Course Syllabus"
                        >
                          <Eye size={13} /> View
                        </Link>
                        {course.id > 10 && (
                          <button 
                            onClick={() => handleDelete(course.id, course.title)}
                            className="btn btn-danger btn-sm"
                            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                            title="Delete Custom Course"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Publish New Course */}
        {modalOpen && (
          <div className="dept-modal-backdrop" onClick={() => setModalOpen(false)}>
            <div className="dept-modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px' }}>
              <div className="dept-modal-header">
                <div>
                  <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>Curriculum Studio</span>
                  <h2 style={{ fontSize: '1.4rem' }}>Publish New Academic Course</h2>
                </div>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => setModalOpen(false)}
                  style={{ borderRadius: '50%', width: '34px', height: '34px', padding: 0 }}
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreateCourse}>
                <div className="dept-modal-body">
                  <div className="form-group">
                    <label className="form-label">Course Title</label>
                    <input 
                      type="text"
                      className="form-input"
                      placeholder="e.g. Distributed Quantum Cryptography"
                      value={newCourse.title}
                      onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="form-group">
                      <label className="form-label">Academic Department</label>
                      <select 
                        className="form-select"
                        value={newCourse.departmentId}
                        onChange={e => setNewCourse({ ...newCourse, departmentId: e.target.value })}
                      >
                        {DEPARTMENTS.map(d => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Difficulty Tier</label>
                      <select 
                        className="form-select"
                        value={newCourse.difficulty}
                        onChange={e => setNewCourse({ ...newCourse, difficulty: e.target.value })}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Duration</label>
                    <input 
                      type="text"
                      className="form-input"
                      placeholder="e.g. 10 weeks"
                      value={newCourse.duration}
                      onChange={e => setNewCourse({ ...newCourse, duration: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Course Overview Description</label>
                    <textarea 
                      className="form-textarea"
                      rows={4}
                      placeholder="Describe the research goals, practical lab assignments, and academic prerequisites..."
                      value={newCourse.description}
                      onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="dept-modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-sm"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    <PlusCircle size={15} /> Publish Course to Catalog
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
