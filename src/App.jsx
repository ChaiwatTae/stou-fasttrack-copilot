import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import DashboardView from './components/DashboardView';
import UnitReaderView from './components/UnitReaderView';
import QuizEngineView from './components/QuizEngineView';
import KmitlShieldPlannerView from './components/KmitlShieldPlannerView';
import CommercialModal from './components/CommercialModal';
import { COURSES } from './data/courses';

export default function App() {
  const [currentCourseId, setCurrentCourseId] = useState('10141');
  // Default to 'units' reader so the textbook content is immediately visible
  const [activeTab, setActiveTab] = useState('units');
  const [currentUnitId, setCurrentUnitId] = useState(1);
  const [quizTargetUnitId, setQuizTargetUnitId] = useState(null);
  const [isCommercialModalOpen, setIsCommercialModalOpen] = useState(false);
  
  // Persistence for completed units
  const [completedUnitsMap, setCompletedUnitsMap] = useState(() => {
    try {
      const saved = localStorage.getItem('stou_completed_units');
      return saved ? JSON.parse(saved) : { '10141': [1], '10151': [] };
    } catch (e) {
      return { '10141': [1], '10151': [] };
    }
  });

  const [studyStreak, setStudyStreak] = useState(() => {
    try {
      const saved = localStorage.getItem('stou_study_streak');
      return saved ? Number(saved) : 4;
    } catch (e) {
      return 4;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('stou_completed_units', JSON.stringify(completedUnitsMap));
    } catch (e) {
      // ignore
    }
  }, [completedUnitsMap]);

  // Deep-linking and Browser Back/Forward via URL Hash (#units, #dashboard, #quiz, #planner)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').split('?')[0];
      if (['units', 'dashboard', 'quiz', 'planner'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    const initialHash = window.location.hash.replace('#', '').split('?')[0];
    if (['units', 'dashboard', 'quiz', 'planner'].includes(initialHash)) {
      setActiveTab(initialHash);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (window.location.hash !== `#${tab}`) {
      window.history.pushState(null, '', `#${tab}`);
    }
  };

  const currentCourse = COURSES[currentCourseId] || COURSES['10141'];
  const courseCompletedUnits = completedUnitsMap[currentCourseId] || [];

  const handleToggleUnitCompleted = (unitId) => {
    setCompletedUnitsMap(prev => {
      const current = prev[currentCourseId] || [];
      const updated = current.includes(unitId)
        ? current.filter(id => id !== unitId)
        : [...current, unitId];
      return { ...prev, [currentCourseId]: updated };
    });
  };

  const handleSelectUnit = (unitId) => {
    setCurrentUnitId(unitId);
    handleTabChange('units');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuiz = (unitId = null) => {
    setQuizTargetUnitId(unitId);
    handleTabChange('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navigation */}
      <Navbar
        currentCourseId={currentCourseId}
        onSelectCourse={(id) => {
          setCurrentCourseId(id);
          setCurrentUnitId(1);
        }}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        studyStreak={studyStreak}
        onOpenCommercialModal={() => setIsCommercialModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="container" style={{ flex: 1 }}>
        {activeTab === 'dashboard' && (
          <DashboardView
            course={currentCourse}
            onSelectUnit={handleSelectUnit}
            onStartQuiz={handleStartQuiz}
            completedUnits={courseCompletedUnits}
            onToggleUnitCompleted={handleToggleUnitCompleted}
          />
        )}

        {activeTab === 'units' && (
          <UnitReaderView
            course={currentCourse}
            currentUnitId={currentUnitId}
            onSelectUnit={setCurrentUnitId}
            onStartQuizForUnit={(unitId) => handleStartQuiz(unitId)}
            completedUnits={courseCompletedUnits}
            onToggleUnitCompleted={handleToggleUnitCompleted}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizEngineView
            course={currentCourse}
            targetUnitId={quizTargetUnitId}
            onSelectUnit={handleSelectUnit}
          />
        )}

        {activeTab === 'planner' && (
          <KmitlShieldPlannerView />
        )}
      </main>

      {/* Footer */}
      <footer style={{ 
        borderTop: '1px solid var(--border-color)', 
        background: '#070a12', 
        padding: '1.5rem 0',
        marginTop: 'auto'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <div>
            <strong>STOU Fast-Track Learning System</strong> • ออกแบบสำหรับนักศึกษาโครงการสัมฤทธิบัตร มสธ. และ สจล.
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span>ชุดวิชา 10141 & 10151</span>
            <span>•</span>
            <span style={{ color: '#f97316' }}>KMITL Shield Active</span>
            <span>•</span>
            <button 
              onClick={() => setIsCommercialModalOpen(true)}
              style={{ background: 'transparent', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              แผนธุรกิจ EdTech
            </button>
          </div>
        </div>
      </footer>

      {/* Commercial Blueprint Modal */}
      <CommercialModal
        isOpen={isCommercialModalOpen}
        onClose={() => setIsCommercialModalOpen(false)}
      />

      {/* Mobile Bottom Navigation Bar (Thumb-Accessible for Commuters) */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={handleTabChange}
      />

    </div>
  );
}
