import React from 'react';
import { 
  DollarSign, 
  X, 
  Rocket, 
  Users, 
  Layers, 
  CheckCircle, 
  Megaphone, 
  CreditCard,
  ShieldCheck,
  TrendingUp,
  Award
} from 'lucide-react';

export default function CommercialModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1.25rem'
    }} onClick={onClose}>
      
      <div 
        className="card animate-fade-in" 
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#0e1422',
          borderColor: '#3b82f6',
          padding: '2rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(59, 130, 246, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #3b82f6, #10b981)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <Rocket size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
                  พิมพ์เขียวการทำขาย (STOU EdTech SaaS Commercial Plan)
                </h2>
                <span className="badge badge-green">Business Blueprint</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                กลยุทธ์แปลงระบบนี้เป็นธุรกิจการศึกษาทำเงินจริงสำหรับนักศึกษา มสธ. และสัมฤทธิบัตร
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="btn btn-outline"
            style={{ padding: '0.4rem', borderRadius: '50%', width: '36px', height: '36px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* 1. Market Opportunity */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Users size={18} color="var(--accent-blue)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#93c5fd' }}>
              1. โอกาสทางการตลาดและกลุ่มลูกค้าเป้าหมาย (Market Validation)
            </h3>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6
          }}>
            <p>
              • <strong>ขนาดตลาด:</strong> นักศึกษา มสธ. และผู้เรียนโครงการสัมฤทธิบัตรมีมากกว่า <strong>100,000+ คนทั่วประเทศ</strong><br/>
              • <strong>Pain Point รุนแรง (High Willingness to Pay):</strong> นักศึกษาส่วนใหญ่เป็นคนทำงานประจำ หรือเด็กเรียนควบ (สจล., จุฬาฯ, มธ., มก.) ที่ไม่มีเวลาอ่านหนังสือ 1,000 หน้า ยินดีจ่ายเงินเพื่อแลกกับการประหยัดเวลาและสอบผ่านรอบเดียว<br/>
              • <strong>คู่แข่ง:</strong> ปัจจุบันมีแต่ชีทสรุปกระดาษ/PDF ถ่ายเอกสารขายเล่มละ 80-150 บาท ซึ่งอ่านยากและไม่มีระบบ Interactive Quiz หรือ AI ตอบข้อสงสัย
            </p>
          </div>
        </div>

        {/* 2. Pricing & Packaging Structure */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <CreditCard size={18} color="#10b981" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#6ee7b7' }}>
              2. โมเดลราคาและการสร้างรายได้ (Monetization Strategy)
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            
            {/* Free Tier */}
            <div style={{ background: '#111827', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.15rem' }}>
              <span className="badge badge-blue">Freemium</span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.5rem' }}>ทดลองเรียนฟรี</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', margin: '0.25rem 0' }}>฿0</p>
              <ul style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <li>เข้าถึงหน่วยที่ 1 - 3</li>
                <li>ทำควิซตัวอย่าง 5 ข้อ</li>
                <li>ใช้ดึงดูดผู้ใช้จาก Facebook Group</li>
              </ul>
            </div>

            {/* Per-Course Pass */}
            <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.4)', borderRadius: '12px', padding: '1.15rem' }}>
              <span className="badge badge-amber">ยอดนิยม (Hero SKU)</span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.5rem' }}>รายชุดวิชา</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#60a5fa', margin: '0.25rem 0' }}>฿199 <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>/ วิชา</span></p>
              <ul style={{ fontSize: '0.775rem', color: '#cbd5e1', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <li>ปลดล็อกครบ 15 หน่วย 80/20</li>
                <li>คลังข้อสอบ Pre/Post Test ครบ</li>
                <li>ลิงก์คลิปเสียงสรุปครบทุกตอน</li>
                <li>เข้าถึงได้ตลอดชีพจนกว่าจะสอบผ่าน</li>
              </ul>
            </div>

            {/* Semester Bundle */}
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '12px', padding: '1.15rem' }}>
              <span className="badge badge-green">สุดคุ้ม</span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.5rem' }}>CS Semester Pack</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34d399', margin: '0.25rem 0' }}>฿499 <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>/ 3 วิชา</span></p>
              <ul style={{ fontSize: '0.775rem', color: '#cbd5e1', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <li>ชุดวิชา 10141 + 10151 + 96102</li>
                <li>AI Study Tutor ตอบคำถามไม่อั้น</li>
                <li>โหมดดาวน์โหลด Cheatsheet PDF</li>
              </ul>
            </div>

          </div>
        </div>

        {/* 3. Marketing & Distribution */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Megaphone size={18} color="var(--accent-amber)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fcd34d' }}>
              3. แผนการตลาดดึงลูกค้าคนแรก (Go-To-Market)
            </h3>
          </div>
          <div style={{
            background: 'rgba(245, 158, 11, 0.05)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '12px',
            padding: '1rem',
            fontSize: '0.825rem',
            color: '#fef3c7',
            lineHeight: 1.6
          }}>
            1. <strong>โพสต์แชร์ความรู้ฟรีในกลุ่ม Facebook:</strong> นำสรุปหน่วยที่ 1-2 พร้อมรูป Infographic สวยๆ ไปโพสต์ในกลุ่ม <em>"เด็ก มสธ.", "สัมฤทธิบัตร มสธ.", "ชมรมนักศึกษาวิทยาการคอมพิวเตอร์ มสธ."</em><br/>
            2. <strong>ทำคลิป TikTok / Lemon8 สไตล์ Storytelling:</strong> เล่าเรื่องจริงของคุณ: <em>"เรียนควบ สจล. ภาษาจีน + มสธ. วิทย์คอม ยังไงให้สอบผ่านฉลุยโดยไม่อ่านหนังสือ 1,000 หน้า"</em> จะเกิด Organic Reach สูงมาก<br/>
            3. <strong>ระบบชำระเงินอัตโนมัติ:</strong> ติดตั้งระบบสแกน PromptPay QR Code ผ่าน Open Banking API (เช่น GB Prime Pay หรือ Omise) จ่ายเงินปุ๊บ ปลดล็อกวิชาทันที
          </div>
        </div>

        <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
            เข้าใจแล้ว & ลุยโปรเจกต์ต่อ
          </button>
        </div>

      </div>

    </div>
  );
}
