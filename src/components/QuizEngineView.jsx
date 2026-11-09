import React, { useState } from 'react';
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
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuizEngineView({ course, targetUnitId = null, onSelectUnit }) {
  const allQuestions = course.mockExams || [];
  
  // Filter questions if targetUnitId is specified
  const filteredQuestions = targetUnitId 
    ? allQuestions.filter(q => q.unitId === targetUnitId)
    : allQuestions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionIndex: optionIndex }
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

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
      // Trigger confetti if good score
      if (score + 1 >= Math.ceil(filteredQuestions.length * 0.75)) {
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

  if (!filteredQuestions || filteredQuestions.length === 0) {
    return (
      <div className="card" style={{ padding: '3rem', textAlign: 'center', margin: '2rem 0' }}>
        <HelpCircle size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>ยังไม่มีแบบทดสอบสำหรับหน่วยนี้</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
          คุณสามารถเลือกทำแบบทดสอบรวมของวิชา {course.name} ได้ทันที
        </p>
        <button onClick={() => onSelectUnit(1)} className="btn btn-primary" style={{ marginTop: '1.25rem' }}>
          กลับไปดูเนื้อหาหน่วยที่ 1
        </button>
      </div>
    );
  }

  // Completed State View
  if (isCompleted) {
    const percentage = Math.round((score / filteredQuestions.length) * 100);
    const isPassed = percentage >= 60;

    return (
      <div className="animate-fade-in card" style={{ padding: '2.5rem', maxWidth: '680px', margin: '2rem auto', textAlign: 'center' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          background: isPassed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem'
        }}>
          <Award size={40} color={isPassed ? '#10b981' : '#ef4444'} />
        </div>

        <span className={`badge ${isPassed ? 'badge-green' : 'badge-rose'}`} style={{ fontSize: '0.85rem' }}>
          {isPassed ? 'เกณฑ์ผ่านเกณฑ์การประเมิน (ระดับ H/S)' : 'ต้องทบทวนสรุป 80/20 เพิ่มเติม'}
        </span>

        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.75rem' }}>
          คะแนนรวมของคุณ: {score} / {filteredQuestions.length}
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          คิดเป็น {percentage}% ของข้อสอบจำลอง
        </p>

        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '1.25rem',
          margin: '1.75rem 0',
          textAlign: 'left'
        }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <TrendingUp size={16} /> การวิเคราะห์การสอบ มสธ.:
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: 1.6 }}>
            {percentage >= 80 
              ? 'ยอดเยี่ยมมาก! คุณจับแก่นวัตถุประสงค์เชิงพฤติกรรมได้แม่นยำ พร้อมลุยสนามสอบจริง มสธ. ได้อย่างมั่นใจโดยไม่ต้องเสียเวลาอ่านตำราหนา'
              : percentage >= 60
              ? 'ทำได้ดีแล้ว อยู่ในเกณฑ์ผ่านสบายๆ (เกรด S) แนะนำให้อ่านทบทวน "จุดตายที่คนชอบตอบผิด (Exam Traps)" ในหน่วยที่มีข้อผิด'
              : 'ไม่ต้องกังวลครับ แนะนำให้เปิดอ่านสรุปย่อแบบ 80/20 อีกรอบ และกดฟังคลิปเสียงสรุปในขณะเดินทาง แล้วกลับมาลองใหม่อีกครั้ง'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={handleRestart} className="btn btn-secondary">
            <RotateCcw size={16} /> ลองทำใหม่อีกครั้ง
          </button>
          <button onClick={() => onSelectUnit(1)} className="btn btn-primary">
            กลับไปทบทวนเนื้อหา
          </button>
        </div>
      </div>
    );
  }

  // Active Quiz View
  const hasAnswered = selectedAnswers[currentIndex] !== undefined;
  const userAnswer = selectedAnswers[currentIndex];
  const isCorrect = userAnswer === currentQ.answerIndex;

  return (
    <div className="animate-fade-in" style={{ padding: '1.5rem 0 3.5rem', maxWidth: '820px', margin: '0 auto' }}>
      
      {/* Quiz Progress Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
        background: 'var(--bg-card)',
        padding: '0.85rem 1.25rem',
        borderRadius: '12px',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <Brain size={20} color="var(--accent-blue)" />
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f8fafc' }}>
            Active Recall: ข้อที่ {currentIndex + 1} จาก {filteredQuestions.length}
          </span>
          <span className="badge badge-blue">หน่วยที่ {currentQ.unitId}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            คะแนนปัจจุบัน: <strong style={{ color: '#10b981' }}>{score}</strong>
          </span>
          <button 
            onClick={handleRestart} 
            className="btn btn-outline" 
            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
          >
            เริ่มใหม่
          </button>
        </div>
      </div>

      {/* Question Card */}
      <div className="card" style={{ padding: '2rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.55 }}>
          {currentQ.question}
        </h2>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
          {currentQ.options.map((option, idx) => {
            const isOptionSelected = userAnswer === idx;
            const isTargetCorrect = idx === currentQ.answerIndex;

            let optionBg = 'rgba(255, 255, 255, 0.02)';
            let optionBorder = 'var(--border-color)';
            let optionColor = '#e2e8f0';

            if (hasAnswered) {
              if (isTargetCorrect) {
                optionBg = 'rgba(16, 185, 129, 0.15)';
                optionBorder = '#10b981';
                optionColor = '#6ee7b7';
              } else if (isOptionSelected) {
                optionBg = 'rgba(239, 68, 68, 0.15)';
                optionBorder = '#ef4444';
                optionColor = '#fca5a5';
              }
            }

            return (
              <button
                key={idx}
                disabled={hasAnswered}
                onClick={() => handleSelectOption(idx)}
                style={{
                  background: optionBg,
                  border: `1px solid ${optionBorder}`,
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  cursor: hasAnswered ? 'default' : 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  color: optionColor
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isOptionSelected ? (isTargetCorrect ? '#10b981' : '#ef4444') : '#1e293b',
                    color: isOptionSelected ? 'white' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span style={{ fontSize: '0.925rem', fontWeight: 500 }}>
                    {option}
                  </span>
                </div>

                {hasAnswered && (
                  <div>
                    {isTargetCorrect && <CheckCircle size={20} color="#10b981" />}
                    {isOptionSelected && !isTargetCorrect && <XCircle size={20} color="#ef4444" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Instant Detailed Explanation Card */}
        {hasAnswered && (
          <div className="animate-fade-in" style={{
            marginTop: '1.75rem',
            background: isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
            border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            borderRadius: '14px',
            padding: '1.25rem 1.4rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {isCorrect ? (
                <>
                  <CheckCircle size={18} color="#10b981" />
                  <span style={{ fontWeight: 700, color: '#6ee7b7', fontSize: '0.925rem' }}>
                    ถูกต้อง! (เฉลยข้อ {String.fromCharCode(65 + currentQ.answerIndex)})
                  </span>
                </>
              ) : (
                <>
                  <XCircle size={18} color="#ef4444" />
                  <span style={{ fontWeight: 700, color: '#fca5a5', fontSize: '0.925rem' }}>
                    ยังไม่ถูกต้อง (คำตอบที่ถูกต้องคือข้อ {String.fromCharCode(65 + currentQ.answerIndex)})
                  </span>
                </>
              )}
            </div>

            <p style={{ fontSize: '0.875rem', color: '#e2e8f0', lineHeight: 1.6, marginTop: '0.35rem' }}>
              <strong>เหตุผลเชิงลึก:</strong> {currentQ.explanation}
            </p>

            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={handleNext}
                className="btn btn-primary"
                style={{ padding: '0.55rem 1.25rem' }}
              >
                {currentIndex + 1 < filteredQuestions.length ? 'ทำข้อถัดไป' : 'ดูสรุปผลคะแนน'} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
