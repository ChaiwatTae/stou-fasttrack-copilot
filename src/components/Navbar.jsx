import React from 'react';
import { BookOpen, Shield, Flame, Sparkles, Compass, CheckCircle2, DollarSign } from 'lucide-react';
import { COURSES } from '../data/courses';

export default function Navbar({ 
  currentCourseId, 
  onSelectCourse, 
  activeTab, 
  setActiveTab,
  studyStreak = 4,
  onOpenCommercialModal
}) {
  const currentCourse = COURSES[currentCourseId];

  return (
    <header style={{ 
      background: 'rgba(17, 23, 38, 0.85)', 
      backdropFilter: 'blur(16px)', 
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.25rem', gap: '1rem', flexWrap: 'wrap' }}>
        
        {/* Brand & Dual-Degree Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.35)'
            }}>
              <BookOpen size={22} color="white" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: '#fff' }}>
                  STOU FastTrack
                </span>
                <span className="badge badge-kmitl" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                  <Shield size={11} /> สจล. Shield Mode
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                สัมฤทธิบัตร มสธ. รุ่นที่ 136 x ภาษาจีนอุตสาหกรรม สจล.
              </p>
            </div>
          </div>
        </div>

        {/* Course Selector Tabs */}
        <div style={{ 
          display: 'flex', 
          background: 'rgba(14, 20, 34, 0.8)', 
          padding: '0.25rem', 
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          {Object.values(COURSES).map((course) => {
            const isSelected = course.code === currentCourseId;
            return (
              <button
                key={course.code}
                onClick={() => onSelectCourse(course.code)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '9px',
                  border: 'none',
                  background: isSelected ? 'var(--accent-blue)' : 'transparent',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.825rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{course.code}</span>
                <span style={{ 
                  display: 'inline-block',
                  maxWidth: '120px', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  whiteSpace: 'nowrap',
                  fontSize: '0.75rem',
                  opacity: isSelected ? 1 : 0.7
                }}>
                  {course.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Navigation Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Main View Tabs */}
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
            >
              ภาพรวม 15 หน่วย
            </button>
            <button
              onClick={() => setActiveTab('units')}
              className={`btn ${activeTab === 'units' ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
            >
              สรุป 80/20
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`btn ${activeTab === 'quiz' ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
            >
              คลังข้อสอบ
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`btn ${activeTab === 'planner' ? 'btn-kmitl' : 'btn-outline'}`}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
            >
              <Shield size={13} /> ตาราง สจล.
            </button>
          </div>

          {/* Streak Indicator */}
          <div 
            title="Study Streak: รักษาระเบียบวินัยวันละ 15 นาที" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.35rem', 
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '0.35rem 0.7rem',
              borderRadius: '9999px',
              color: '#f59e0b',
              fontWeight: 700,
              fontSize: '0.8rem'
            }}
          >
            <Flame size={15} fill="#f59e0b" />
            <span>{studyStreak} วันติด</span>
          </div>

          {/* Monetize / Commercial Model Button */}
          <button
            onClick={onOpenCommercialModal}
            className="btn badge-blue"
            style={{ 
              border: '1px solid rgba(59, 130, 246, 0.4)', 
              padding: '0.4rem 0.75rem', 
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.78rem'
            }}
          >
            <DollarSign size={14} /> ทำขาย (EdTech SaaS)
          </button>

        </div>
      </div>
    </header>
  );
}
