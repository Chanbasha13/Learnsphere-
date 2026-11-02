import React, { useState } from 'react';
import { 
  Award, 
  Printer, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { generateCertificateId, formatDate } from '../utils/helpers';

export default function Certificates() {
  const { user } = useAuth();
  const { courses, quizResults } = useCourses();

  const [selectedCourseId, setSelectedCourseId] = useState(1);

  const selectedCourse = courses.find(c => Number(c.id) === Number(selectedCourseId)) || courses[0];
  const certId = generateCertificateId(selectedCourseId, user?.studentId || 'LS-2026');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <span className="badge badge-emerald" style={{ marginBottom: '6px' }}>
              Academic Verification
            </span>
            <h1 className="welcome-title">Conferred Degree Certificates</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Official university credentials awarded upon passing faculty examination thresholds.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={handlePrint} className="btn btn-primary btn-sm">
              <Printer size={15} /> Print / Save as PDF
            </button>
          </div>
        </div>

        {/* Certificate Course Selector */}
        <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={18} style={{ color: 'var(--accent-amber)' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Select Accredited Degree:</span>
          </div>

          <select 
            className="form-select"
            value={selectedCourseId}
            onChange={e => setSelectedCourseId(Number(e.target.value))}
            style={{ maxWidth: '320px' }}
          >
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.departmentName})
              </option>
            ))}
          </select>
        </div>

        {/* Official Printable Certificate Canvas Card */}
        <div className="certificate-preview-wrapper">
          <div className="certificate-inner-frame">
            {/* Top University Emblem */}
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(251, 191, 36, 0.15)', border: '2px solid #fbbf24', color: '#fbbf24', marginBottom: '16px' }}>
              <Sparkles size={28} />
            </div>

            <div style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>
              LearnSphere 3D Digital University
            </div>

            <div className="cert-title">
              Certificate of Academic Excellence
            </div>

            <p style={{ fontSize: '0.95rem', color: '#94a3b8', fontStyle: 'italic', margin: '14px 0' }}>
              This certifies that upon recommendation of the Academic Council of {selectedCourse?.departmentName || 'Computer Science'},
            </p>

            {/* Student Name */}
            <div className="cert-student-name">
              {user?.name || 'Alex Morgan'}
            </div>

            <p style={{ fontSize: '1rem', color: '#e2e8f0', maxWidth: '640px', margin: '0 auto 20px', lineHeight: '1.6' }}>
              has successfully fulfilled all theoretical lectures, architectural simulations, laboratory assignments, and examination criteria for
            </p>

            <h3 style={{ fontSize: '1.6rem', color: '#38bdf8', fontWeight: 800, marginBottom: '24px' }}>
              {selectedCourse?.title || 'Computational Science'}
            </h3>

            {/* Signatures & Verification Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(251, 191, 36, 0.3)',
              marginTop: '32px',
              alignItems: 'flex-end',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontStyle: 'italic', fontFamily: 'serif', fontSize: '1.25rem', color: '#ffffff', marginBottom: '4px' }}>
                  {selectedCourse?.instructor || 'Faculty Lead'}
                </div>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)', width: '80%', margin: '0 auto 6px' }}></div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Course Faculty Lead</div>
              </div>

              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  color: '#10b981',
                  fontSize: '0.78rem',
                  fontWeight: 700
                }}>
                  <ShieldCheck size={14} /> Cryptographically Verified
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
                  ID: {certId}
                </div>
              </div>

              <div>
                <div style={{ fontStyle: 'italic', fontFamily: 'serif', fontSize: '1.25rem', color: '#ffffff', marginBottom: '4px' }}>
                  Dr. Sarah Lin
                </div>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)', width: '80%', margin: '0 auto 6px' }}></div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Dean of Academics</div>
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '24px' }}>
              Conferred on: {formatDate(new Date())} • LearnSphere Academic Registrar
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

