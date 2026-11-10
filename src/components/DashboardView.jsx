import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle, 
  BookOpen, 
  Play, 
  AlertTriangle, 
  HelpCircle, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  Timer,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function DashboardView({ 
  course, 
  onSelectUnit, 
  onStartQuiz, 
  completedUnits, 
  onToggleUnitCompleted 
}) {
  // Samritthibat Batch 136 Exam Date: 6-7 กุมภาพันธ์ 2570 (2027-02-06)
  const examDate = new Date('2027-02-06T09:00:00');
  const today = new Date();
  
  // Calculate dynamic days remaining
  const diffTime = examDate.getTime() - today.getTime();
  const calculatedDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  
  const [daysRemaining, setDaysRemaining] = useState(calculatedDays || 91);
  const [timerMinutes, setTimerMinutes] = useState(15);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1);
          setTimerSeconds(59);
        } else {
          setIsTimerRunning(false);
          alert('🎉 ครบ 15 นาที Micro-Learning แล้ว! พักสายตาหรือกลับไปโฟกัสการบ้าน สจล. ได้เลยครับ');
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerMinutes, timerSeconds]);

  const toggleTimer = () => {
    if (!isTimerRunning && timerMinutes === 0 && timerSeconds === 0) {
      setTimerMinutes(15);
      setTimerSeconds(0);
    }
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerMinutes(15);
    setTimerSeconds(0);
  };

  const progressPercent = Math.round((completedUnits.length / course.units.length) * 100);

  return (
    <div className="animate-fade-in" style={{ padding: '1.75rem 0 3rem' }}>
      
      {/* KMITL-Shield Alert Banner */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(234, 88, 12, 0.12) 0%, rgba(17, 23, 38, 0.9) 100%)',
        border: '1px solid rgba(249, 115, 22, 0.3)',
        borderRadius: '16px',
        padding: '1.15rem 1.4rem',
        marginBottom: '1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'rgba(249, 115, 22, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-kmitl)'
          }}>
            <ShieldCheck size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fed7aa' }}>
                KMITL-Shield Protocol: Active
              </h3>
              <span className="badge badge-kmitl">ไม่กระทบผลการเรียน สจล.</span>
            </div>
            <p style={{ fontSize: '0.825rem', color: '#fdba74', marginTop: '0.15rem' }}>
              กลยุทธ์วันนี้: ใช้เวลาเดินทางบน ARL / รถไฟลาดกระบัง ทบทวนสรุปแบบกระชับ 15 นาที + ทำโจทย์ 5 ข้อ (ประหยัดเวลาอ่านหนังสือ 3 ชั่วโมง)
            </p>
          </div>
        </div>

        {/* Micro-learning Timer Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '0.45rem 0.85rem',
            borderRadius: '10px',
            fontFamily: 'monospace',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: isTimerRunning ? '#34d399' : '#e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <Timer size={16} />
            <span>
              {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
            </span>
          </div>
          <button 
            onClick={toggleTimer}
            className={`btn ${isTimerRunning ? 'btn-secondary' : 'btn-primary'}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.825rem' }}
          >
            {isTimerRunning ? 'พักชั่วคราว' : 'เริ่มโหมด 15 นาที'}
          </button>
          {isTimerRunning && (
            <button 
              onClick={resetTimer}
              className="btn btn-outline"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem' }}
            >
              รีเซ็ต
            </button>
          )}
        </div>
      </div>

      {/* Hero Stats Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        
        {/* Course Info Card */}
        <div className="card" style={{ padding: '1.4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>
                รหัสชุดวิชา {course.code}
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.25rem', lineHeight: 1.35 }}>
                {course.name}
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {course.nameEn} • {course.credits} หน่วยกิต
              </p>
            </div>
          </div>
          
          <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
              ความคืบหน้า 15 หน่วย
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
              {completedUnits.length} / 15 หน่วย ({progressPercent}%)
            </span>
          </div>
          {/* Progress Bar */}
          <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '9999px', marginTop: '0.5rem', overflow: 'hidden' }}>
            <div style={{ 
              width: `${progressPercent}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #3b82f6, #10b981)',
              borderRadius: '9999px',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Exam Countdown Card */}
        <div className="card" style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge badge-amber">สัมฤทธิบัตร รุ่นที่ 136 (สอบ 6-7 ก.พ. 70)</span>
              <Clock size={16} color="#f59e0b" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.85rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.03em' }}>
                {daysRemaining}
              </span>
              <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                วันก่อนถึงสนามสอบไล่
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              มีเวลามากถึง <strong>5 - 6 วัน ต่อ 1 หน่วย</strong> ไม่ต้องเร่งรีบ! วันละ 15 นาทีระหว่างเดินทางก็จบ 15 หน่วยก่อนสอบ 2 สัปดาห์เต็ม
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button 
              onClick={() => onStartQuiz(null)} 
              className="btn btn-primary"
              style={{ flex: 1, padding: '0.55rem', fontSize: '0.85rem' }}
            >
              <Sparkles size={15} /> สุ่มควิซ 5 ข้อทันที
            </button>
            <a 
              href={course.officialYouTubePlaylist} 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-secondary"
              style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem' }}
              title="เปิดฟังบรรยายจาก มสธ. Channel บน YouTube"
            >
              <Play size={14} /> ฟัง มสธ. Channel
            </a>
          </div>
        </div>

        {/* 80/20 Fast Track Rule Explanation */}
        <div className="card" style={{ padding: '1.4rem', background: 'linear-gradient(180deg, #131c31 0%, var(--bg-card) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="#60a5fa" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0' }}>
              สูตรลัด มสธ. ฉบับ 80/20 (ไม่ต้องอ่าน 1,000 หน้า)
            </h3>
          </div>
          <ul style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem', paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <li>
              <strong>1. วัตถุประสงค์เชิงพฤติกรรม:</strong> ข้อสอบ มสธ. ออกตรงตามกรอบนี้ 100%
            </li>
            <li>
              <strong>2. สาระสังเขป:</strong> จดจำประเด็นสำคัญท้ายเรื่อง ไม่ต้องอ่านน้ำ
            </li>
            <li>
              <strong>3. แบบประเมินตนเอง:</strong> ฝึกทำซ้ำๆ ข้อสอบจริงดัดแปลงมาจากจุดนี้
            </li>
          </ul>
          <div style={{ marginTop: '0.9rem', fontSize: '0.75rem', color: '#93c5fd', background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem 0.75rem', borderRadius: '8px' }}>
            💡 เหมาะสำหรับช่วงนั่ง Airport Rail Link จากพญาไท/มักกะสันไปลาดกระบัง
          </div>
        </div>

      </div>

      {/* Direct CTA to Textbook Reader */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
        border: '1px solid rgba(96, 165, 250, 0.35)',
        borderRadius: '16px',
        padding: '1.25rem 1.5rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <BookOpen size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#f8fafc' }}>
              ต้องการอ่านเนื้อหาตำราเรียน มสธ. เล่มจริงทันที?
            </div>
            <div style={{ fontSize: '0.825rem', color: '#cbd5e1', marginTop: '0.15rem' }}>
              มีทั้งโหมดบทเรียนสรุปเข้ม และคลังหน้าหนังสือต้นฉบับให้เปิดดูหน้าต่อหน้า (ครบทั้ง 15 หน่วย)
            </div>
          </div>
        </div>

        <button
          onClick={() => onSelectUnit(1)}
          className="btn btn-primary"
          style={{ padding: '0.65rem 1.25rem', fontWeight: 700, fontSize: '0.875rem' }}
        >
          📖 เริ่มอ่านหน่วยที่ 1 ทันที →
        </button>
      </div>

      {/* 15 Units Grid Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>
            โครงสร้างเนื้อหา 15 หน่วยการสอน (คลิกเพื่อดูสรุปเจาะข้อสอบ)
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            คัดกรองเฉพาะหัวข้อที่ออกสอบบ่อย แบ่งเล่ม 1 (หน่วย 1-7) และเล่ม 2 (หน่วย 8-15)
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
            สัญลักษณ์:
          </span>
          <span className="badge badge-rose" style={{ fontSize: '0.7rem' }}>ออกบ่อยมาก (High)</span>
          <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>ออกปานกลาง</span>
        </div>
      </div>

      {/* 15 Units Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1rem'
      }}>
        {course.units.map((unit) => {
          const isDone = completedUnits.includes(unit.id);
          return (
            <div 
              key={unit.id}
              className="card card-interactive"
              style={{
                padding: '1.15rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderColor: isDone ? 'rgba(16, 185, 129, 0.4)' : undefined,
                background: isDone ? 'rgba(16, 185, 129, 0.04)' : undefined
              }}
              onClick={() => onSelectUnit(unit.id)}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: isDone ? '#10b981' : '#1e293b',
                      color: isDone ? '#ffffff' : '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}>
                      {unit.id}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {unit.id <= 7 ? 'เล่ม 1' : 'เล่ม 2'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {unit.importance === 'high' ? (
                      <span className="badge badge-rose" style={{ fontSize: '0.7rem' }}>
                        ออกสอบบ่อย
                      </span>
                    ) : (
                      <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
                        ปานกลาง
                      </span>
                    )}

                    {/* Completion Checkbox */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleUnitCompleted(unit.id);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: isDone ? '#10b981' : '#475569',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      title={isDone ? 'ทำเครื่องหมายว่ายังไม่จบ' : 'ทำเครื่องหมายว่าอ่านจบแล้ว'}
                    >
                      <CheckCircle size={20} />
                    </button>
                  </div>
                </div>

                <h3 style={{
                  fontSize: '0.975rem',
                  fontWeight: 600,
                  marginTop: '0.75rem',
                  lineHeight: 1.4,
                  color: isDone ? '#e2e8f0' : '#ffffff'
                }}>
                  {unit.title}
                </h3>

                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.45rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {unit.summary[0]}
                </p>
              </div>

              <div style={{
                marginTop: '1rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.775rem'
              }}>
                <span style={{ color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700 }}>
                  <BookOpen size={14} /> เปิดอ่านตำรา มสธ. (ฉบับเต็ม) <ChevronRight size={14} />
                </span>
                <span style={{ color: 'var(--text-muted)' }}>
                  {unit.keyTerms.slice(0, 2).join(', ')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
