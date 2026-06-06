import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, CreditCard, FileText, Briefcase, BarChart, School, GraduationCap, Globe, BookOpen } from 'lucide-react';
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
            <Link to="/get-quote?service=Academic ERP" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>Start Your 60-Day Free Pilot</Link>
          </div>
        </div>
      </section>

      {/* Problems vs Solutions */}
      <section className="section problems-solutions">
        <div className="container">
          <h2 className="section-title text-center">Stop Managing Chaos. Start Managing Growth.</h2>
          <p className="text-center text-muted mb-5" style={{ maxWidth: '800px', margin: '0 auto 3rem auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Most private schools in Kenya are managing fees on paper, exams on spreadsheets, and payroll by hand — losing money, wasting time, and making avoidable errors every single term. This is not a people problem. Your bursar is working hard. Your principal is stretched thin. The problem is the infrastructure they are working with.
          </p>
          <div className="prob-sol-grid">
            <div className="prob-card">
              <h3>The Problems</h3>
              <ul>
                <li><strong>Fee Leakage:</strong> No clear record of who paid, who owes, or how much. Money goes missing every term.</li>
                <li><strong>Manual Report Cards:</strong> Teachers spend days computing grades. Errors creep in. Parents lose trust.</li>
                <li><strong>Payroll Chaos:</strong> Salaries calculated on paper with no NHIF, NSSF, or PAYE compliance records kept.</li>
                <li><strong>Zero Visibility:</strong> The school owner has no real-time dashboard. Decisions made without current data.</li>
              </ul>
            </div>
            <div className="sol-card">
              <h3>The Fahari Academia Solution</h3>
              <ul>
                <li><strong>Real-Time Fee Tracking:</strong> Parents pay via M-Pesa. Receipt generates instantly. Balance updates automatically.</li>
                <li><strong>Automatic Report Cards:</strong> Enter marks once. The system computes grades, ranks, and generates professional report cards.</li>
                <li><strong>Compliant Payroll:</strong> Process salaries with NHIF, NSSF, and PAYE automatically deducted, calculated, and documented.</li>
                <li><strong>Live Leadership Dashboard:</strong> See financial health, fee status, and academic performance in real time, from any device.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="section modules-section bg-light">
        <div className="container">
          <h2 className="section-title text-center">Everything You Need in One Login</h2>
          <div className="modules-grid">
            <div className="module-card">
              <Users className="module-icon" />
              <h3>Student Records</h3>
              <p>Complete lifecycle management from admission to alumni.</p>
            </div>
            <div className="module-card">
              <CreditCard className="module-icon" />
              <h3>Fee Management & M-Pesa</h3>
              <p>Direct M-Pesa integration for zero-manual-entry reconciliation.</p>
            </div>
            <div className="module-card">
              <FileText className="module-icon" />
              <h3>Exams & Report Cards</h3>
              <p>CBC-ready grading systems for primary and secondary schools.</p>
            </div>
            <div className="module-card">
              <Briefcase className="module-icon" />
              <h3>HR & Payroll</h3>
              <p>Full Kenyan compliance with automated KRA P10 returns.</p>
            </div>
            <div className="module-card">
              <Globe className="module-icon" />
              <h3>Procurement</h3>
              <p>Track inventory, LPOs, and supplier payments easily.</p>
            </div>
            <div className="module-card">
              <BarChart className="module-icon" />
              <h3>Finance & Accounting</h3>
              <p>General ledger, balance sheets, and real-time cashflow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="section target-section">
        <div className="container">
          <h2 className="section-title text-center">Built for Every School</h2>
          <div className="target-grid">
            <div className="target-item"><School /> <span>Private Primary Schools</span></div>
            <div className="target-item"><GraduationCap /> <span>Secondary Schools</span></div>
            <div className="target-item"><Globe /> <span>International Schools</span></div>
            <div className="target-item"><BookOpen /> <span>Faith-based Schools</span></div>
            <div className="target-item"><Briefcase /> <span>TVETs & Colleges</span></div>
          </div>
        </div>
      </section>

      {/* Pricing Signal */}
      <section className="section pricing-section bg-light" style={{ padding: '6rem 0' }}>
        <div className="container">
          <h2 className="section-title text-center">Simple, Transparent Pricing</h2>
          <p className="section-subtitle text-center mb-5">No hidden fees. No upfront hardware costs. Just results.</p>
          
          <div className="pricing-grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {/* Plan 1: Starter */}
            <div className="pricing-card" style={{ background: 'white', padding: '2.5rem 2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0D1B3E', marginBottom: '1rem' }}>Starter</h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1B6B6B', marginBottom: '1.5rem' }}>
                  KES 5,000<span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#64748b' }}>/month</span>
                </div>
                <p style={{ color: '#444444', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  SIS + Fee Management. Perfect for growing schools up to 200 students.
                </p>
              </div>
              <Link to="/get-quote?service=Academic ERP&plan=Starter" className="btn btn-outline" style={{ textAlign: 'center', display: 'block' }}>Get Started</Link>
            </div>

            {/* Plan 2: Full School */}
            <div className="pricing-card" style={{ background: '#0D1B3E', color: 'white', padding: '2.5rem 2rem', borderRadius: '16px', border: '2px solid #C89B2A', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: 'scale(1.02)' }}>
              <div>
                <div style={{ background: '#C89B2A', color: 'white', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>Most Popular</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Full School</h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#C89B2A', marginBottom: '1.5rem' }}>
                  KES 15,000<span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#94a3b8' }}>/month</span>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  All 6 modules. Unlimited students. Priority onsite support and implementation training.
                </p>
              </div>
              <Link to="/get-quote?service=Academic ERP&plan=Full School" className="btn btn-secondary" style={{ textAlign: 'center', display: 'block' }}>Get Started</Link>
            </div>

            {/* Plan 3: Free Pilot */}
            <div className="pricing-card" style={{ background: 'white', padding: '2.5rem 2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0D1B3E', marginBottom: '1rem' }}>Free Pilot</h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1B6B6B', marginBottom: '1.5rem' }}>
                  KES 0<span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#64748b' }}>/60 days</span>
                </div>
                <p style={{ color: '#444444', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Full system access. All 6 modules. Try with no obligation or contract.
                </p>
              </div>
              <Link to="/get-quote?service=Academic ERP&plan=Free Pilot" className="btn btn-outline" style={{ textAlign: 'center', display: 'block' }}>Start Pilot</Link>
            </div>
          </div>

          <div className="text-center mt-5" style={{ color: '#64748b', fontSize: '0.9rem' }}>
            * One-time implementation fee of KES 30,000 – 80,000 applies based on school size. Multi-campus custom pricing is also available.
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section text-white text-center" style={{ background: '#0D1B3E', padding: '6rem 2rem' }}>
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
