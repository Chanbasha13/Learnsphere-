import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, BookOpen, Star, Clock, Users, ArrowRight, Check } from 'lucide-react';
import { useCourses } from '../context/CourseContext';
import { DEPARTMENTS } from '../data/departmentsData';
import { soundEngine } from '../utils/sound';

export default function Courses() {
  const { courses, isEnrolled, enroll } = useCourses();
  const [searchParams, setSearchParams] = useSearchParams();

  const deptParam = searchParams.get('department') || 'all';

  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState(deptParam);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    if (deptParam) {
      setSelectedDept(deptParam);
    }
  }, [deptParam]);

  const handleDeptChange = (deptId) => {
    soundEngine.playClick(700);
    setSelectedDept(deptId);
    if (deptId === 'all') {
      searchParams.delete('department');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ department: deptId });
    }
  };

  // Filter & Sort
  const filtered = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
                          course.description.toLowerCase().includes(search.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(search.toLowerCase());

    const matchesDept = selectedDept === 'all' || course.departmentId === selectedDept;
    const matchesDiff = selectedDifficulty === 'all' || course.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

    return matchesSearch && matchesDept && matchesDiff;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'students') return (b.enrolledCount || 0) - (a.enrolledCount || 0);
    return a.title.localeCompare(b.title);
  });

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: 'calc(100vh - var(--navbar-height))', padding: '50px 0 80px' }}>
      <div className="container">
        {/* Header Title */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 40px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>
            Academic Programs
          </span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
            Explore Computational Degree Courses
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Search across all six university departments. Filter by research domain or difficulty tier to find the right syllabus for your academic career.
          </p>
        </div>

        {/* Search & Sort Controls Toolbar */}
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text"
                className="form-input"
                placeholder="Search courses, instructors, technologies..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: '42px' }}
              />
            </div>

            {/* Difficulty Filter */}
            <select 
              className="form-select"
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
            >
              <option value="all">All Difficulty Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* Sort Dropdown */}
            <select 
              className="form-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="rating">Sort by: Highest Rated</option>
              <option value="students">Sort by: Most Popular</option>
              <option value="title">Sort by: Alphabetical</option>
            </select>
          </div>

          {/* Department Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginRight: '4px' }}>
              Department:
            </span>
            <button 
              onClick={() => handleDeptChange('all')}
              className={`btn btn-sm ${selectedDept === 'all' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.78rem' }}
            >
              All Departments ({courses.length})
            </button>
            {DEPARTMENTS.map(dept => {
              const count = courses.filter(c => c.departmentId === dept.id).length;
              const isActive = selectedDept === dept.id;

              return (
                <button 
                  key={dept.id}
                  onClick={() => handleDeptChange(dept.id)}
                  className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.78rem' }}
                >
                  {dept.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Course Cards Grid */}
        {filtered.length === 0 ? (
          <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No courses match your filter criteria</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Try broadening your search term or select "All Departments".
            </p>
            <button 
              onClick={() => { setSearch(''); setSelectedDept('all'); setSelectedDifficulty('all'); }}
              className="btn btn-secondary btn-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="courses-grid-3d">
            {filtered.map(course => {
              const enrolled = isEnrolled(course.id);

              return (
                <div key={course.id} className="course-card-3d">
                  <div className="course-card-banner">
                    <img src={course.image} alt={course.title} className="course-card-img" />
                    <span className="badge badge-cyan" style={{ position: 'absolute', top: '12px', right: '12px' }}>
                      {course.badge || course.difficulty}
                    </span>
                  </div>

                  <div className="course-card-content">
                    <span className="course-card-dept">{course.departmentName}</span>
                    <h3 className="course-card-title">{course.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px', flex: 1, lineHeight: '1.5' }}>
                      {course.description.slice(0, 115)}...
                    </p>

                    <div className="course-card-meta">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={14} style={{ color: 'var(--accent-amber)', fill: 'var(--accent-amber)' }} />
                        {course.rating} ({course.reviewsCount || 40})
                      </span>
                      <span>• {course.duration}</span>
                      <span>• {course.difficulty}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto' }}>
                      <Link 
                        to={`/course/${course.id}`}
                        className="btn btn-outline btn-sm"
                        style={{ fontSize: '0.8rem' }}
                      >
                        Syllabus
                      </Link>

                      {enrolled ? (
                        <Link 
                          to={`/classroom/${course.id}`}
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '0.8rem', borderColor: 'var(--accent-emerald)', color: 'var(--accent-emerald)' }}
                        >
                          <Check size={13} /> Enrolled
                        </Link>
                      ) : (
                        <button 
                          onClick={() => enroll(course.id)}
                          className="btn btn-primary btn-sm"
                          style={{ fontSize: '0.8rem' }}
                        >
                          Enroll Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
