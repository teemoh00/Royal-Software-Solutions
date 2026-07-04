import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, CreditCard, FileText, Briefcase, BarChart, School, GraduationCap, Globe, BookOpen, XCircle, CheckCircle2, ArrowRight, Zap, TrendingUp } from 'lucide-react';
import SEO from './SEO';

const FahariAcademia = () => {
  return (
    <div className="product-page">
      <SEO 
        title="Fahari Academia - School Management System" 
        description="The complete school management system for East African schools. Fee collection, report cards, HR, payroll and more."
        path="/fahari-academia"
      />
      
      {/* Hero Section */}
      <section className="product-hero academia-hero">
        <div className="container">
          <h1 className="hero-title">Your school deserves to run with clarity, calm, and pride.</h1>
          <p className="hero-subtitle">Fahari Academia is the complete school management system built for East African private schools — from fee collection to final exams, HR to procurement, payroll to the principal's dashboard. Built here. For here.</p>
          <div className="hero-cta" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/get-quote?service=Academic ERP" className="btn btn-primary">Book a Free Demo</Link>
            <Link to="/get-quote?service=Academic ERP" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>Start Your Discounted Trial</Link>
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

          <div className="comparison-container">
            {[
              {
                probTitle: "Fee Leakage",
                probDesc: "No clear record of who paid, who owes, or how much. Money goes missing every term.",
                solTitle: "Real-Time Fee Tracking",
                solDesc: "Parents pay via M-Pesa. Receipt generates instantly. Balance updates automatically.",
                icon: <CreditCard size={20} />
              },
              {
                probTitle: "Manual Report Cards",
                probDesc: "Teachers spend days computing grades. Errors creep in. Parents lose trust.",
                solTitle: "Automatic Report Cards",
                solDesc: "Enter marks once. The system computes grades, ranks, and generates professional report cards.",
                icon: <FileText size={20} />
              },
              {
                probTitle: "Payroll Chaos",
                probDesc: "Salaries calculated on paper with no NHIF, NSSF, or PAYE compliance records kept.",
                solTitle: "Compliant Payroll",
                solDesc: "Process salaries with NHIF, NSSF, and PAYE automatically deducted, calculated, and documented.",
                icon: <Users size={20} />
              },
              {
                probTitle: "Zero Visibility",
                probDesc: "The school owner has no real-time dashboard. Decisions made without current data.",
                solTitle: "Live Leadership Dashboard",
                solDesc: "See financial health, fee status, and academic performance in real time, from any device.",
                icon: <TrendingUp size={20} />
              }
            ].map((item, i) => (
              <div className="comparison-row animations-fade-in" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="problem-side">
                  <div className="problem-header">
                    <XCircle size={18} /> {item.probTitle}
                  </div>
                  <div className="prob-desc">{item.probDesc}</div>
                </div>
                
                <div className="comparison-icon-center">
                  <ArrowRight size={24} />
                </div>
                
                <div className="solution-side">
                  <div className="solution-header">
                    <CheckCircle2 size={18} /> {item.solTitle}
                  </div>
                  <div className="sol-desc">{item.solDesc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section modules-section bg-light" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.03, backgroundImage: 'radial-gradient(#0D1B3E 1px, transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center animations-fade-in">
            <h2 className='section-title'>Everything You Need in One Login</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>A unified platform designed to eliminate data silos and automate your school's daily operations.</p>
          </div>
          
          <style>{`
            .bento-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 1.5rem;
              margin-top: 3.5rem;
            }
            .bento-col-2 { grid-column: span 2; }
            .bento-col-1 { grid-column: span 1; }
            
            .bento-item {
              background: white;
              border-radius: 24px;
              padding: 2.5rem;
              position: relative;
              overflow: hidden;
              border: 1px solid #e2e8f0;
              box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              z-index: 1;
              text-decoration: none;
            }
            .bento-item:hover {
              transform: translateY(-8px);
              box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
              border-color: var(--module-color);
            }
            .bento-bg-glow {
              position: absolute;
              top: -50%;
              right: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle at center, var(--module-color-light) 0%, transparent 50%);
              opacity: 0;
              transition: opacity 0.5s ease;
              z-index: -1;
              pointer-events: none;
            }
            .bento-item:hover .bento-bg-glow {
              opacity: 1;
            }
            .bento-icon-wrapper {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 64px;
              height: 64px;
              border-radius: 18px;
              background: #f8fafc;
              color: var(--module-color);
              margin-bottom: 2rem;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .bento-item:hover .bento-icon-wrapper {
              transform: scale(1.1) rotate(5deg);
              background: var(--module-color);
              color: white;
              box-shadow: 0 15px 20px -5px var(--module-color-shadow);
            }
            .bento-title {
              font-size: 1.4rem;
              font-weight: 800;
              color: #1e293b;
              margin-bottom: 1rem;
            }
            .bento-desc {
              color: #64748b;
              font-size: 1.05rem;
              line-height: 1.6;
            }
            .bento-explore {
              margin-top: auto;
              padding-top: 2rem;
              display: flex;
              align-items: center;
              gap: 0.5rem;
              color: var(--module-color);
              font-size: 0.95rem;
              font-weight: 700;
              opacity: 0;
              transform: translateX(-10px);
              transition: all 0.3s ease;
            }
            .bento-item:hover .bento-explore {
              opacity: 1;
              transform: translateX(0);
            }
            
            @media (max-width: 992px) {
              .bento-grid { grid-template-columns: repeat(2, 1fr); }
              .bento-col-2 { grid-column: span 2; }
              .bento-col-1 { grid-column: span 1; }
            }
            @media (max-width: 768px) {
              .bento-grid { grid-template-columns: 1fr; }
              .bento-col-2, .bento-col-1 { grid-column: span 1; }
            }
          `}</style>

          <div className="bento-grid">
            {[
              {
                title: "Fee Management & M-Pesa",
                desc: "Direct M-Pesa integration for zero-manual-entry reconciliation. Parents pay via Paybill and accounts update instantly.",
                icon: <CreditCard size={28} />,
                color: "#10b981", colorLight: "rgba(16,185,129,0.1)", colorShadow: "rgba(16,185,129,0.3)",
                span: "bento-col-2"
              },
              {
                title: "Student Records",
                desc: "Complete lifecycle management from admission to alumni tracking.",
                icon: <Users size={28} />,
                color: "#3b82f6", colorLight: "rgba(59,130,246,0.1)", colorShadow: "rgba(59,130,246,0.3)",
                span: "bento-col-1"
              },
              {
                title: "HR & Payroll",
                desc: "Full Kenyan compliance with automated NHIF, NSSF, and KRA P10 returns.",
                icon: <Briefcase size={28} />,
                color: "#ec4899", colorLight: "rgba(236,72,153,0.1)", colorShadow: "rgba(236,72,153,0.3)",
                span: "bento-col-1"
              },
              {
                title: "Exams & Report Cards",
                desc: "CBC-ready grading systems for primary and secondary schools. Automatically compute ranks and print beautiful report cards.",
                icon: <FileText size={28} />,
                color: "#8b5cf6", colorLight: "rgba(139,92,246,0.1)", colorShadow: "rgba(139,92,246,0.3)",
                span: "bento-col-2"
              },
              {
                title: "Procurement",
                desc: "Track inventory, LPOs, and supplier payments easily.",
                icon: <Globe size={28} />,
                color: "#14b8a6", colorLight: "rgba(20,184,166,0.1)", colorShadow: "rgba(20,184,166,0.3)",
                span: "bento-col-2"
              },
              {
                title: "Finance & Accounts",
                desc: "General ledger, balance sheets, and real-time cashflow analysis.",
                icon: <BarChart size={28} />,
                color: "#C89B2A", colorLight: "rgba(200,155,42,0.1)", colorShadow: "rgba(200,155,42,0.3)",
                span: "bento-col-1"
              }
            ].map((mod, i) => (
              <div 
                key={i} 
                className={`bento-item animations-fade-in ${mod.span}`} 
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  '--module-color': mod.color,
                  '--module-color-light': mod.colorLight,
                  '--module-color-shadow': mod.colorShadow
                }}
              >
                <div className="bento-bg-glow"></div>
                <div className="bento-icon-wrapper">
                  {mod.icon}
                </div>
                <h3 className="bento-title">{mod.title}</h3>
                <p className="bento-desc">{mod.desc}</p>
                <div className="bento-explore">
                  Explore Module <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
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
