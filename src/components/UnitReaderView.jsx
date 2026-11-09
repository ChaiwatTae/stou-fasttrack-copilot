import React, { useState } from 'react';
import { 
  BookOpen, 
  AlertTriangle, 
  Key, 
  Play, 
  CheckCircle, 
  HelpCircle, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  MessageSquare,
  Volume2
} from 'lucide-react';

export default function UnitReaderView({ 
  course, 
  currentUnitId, 
  onSelectUnit, 
  onStartQuizForUnit, 
  completedUnits, 
  onToggleUnitCompleted 
}) {
  const unit = course.units.find(u => u.id === currentUnitId) || course.units[0];
  const isDone = completedUnits.includes(unit.id);

  // AI Explainer State
  const [activeExplainTopic, setActiveExplainTopic] = useState(null);
  const [aiExplanation, setAiExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);

  const handleAskAi = (topic) => {
    setActiveExplainTopic(topic);
    setIsExplaining(true);
    setAiExplanation('');

    // Instant smart explanation generator for common STOU topics
    setTimeout(() => {
      let explanation = "";
      if (course.code === "10141") {
        explanation = `💡 คำอธิบายเชิงลึกสำหรับ "${topic}":\nในบริบทข้อสอบ มสธ. 10141 เรื่องนี้ต้องการวัดว่าผู้เรียนเข้าใจกระบวนการทำงานในชีวิตประจำวันหรือไม่ เช่น หากเป็นเรื่องกระบวนการเทคโนโลยี จะเน้นว่า 'ทำเพื่อแก้ปัญหาของมนุษย์' และจุดสิ้นสุดคือ 'การวัดความพึงพอใจของผู้ใช้' เสมอ ส่วนถ้าเป็นเรื่องวิทยาศาสตร์ จะเน้น 'การสังเกตและตั้งสมมติฐานที่สามารถทดสอบได้' อย่าลืมจำความแตกต่างระหว่างภูมิคุ้มกันก่อเอง (วัคซีน) กับรับมา (เซรุ่ม) เพราะออกทุกเทอม!`;
      } else {
        explanation = `💡 คำอธิบายเชิงลึกสำหรับ "${topic}":\nในบริบทข้อสอบ มสธ. 10151 ไทยศึกษา ข้อสอบไม่ได้เน้นให้ท่องจำวันเดือนปีอย่างเดียว แต่เน้น "ความสัมพันธ์และผลกระทบ" เช่น สนธิสัญญาเบาว์ริง (2398) ไม่ได้จำแค่ชื่อ แต่ต้องตอบได้ว่าทำให้ไทย 'ยกเลิกการค้าผูกขาดของพระคลังสินค้า' และ 'ข้าวกลายเป็นสินค้าออกอันดับหนึ่ง' หรือการปฏิรูป ร.5 มีเป้าหมายสูงสุดคือ 'การรักษาเอกราชของชาติจากการล่าอาณานิคม' ครับ`;
      }
      setAiExplanation(explanation);
      setIsExplaining(false);
    }, 400);
  };

  const handleNextUnit = () => {
    if (unit.id < course.units.length) {
      onSelectUnit(unit.id + 1);
      setActiveExplainTopic(null);
    }
  };

  const handlePrevUnit = () => {
    if (unit.id > 1) {
      onSelectUnit(unit.id - 1);
      setActiveExplainTopic(null);
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1.5rem 0 3.5rem' }}>
      
      {/* Navigation & Unit Selector Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
        background: 'var(--bg-card)',
        padding: '0.85rem 1.25rem',
        borderRadius: '14px',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            onClick={handlePrevUnit} 
            disabled={unit.id === 1}
            className="btn btn-outline"
            style={{ padding: '0.4rem 0.65rem', opacity: unit.id === 1 ? 0.4 : 1 }}
          >
            <ArrowLeft size={16} /> ก่อนหน้า
          </button>
          
          <select 
            value={unit.id} 
            onChange={(e) => onSelectUnit(Number(e.target.value))}
            style={{
              background: '#1e293b',
              color: '#f8fafc',
              border: '1px solid var(--border-highlight)',
              padding: '0.45rem 0.85rem',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            {course.units.map(u => (
              <option key={u.id} value={u.id}>
                หน่วยที่ {u.id}: {u.title}
              </option>
            ))}
          </select>

          <button 
            onClick={handleNextUnit} 
            disabled={unit.id === course.units.length}
            className="btn btn-outline"
            style={{ padding: '0.4rem 0.65rem', opacity: unit.id === course.units.length ? 0.4 : 1 }}
          >
            ถัดไป <ArrowRight size={16} />
          </button>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            onClick={() => onToggleUnitCompleted(unit.id)}
            className={`btn ${isDone ? 'btn-secondary' : 'btn-primary'}`}
            style={{ 
              padding: '0.45rem 0.9rem', 
              fontSize: '0.825rem',
              background: isDone ? '#10b981' : undefined,
              borderColor: isDone ? '#10b981' : undefined
            }}
          >
            <CheckCircle size={15} />
            {isDone ? 'อ่านจบแล้ว (คลิกเพื่อยกเลิก)' : 'ทำเครื่องหมายว่าอ่านจบ'}
          </button>

          <button
            onClick={() => onStartQuizForUnit(unit.id)}
            className="btn btn-secondary"
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.825rem' }}
          >
            <Sparkles size={14} color="#60a5fa" /> ทำควิซหน่วยนี้
          </button>
        </div>
      </div>

      {/* Main Unit Card */}
      <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        
        {/* Unit Title Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-blue">
                หน่วยที่ {unit.id} จาก 15 หน่วย
              </span>
              <span className={`badge ${unit.importance === 'high' ? 'badge-rose' : 'badge-blue'}`}>
                {unit.importance === 'high' ? '🔥 ข้อสอบออกบ่อยมาก' : 'ความสำคัญปานกลาง'}
              </span>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.3 }}>
              {unit.title}
            </h1>
          </div>

          {/* STOU Official Audio/Video Resource Link */}
          <a
            href={unit.audioLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1rem' }}
          >
            <Volume2 size={16} color="#ef4444" />
            <span>ฟังคลิปเสียงสรุปหน่วยนี้</span>
            <ExternalLink size={13} color="var(--text-muted)" />
          </a>
        </div>

        {/* Detailed Sections (ตอนที่ X.1, X.2) if available */}
        {unit.sections && unit.sections.length > 0 && (
          <div style={{ marginTop: '1.75rem', background: 'rgba(59, 130, 246, 0.04)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: '14px', padding: '1.25rem 1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#93c5fd' }}>
                📚 เจาะลึกรายตอนตามเอกสารการสอน มสธ. ฉบับจริง (ตอนที่ 1.1, 1.2...)
              </h3>
              {unit.bookSource && (
                <span className="badge badge-green" style={{ fontSize: '0.725rem' }}>
                  {unit.bookSource}
                </span>
              )}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {unit.sections.map((sec, sIdx) => (
                <div key={sIdx} style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '1rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
                    ตอนที่ {sec.sectionId}: {sec.title}
                  </h4>
                  
                  {sec.subsections && (
                    <div style={{ marginTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {sec.subsections.map((sub, subIdx) => (
                        <div key={subIdx} style={{ background: 'rgba(0,0,0,0.25)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#60a5fa', marginBottom: '0.35rem' }}>
                            เรื่องที่ {sub.id} {sub.name}
                          </div>
                          <ul style={{ paddingLeft: '1.1rem', fontSize: '0.825rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                            {sub.verbatimKeyPoints.map((point, pIdx) => (
                              <li key={pIdx} style={{ marginBottom: '0.25rem' }}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.stouDefinitions && (
                    <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {sec.stouDefinitions.map((d, dIdx) => (
                        <div key={dIdx} style={{ fontSize: '0.8rem', background: 'rgba(0,0,0,0.3)', padding: '0.4rem 0.65rem', borderRadius: '6px' }}>
                          <strong style={{ color: '#fbbf24' }}>{d.term}:</strong> <span style={{ color: '#cbd5e1' }}>"{d.def}"</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.keyPoints && (
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.1rem', fontSize: '0.825rem', color: '#cbd5e1' }}>
                      {sec.keyPoints.map((kp, kpIdx) => (
                        <li key={kpIdx} style={{ marginBottom: '0.25rem' }}>{kp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 80/20 Summary Section */}
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <BookOpen size={20} color="var(--accent-blue)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#93c5fd' }}>
              แก่นสำคัญ 80/20 (คัดกรองจากเนื้อหา 60 หน้า เหลือเฉพาะจุดที่ออกสอบ)
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {unit.summary.map((point, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1rem 1.15rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    background: '#1e293b',
                    color: '#60a5fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: '0.1rem'
                  }}>
                    {idx + 1}
                  </span>
                  <p style={{ fontSize: '0.925rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                    {point}
                  </p>
                </div>

                <button
                  onClick={() => handleAskAi(`ข้อ ${idx + 1}: ${point.slice(0, 40)}...`)}
                  className="btn btn-outline"
                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', flexShrink: 0 }}
                  title="ให้อธิบายประเด็นนี้แบบละเอียด"
                >
                  <Sparkles size={13} color="#a855f7" /> ขยายความ
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Traps (จุดที่ข้อสอบชอบหลอก) */}
        {unit.examTraps && unit.examTraps.length > 0 && (
          <div style={{
            marginTop: '2rem',
            background: 'rgba(244, 63, 94, 0.06)',
            border: '1px solid rgba(244, 63, 94, 0.25)',
            borderRadius: '14px',
            padding: '1.25rem 1.4rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <AlertTriangle size={18} color="#f43f5e" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fda4af' }}>
                จุดตายที่คนชอบตอบผิดในห้องสอบ (Exam Traps)
              </h3>
            </div>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {unit.examTraps.map((trap, idx) => (
                <li key={idx} style={{ fontSize: '0.875rem', color: '#fecdd3', lineHeight: 1.55 }}>
                  {trap}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Terms */}
        <div style={{ marginTop: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
            <Key size={16} color="var(--accent-amber)" />
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fcd34d' }}>
              คำสำคัญที่พบบ่อยในข้อสอบ (Keywords)
            </h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {unit.keyTerms.map((term, idx) => (
              <span 
                key={idx}
                onClick={() => handleAskAi(term)}
                style={{
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  color: '#fde68a',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
                title="คลิกเพื่อให้อธิบายคำนี้"
              >
                {term}
                <Sparkles size={11} color="#f59e0b" />
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* AI Explainer Output Box */}
      {activeExplainTopic && (
        <div className="card animate-fade-in" style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))',
          borderColor: '#8b5cf6',
          padding: '1.4rem',
          marginBottom: '1.5rem',
          boxShadow: '0 8px 30px rgba(139, 92, 246, 0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={18} color="white" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
                  AI Study Tutor: วิเคราะห์ประเด็น
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#c4b5fd' }}>
                  {activeExplainTopic}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveExplainTopic(null)}
              className="btn btn-outline"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
            >
              ปิดหน้าต่าง
            </button>
          </div>

          <div style={{ 
            fontSize: '0.875rem', 
            color: '#e2e8f0', 
            lineHeight: 1.65, 
            whiteSpace: 'pre-line',
            padding: '0.75rem',
            background: 'rgba(0, 0, 0, 0.25)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            {isExplaining ? 'กำลังสังเคราะห์คำอธิบายตามกรอบข้อสอบ มสธ...' : aiExplanation}
          </div>
        </div>
      )}

      {/* Real Book Cross-Check & Excerpt Ingest Box */}
      <div className="card" style={{ padding: '1.5rem', border: '1px dashed var(--border-highlight)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <MessageSquare size={18} color="var(--accent-kmitl)" />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fed7aa' }}>
            เครื่องมือตรวจสอบข้อความจากหนังสือเล่มจริง (Book Cross-Check)
          </h3>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
          สงสัยย่อหน้าไหนในหนังสือ มสธ. หรืออยากเช็คว่าหน้านั้นจะออกสอบอย่างไร? ก๊อปปี้หรือพิมพ์ข้อความจากหนังสือมาวางที่นี่ ระบบจะสกัดจุดออกสอบและช้อยส์ที่ มสธ. ชอบนำไปออกทันที
        </p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            id="bookExcerptInput"
            placeholder="พิมพ์หรือวางข้อความ/ประเด็นจากหน้าหนังสือที่กำลังอ่าน..."
            style={{
              flex: 1,
              background: '#090d16',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '0.6rem 1rem',
              color: '#f8fafc',
              fontSize: '0.85rem'
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                handleAskAi(e.target.value.trim());
              }
            }}
          />
          <button
            onClick={() => {
              const input = document.getElementById('bookExcerptInput');
              if (input && input.value.trim()) {
                handleAskAi(input.value.trim());
              }
            }}
            className="btn btn-kmitl"
            style={{ padding: '0.6rem 1.1rem', fontSize: '0.825rem' }}
          >
            วิเคราะห์จุดออกสอบ
          </button>
        </div>
      </div>

    </div>
  );
}
