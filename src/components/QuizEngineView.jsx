import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  Award, 
  ArrowRight,
  TrendingUp,
  Brain,
  Check,
  Filter,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuizEngineView({ course, targetUnitId = null, onSelectUnit }) {
  const [selectedUnitFilter, setSelectedUnitFilter] = useState(targetUnitId);
  const allQuestions = course.mockExams || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionIndex: optionIndex }
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Sync state when course or targetUnitId changes
  useEffect(() => {
    setSelectedUnitFilter(targetUnitId);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsCompleted(false);
    setScore(0);
  }, [targetUnitId, course.code]);

  const handleFilterChange = (unitVal) => {
    setSelectedUnitFilter(unitVal ? Number(unitVal) : null);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsCompleted(false);
    setScore(0);
  };

  const filteredQuestions = selectedUnitFilter 
    ? allQuestions.filter(q => q.unitId === selectedUnitFilter)
    : allQuestions;

  const currentQ = filteredQuestions[currentIndex];

  const handleSelectOption = (optionIdx) => {
    if (selectedAnswers[currentIndex] !== undefined) return; // Answered already

    const newSelected = { ...selectedAnswers, [currentIndex]: optionIdx };
    setSelectedAnswers(newSelected);
    setShowExplanation(true);

    const isCorrect = optionIdx === currentQ.answerIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
      // Trigger confetti if good score (>= 70%)
      const finalScore = score + (selectedAnswers[currentIndex] === currentQ.answerIndex ? 1 : 0);
      if (finalScore >= Math.ceil(filteredQuestions.length * 0.7)) {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsCompleted(false);
    setScore(0);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1rem 0 3.5rem', maxWidth: '860px', margin: '0 auto' }}>
      
      {/* Quiz Top Control Bar & Unit Selector */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '0.85rem 1.15rem',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            flexShrink: 0
          }}>
            <Brain size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.925rem', fontWeight: 800, color: '#f8fafc' }}>
              คลังข้อสอบจำลอง มสธ. ({course.code})
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              ข้อสอบคัดจากวัตถุประสงค์เชิงพฤติกรรมและจุดตายข้อสอบจริง
            </div>
          </div>
        </div>

        {/* Filter Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', maxWidth: '320px' }}>
          <Filter size={15} color="var(--text-muted)" style={{ flexShrink: 0 }} />
          <select
            value={selectedUnitFilter || ''}
            onChange={(e) => handleFilterChange(e.target.value)}
            style={{
              background: '#020617',
              color: '#f8fafc',
              border: '1px solid var(--border-color)',
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%'
            }}
          >
            <option value="">🎯 ข้อสอบรวมทุกหน่วย ({allQuestions.length} ข้อ)</option>
            {course.units.map(u => {
              const count = allQuestions.filter(q => q.unitId === u.id).length;
              return (
                <option key={u.id} value={u.id}>
                  หน่วยที่ {u.id}: {u.title} {count > 0 ? `(${count} ข้อ)` : ''}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* No Questions Found for this specific filter */}
      {(!filteredQuestions || filteredQuestions.length === 0) ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', margin: '2rem 0' }}>
          <HelpCircle size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>
            ยังไม่มีแบบทดสอบสำหรับหน่วยที่ {selectedUnitFilter}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            ข้อสอบชุดวิชา {course.code} มีข้อสอบรวมทุกหน่วย {allQuestions.length} ข้อพร้อมให้ฝึกทำทันที
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => handleFilterChange('')} 
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Sparkles size={16} /> ทำข้อสอบรวมทุกหน่วย ({allQuestions.length} ข้อ)
            </button>
            <button 
              onClick={() => onSelectUnit(selectedUnitFilter || 1)} 
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <BookOpen size={16} /> กลับไปอ่านเนื้อหาตำรา
            </button>
          </div>
        </div>
      ) : isCompleted ? (
        /* Completed State View */
        <div className="animate-fade-in card" style={{ padding: '2.5rem', margin: '1.5rem 0', textAlign: 'center' }}>
          <div style={{
            width: '76px',
            height: '76px',
            borderRadius: '20px',
            background: score >= Math.ceil(filteredQuestions.length * 0.6) ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem'
          }}>
            <Award size={42} color={score >= Math.ceil(filteredQuestions.length * 0.6) ? '#10b981' : '#ef4444'} />
          </div>

          <span className={`badge ${score >= Math.ceil(filteredQuestions.length * 0.6) ? 'badge-green' : 'badge-rose'}`} style={{ fontSize: '0.85rem' }}>
            {score >= Math.ceil(filteredQuestions.length * 0.6) ? 'ผ่านเกณฑ์ประเมิน (ระดับ S/H)' : 'ต้องทบทวนสรุป 80/20 เพิ่มเติม'}
          </span>

          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.85rem', color: '#f8fafc' }}>
            คะแนนของคุณ: {score} / {filteredQuestions.length}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            คิดเป็น {Math.round((score / filteredQuestions.length) * 100)}% ของข้อสอบชุดนี้
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleRestart}
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem' }}
            >
              <RotateCcw size={16} /> ทำซ้ำอีกครั้ง
            </button>
            <button
              onClick={() => onSelectUnit(selectedUnitFilter || 1)}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem' }}
            >
              <BookOpen size={16} /> กลับไปอ่านเนื้อหาตำรา
            </button>
          </div>
        </div>
      ) : (
        /* Active Question View */
        <div className="card" style={{ padding: 'clamp(1rem, 3.5vw, 1.75rem)', margin: '1.25rem 0' }}>
          
          {/* Progress Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge badge-blue">
                ข้อที่ {currentIndex + 1} จาก {filteredQuestions.length}
              </span>
              <span className="badge badge-kmitl" style={{ fontSize: '0.725rem' }}>
                หน่วยที่ {currentQ.unitId}
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              คะแนนสะสม: <span style={{ color: '#10b981' }}>{score}</span> คะแนน
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', marginBottom: '1.75rem', overflow: 'hidden' }}>
            <div style={{
              width: `${Math.round(((currentIndex + 1) / filteredQuestions.length) * 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #3b82f6, #10b981)',
              transition: 'width 0.3s ease'
            }} />
          </div>

          {/* Question Text */}
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.5, color: '#f8fafc', marginBottom: '1.75rem' }}>
            {currentQ.question}
          </h3>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedAnswers[currentIndex] === oIdx;
              const hasAnswered = selectedAnswers[currentIndex] !== undefined;
              const isCorrect = oIdx === currentQ.answerIndex;

              let btnBg = 'rgba(255, 255, 255, 0.02)';
              let btnBorder = 'var(--border-color)';
              let textColor = '#e2e8f0';

              if (hasAnswered) {
                if (isCorrect) {
                  btnBg = 'rgba(16, 185, 129, 0.15)';
                  btnBorder = '#10b981';
                  textColor = '#34d399';
                } else if (isSelected && !isCorrect) {
                  btnBg = 'rgba(239, 68, 68, 0.15)';
                  btnBorder = '#ef4444';
                  textColor = '#f87171';
                }
              } else if (isSelected) {
                btnBg = 'rgba(59, 130, 246, 0.15)';
                btnBorder = '#3b82f6';
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  disabled={hasAnswered}
                  style={{
                    background: btnBg,
                    border: `1px solid ${btnBorder}`,
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    textAlign: 'left',
                    color: textColor,
                    fontSize: '0.925rem',
                    lineHeight: 1.5,
                    cursor: hasAnswered ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{opt}</span>
                  {hasAnswered && isCorrect && <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0 }} />}
                  {hasAnswered && isSelected && !isCorrect && <XCircle size={18} color="#ef4444" style={{ flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="animate-fade-in" style={{
              background: selectedAnswers[currentIndex] === currentQ.answerIndex ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
              border: `1px solid ${selectedAnswers[currentIndex] === currentQ.answerIndex ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              borderRadius: '12px',
              padding: '1.25rem',
              marginBottom: '1.75rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: selectedAnswers[currentIndex] === currentQ.answerIndex ? '#34d399' : '#f87171',
                marginBottom: '0.4rem'
              }}>
                {selectedAnswers[currentIndex] === currentQ.answerIndex ? (
                  <>
                    <CheckCircle size={18} /> ถูกต้อง! คำตอบคือ {currentQ.options[currentQ.answerIndex]}
                  </>
                ) : (
                  <>
                    <XCircle size={18} /> ตอบผิด! คำตอบที่ถูกต้องคือ {currentQ.options[currentQ.answerIndex]}
                  </>
                )}
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#e2e8f0', margin: 0 }}>
                💡 <strong>คำอธิบายตามตำรา มสธ.:</strong> {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Bottom Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentIndex] === undefined}
              className="btn btn-primary"
              style={{
                padding: '0.65rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 700,
                opacity: selectedAnswers[currentIndex] === undefined ? 0.4 : 1
              }}
            >
              <span>{currentIndex + 1 === filteredQuestions.length ? 'ดูผลการทดสอบ' : 'ข้อถัดไป'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
