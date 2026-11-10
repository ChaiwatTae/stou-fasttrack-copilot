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
      background: 'rgba(17, 23, 38, 0.92)', 
      backdropFilter: 'blur(16px)', 
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.85rem', gap: '0.75rem' }}>
        
        {/* Brand & Dual-Degree Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer' }} onClick={() => setActiveTab('units')}>
            <div style={{ 
              width: '34px', 
              height: '34px', 
              borderRadius: '10px', 
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.35)',
              flexShrink: 0
            }}>
              <BookOpen size={18} color="white" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.98rem', letterSpacing: '-0.02em', color: '#fff', whiteSpace: 'nowrap' }}>
                  STOU FastTrack
                </span>
                <span className="badge badge-kmitl" style={{ fontSize: '0.65rem', padding: '0.1rem 0.45rem' }}>
                  <Shield size={10} /> สจล.
                </span>
              </div>
              <p className="desktop-only" style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                สัมฤทธิบัตร มสธ. รุ่นที่ 136 x ภาษาจีนอุตสาหกรรม สจล.
              </p>
            </div>
          </div>
        </div>

        {/* Course Selector Tabs (Compact on mobile) */}
        <div style={{ 
          display: 'flex', 
          background: 'rgba(14, 20, 34, 0.9)', 
          padding: '0.2rem', 
          borderRadius: '10px',
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
                  gap: '0.35rem',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '7px',
                  border: 'none',
                  background: isSelected ? 'var(--accent-blue)' : 'transparent',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.775rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{course.code}</span>
                <span className="desktop-only" style={{ 
                  maxWidth: '100px', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  whiteSpace: 'nowrap',
                  fontSize: '0.725rem',
                  opacity: isSelected ? 1 : 0.7
                }}>
                  {course.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Navigation Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          
          {/* Main View Tabs (Desktop Only - Mobile uses Bottom Nav) */}
          <div className="desktop-only" style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              onClick={() => setActiveTab('units')}
              className={`btn ${activeTab === 'units' ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', fontWeight: 700 }}
            >
              📖 อ่านตำรา มสธ. (ฉบับเต็ม)
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
            >
              ภาพรวม 15 หน่วย
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
              gap: '0.25rem', 
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '0.3rem 0.55rem',
              borderRadius: '9999px',
              color: '#f59e0b',
              fontWeight: 700,
              fontSize: '0.75rem',
              whiteSpace: 'nowrap'
            }}
          >
            <Flame size={14} fill="#f59e0b" />
            <span>{studyStreak} วัน</span>
          </div>

          {/* Monetize / Commercial Model Button */}
          <button
            onClick={onOpenCommercialModal}
            className="btn badge-blue"
            style={{ 
              border: '1px solid rgba(59, 130, 246, 0.4)', 
              padding: '0.3rem 0.55rem', 
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.75rem',
              whiteSpace: 'nowrap'
            }}
          >
            <DollarSign size={13} />
            <span className="desktop-only">แผนทำขาย</span>
            <span className="mobile-only">SaaS</span>
          </button>

        </div>
      </div>
    </header>
  );
}
