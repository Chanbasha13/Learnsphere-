import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  ShieldAlert, 
  Users, 
  BookOpen, 
  TrendingUp, 
  PlusCircle, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  X, 
  Search, 
  ShieldCheck, 
  Download, 
  RefreshCcw,
  Layers,
  GraduationCap
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { DEPARTMENTS } from '../data/departmentsData';

export default function AdminDashboard() {
  const { user, allUsers, removeUserAccount, changeUserRole } = useAuth();
  const { courses, createCourse, removeCourse } = useCourses();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTabParam = searchParams.get('tab') || 'courses';
  const [activeTab, setActiveTab] = useState(activeTabParam);

  // User search & filter state
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');

  // Create Course Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    departmentId: 'programming',
    difficulty: 'Intermediate',
    duration: '8 weeks',
    description: '',
    badge: 'University Accredited'
  });
  const [alertMsg, setAlertMsg] = useState('');

  const studentsCount = allUsers.filter(u => u.role === 'student').length;
  const instructorsCount = allUsers.filter(u => u.role === 'instructor').length;
  const adminsCount = allUsers.filter(u => u.role === 'admin').length;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title.trim() || !newCourse.description.trim()) return;

    const dept = DEPARTMENTS.find(d => d.id === newCourse.departmentId);

    const created = createCourse({
      title: newCourse.title.trim(),
      departmentId: newCourse.departmentId,
      departmentName: dept ? dept.name : 'Computer Science',
      difficulty: newCourse.difficulty,
      duration: newCourse.duration,
      description: newCourse.description.trim(),
      badge: newCourse.badge,
      instructor: 'Dr. Sarah Lin',
      instructorRole: 'Distinguished Systems Architect & Academic Dean',
      icon: '🏛️',
      image: '/assets/images/web-dev.svg',
      whatYouWillLearn: [
        'Institutional standards and architectural rigor',
        'Advanced system design and peer-reviewed methodologies',
        'Academic capstone project delivery'
      ],
      prerequisites: ['Admitted LearnSphere Scholar status'],
      modules: [
        {
          id: 'admin-mod-1',
          title: 'Module 1: Academic Introduction & Foundations',
          lessons: [
            { id: `adm-${Date.now()}-1`, title: 'Academic Orientation & Standards', duration: '18:00', videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU', completed: false },
            { id: `adm-${Date.now()}-2`, title: 'Core Implementation Methodologies', duration: '22:00', videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE', completed: false }
          ]
        }
      ]
    });

    setAlertMsg(`University Course "${created.title}" successfully instituted by Senate decree!`);
    setTimeout(() => setAlertMsg(''), 4500);
    setModalOpen(false);
    setNewCourse({
      title: '',
      departmentId: 'programming',
      difficulty: 'Intermediate',
      duration: '8 weeks',
      description: '',
      badge: 'University Accredited'
    });
  };

  const handleDeleteCourse = (id, title) => {
    if (window.confirm(`Admin Decree: Are you sure you want to retire course "${title}" from the University Catalog?`)) {
      removeCourse(id);
      setAlertMsg(`Course "${title}" has been retired from the catalog.`);
      setTimeout(() => setAlertMsg(''), 4000);
    }
  };

  const handleDeleteUser = (userId, name) => {
    if (userId === user?.id) {
      alert("Administrative safety check: You cannot delete your own active administrative account.");
      return;
    }
    if (window.confirm(`Revoke Enrollment: Are you sure you want to permanently remove user account "${name}"?`)) {
      removeUserAccount(userId);
      setAlertMsg(`User account "${name}" was purged from system records.`);
      setTimeout(() => setAlertMsg(''), 4000);
    }
  };

  const handleChangeRole = (userId, newRole) => {
    changeUserRole(userId, newRole);
    setAlertMsg(`User role successfully updated to "${newRole}".`);
    setTimeout(() => setAlertMsg(''), 3500);
  };

  const handleExportBackup = () => {
    const data = {
      users: allUsers,
      coursesCount: courses.length,
      exportTimestamp: new Date().toISOString(),
      governance: 'LearnSphere University Senate'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learnsphere-system-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter users list
  const filteredUsers = allUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                          u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
                          (u.department && u.department.toLowerCase().includes(userSearch.toLowerCase()));
    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        {/* Header Greeting */}
        <div className="dashboard-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-rose" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <ShieldAlert size={12} /> University Senate & Administration
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                • Admin ID: {user?.adminId || 'ADM-1001'}
              </span>
            </div>
            <h1 className="welcome-title">
              University Command Center — {user?.name}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Oversee campus departments, govern student & faculty credentials, and regulate accredited curricula.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              onClick={handleExportBackup}
              className="btn btn-outline btn-sm"
              title="Export complete system state as JSON backup"
            >
              <Download size={14} /> Export Backup
            </button>
            <button 
              onClick={() => setModalOpen(true)}
              className="btn btn-primary btn-sm"
            >
              <PlusCircle size={15} /> Institute New Course
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {alertMsg && (
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
            <CheckCircle2 size={18} /> {alertMsg}
          </div>
        )}

        {/* Global Administrative Metrics */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)' }}>
              <Users size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">{studentsCount} Scholars</span>
              <span className="stat-name">Registered Undergraduates</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
              <GraduationCap size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">{instructorsCount} Faculty</span>
              <span className="stat-name">Academic Instructors</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
              <BookOpen size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">{courses.length} Programs</span>
              <span className="stat-name">Accredited Curricula</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(244, 63, 94, 0.15)', color: 'var(--accent-rose)' }}>
              <ShieldCheck size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">Operational</span>
              <span className="stat-name">System Integrity Status</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleTabChange('courses')}
            className={`btn btn-sm ${activeTab === 'courses' ? 'btn-primary' : 'btn-outline'}`}
          >
            <BookOpen size={14} /> Master Course Directory ({courses.length})
          </button>
          <button
            onClick={() => handleTabChange('users')}
            className={`btn btn-sm ${activeTab === 'users' ? 'btn-primary' : 'btn-outline'}`}
          >
            <Users size={14} /> User Governance ({allUsers.length})
          </button>
          <button
            onClick={() => handleTabChange('departments')}
            className={`btn btn-sm ${activeTab === 'departments' ? 'btn-primary' : 'btn-outline'}`}
          >
            <Layers size={14} /> University Departments (6)
          </button>
        </div>

        {/* TAB 1: Master Course Directory */}
        {activeTab === 'courses' && (
          <div>
            <div className="section-title-row">
              <div>
                <h2 style={{ fontSize: '1.35rem' }}>University Curricula Management</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Accredited degrees across all 6 departments. Admins have authority to institute or retire courses.
                </p>
              </div>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Curriculum Title</th>
                    <th>Department</th>
                    <th>Level</th>
                    <th>Faculty Lead</th>
                    <th>Rating</th>
                    <th style={{ textAlign: 'right' }}>Governance</th>
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
                      <td>{course.instructor}</td>
                      <td>★ {course.rating}</td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <Link 
                            to={`/course/${course.id}`} 
                            className="btn btn-outline btn-sm"
                            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                            title="Inspect Syllabus"
                          >
                            <Eye size={13} /> View
                          </Link>
                          <button 
                            onClick={() => handleDeleteCourse(course.id, course.title)}
                            className="btn btn-danger btn-sm"
                            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                            title="Retire Course from University Catalog"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: User Accounts & Role Governance */}
        {activeTab === 'users' && (
          <div>
            <div className="section-title-row">
              <div>
                <h2 style={{ fontSize: '1.35rem' }}>User Accounts & Role Governance</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Manage credentials, assign student/faculty/admin permissions, and maintain identity security.
                </p>
              </div>
            </div>

            {/* Filter toolbar */}
            <div className="glass-panel" style={{ padding: '16px', marginBottom: '20px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text"
                  className="form-input"
                  placeholder="Search user by name, email, department..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  style={{ paddingLeft: '38px', paddingRight: '12px' }}
                />
              </div>

              <select 
                className="form-select"
                value={userRoleFilter}
                onChange={e => setUserRoleFilter(e.target.value)}
                style={{ width: 'auto', minWidth: '160px' }}
              >
                <option value="all">All Roles ({allUsers.length})</option>
                <option value="student">Students ({studentsCount})</option>
                <option value="instructor">Instructors ({instructorsCount})</option>
                <option value="admin">Administrators ({adminsCount})</option>
              </select>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User Identity</th>
                    <th>Email Address</th>
                    <th>Affiliated Department</th>
                    <th>Assigned Role</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(u => (
                    <tr key={u.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img 
                            src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'} 
                            alt="" 
                            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} 
                          />
                          <div>
                            <div style={{ fontWeight: 700 }}>
                              {u.name} {u.id === user?.id && <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)' }}>(You)</span>}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                              Joined: {u.joinedDate || '2026-09-15'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.825rem' }}>{u.email}</td>
                      <td>{u.department || 'General'}</td>
                      <td>
                        <select 
                          className="form-select"
                          value={u.role}
                          onChange={(e) => handleChangeRole(u.id, e.target.value)}
                          style={{ padding: '4px 8px', fontSize: '0.8rem', width: 'auto' }}
                        >
                          <option value="student">Student</option>
                          <option value="instructor">Instructor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {u.id !== user?.id ? (
                          <button 
                            onClick={() => handleDeleteUser(u.id, u.name)}
                            className="btn btn-danger btn-sm"
                            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                            title="Delete User Record"
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Protected</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: University Departments */}
        {activeTab === 'departments' && (
          <div>
            <div className="section-title-row">
              <div>
                <h2 style={{ fontSize: '1.35rem' }}>Academic Departments Allocation</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Governance of the 6 specialized campus towers, appointed deans, and computational research labs.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {DEPARTMENTS.map(dept => (
                <div key={dept.id} className="glass-panel" style={{ padding: '24px', borderTop: `4px solid ${dept.accentColor}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="badge" style={{ background: dept.accentGlow, color: dept.accentColor, borderColor: dept.accentColor }}>
                      {dept.code}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{dept.landmark}</span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>{dept.name}</h3>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                    <strong>Dean:</strong> {dept.dean}
                  </div>

                  <div className="dept-stats-grid" style={{ marginBottom: '16px' }}>
                    <div className="dept-stat-box">
                      <div className="dept-stat-value" style={{ fontSize: '1.1rem', color: dept.accentColor }}>
                        {dept.stats.activeStudents}+
                      </div>
                      <div className="dept-stat-label">Scholars</div>
                    </div>
                    <div className="dept-stat-box">
                      <div className="dept-stat-value" style={{ fontSize: '1.1rem' }}>
                        {dept.stats.coursesCount}
                      </div>
                      <div className="dept-stat-label">Programs</div>
                    </div>
                    <div className="dept-stat-box">
                      <div className="dept-stat-value" style={{ fontSize: '1.1rem' }}>
                        {dept.stats.researchLabs}
                      </div>
                      <div className="dept-stat-label">Labs</div>
                    </div>
                    <div className="dept-stat-box">
                      <div className="dept-stat-value" style={{ fontSize: '1.1rem', color: 'var(--accent-emerald)' }}>
                        {dept.stats.placementRate}
                      </div>
                      <div className="dept-stat-label">Placement</div>
                    </div>
                  </div>

                  <Link to={`/courses?department=${dept.id}`} className="btn btn-outline btn-sm" style={{ width: '100%', fontSize: '0.8rem' }}>
                    Inspect Department Curricula
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal: Institute New Course */}
        {modalOpen && (
          <div className="dept-modal-backdrop" onClick={() => setModalOpen(false)}>
            <div className="dept-modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px' }}>
              <div className="dept-modal-header">
                <div>
                  <span className="badge badge-rose" style={{ marginBottom: '6px' }}>Senate Accreditation</span>
                  <h2 style={{ fontSize: '1.4rem' }}>Institute New University Course</h2>
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
                    <label className="form-label">Degree Curriculum Title</label>
                    <input 
                      type="text"
                      className="form-input"
                      placeholder="e.g. Distributed Quantum Cryptography & Protocols"
                      value={newCourse.title}
                      onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="form-group">
                      <label className="form-label">Governing Department</label>
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
                      <label className="form-label">Rigor Tier</label>
                      <select 
                        className="form-select"
                        value={newCourse.difficulty}
                        onChange={e => setNewCourse({ ...newCourse, difficulty: e.target.value })}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced (Graduate Level)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Duration & Term</label>
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
                    <label className="form-label">Academic Syllabus Overview</label>
                    <textarea 
                      className="form-textarea"
                      rows={4}
                      placeholder="Specify the learning objectives, laboratory criteria, and research outcomes..."
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
                    <PlusCircle size={15} /> Pass Accreditation Decree
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

