import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Upload, 
  X,
  MessageSquare
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useCourses } from '../context/CourseContext';
import { formatDate } from '../utils/helpers';

export default function Assignments() {
  const { assignments, submitAssign } = useCourses();

  const [activeTab, setActiveTab] = useState('All'); // All | Pending | Submitted | Graded
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const filtered = assignments.filter(a => {
    if (activeTab === 'All') return true;
    return a.status === activeTab;
  });

  const handleOpenSubmit = (assign) => {
    setSelectedAssignment(assign);
    setSubmissionText(assign.submissionText || '');
  };

  const handleSaveSubmission = (e) => {
    e.preventDefault();
    if (!submissionText.trim()) return;

    submitAssign(selectedAssignment.id, submissionText.trim());
    setSuccessMsg(`Assignment "${selectedAssignment.title}" successfully submitted for grading!`);
    setTimeout(() => setSuccessMsg(''), 4000);
    setSelectedAssignment(null);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>Academic Submissions</span>
            <h1 className="welcome-title">Course Assignments & Labs</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Submit research code, lab deliverables, and architectural writeups for faculty grading.
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
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
            <CheckCircle2 size={18} /> {successMsg}
          </div>
        )}

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {['All', 'Pending', 'Submitted', 'Graded'].map(tab => {
            const count = tab === 'All' ? assignments.length : assignments.filter(a => a.status === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`btn btn-sm ${activeTab === tab ? 'btn-primary' : 'btn-outline'}`}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>

        {/* Assignments List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {filtered.map(assign => {
            const isGraded = assign.status === 'Graded';
            const isSubmitted = assign.status === 'Submitted';

            return (
              <div key={assign.id} className="glass-panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>{assign.course}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• {assign.department}</span>
                    </div>
                    <h3 style={{ fontSize: '1.25rem' }}>{assign.title}</h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={`badge ${
                      isGraded ? 'badge-emerald' : isSubmitted ? 'badge-cyan' : 'badge-amber'
                    }`}>
                      {assign.status}
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                      {assign.points} pts
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
                  {assign.description}
                </p>

                {/* Instructions Box */}
                <div style={{
                  padding: '12px 16px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.825rem',
                  marginBottom: '16px'
                }}>
                  <strong style={{ color: 'var(--accent-cyan)' }}>Submission Directive:</strong> {assign.instructions}
                </div>

                {/* If Graded: Show Grade & Faculty Feedback */}
                {isGraded && (
                  <div style={{
                    padding: '14px 18px',
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <strong style={{ color: 'var(--accent-emerald)', fontSize: '0.9rem' }}>
                        Faculty Grade: {assign.grade} / {assign.points} (Distinction)
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Graded by Faculty Lead</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontStyle: 'italic' }}>
                      "{assign.feedback}"
                    </p>
                  </div>
                )}

                {/* If Submitted: Show Text */}
                {isSubmitted && !isGraded && (
                  <div style={{
                    padding: '12px 16px',
                    background: 'rgba(56, 189, 248, 0.08)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.85rem',
                    marginBottom: '16px'
                  }}>
                    <strong style={{ color: 'var(--accent-cyan)' }}>Your Submitted Deliverable:</strong>
                    <div style={{ marginTop: '4px', color: 'var(--text-secondary)' }}>{assign.submissionText}</div>
                  </div>
                )}

                {/* Action Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                    <Calendar size={14} /> Due Date: {assign.dueDate}
                  </div>

                  <button 
                    onClick={() => handleOpenSubmit(assign)}
                    className={`btn btn-sm ${assign.status === 'Pending' ? 'btn-primary' : 'btn-outline'}`}
                  >
                    <Upload size={14} /> {assign.status === 'Pending' ? 'Submit Work' : 'Resubmit Deliverable'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submission Modal */}
        {selectedAssignment && (
          <div className="dept-modal-backdrop" onClick={() => setSelectedAssignment(null)}>
            <div className="dept-modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
              <div className="dept-modal-header">
                <div>
                  <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>{selectedAssignment.course}</span>
                  <h2 style={{ fontSize: '1.35rem' }}>Submit Deliverable: {selectedAssignment.title}</h2>
                </div>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => setSelectedAssignment(null)}
                  style={{ borderRadius: '50%', width: '34px', height: '34px', padding: 0 }}
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSaveSubmission}>
                <div className="dept-modal-body">
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Provide your repository URL, architecture writeup, or implementation notes below for academic evaluation.
                  </div>

                  <div className="form-group">
                    <label className="form-label">Deliverable Content / Repository Link</label>
                    <textarea 
                      className="form-textarea"
                      rows={5}
                      placeholder="e.g. GitHub Repository: https://github.com/scholar/project-lab&#10;&#10;Key findings and implementation notes..."
                      value={submissionText}
                      onChange={e => setSubmissionText(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="dept-modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedAssignment(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    <Upload size={14} /> Hand In Assignment
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
