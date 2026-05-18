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
          <h1 className="hero-title">The Complete School Management System for East African Schools</h1>
          <p className="hero-subtitle">From fee collection to report cards, HR to procurement — run your entire school digitally.</p>
          <div className="hero-cta">
            <Link to="/get-quote?service=Academic ERP" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </section>

      {/* Problems vs Solutions */}
      <section className="section problems-solutions">
        <div className="container">
          <h2 className="section-title text-center">Stop Managing Chaos. Start Managing Growth.</h2>
          <div className="prob-sol-grid">
            <div className="prob-card">
              <h3>The Problems</h3>
              <ul>
                <li><strong>Fee Leakage:</strong> Manual receipts lead to errors and untracked payments.</li>
                <li><strong>Manual Report Cards:</strong> Teachers spend weeks calculating grades by hand.</li>
                <li><strong>Payroll Chaos:</strong> Statutory deductions (NHIF/NSSF) are a nightmare to calculate.</li>
                <li><strong>Zero Visibility:</strong> Directors can't see the school's financial position in real-time.</li>
              </ul>
            </div>
            <div className="sol-card">
              <h3>The Fahari Solution</h3>
              <ul>
                <li><strong>Automated Reconciliation:</strong> Direct M-Pesa integration with instant receipting.</li>
                <li><strong>One-Click Reports:</strong> Generate CBC and KCSE report cards in seconds.</li>
                <li><strong>Compliant Payroll:</strong> Automatic calculation of PAYE, NHIF, NSSF and housing levy.</li>
                <li><strong>Executive Dashboard:</strong> Real-time financial and academic insights at your fingertips.</li>
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
      <section className="section pricing-signal">
        <div className="container text-center">
          <div className="pricing-box">
            <h2>Starting from KES 4,000/month</h2>
            <p className="highlight">Discounted two months for qualifying schools</p>
            <p>No upfront hardware costs. Just results.</p>
            <Link to="/get-quote?service=Academic ERP" className="btn btn-secondary">Request Your Free Pilot</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FahariAcademia;
