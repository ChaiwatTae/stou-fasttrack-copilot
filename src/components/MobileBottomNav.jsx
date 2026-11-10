import React from 'react';
import { BookOpen, BarChart3, Brain, Shield } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

export default function MobileBottomNav({ activeTab, onSelectTab }) {
  const isMobile = useIsMobile();

  // On large screens, bottom nav is not needed (top navbar handles it)
  if (!isMobile) return null;

  const tabs = [
    {
      id: 'units',
      label: 'อ่านตำรา',
      icon: BookOpen,
      badge: null
    },
    {
      id: 'dashboard',
      label: 'ภาพรวม',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'quiz',
      label: 'คลังข้อสอบ',
      icon: Brain,
      badge: '30'
    },
    {
      id: 'planner',
      label: 'ตาราง สจล.',
      icon: Shield,
      badge: 'Shield'
    }
  ];

  return (
    <nav 
      className="mobile-bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'rgba(11, 16, 28, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid #1e293b',
        padding: '0.35rem 0.5rem',
        paddingBottom: 'max(0.45rem, env(safe-area-inset-bottom, 0.45rem))',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.6)'
      }}
    >
      <div 
        className="mobile-bottom-nav-inner"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          maxWidth: '500px',
          margin: '0 auto'
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                onSelectTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
              aria-label={tab.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.15rem',
                background: 'transparent',
                border: 'none',
                color: isActive ? '#60a5fa' : '#94a3b8',
                cursor: 'pointer',
                padding: '0.35rem 0.5rem',
                borderRadius: '12px',
                transition: 'all 0.15s ease',
                minWidth: '64px',
                touchAction: 'manipulation'
              }}
            >
              <div className="mobile-nav-icon-wrap" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} color={isActive ? '#3b82f6' : '#94a3b8'} />
                {tab.badge && (
                  <span 
                    className="mobile-nav-badge"
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-10px',
                      fontSize: '0.55rem',
                      fontWeight: 800,
                      padding: '0.05rem 0.35rem',
                      borderRadius: '9999px',
                      lineHeight: 1.2,
                      background: tab.id === 'planner' ? '#ea580c' : '#2563eb',
                      color: '#ffffff'
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: isActive ? 700 : 500,
                letterSpacing: '-0.01em',
                color: isActive ? '#60a5fa' : '#94a3b8'
              }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
