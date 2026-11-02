import React, { useState } from 'react';
import { User, Mail, Shield, Building, Award, CheckCircle2, Save } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    headline: user?.headline || '',
    department: user?.department || 'Programming Academy'
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>Academic Record</span>
            <h1 className="welcome-title">Scholar Profile</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Manage your university matriculation information, bio, and academic department affiliation.
            </p>
          </div>
        </div>

        {saved && (
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
            <CheckCircle2 size={18} /> Profile successfully updated in local storage!
          </div>
        )}

        <div className="glass-panel" style={{ padding: '32px', maxWidth: '720px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
            <img 
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'} 
              alt={user?.name}
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-cyan)' }}
            />
            <div>
              <h2 style={{ fontSize: '1.4rem' }}>{user?.name}</h2>
              <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                {user?.role === 'instructor' ? 'Faculty Instructor' : 'Undergraduate Scholar'} • {user?.studentId || user?.facultyId || 'LS-2026-904'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Enrolled: {user?.joinedDate || '2026-09-15'}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Legal Name</label>
              <input 
                type="text"
                className="form-input"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Academic Email (Read Only)</label>
              <input 
                type="email"
                className="form-input"
                value={user?.email || ''}
                disabled
                style={{ opacity: 0.7, cursor: 'not-allowed' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Academic Headline / Research Interest</label>
              <input 
                type="text"
                className="form-input"
                value={formData.headline}
                onChange={e => setFormData({ ...formData, headline: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Department</label>
              <input 
                type="text"
                className="form-input"
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
              <Save size={16} /> Save Academic Profile
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

