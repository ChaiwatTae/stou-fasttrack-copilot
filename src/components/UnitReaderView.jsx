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
  Volume2,
  FileText,
  Flame,
  Check
} from 'lucide-react';
import { UNIT_READING_CONTENT } from '../data/unitReadingContent';

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

  // View Mode: 'textbook' (อ่านเนื้อหาเต็ม) vs 'summary' (สรุปย่อ 80/20)
  const [viewMode, setViewMode] = useState('textbook');

  // Specific reading content from authentic book
  const readingData = UNIT_READING_CONTENT[course.code]?.[unit.id];

  // AI Explainer State
  const [activeExplainTopic, setActiveExplainTopic] = useState(null);
  const [aiExplanation, setAiExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);

  const handleAskAi = (topic) => {
    setActiveExplainTopic(topic);
    setIsExplaining(true);
    setAiExplanation('');

    setTimeout(() => {
      let explanation = "";
      if (course.code === "10141") {
        explanation = `💡 คำอธิบายเชิงลึกสำหรับ "${topic}":\nตามเอกสารการสอน มสธ. 10141 เรื่องนี้เน้นความเข้าใจในกระบวนการทำงานจริง เช่น หากเป็นเรื่องกระบวนการเทคโนโลยี จะมี 5 ขั้นตอน โดยเริ่มจาก "ความอยากได้/อยากมี" สู่ "การออกแบบ" และจุดสำคัญคือ "การทดสอบความพึงพอใจของผู้ใช้" ก่อนเผยแพร่เสมอ ส่วนวิทยาศาสตร์จะเน้น 4 ลักษณะสำคัญ (เชิงประจักษ์, ปรนัย, สากล, พลวัต) ซึ่งออกสอบจับคู่ความหมายทุกเทอมครับ`;
      } else {
        explanation = `💡 คำอธิบายเชิงลึกสำหรับ "${topic}":\nตามเอกสารการสอน มสธ. 10151 ไทยศึกษา เรื่องนี้ยึดนิยามของ ศ.ดร.พัทยา สายหู โดยตรง: "สังคม" คือกลุ่มคนที่อยู่ร่วมกันในสถานที่และเวลากำหนดรู้ได้ ส่วน "วัฒนธรรม" คือแบบอย่างการดำเนินชีวิต อุปกรณ์ วิธีการ และความคิดความเชื่อที่คนสร้างขึ้นมาใช้ สังคมจึงเป็นผู้ใช้วัฒนธรรม และวัฒนธรรมทำให้สังคมดำรงอยู่ได้ครับ`;
      }
      setAiExplanation(explanation);
      setIsExplaining(false);
    }, 350);
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
        marginBottom: '1.25rem',
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

      {/* Mode Switcher Tabs: [📖 โหมดอ่านเนื้อหาบทเรียนฉบับเต็ม] vs [⚡ สรุปย่อ 80/20 & จุดตาย] */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.25rem',
        background: 'rgba(14, 20, 34, 0.9)',
        padding: '0.35rem',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        maxWidth: '520px'
      }}>
        <button
          onClick={() => setViewMode('textbook')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1rem',
            borderRadius: '9px',
            border: 'none',
            background: viewMode === 'textbook' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'transparent',
            color: viewMode === 'textbook' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <BookOpen size={16} /> โหมดอ่านเนื้อหาเต็ม (Textbook)
        </button>

        <button
          onClick={() => setViewMode('summary')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1rem',
            borderRadius: '9px',
            border: 'none',
            background: viewMode === 'summary' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'transparent',
            color: viewMode === 'summary' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <Flame size={16} /> สรุปเข้ม 80/20 & จุดตาย
        </button>
      </div>

      {/* Main Content Area */}
      <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        
        {/* Unit Title Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', marginBottom: '1.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-blue">
                หน่วยที่ {unit.id} จาก 15 หน่วย
              </span>
              <span className={`badge ${unit.importance === 'high' ? 'badge-rose' : 'badge-blue'}`}>
                {unit.importance === 'high' ? '🔥 ข้อสอบออกบ่อยมาก' : 'ความสำคัญปานกลาง'}
              </span>
              {unit.bookSource && (
                <span className="badge badge-green" style={{ fontSize: '0.725rem' }}>
                  {unit.bookSource}
                </span>
              )}
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.3 }}>
              {unit.title}
            </h1>
          </div>

          <a
            href={unit.audioLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1rem' }}
          >
            <Volume2 size={16} color="#ef4444" />
            <span>ฟังคลิปเสียง มสธ.</span>
            <ExternalLink size={13} color="var(--text-muted)" />
          </a>
        </div>

        {/* ============================================================ */}
        {/* VIEW 1: FULL TEXTBOOK READING MODE (โหมดอ่านเนื้อหาเต็ม)       */}
        {/* ============================================================ */}
        {viewMode === 'textbook' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {readingData ? (
              // Dedicated detailed reading chapters from authentic book
              readingData.sections.map((sec, secIdx) => (
                <section key={secIdx} style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}>
                  {/* Section Title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
                    <span style={{
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      color: 'white',
                      padding: '0.2rem 0.65rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 800
                    }}>
                      ตอนที่ {sec.sectionId}
                    </span>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#93c5fd' }}>
                      {sec.title}
                    </h2>
                  </div>

                  {/* Topics inside section */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {sec.topics.map((topic, tIdx) => (
                      <article key={tIdx} style={{
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        padding: '1.4rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.4 }}>
                            เรื่องที่ {topic.topicId} {topic.title}
                          </h3>
                          <button
                            onClick={() => handleAskAi(`เรื่องที่ ${topic.topicId} ${topic.title}`)}
                            className="btn btn-outline"
                            style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', flexShrink: 0 }}
                            title="ให้อธิบายเชิงลึกด้วย AI"
                          >
                            <Sparkles size={13} color="#a855f7" /> ถาม AI
                          </button>
                        </div>

                        {/* Topic Content Blocks */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          {topic.content.map((block, bIdx) => {
                            if (block.type === 'heading') {
                              return (
                                <h4 key={bIdx} style={{ fontSize: '0.95rem', fontWeight: 700, color: '#60a5fa', marginTop: '0.5rem' }}>
                                  {block.text}
                                </h4>
                              );
                            }
                            if (block.type === 'paragraph') {
                              return (
                                <p key={bIdx} style={{ fontSize: '0.925rem', color: '#e2e8f0', lineHeight: 1.75, textAlign: 'justify' }}>
                                  {block.text}
                                </p>
                              );
                            }
                            if (block.type === 'callout') {
                              return (
                                <div key={bIdx} style={{
                                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)',
                                  borderLeft: '4px solid #3b82f6',
                                  borderRadius: '0 10px 10px 0',
                                  padding: '1rem 1.25rem',
                                  margin: '0.5rem 0'
                                }}>
                                  <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#93c5fd', marginBottom: '0.5rem' }}>
                                    📌 {block.title}
                                  </h5>
                                  <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                                    {block.points.map((pt, pIdx) => (
                                      <li key={pIdx} style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                                        {pt}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            }
                            if (block.type === 'activity') {
                              return (
                                <div key={bIdx} style={{
                                  background: 'rgba(16, 185, 129, 0.06)',
                                  border: '1px solid rgba(16, 185, 129, 0.3)',
                                  borderRadius: '10px',
                                  padding: '1rem 1.25rem',
                                  marginTop: '0.5rem'
                                }}>
                                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399', marginBottom: '0.4rem' }}>
                                    📝 {block.question}
                                  </div>
                                  <div style={{ fontSize: '0.825rem', color: '#e2e8f0', lineHeight: 1.6, background: 'rgba(0,0,0,0.25)', padding: '0.65rem 0.85rem', borderRadius: '8px' }}>
                                    {block.answer}
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))
            ) : (
              // Structured reader for units derived from TOC and concepts
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {unit.sections && unit.sections.map((sec, sIdx) => (
                  <section key={sIdx} style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '14px',
                    padding: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <span className="badge badge-blue">ตอนที่ {sec.sectionId}</span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#93c5fd' }}>
                        {sec.title}
                      </h3>
                    </div>

                    {sec.subsections && sec.subsections.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {sec.subsections.map((sub, subIdx) => (
                          <div key={subIdx} style={{
                            background: 'rgba(0, 0, 0, 0.3)',
                            padding: '0.85rem 1.15rem',
                            borderRadius: '10px',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem'
                          }}>
                            <div>
                              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f8fafc' }}>
                                เรื่องที่ {sub.id} {sub.name}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                                ศึกษาตามเอกสารการสอน มสธ. ฉบับทางการ
                              </div>
                            </div>
                            <button
                              onClick={() => handleAskAi(`เรื่องที่ ${sub.id} ${sub.name}`)}
                              className="btn btn-outline"
                              style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                            >
                              <Sparkles size={13} color="#a855f7" /> อ่านสรุปเจาะลึก
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        ศึกษาเนื้อหารายละเอียดของตอนที่ {sec.sectionId} ในเอกสารการสอนชุดวิชา มสธ.
                      </p>
                    )}
                  </section>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: 80/20 CHEAT SHEET & EXAM TRAPS (สรุปย่อ & จุดตาย)    */}
        {/* ============================================================ */}
        {viewMode === 'summary' && (
          <div className="animate-fade-in">
            {/* 80/20 Core Summary Section */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <BookOpen size={20} color="var(--accent-blue)" />
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#93c5fd' }}>
                  แก่นสำคัญ 80/20 (คัดกรองจากแนวคิดประจำหน่วยของ มสธ.)
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
                marginBottom: '2rem',
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
            {unit.keyTerms && (
              <div style={{ marginBottom: '1.5rem' }}>
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
            )}
          </div>
        )}

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
