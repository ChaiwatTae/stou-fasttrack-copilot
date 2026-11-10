import React from 'react';
import { BookOpen, BarChart3, Brain, Shield } from 'lucide-react';

export default function MobileBottomNav({ activeTab, onSelectTab }) {
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
    <nav className="mobile-bottom-nav">
      <div className="mobile-bottom-nav-inner">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
              aria-label={tab.label}
            >
              <div className="mobile-nav-icon-wrap">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                {tab.badge && (
                  <span className={`mobile-nav-badge ${tab.id === 'planner' ? 'badge-orange' : 'badge-blue'}`}>
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="mobile-nav-label">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
