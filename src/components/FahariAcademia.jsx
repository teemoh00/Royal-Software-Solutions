import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, CreditCard, FileText, Briefcase, BarChart, School, GraduationCap, Globe, BookOpen, XCircle, CheckCircle2, ArrowRight, Zap, TrendingUp } from 'lucide-react';
import SEO from './SEO';

const BeforeAfterSlider = ({ probTitle, probDesc, solTitle, solDesc, delay }) => {
  const [sliderPos, setSliderPos] = React.useState(50);
  const containerRef = React.useRef(null);

  const handleMove = (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = Math.max(5, Math.min((x / rect.width) * 100, 95));
      setSliderPos(percent);
  };

  return (
      <div 
          className="ba-slider-container animations-fade-in"
          style={{ animationDelay: delay }}
          ref={containerRef}
          onMouseMove={(e) => handleMove(e.clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
          {/* The Before State (Chaos) */}
          <div className="ba-layer ba-before">
              <div className="ba-content">
                  <div className="ba-header error-text">
                      <XCircle size={24} /> <span>{probTitle}</span>
                  </div>
                  <p className="ba-desc">{probDesc}</p>
              </div>
          </div>

          {/* The After State (Solution) clipped by the slider position */}
          <div className="ba-layer ba-after glassmorphic-panel" style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}>
              <div className="ba-content">
                  <div className="ba-header success-text">
                      <CheckCircle2 size={24} /> <span>{solTitle}</span>
                  </div>
                  <p className="ba-desc">{solDesc}</p>
              </div>
          </div>

          {/* The Slider Handle */}
          <div className="ba-handle" style={{ left: `${sliderPos}%` }}>
              <div className="ba-handle-line"></div>
              <div className="ba-handle-button"></div>
          </div>
      </div>
  );
};

const FahariAcademia = () => {
  return (
    <div className="product-page">
      <SEO 
        title="Fahari Academia — School Management System for East Africa" 
        description="The complete school ERP for Kenyan and East African institutions. CBC-aligned fee collection, report cards, HR, payroll, and parent portal. Go live in 24 hours."
        path="/fahari-academia"
      />
      
      {/* Hero Section */}
      <section className="product-hero academia-hero cinematic-hero" style={{ overflow: 'hidden', position: 'relative' }}>
        {/* Emerald Green & Gold Volumetric Spotlight */}
        <div className="academia-spotlight"></div>
        
        <div className="container hero-split-layout">
          <div className="hero-text-content">
            <h1 className="hero-title cinematic-fade-in" style={{ textAlign: 'left' }}>
              Your school deserves to run with <span style={{ color: '#10b981' }}>clarity, calm, and pride.</span>
            </h1>
            <p className="hero-subtitle cinematic-fade-in" style={{ animationDelay: '0.2s', textAlign: 'left', maxWidth: '100%' }}>
              Fahari Academia is the complete school management system built for East African private schools — from fee collection to final exams, HR to procurement, payroll to the principal's dashboard. Built here. For here.
            </p>
            <div className="hero-cta cinematic-fade-in" style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-start', flexWrap: 'wrap', animationDelay: '0.4s' }}>
              <Link to="/get-quote?service=Academic ERP" className="btn btn-primary glowing-btn-emerald">Book a Free Demo</Link>
              <Link to="/get-quote?service=Academic ERP" className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>Start Your Discounted Trial</Link>
            </div>
          </div>
          
          <div className="hero-visual-content cinematic-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="floating-mockup-group">
              {/* Main Dashboard Card */}
              <div className="mockup-card main-card glassmorphic-panel cinematic-tilt">
                <div className="mockup-header">
                  <div className="mockup-dots"><span></span><span></span><span></span></div>
                  <span className="mockup-title">Principal's Dashboard</span>
                </div>
                <div className="mockup-body chart-body">
                  <div className="mockup-chart-bar" style={{ height: '40%' }}></div>
                  <div className="mockup-chart-bar" style={{ height: '70%', backgroundColor: '#10b981', boxShadow: '0 0 10px rgba(16,185,129,0.5)' }}></div>
                  <div className="mockup-chart-bar" style={{ height: '90%' }}></div>
                  <div className="mockup-chart-bar" style={{ height: '60%' }}></div>
                  <div className="mockup-chart-bar" style={{ height: '85%' }}></div>
                </div>
              </div>
              
              {/* Fee Collection Floating Card */}
              <div className="mockup-card small-card float-anim-1 glassmorphic-panel cinematic-tilt">
                <div className="mockup-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}><CreditCard size={20} /></div>
                <div className="mockup-text">
                  <span className="mockup-label">M-Pesa Auto-Recon</span>
                  <span className="mockup-value">KSh 145,000 received</span>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="floating-badge badge-1 float-anim-2">
                <CheckCircle2 size={16} color="#10b981" />
                <span>CBC Aligned</span>
              </div>
              <div className="floating-badge badge-2 float-anim-3">
                <Zap size={16} color="#C89B2A" />
                <span>Live in 24hrs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems vs Solutions */}
      <section className="section problems-solutions">
        <div className="container">
          <div className="text-center animations-fade-in" style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'inline-block', padding: '6px 16px', background: '#fef3c7', color: '#d97706', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
              The Reality
            </div>
              <h2 className='section-title'>
              Stop Managing Chaos. Start Managing Growth.
            </h2>
            
            <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.7', color: '#475569' }}>
              Most private schools in East Africa are managing fees on paper, exams on spreadsheets, and payroll by hand — <span style={{ color: '#ef4444', fontWeight: 600 }}>losing money, wasting time, and making avoidable errors</span> every single term.
            </p>
            
            <div style={{ 
              marginTop: '2rem', 
              padding: '1.5rem', 
              background: 'linear-gradient(to right, rgba(200, 155, 42, 0.1), rgba(13, 27, 62, 0.05))', 
              borderLeft: '4px solid #C89B2A', 
              borderRadius: '0 12px 12px 0',
              maxWidth: '700px',
              margin: '2rem auto 0 auto',
              textAlign: 'left'
            }}>
              <p style={{ margin: 0, fontSize: '1.05rem', color: '#1e293b', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ color: '#C89B2A', fontSize: '2rem', fontFamily: 'serif', lineHeight: 1 }}>"</span>
                <span>This is not a people problem. Your bursar is working hard. Your principal is stretched thin. The problem is the <strong style={{ color: '#0D1B3E' }}>infrastructure</strong> they are working with.</span>
              </p>
            </div>
          </div>
          <style>{`
            .comparison-container {
              display: flex;
              flex-direction: column;
              gap: 2rem;
              margin-top: 3rem;
            }
            .comparison-row {
              display: grid;
              grid-template-columns: 1fr auto 1fr;
              gap: 1.5rem;
              align-items: center;
              padding: 1.5rem;
              border-radius: 16px;
              background: white;
              box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
              border: 1px solid #e2e8f0;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              position: relative;
              overflow: hidden;
            }
            .comparison-row:hover {
              transform: translateY(-5px);
              box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
              border-color: #C89B2A;
            }
            .comparison-row::before {
              content: '';
              position: absolute;
              top: 0; left: 0; right: 0; bottom: 0;
              background: linear-gradient(90deg, rgba(239,68,68,0.03) 0%, rgba(16,185,129,0.03) 100%);
              z-index: 0;
              opacity: 0;
              transition: opacity 0.3s ease;
            }
            .comparison-row:hover::before {
              opacity: 1;
            }
            .problem-side, .solution-side {
              position: relative;
              z-index: 1;
            }
            .problem-side {
              padding-right: 1rem;
            }
            .solution-side {
              padding-left: 1rem;
            }
            .comparison-icon-center {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 48px;
              height: 48px;
              background: #f8fafc;
              border-radius: 50%;
              color: #94a3b8;
              z-index: 1;
              transition: all 0.3s ease;
            }
            .comparison-row:hover .comparison-icon-center {
              background: #C89B2A;
              color: white;
              transform: scale(1.1);
            }
            .problem-header {
              display: flex;
              align-items: center;
              gap: 10px;
              color: #ef4444;
              font-weight: 700;
              margin-bottom: 0.5rem;
              font-size: 1.1rem;
            }
            .solution-header {
              display: flex;
              align-items: center;
              gap: 10px;
              color: #10b981;
              font-weight: 700;
              margin-bottom: 0.5rem;
              font-size: 1.1rem;
            }
            .prob-desc {
              color: #64748b;
              font-size: 0.95rem;
              line-height: 1.5;
            }
            .sol-desc {
              color: #1e293b;
              font-size: 0.95rem;
              line-height: 1.5;
              font-weight: 500;
            }
            @media (max-width: 768px) {
              .comparison-row {
                grid-template-columns: 1fr;
                gap: 1rem;
                padding: 1.5rem;
                text-align: center;
              }
              .comparison-icon-center {
                transform: rotate(90deg);
                margin: 0 auto;
              }
              .problem-header, .solution-header {
                justify-content: center;
              }
              .problem-side { padding-right: 0; padding-bottom: 1rem; border-bottom: 1px dashed #e2e8f0; }
              .solution-side { padding-left: 0; padding-top: 1rem; }
            }
          `}</style>

          <div className="comparison-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>
            {[
              {
                probTitle: "Fee Leakage",
                probDesc: "No clear record of who paid, who owes, or how much. Money goes missing every term.",
                solTitle: "Real-Time Fee Tracking",
                solDesc: "Parents pay via M-Pesa. Receipt generates instantly. Balance updates automatically."
              },
              {
                probTitle: "Manual Report Cards",
                probDesc: "Teachers spend days computing grades. Errors creep in. Parents lose trust.",
                solTitle: "Automatic Report Cards",
                solDesc: "Enter marks once. The system computes grades, ranks, and generates professional report cards."
              },
              {
                probTitle: "Payroll Chaos",
                probDesc: "Salaries calculated on paper with no NHIF, NSSF, or PAYE compliance records kept.",
                solTitle: "Compliant Payroll",
                solDesc: "Process salaries with NHIF, NSSF, and PAYE automatically deducted, calculated, and documented."
              },
              {
                probTitle: "Zero Visibility",
                probDesc: "The school owner has no real-time dashboard. Decisions made without current data.",
                solTitle: "Live Leadership Dashboard",
                solDesc: "See financial health, fee status, and academic performance in real time, from any device."
              }
            ].map((item, i) => (
              <BeforeAfterSlider 
                key={i} 
                probTitle={item.probTitle} 
                probDesc={item.probDesc} 
                solTitle={item.solTitle} 
                solDesc={item.solDesc} 
                delay={`${i * 0.1}s`} 
              />
            ))}
          </div>

        </div>
      </section>

      <section className="section modules-section" style={{ position: 'relative', background: '#0D1B3E', overflow: 'hidden', padding: '7rem 0' }}>
        {/* Background texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(200,155,42,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.06) 0%, transparent 40%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          {/* Section Header */}
          <div className="text-center animations-fade-in" style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', background: 'rgba(200,155,42,0.15)', border: '1px solid rgba(200,155,42,0.3)', color: '#C89B2A', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.5rem' }}>
              <Zap size={14} /> 6 Powerful Modules
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#ffffff', marginBottom: '1.2rem', lineHeight: 1.15 }}>
              Everything Your School Needs.<br /><span style={{ color: '#10b981' }}>In One Login.</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.15rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              No more juggling spreadsheets, WhatsApp groups, and paper registers. One system. Every department. Full visibility.
            </p>
          </div>

          <style>{`
            .mod-tabs {
              display: flex;
              flex-wrap: wrap;
              gap: 0.75rem;
              justify-content: center;
              margin-bottom: 3rem;
            }
            .mod-tab {
              display: flex;
              align-items: center;
              gap: 0.6rem;
              padding: 0.7rem 1.4rem;
              border-radius: 50px;
              border: 1.5px solid rgba(255,255,255,0.1);
              background: rgba(255,255,255,0.04);
              color: #94a3b8;
              font-size: 0.9rem;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
              user-select: none;
              white-space: nowrap;
            }
            .mod-tab:hover {
              border-color: rgba(255,255,255,0.25);
              color: #ffffff;
              background: rgba(255,255,255,0.08);
              transform: translateY(-2px);
            }
            .mod-tab.active {
              border-color: var(--tab-color);
              background: var(--tab-color-bg);
              color: var(--tab-color);
              box-shadow: 0 0 20px var(--tab-color-shadow);
            }
            .mod-tab .tab-dot {
              width: 8px; height: 8px;
              border-radius: 50%;
              background: currentColor;
              flex-shrink: 0;
            }
            .mod-spotlight {
              display: grid;
              grid-template-columns: 1fr 1.2fr;
              gap: 3rem;
              align-items: center;
              background: rgba(255,255,255,0.03);
              border: 1px solid rgba(255,255,255,0.08);
              border-radius: 28px;
              padding: 3.5rem;
              transition: all 0.4s ease;
            }
            .mod-spotlight-icon {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 72px; height: 72px;
              border-radius: 20px;
              margin-bottom: 1.5rem;
              transition: all 0.3s ease;
            }
            .mod-spotlight-tag {
              font-size: 0.78rem;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              margin-bottom: 0.75rem;
              opacity: 0.9;
            }
            .mod-spotlight-title {
              font-size: clamp(1.5rem, 2.5vw, 2rem);
              font-weight: 800;
              color: #ffffff;
              margin-bottom: 1rem;
              line-height: 1.2;
            }
            .mod-spotlight-desc {
              color: #94a3b8;
              font-size: 1.05rem;
              line-height: 1.75;
              margin-bottom: 2rem;
            }
            .mod-features-list {
              list-style: none;
              padding: 0; margin: 0;
              display: flex;
              flex-direction: column;
              gap: 0.65rem;
              margin-bottom: 2rem;
            }
            .mod-features-list li {
              display: flex;
              align-items: flex-start;
              gap: 0.75rem;
              color: #cbd5e1;
              font-size: 0.95rem;
              line-height: 1.5;
            }
            .mod-features-list li .check {
              width: 20px; height: 20px;
              border-radius: 50%;
              display: flex; align-items: center; justify-content: center;
              flex-shrink: 0;
              margin-top: 1px;
            }
            .mod-cta-row {
              display: flex;
              align-items: center;
              gap: 1rem;
              flex-wrap: wrap;
            }
            .mod-cta-btn {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.8rem 1.8rem;
              border-radius: 50px;
              font-weight: 700;
              font-size: 0.95rem;
              border: none;
              cursor: pointer;
              text-decoration: none;
              transition: all 0.25s ease;
            }
            .mod-cta-btn:hover {
              transform: translateY(-2px);
              filter: brightness(1.1);
            }
            .mod-spotlight-visual {
              background: rgba(0,0,0,0.25);
              border: 1px solid rgba(255,255,255,0.08);
              border-radius: 20px;
              padding: 2rem;
              min-height: 300px;
              display: flex;
              flex-direction: column;
              gap: 1rem;
              position: relative;
              overflow: hidden;
            }
            .mod-visual-header {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              margin-bottom: 0.5rem;
            }
            .mod-visual-dot { width:10px; height:10px; border-radius:50%; }
            .mod-visual-title { color: rgba(255,255,255,0.4); font-size: 0.8rem; font-weight: 600; margin-left: 0.5rem; }
            .mod-stat-row {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 0.75rem;
            }
            .mod-stat-card {
              background: rgba(255,255,255,0.06);
              border-radius: 12px;
              padding: 1rem;
              text-align: center;
            }
            .mod-stat-value {
              font-size: 1.4rem;
              font-weight: 800;
              color: white;
              display: block;
            }
            .mod-stat-label {
              font-size: 0.72rem;
              color: rgba(255,255,255,0.4);
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .mod-bar-row {
              display: flex;
              flex-direction: column;
              gap: 0.6rem;
            }
            .mod-bar-item { display: flex; flex-direction: column; gap: 4px; }
            .mod-bar-label { font-size: 0.78rem; color: rgba(255,255,255,0.5); display: flex; justify-content: space-between; }
            .mod-bar-track { height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; }
            .mod-bar-fill { height: 100%; border-radius: 4px; }
            .mod-social-proof {
              margin-top: 3.5rem;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 2.5rem;
              flex-wrap: wrap;
              padding: 1.5rem 2rem;
              background: rgba(255,255,255,0.03);
              border: 1px solid rgba(255,255,255,0.07);
              border-radius: 16px;
            }
            .mod-proof-item {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              color: #94a3b8;
              font-size: 0.9rem;
            }
            .mod-proof-item strong { color: white; font-size: 1.1rem; }
            .mod-proof-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.1); }
            @media (max-width: 900px) {
              .mod-spotlight { grid-template-columns: 1fr; }
              .mod-spotlight-visual { min-height: auto; }
            }
            @media (max-width: 600px) {
              .mod-spotlight { padding: 2rem; }
              .mod-stat-row { grid-template-columns: repeat(2, 1fr); }
              .mod-social-proof { gap: 1.5rem; }
              .mod-proof-divider { display: none; }
            }
          `}</style>

          {(() => {
            const modules = [
              {
                id: 'fees',
                tab: 'Fee & M-Pesa',
                icon: <CreditCard size={30} />,
                tag: 'Zero Manual Entry',
                title: 'Fee Collection That Runs Itself',
                desc: 'Parents pay via M-Pesa Paybill. Receipts generate instantly. Balances update automatically. No more chasing, no more errors — just clean, real-time accounts.',
                features: [
                  'M-Pesa Paybill & Till integration with auto-reconciliation',
                  'Automated fee statements sent to parents via SMS',
                  'Arrears tracking with configurable reminder schedules',
                  'Term-wise fee structure with discounts and waivers',
                ],
                color: '#10b981', colorBg: 'rgba(16,185,129,0.12)', colorShadow: 'rgba(16,185,129,0.25)',
                stats: [{ v: 'KSh 2.4M', l: 'Collected' }, { v: '98%', l: 'Reconciled' }, { v: '0', l: 'Errors' }],
                bars: [{ label: 'Form 1', pct: 92 }, { label: 'Form 2', pct: 78 }, { label: 'Form 3', pct: 85 }, { label: 'Form 4', pct: 95 }],
              },
              {
                id: 'students',
                tab: 'Student Records',
                icon: <Users size={30} />,
                tag: 'Full Lifecycle',
                title: 'Every Student. Every Detail. One Place.',
                desc: 'From admission to alumni, manage every learner\'s complete profile — academics, discipline, health records, parent contacts — with role-based access for staff.',
                features: [
                  'Digital admission with document upload and approval workflow',
                  'Class promotion & stream management per academic year',
                  'Discipline log, counselling records, and incident tracking',
                  'Parent portal with real-time child progress visibility',
                ],
                color: '#0d9488', colorBg: 'rgba(13,148,136,0.12)', colorShadow: 'rgba(13,148,136,0.25)',
                stats: [{ v: '1,240', l: 'Students' }, { v: '48', l: 'Classes' }, { v: '100%', l: 'Digital' }],
                bars: [{ label: 'PP1-PP2', pct: 88 }, { label: 'Gr 1-3', pct: 95 }, { label: 'Gr 4-6', pct: 82 }, { label: 'Gr 7-9', pct: 79 }],
              },
              {
                id: 'hr',
                tab: 'HR & Payroll',
                icon: <Briefcase size={30} />,
                tag: 'Kenyan Compliant',
                title: 'Payroll That Passes the Auditor.',
                desc: 'Process teacher and staff salaries with NHIF, NSSF, and PAYE automatically calculated. Generate KRA P10 returns with a single click.',
                features: [
                  'NHIF, NSSF, and PAYE auto-calculation per employee',
                  'KRA P10 and payslip generation in one click',
                  'Leave management with balances and approval workflows',
                  'Contract tracking, appraisals, and staff performance records',
                ],
                color: '#ec4899', colorBg: 'rgba(236,72,153,0.12)', colorShadow: 'rgba(236,72,153,0.25)',
                stats: [{ v: '86', l: 'Staff' }, { v: '100%', l: 'Compliant' }, { v: 'P10', l: 'Ready' }],
                bars: [{ label: 'Teaching', pct: 72 }, { label: 'Admin', pct: 18 }, { label: 'Support', pct: 10 }, { label: 'Part-time', pct: 5 }],
              },
              {
                id: 'exams',
                tab: 'Exams & CBC',
                icon: <FileText size={30} />,
                tag: 'CBC & 8-4-4 Ready',
                title: 'Enter Marks Once. Print Everything.',
                desc: 'Support for both 8-4-4 and CBC grading. Teachers enter marks once; the system computes totals, ranks, and generates polished, branded report cards.',
                features: [
                  'CBC competency-based and 8-4-4 percentage grading modes',
                  'Automatic class and stream rank calculation',
                  'Printable, school-branded report cards in one click',
                  'Exam schedule management with invigilator assignments',
                ],
                color: '#8b5cf6', colorBg: 'rgba(139,92,246,0.12)', colorShadow: 'rgba(139,92,246,0.25)',
                stats: [{ v: '400+', l: 'Reports' }, { v: 'CBC', l: 'Aligned' }, { v: '<1min', l: 'Per Card' }],
                bars: [{ label: 'Maths', pct: 74 }, { label: 'English', pct: 81 }, { label: 'Science', pct: 69 }, { label: 'Kiswahili', pct: 88 }],
              },
              {
                id: 'finance',
                tab: 'Finance',
                icon: <BarChart size={30} />,
                tag: 'Real-Time Insight',
                title: 'Financial Clarity for School Leaders.',
                desc: 'A real-time general ledger, income & expenditure, balance sheets, and cashflow — giving the owner or board a live, accurate picture of the school\'s health.',
                features: [
                  'General ledger with chart of accounts for schools',
                  'Income & expenditure reports by term, year, or department',
                  'Real-time cashflow with bank reconciliation',
                  'Budget planning and variance tracking',
                ],
                color: '#C89B2A', colorBg: 'rgba(200,155,42,0.12)', colorShadow: 'rgba(200,155,42,0.25)',
                stats: [{ v: '+34%', l: 'Revenue' }, { v: '-18%', l: 'Leakage' }, { v: 'Live', l: 'Dashboard' }],
                bars: [{ label: 'Fees', pct: 78 }, { label: 'Grants', pct: 12 }, { label: 'Events', pct: 6 }, { label: 'Other', pct: 4 }],
              },
              {
                id: 'procurement',
                tab: 'Procurement',
                icon: <Globe size={30} />,
                tag: 'Zero Leakage',
                title: 'Track Every Shilling Spent.',
                desc: 'Raise LPOs, manage suppliers, track inventory, and reconcile purchases against your budget — so nothing goes missing and every expenditure is documented.',
                features: [
                  'Local Purchase Order (LPO) generation and approval workflow',
                  'Supplier database with payment history and ratings',
                  'Store inventory tracking with reorder alerts',
                  'Budget vs. actual spend per department',
                ],
                color: '#14b8a6', colorBg: 'rgba(20,184,166,0.12)', colorShadow: 'rgba(20,184,166,0.25)',
                stats: [{ v: '240', l: 'LPOs' }, { v: '32', l: 'Suppliers' }, { v: '0', l: 'Lost Items' }],
                bars: [{ label: 'Stationery', pct: 35 }, { label: 'Cleaning', pct: 22 }, { label: 'Food', pct: 28 }, { label: 'Equipment', pct: 15 }],
              },
            ];

            const [activeIdx, setActiveIdx] = React.useState(0);
            const mod = modules[activeIdx];

            return (
              <>
                <div className="mod-tabs">
                  {modules.map((m, i) => (
                    <button
                      key={m.id}
                      className={`mod-tab${i === activeIdx ? ' active' : ''}`}
                      style={{ '--tab-color': m.color, '--tab-color-bg': m.colorBg, '--tab-color-shadow': m.colorShadow }}
                      onClick={() => setActiveIdx(i)}
                    >
                      <span className="tab-dot" />
                      {m.tab}
                    </button>
                  ))}
                </div>

                <div className="mod-spotlight animations-fade-in" key={mod.id}>
                  <div>
                    <div className="mod-spotlight-icon" style={{ background: mod.colorBg, color: mod.color }}>
                      {mod.icon}
                    </div>
                    <div className="mod-spotlight-tag" style={{ color: mod.color }}>{mod.tag}</div>
                    <h3 className="mod-spotlight-title">{mod.title}</h3>
                    <p className="mod-spotlight-desc">{mod.desc}</p>
                    <ul className="mod-features-list">
                      {mod.features.map((f, fi) => (
                        <li key={fi}>
                          <span className="check" style={{ background: mod.colorBg, color: mod.color }}>
                            <CheckCircle2 size={12} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mod-cta-row">
                      <Link to="/get-quote?service=Academic ERP" className="mod-cta-btn" style={{ background: mod.color, color: '#fff', boxShadow: `0 8px 24px ${mod.colorShadow}` }}>
                        Book a Free Demo <ArrowRight size={16} />
                      </Link>
                      <span style={{ color: '#64748b', fontSize: '0.85rem' }}>No commitment required</span>
                    </div>
                  </div>

                  <div className="mod-spotlight-visual">
                    <div className="mod-visual-header">
                      <div className="mod-visual-dot" style={{ background: '#ef4444' }} />
                      <div className="mod-visual-dot" style={{ background: '#f59e0b' }} />
                      <div className="mod-visual-dot" style={{ background: '#10b981' }} />
                      <span className="mod-visual-title">Fahari Academia — {mod.tab}</span>
                    </div>
                    <div className="mod-stat-row">
                      {mod.stats.map((s, si) => (
                        <div key={si} className="mod-stat-card">
                          <span className="mod-stat-value" style={{ color: mod.color }}>{s.v}</span>
                          <span className="mod-stat-label">{s.l}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mod-bar-row">
                      {mod.bars.map((b, bi) => (
                        <div key={bi} className="mod-bar-item">
                          <div className="mod-bar-label">
                            <span>{b.label}</span>
                            <span style={{ color: mod.color }}>{b.pct}%</span>
                          </div>
                          <div className="mod-bar-track">
                            <div className="mod-bar-fill" style={{ width: `${b.pct}%`, background: mod.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ position: 'absolute', bottom: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${mod.colorBg} 0%, transparent 70%)`, pointerEvents: 'none' }} />
                  </div>
                </div>

                <div className="mod-social-proof">
                  <div className="mod-proof-item">
                    <TrendingUp size={18} color="#10b981" />
                    <span><strong>40+</strong> schools live on Fahari Academia</span>
                  </div>
                  <div className="mod-proof-divider" />
                  <div className="mod-proof-item">
                    <CheckCircle size={18} color="#C89B2A" />
                    <span><strong>Go live in 24 hours</strong> — we handle the setup</span>
                  </div>
                  <div className="mod-proof-divider" />
                  <div className="mod-proof-item">
                    <GraduationCap size={18} color="#0d9488" />
                    <span><strong>CBC & 8-4-4</strong> frameworks supported</span>
                  </div>
                  <div className="mod-proof-divider" />
                  <div className="mod-proof-item">
                    <Zap size={18} color="#8b5cf6" />
                    <span>Support in <strong>English & Swahili</strong></span>
                  </div>
                </div>
              </>
            );
          })()}

        </div>
      </section>

      {/* Who It's For */}
      <section className="section target-section" style={{ background: 'linear-gradient(to bottom, #f8fafc, #ffffff)', padding: '6rem 0' }}>
        <div className="container">
          <h2 className="section-title text-center" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0D1B3E', marginBottom: '3rem' }}>
            Built for Every School
          </h2>
          
          <style>{`
            .premium-target-grid {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 1.5rem;
            }
            .premium-target-item {
              background: white;
              border: 1px solid #e2e8f0;
              border-radius: 50px;
              padding: 0.75rem 2rem 0.75rem 0.75rem;
              display: flex;
              align-items: center;
              gap: 1rem;
              box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              cursor: default;
            }
            .premium-target-item:hover {
              transform: translateY(-5px);
              box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
              border-color: #C89B2A;
            }
            .premium-target-icon {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 48px;
              height: 48px;
              border-radius: 50%;
              background: rgba(200, 155, 42, 0.1);
              color: #C89B2A;
              transition: all 0.3s ease;
            }
            .premium-target-item:hover .premium-target-icon {
              background: #C89B2A;
              color: white;
            }
            .premium-target-text {
              font-weight: 600;
              color: #1e293b;
              font-size: 1.05rem;
            }
          `}</style>
          
          <div className="premium-target-grid">
            {[
              { icon: <School size={24} />, text: "Private Primary Schools" },
              { icon: <GraduationCap size={24} />, text: "Secondary Schools" },
              { icon: <Globe size={24} />, text: "International Schools" },
              { icon: <BookOpen size={24} />, text: "Faith-based Schools" },
              { icon: <Briefcase size={24} />, text: "TVETs & Colleges" }
            ].map((item, i) => (
              <div key={i} className="premium-target-item animations-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="premium-target-icon">
                  {item.icon}
                </div>
                <span className="premium-target-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Signal */}
      <section className="section pricing-section bg-light" style={{ padding: '6rem 0' }}>
        <div className="container">
          <h2 className="section-title text-center">Simple, Transparent Pricing</h2>
          <p className="section-subtitle text-center mb-5">No hidden fees. No upfront hardware costs. Just results.</p>
          
          <div className="unified-pricing-card animations-fade-in" style={{ 
            background: 'linear-gradient(135deg, #0D1B3E 0%, #1a365d 100%)', 
            borderRadius: '24px', 
            padding: '0', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
            marginTop: '4rem',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'radial-gradient(circle at top right, rgba(200, 155, 42, 0.15), transparent 70%)', pointerEvents: 'none' }}></div>
            
            <div className="pricing-content" style={{ flex: '1 1 60%', padding: '4rem', color: 'white', zIndex: 1 }}>
              <div style={{ background: 'rgba(200, 155, 42, 0.2)', color: '#C89B2A', padding: '6px 16px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-block', marginBottom: '1.5rem' }}>
                Tailored For Your School
              </div>
              <h3 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                Enterprise-grade ERP, scaled to your student body.
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2.5rem', maxWidth: '500px' }}>
                We believe you shouldn't have to compromise on features just because of your school's size. That's why every school gets the exact same powerful platform. You only pay based on your actual enrollment.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/get-quote?service=Academic ERP" className="btn" style={{ background: '#C89B2A', color: 'white', padding: '1rem 2rem', borderRadius: '30px', fontWeight: 'bold', border: 'none', boxShadow: '0 4px 14px 0 rgba(200, 155, 42, 0.39)', textDecoration: 'none' }}>
                  Request a Custom Quote
                </Link>
                <Link to="/get-quote?service=Academic ERP" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '1rem 2rem', borderRadius: '30px', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', textDecoration: 'none' }}>
                  Book a 60-Day Pilot
                </Link>
              </div>
            </div>

            <div className="pricing-features" style={{ flex: '1 1 40%', background: 'rgba(0, 0, 0, 0.2)', padding: '4rem 3rem', zIndex: 1, borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
              <h4 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '2rem' }}>What's Always Included:</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  "All 6 Premium Modules",
                  "Zero-Manual-Entry M-Pesa Sync",
                  "Unlimited Staff & Teacher Accounts",
                  "Automatic Daily Cloud Backups",
                  "Priority On-site Implementation",
                  "24/7 WhatsApp & Phone Support"
                ].map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#f1f5f9', fontSize: '1.05rem' }}>
                    <CheckCircle2 size={20} color="#10b981" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                * One-time implementation & data migration fee applies based on your school's history and size. Multi-campus custom pricing is also available.
              </div>
            </div>
          </div>
          
          <style>{`
            @media (max-width: 992px) {
              .unified-pricing-card {
                flex-direction: column !important;
              }
              .pricing-content, .pricing-features {
                padding: 2.5rem !important;
                flex: 1 1 auto !important;
                border-left: none !important;
                border-top: 1px solid rgba(255,255,255,0.05);
              }
            }
          `}</style>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section text-white text-center" >
        <div className="container">
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 'bold', color: 'white' }}>
            See what your school looks like on Fahari Academia.
          </h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 2.5rem auto', fontSize: '1.15rem', color: '#D4C5A0', lineHeight: '1.6' }}>
            Book a free 20-minute demo. We come to your school. No commitment. No pressure. Your first 60 days are completely free.
          </p>
          <div className="cta-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/get-quote?service=Academic ERP" className="btn btn-pill-primary" style={{ background: '#C89B2A', borderColor: '#C89B2A', padding: '0.8rem 2.5rem', color: 'white', borderRadius: '30px', fontWeight: 'bold', textDecoration: 'none' }}>
              Book Your Free Demo
            </Link>
            <a href="https://wa.me/254759437978?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20Fahari%20Academia." className="btn btn-primary" style={{ background: '#25D366', borderColor: '#25D366', padding: '0.8rem 2.5rem', color: 'white', borderRadius: '30px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              WhatsApp Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FahariAcademia;
