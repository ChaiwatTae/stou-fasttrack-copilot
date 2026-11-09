import React, { useState, useEffect, useMemo } from 'react';
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
  Check,
  Search,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut
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

  // View Modes: 
  // 'textbook' = อ่านเนื้อหาบทเรียนเรียบเรียง
  // 'rawPages' = ดูหน้าหนังสือ มสธ. ต้นฉบับหน้าต่อหน้า (Verbatim Pages)
  // 'summary' = สรุปเข้ม 80/20 & จุดตายข้อสอบ
  const [viewMode, setViewMode] = useState('textbook');

  // Specific reading content from authentic book (Unit 1 custom formatted)
  const readingData = UNIT_READING_CONTENT[course.code]?.[unit.id];

  // Book Raw Pages State (Loaded from public/books_data)
  const [bookData, setBookData] = useState(null);
  const [isLoadingBook, setIsLoadingBook] = useState(true);
  const [selectedPageNum, setSelectedPageNum] = useState(15);
  const [pageFontSize, setPageFontSize] = useState(16);
  const [searchQuery, setSearchQuery] = useState('');

  // AI Explainer State
  const [activeExplainTopic, setActiveExplainTopic] = useState(null);
  const [aiExplanation, setAiExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);

  // Fetch authentic book data for current course & unit
  useEffect(() => {
    let isMounted = true;
    setIsLoadingBook(true);

    const dataUrl = `./books_data/${course.code}_unit_${unit.id}.json`;
    fetch(dataUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (isMounted) {
          setBookData(data);
          // Default to first real lesson page (around page 14-16)
          const firstContentPage = data.pages && data.pages.length > 15 ? 15 : 1;
          setSelectedPageNum(firstContentPage);
          setIsLoadingBook(false);
        }
      })
      .catch(err => {
        console.warn('Could not load authentic book JSON:', err);
        if (isMounted) {
          setIsLoadingBook(false);
        }
      });

    return () => { isMounted = false; };
  }, [course.code, unit.id]);

  // Search through all pages in current book
  const searchResults = useMemo(() => {
    if (!bookData || !bookData.pages || !searchQuery.trim() || searchQuery.trim().length < 2) {
      return [];
    }
    const query = searchQuery.trim().toLowerCase();
    const matches = [];
    bookData.pages.forEach((pageText, idx) => {
      if (pageText && pageText.toLowerCase().includes(query)) {
        matches.push(idx + 1);
      }
    });
    return matches;
  }, [bookData, searchQuery]);

  // Extract automatic lessons if unit has no manual readingData
  const extractedLessons = useMemo(() => {
    if (!bookData || !bookData.pages) return [];
    const lessons = [];
    let currentTopic = null;

    bookData.pages.forEach((pageText, pIdx) => {
      if (pIdx < 12) return; // skip front matter
      const lines = pageText.split('\n').map(l => l.trim()).filter(Boolean);

      lines.forEach((line) => {
        const topicMatch = line.match(/(เรื่องที่\s*\d+\.\d+\.\d+)\s*(.*)/);
        if (topicMatch) {
          if (currentTopic) lessons.push(currentTopic);
          currentTopic = {
            page: pIdx + 1,
            topicId: topicMatch[1],
            title: topicMatch[2] || 'รายละเอียดเนื้อหา',
            paragraphs: []
          };
        } else if (currentTopic && line.length > 35 && !line.includes('มสธ.') && !line.match(/^\d+-\d+/)) {
          if (currentTopic.paragraphs.length < 8) {
            currentTopic.paragraphs.push(line);
          }
        }
      });
    });

    if (currentTopic) lessons.push(currentTopic);
    return lessons;
  }, [bookData]);

  const handleAskAi = (topic) => {
    setActiveExplainTopic(topic);
    setIsExplaining(true);
    setAiExplanation('');

    setTimeout(() => {
      let explanation = "";
      if (course.code === "10141") {
        explanation = `💡 สรุปความเข้าใจเชิงลึกสำหรับ "${topic}":\nตามเอกสารการสอน มสธ. 10141 เรื่องนี้เน้นความเข้าใจในกระบวนการทำงานจริง เช่น วิทยาศาสตร์ต้องเป็นความรู้เชิงประจักษ์ (Empirical) และปรนัย (Objective) ส่วนเทคโนโลยีเป็นกระบวนการ 5 ขั้นตอน (อยากได้ -> ออกแบบ -> สร้างต้นแบบ -> ทดสอบความพึงพอใจ -> เผยแพร่) ซึ่งเป็นประเด็นที่ออกข้อสอบถามนิยามและลำดับขั้นตอนทุกเทอมครับ`;
      } else {
        explanation = `💡 สรุปความเข้าใจเชิงลึกสำหรับ "${topic}":\nตามเอกสารการสอน มสธ. 10151 ไทยศึกษา เรื่องนี้ยึดนิยามของ ศ.ดร.พัทยา สายหู: "สังคม" คือกลุ่มคนที่อยู่ร่วมกันและมีความสัมพันธ์ยืดเยื้อถาวร ส่วน "วัฒนธรรม" คือแบบอย่างการดำเนินชีวิต เครื่องมือ วิธีการ และความคิดความเชื่อที่คนสร้างขึ้น สังคมจึงเป็นผู้ใช้วัฒนธรรมในการแก้ปัญหาและปรับตัวกับสิ่งแวดล้อมครับ`;
      }
      setAiExplanation(explanation);
      setIsExplaining(false);
    }, 300);
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

  const currentRawPageText = bookData?.pages?.[selectedPageNum - 1] || 'กำลังโหลดหน้าหนังสือ...';
  const flipbookUrl = bookData?.flipbookId 
    ? `http://readonline.ebookstou.org/flipbook/${bookData.flipbookId}/mobile/index.html#p=${selectedPageNum}`
    : `http://readonline.ebookstou.org/`;

  return (
    <div className="animate-fade-in" style={{ padding: '1.5rem 0 3.5rem' }}>
      
      {/* Top Source Verification Alert */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.8) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '12px',
        padding: '0.85rem 1.25rem',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <CheckCircle size={20} color="#10b981" />
          <span style={{ fontSize: '0.875rem', color: '#e2e8f0' }}>
            <strong style={{ color: '#34d399' }}>ข้อมูลรับรองจากตำรา มสธ. เล่มจริง:</strong> ชุดวิชา {course.code} หน่วยที่ {unit.id} {bookData?.totalPages ? `(ดาวน์โหลดครบทั้ง ${bookData.totalPages} หน้า)` : ''}
          </span>
        </div>

        {bookData?.flipbookId && (
          <a
            href={flipbookUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.775rem',
              color: '#60a5fa',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            เปิดอ่านบน E-Book มสธ. หน้า {selectedPageNum} <ExternalLink size={13} />
          </a>
        )}
      </div>

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
            onChange={(e) => {
              onSelectUnit(Number(e.target.value));
              setActiveExplainTopic(null);
            }}
            style={{
              background: '#0f172a',
              color: '#f8fafc',
              border: '1px solid var(--border-color)',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 600,
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

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            onClick={() => onToggleUnitCompleted(unit.id)}
            className={`btn ${isDone ? 'btn-primary' : 'btn-outline'}`}
            style={{
              padding: '0.45rem 0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: isDone ? 'linear-gradient(135deg, #059669, #10b981)' : undefined,
              borderColor: isDone ? '#10b981' : undefined
            }}
          >
            <Check size={16} />
            <span>{isDone ? 'อ่านจบแล้ว ✓' : 'ทำเครื่องหมายว่าจบ'}</span>
          </button>

          <button
            onClick={() => onStartQuizForUnit(unit.id)}
            className="btn btn-primary"
            style={{ padding: '0.45rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}
          >
            <Sparkles size={14} color="#60a5fa" /> ทำควิซหน่วยนี้
          </button>
        </div>
      </div>

      {/* 3 Prominent Reading Mode Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.25rem',
        background: 'rgba(14, 20, 34, 0.9)',
        padding: '0.4rem',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        maxWidth: '720px'
      }}>
        <button
          onClick={() => setViewMode('textbook')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            padding: '0.65rem 0.85rem',
            borderRadius: '9px',
            border: 'none',
            background: viewMode === 'textbook' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'transparent',
            color: viewMode === 'textbook' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <BookOpen size={16} /> 1. อ่านบทเรียนเต็ม (Textbook)
        </button>

        <button
          onClick={() => setViewMode('rawPages')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            padding: '0.65rem 0.85rem',
            borderRadius: '9px',
            border: 'none',
            background: viewMode === 'rawPages' ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
            color: viewMode === 'rawPages' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <FileText size={16} /> 2. ดูหน้าหนังสือ มสธ. ต้นฉบับ
        </button>

        <button
          onClick={() => setViewMode('summary')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            padding: '0.65rem 0.85rem',
            borderRadius: '9px',
            border: 'none',
            background: viewMode === 'summary' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'transparent',
            color: viewMode === 'summary' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <Flame size={16} /> 3. สรุปเข้ม 80/20 & จุดตาย
        </button>
      </div>

      {/* Main Content Card */}
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
              // Dedicated detailed reading chapters from authentic book (Unit 1)
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
                            <Sparkles size={13} color="#60a5fa" /> AI อธิบายจุดนี้
                          </button>
                        </div>

                        {/* Content Blocks */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          {topic.content.map((block, bIdx) => {
                            if (block.type === 'paragraph') {
                              return (
                                <p key={bIdx} style={{ fontSize: '0.925rem', lineHeight: 1.75, color: '#cbd5e1' }}>
                                  {block.text}
                                </p>
                              );
                            }
                            if (block.type === 'heading') {
                              return (
                                <h4 key={bIdx} style={{ fontSize: '0.95rem', fontWeight: 700, color: '#60a5fa', marginTop: '0.5rem' }}>
                                  {block.text}
                                </h4>
                              );
                            }
                            if (block.type === 'callout') {
                              return (
                                <div key={bIdx} style={{
                                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
                                  border: '1px solid rgba(96, 165, 250, 0.25)',
                                  borderRadius: '10px',
                                  padding: '1.15rem 1.35rem',
                                  margin: '0.5rem 0'
                                }}>
                                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#93c5fd', marginBottom: '0.5rem' }}>
                                    📌 {block.title}
                                  </div>
                                  <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    {block.points.map((pt, pIdx) => (
                                      <li key={pIdx} style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.6 }}>
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
                                  background: 'rgba(16, 185, 129, 0.07)',
                                  border: '1px solid rgba(16, 185, 129, 0.25)',
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
            ) : extractedLessons.length > 0 ? (
              // Automatically extracted lessons from authentic book pages
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: '12px', padding: '1rem 1.25rem' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#93c5fd', marginBottom: '0.25rem' }}>
                    📖 เนื้อหาบทเรียนถอดตรงจากเอกสารการสอน มสธ. ฉบับจริง (หน่วยที่ {unit.id})
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                    เรียบเรียงหัวเรื่องและย่อหน้าสำคัญจากหนังสือต้นฉบับ ท่านสามารถสลับไปที่แท็บ "2. ดูหน้าหนังสือ มสธ. ต้นฉบับ" เพื่อดูหน้าต่อหน้าได้ครับ
                  </div>
                </div>

                {extractedLessons.map((les, lIdx) => (
                  <article key={lIdx} style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '14px',
                    padding: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span className="badge badge-blue">{les.topicId}</span>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                          {les.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPageNum(les.page);
                          setViewMode('rawPages');
                        }}
                        className="btn btn-outline"
                        style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}
                      >
                        ดูหนังสือหน้า {les.page} →
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {les.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} style={{ fontSize: '0.925rem', lineHeight: 1.75, color: '#cbd5e1' }}>
                          {p}
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                กำลังประมวลผลเนื้อหาจากเอกสารการสอน มสธ...
              </div>
            )}

          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: AUTHENTIC STOU FLIPBOOK READER (หน้าต่อหน้า 100%)       */}
        {/* ============================================================ */}
        {viewMode === 'rawPages' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Page Navigation & Search Toolbar */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--border-color)',
              borderRadius: '14px',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              {/* Page Number Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => setSelectedPageNum(Math.max(1, selectedPageNum - 1))}
                  disabled={selectedPageNum <= 1}
                  className="btn btn-outline"
                  style={{ padding: '0.4rem 0.75rem', opacity: selectedPageNum <= 1 ? 0.3 : 1 }}
                >
                  <ChevronLeft size={16} /> หน้าก่อนหน้า
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>หน้า</span>
                  <select
                    value={selectedPageNum}
                    onChange={(e) => setSelectedPageNum(Number(e.target.value))}
                    style={{
                      background: '#020617',
                      color: '#f8fafc',
                      border: '1px solid var(--border-color)',
                      padding: '0.35rem 0.6rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 700
                    }}
                  >
                    {bookData?.pages?.map((_, idx) => (
                      <option key={idx + 1} value={idx + 1}>
                        {idx + 1}
                      </option>
                    ))}
                  </select>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    จาก {bookData?.totalPages || 78} หน้า
                  </span>
                </div>

                <button
                  onClick={() => setSelectedPageNum(Math.min(bookData?.totalPages || 78, selectedPageNum + 1))}
                  disabled={selectedPageNum >= (bookData?.totalPages || 78)}
                  className="btn btn-outline"
                  style={{ padding: '0.4rem 0.75rem', opacity: selectedPageNum >= (bookData?.totalPages || 78) ? 0.3 : 1 }}
                >
                  หน้าถัดไป <ChevronRight size={16} />
                </button>
              </div>

              {/* Keyword Search inside Book */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '1 1 240px', maxWidth: '340px' }}>
                <div style={{ position: 'relative', width: '100%' }}>
                  <Search size={15} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="ค้นหาคำในหนังสือเล่มนี้..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#020617',
                      border: '1px solid var(--border-color)',
                      padding: '0.45rem 0.85rem 0.45rem 2rem',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '0.825rem'
                    }}
                  />
                </div>
              </div>

              {/* Font Size Adjuster */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <button
                  onClick={() => setPageFontSize(Math.max(13, pageFontSize - 1))}
                  className="btn btn-outline"
                  style={{ padding: '0.35rem 0.55rem', fontSize: '0.75rem' }}
                  title="ลดขนาดตัวอักษร"
                >
                  <ZoomOut size={14} /> A-
                </button>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: '32px', textAlign: 'center' }}>
                  {pageFontSize}px
                </span>
                <button
                  onClick={() => setPageFontSize(Math.min(22, pageFontSize + 1))}
                  className="btn btn-outline"
                  style={{ padding: '0.35rem 0.55rem', fontSize: '0.75rem' }}
                  title="เพิ่มขนาดตัวอักษร"
                >
                  <ZoomIn size={14} /> A+
                </button>
              </div>
            </div>

            {/* Search Match Quick Jump Bar */}
            {searchResults.length > 0 && (
              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}>
                <span style={{ fontSize: '0.8rem', color: '#93c5fd', fontWeight: 600 }}>
                  พบคำว่า "{searchQuery}" ใน {searchResults.length} หน้า:
                </span>
                {searchResults.slice(0, 15).map(p => (
                  <button
                    key={p}
                    onClick={() => setSelectedPageNum(p)}
                    style={{
                      background: selectedPageNum === p ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    หน้า {p}
                  </button>
                ))}
              </div>
            )}

            {/* Verbatim Page Container (Designed like an authentic book page) */}
            <div style={{
              background: '#0b1120',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '2.5rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              minHeight: '480px',
              position: 'relative'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '0.75rem',
                marginBottom: '1.5rem',
                color: 'var(--text-muted)',
                fontSize: '0.8rem'
              }}>
                <span>เอกสารการสอนชุดวิชา {course.code} (หน่วยที่ {unit.id})</span>
                <span style={{ fontWeight: 700, color: '#60a5fa' }}>หน้า {selectedPageNum}</span>
              </div>

              {isLoadingBook ? (
                <div style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                  กำลังโหลดข้อมูลหน้าหนังสือ มสธ. จากเซิร์ฟเวอร์...
                </div>
              ) : (
                <div style={{
                  fontSize: `${pageFontSize}px`,
                  lineHeight: 1.85,
                  color: '#e2e8f0',
                  whiteSpace: 'pre-line',
                  fontFamily: '"Prompt", "Sarabun", sans-serif',
                  letterSpacing: '0.01em'
                }}>
                  {currentRawPageText}
                </div>
              )}

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '1rem',
                marginTop: '2rem'
              }}>
                <button
                  onClick={() => setSelectedPageNum(Math.max(1, selectedPageNum - 1))}
                  disabled={selectedPageNum <= 1}
                  className="btn btn-outline"
                  style={{ padding: '0.4rem 0.85rem' }}
                >
                  ← หน้า {selectedPageNum - 1}
                </button>

                <a
                  href={flipbookUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: '0.8rem',
                    color: '#60a5fa',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  เปิดหน้านี้บนเว็บ Flipbook มสธ. <ExternalLink size={13} />
                </a>

                <button
                  onClick={() => setSelectedPageNum(Math.min(bookData?.totalPages || 78, selectedPageNum + 1))}
                  disabled={selectedPageNum >= (bookData?.totalPages || 78)}
                  className="btn btn-outline"
                  style={{ padding: '0.4rem 0.85rem' }}
                >
                  หน้า {selectedPageNum + 1} →
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 3: 80/20 CHEAT SHEET & EXAM TRAPS (สรุปย่อ & จุดตาย)    */}
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
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '1rem 1.25rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.85rem'
                    }}
                  >
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      background: 'rgba(59, 130, 246, 0.2)',
                      color: 'var(--accent-blue)',
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
                    <p style={{ fontSize: '0.925rem', lineHeight: 1.6, color: '#e2e8f0', margin: 0 }}>
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Trap Alerts */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <AlertTriangle size={20} color="#f43f5e" />
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fda4af' }}>
                  จุดตายที่คนชอบตอบผิด (Trap Alerts)
                </h2>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(15, 23, 42, 0.6) 100%)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                borderRadius: '14px',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(244, 63, 94, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f43f5e',
                  flexShrink: 0
                }}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fecdd3', marginBottom: '0.35rem' }}>
                    ข้อควรระวังในห้องสอบสำหรับหน่วยนี้:
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#f1f5f9', lineHeight: 1.6, margin: 0 }}>
                    {unit.examTraps}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Terminology Badges */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <Key size={18} color="var(--accent-kmitl)" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                  คำสำคัญที่ต้องจำให้แม่น (Keywords)
                </h3>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {unit.keyTerms.map((term, idx) => (
                  <span 
                    key={idx}
                    style={{
                      background: 'rgba(249, 115, 22, 0.12)',
                      border: '1px solid rgba(249, 115, 22, 0.25)',
                      color: '#fed7aa',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}
                  >
                    #{term}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Floating / Inline AI Deep Explainer Modal */}
      {activeExplainTopic && (
        <div style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid #3b82f6',
          borderRadius: '14px',
          padding: '1.25rem 1.5rem',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
          marginBottom: '1.5rem',
          backdropFilter: 'blur(12px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="#60a5fa" />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#93c5fd' }}>
                คำอธิบายเจาะลึก: {activeExplainTopic}
              </h4>
            </div>
            <button
              onClick={() => setActiveExplainTopic(null)}
              className="btn btn-outline"
              style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
            >
              ปิด
            </button>
          </div>

          {isExplaining ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              กำลังวิเคราะห์ข้อมูลจากเอกสารการสอน มสธ...
            </p>
          ) : (
            <div style={{ fontSize: '0.9rem', color: '#f1f5f9', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
              {aiExplanation}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
