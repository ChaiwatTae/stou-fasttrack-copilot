import React from 'react';
import { BookOpen, Shield, Flame, DollarSign } from 'lucide-react';
import { COURSES } from '../data/courses';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Navbar({ 
  currentCourseId, 
  onSelectCourse, 
  activeTab, 
  setActiveTab,
  studyStreak = 4,
  onOpenCommercialModal
}) {
  const isMobile = useIsMobile();
  const currentCourse = COURSES[currentCourseId];

  return (
    <header style={{ 
      background: 'rgba(17, 23, 38, 0.95)', 
      backdropFilter: 'blur(16px)', 
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: isMobile ? '0.5rem 0.65rem' : '0.75rem 1.25rem', 
        gap: '0.4rem',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}>
        
        {/* Brand & Dual-Degree Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer' }} onClick={() => setActiveTab('units')}>
            <div style={{ 
              width: isMobile ? '30px' : '36px', 
              height: isMobile ? '30px' : '36px', 
              borderRadius: '8px', 
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.35)',
              flexShrink: 0
            }}>
              <BookOpen size={isMobile ? 16 : 20} color="white" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ fontWeight: 800, fontSize: isMobile ? '0.88rem' : '1.05rem', letterSpacing: '-0.02em', color: '#fff', whiteSpace: 'nowrap' }}>
                  STOU FastTrack
                </span>
                <span className="badge badge-kmitl" style={{ fontSize: '0.6rem', padding: '0.08rem 0.35rem' }}>
                  <Shield size={9} /> สจล.
                </span>
              </div>
              {!isMobile && (
                <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                  สัมฤทธิบัตร มสธ. รุ่นที่ 136 x ภาษาจีนอุตสาหกรรม สจล.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Course Selector Tabs */}
        <div style={{ 
          display: 'flex', 
          background: 'rgba(14, 20, 34, 0.9)', 
          padding: '0.2rem', 
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          flexShrink: 0
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
                  gap: '0.3rem',
                  padding: isMobile ? '0.28rem 0.5rem' : '0.4rem 0.8rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: isSelected ? 'var(--accent-blue)' : 'transparent',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: isMobile ? '0.75rem' : '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{course.code}</span>
                {!isMobile && (
                  <span style={{ 
                    maxWidth: '110px', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap',
                    fontSize: '0.725rem',
                    opacity: isSelected ? 1 : 0.7
                  }}>
                    {course.name}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          
          {/* Main View Tabs (Desktop ONLY - Completely eliminated from DOM on mobile) */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '0.35rem' }}>
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
          )}

          {/* Streak Indicator */}
          <div 
            title="Study Streak: รักษาระเบียบวินัยวันละ 15 นาที" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.2rem', 
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              padding: isMobile ? '0.22rem 0.4rem' : '0.35rem 0.6rem',
              borderRadius: '9999px',
              color: '#f59e0b',
              fontWeight: 700,
              fontSize: isMobile ? '0.7rem' : '0.78rem',
              whiteSpace: 'nowrap'
            }}
          >
            <Flame size={isMobile ? 12 : 14} fill="#f59e0b" />
            <span>{studyStreak}d</span>
          </div>

          {/* Monetize / Commercial Model Button */}
          <button
            onClick={onOpenCommercialModal}
            className="btn badge-blue"
            style={{ 
              border: '1px solid rgba(59, 130, 246, 0.4)', 
              padding: isMobile ? '0.22rem 0.45rem' : '0.35rem 0.65rem', 
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: isMobile ? '0.7rem' : '0.78rem',
              whiteSpace: 'nowrap'
            }}
          >
            <DollarSign size={isMobile ? 11 : 13} />
            <span>SaaS</span>
          </button>

        </div>
      </div>
    </header>
  );
}
