import React, { useState } from 'react';
import { 
  Shield, 
  Calendar, 
  Clock, 
  Train, 
  AlertCircle, 
  CheckCircle2, 
  Coffee, 
  Sparkles,
  BookMarked
} from 'lucide-react';

export default function KmitlShieldPlannerView() {
  const [isKmitlExamWeek, setIsKmitlExamWeek] = useState(false);
  const [commuteMinutes, setCommuteMinutes] = useState(35);
  const [completedDailySlots, setCompletedDailySlots] = useState({
    morning: false,
    lunch: false,
    evening: false
  });

  const toggleSlot = (key) => {
    setCompletedDailySlots(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1.5rem 0 3.5rem', maxWidth: '860px', margin: '0 auto' }}>
      
      {/* Hero Protection Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.15) 0%, rgba(17, 23, 38, 0.95) 100%)',
        border: '1px solid rgba(249, 115, 22, 0.4)',
        borderRadius: '16px',
        padding: '1.75rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(234, 88, 12, 0.4)'
            }}>
              <Shield size={30} color="white" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffedd5' }}>
                  KMITL-Shield Time Optimizer
                </h1>
                <span className="badge badge-kmitl">ระบบป้องกันเกรดตก</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#fed7aa', marginTop: '0.2rem' }}>
                หลักการ: "ไม่แตะเวลาอ่านหนังสือภาษาจีน สจล. แม้แต่นาทีเดียว" ใช้เฉพาะเศษเวลาเดินทาง (Dead Time)
              </p>
            </div>
          </div>

          {/* Emergency Exam Mode Switch */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(249, 115, 22, 0.3)',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>
                โหมดสัปดาห์สอบ สจล.
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                พัก มสธ. ชั่วคราว 100%
              </div>
            </div>
            <button
              onClick={() => setIsKmitlExamWeek(!isKmitlExamWeek)}
              style={{
                width: '46px',
                height: '24px',
                borderRadius: '9999px',
                background: isKmitlExamWeek ? '#ea580c' : '#334155',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'white',
                position: 'absolute',
                top: '3px',
                left: isKmitlExamWeek ? '25px' : '3px',
                transition: 'all 0.2s ease'
              }} />
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Notice if Exam Week is Active */}
      {isKmitlExamWeek && (
        <div className="card animate-fade-in" style={{
          background: 'rgba(239, 68, 68, 0.1)',
          borderColor: '#ef4444',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <AlertCircle size={24} color="#ef4444" style={{ flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fca5a5' }}>
              🛡️ KMITL Shield Activated: สัปดาห์นี้งดอ่าน มสธ. ทุกกรณี!
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#fecdd3', marginTop: '0.15rem' }}>
              การเรียนภาษาจีนเพื่ออุตสาหกรรมที่ลาดกระบังต้องรักษาเกรดเป็นอันดับ 1 มสธ. สามารถชดเชยได้ในสัปดาห์ถัดไป มุ่งสมาธิ 100% กับการสอบ สจล. ได้เลยครับ
            </p>
          </div>
        </div>
      )}

      {/* 3 Golden Dead-Time Slots */}
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem', color: '#f8fafc' }}>
        3 ช่วงเวลาทองคำประจำวัน (รวมวันละ 50 นาที โดยไม่กินเวลาทำการบ้าน สจล.)
      </h2>
      <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        ทำเครื่องหมายเมื่อเสร็จสิ้นภารกิจในแต่ละวันเพื่อรักษาวินัย (Study Streak)
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        
        {/* Morning Slot: Train / ARL */}
        <div 
          className="card card-interactive"
          onClick={() => toggleSlot('morning')}
          style={{
            padding: '1.25rem 1.5rem',
            borderColor: completedDailySlots.morning ? '#10b981' : undefined,
            background: completedDailySlots.morning ? 'rgba(16, 185, 129, 0.05)' : undefined,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(59, 130, 246, 0.15)',
              color: 'var(--accent-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Train size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-blue">เช้า: ช่วงเดินทางไป สจล. (20-25 นาที)</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>บน Airport Rail Link หรือรถไฟ</span>
              </div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc', marginTop: '0.25rem' }}>
                🎧 ฟังคลิปเสียงสรุป มสธ. Channel 1 ตอน
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                ใส่หูฟัง ฟังบรรยายหน่วยที่กำลังเรียน ไม่ต้องจด ไม่ต้องเครียด แค่ให้คุ้นหู
              </p>
            </div>
          </div>

          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: completedDailySlots.morning ? '#10b981' : '#1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0
          }}>
            <CheckCircle2 size={18} />
          </div>
        </div>

        {/* Lunch Slot */}
        <div 
          className="card card-interactive"
          onClick={() => toggleSlot('lunch')}
          style={{
            padding: '1.25rem 1.5rem',
            borderColor: completedDailySlots.lunch ? '#10b981' : undefined,
            background: completedDailySlots.lunch ? 'rgba(16, 185, 129, 0.05)' : undefined,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.15)',
              color: 'var(--accent-amber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Coffee size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-amber">กลางวัน: พักเบรกคาบจีน สจล. (10-15 นาที)</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>กินข้าวเสร็จเปิดมือถือดูสรุป</span>
              </div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc', marginTop: '0.25rem' }}>
                📖 สแกนจุดตาย 80/20 & Exam Traps ในแอป
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                อ่านเฉพาะกรอบสีแดง "จุดที่คนชอบตอบผิด" และคีย์เวิร์ดสำคัญ
              </p>
            </div>
          </div>

          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: completedDailySlots.lunch ? '#10b981' : '#1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0
          }}>
            <CheckCircle2 size={18} />
          </div>
        </div>

        {/* Evening Slot: Train / ARL Back Home */}
        <div 
          className="card card-interactive"
          onClick={() => toggleSlot('evening')}
          style={{
            padding: '1.25rem 1.5rem',
            borderColor: completedDailySlots.evening ? '#10b981' : undefined,
            background: completedDailySlots.evening ? 'rgba(16, 185, 129, 0.05)' : undefined,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.15)',
              color: 'var(--accent-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-green">เย็น: ขากลับจากลาดกระบัง (15-20 นาที)</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Recall</span>
              </div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc', marginTop: '0.25rem' }}>
                🎯 กดทำแบบทดสอบจำลอง 5-10 ข้อ
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                ทดสอบสมองทันที ให้ข้อสอบช่วยประทับความจำลงในสมองระยะยาว
              </p>
            </div>
          </div>

          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: completedDailySlots.evening ? '#10b981' : '#1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0
          }}>
            <CheckCircle2 size={18} />
          </div>
        </div>

      </div>

      {/* Comparison: Traditional vs FastTrack */}
      <div className="card" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', color: '#f8fafc' }}>
          เปรียบเทียบ: วิธีทั่วไป vs วิธีระบบ FastTrack
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '1.15rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fca5a5' }}>
              ❌ วิธีเดิม (เสี่ยงเกรด สจล. ตก)
            </span>
            <ul style={{ fontSize: '0.785rem', color: '#fecdd3', marginTop: '0.5rem', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>เปิดอ่านหนังสือทีละหน้า 1,000 หน้า</li>
              <li>อ่านได้ 2 หน่วยแล้วถอดใจเพราะเหนื่อยจากคลาสจีน</li>
              <li>ไฟลนก้นก่อนสอบ 3 วันแล้วอ่านไม่ทัน</li>
              <li>เบียดเบียนเวลาทำการบ้าน/อ่านสอบ สจล.</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '1.15rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6ee7b7' }}>
              ✅ วิธีระบบนี้ (ชิลล์ทั้งคู่ ได้ปริญญา 2 ใบ)
            </span>
            <ul style={{ fontSize: '0.785rem', color: '#a7f3d0', marginTop: '0.5rem', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>อ่านเฉพาะกรอบ 80/20 วัตถุประสงค์เชิงพฤติกรรม</li>
              <li>ใช้เศษเวลาบนรถไฟ วันละ 40-50 นาที</li>
              <li>เสาร์-อาทิตย์มีเวลาเต็มที่ให้การบ้านภาษาจีนและพักผ่อน</li>
              <li>จบ 15 หน่วยก่อนสอบ 2 สัปดาห์สบายๆ</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
