import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Landmark, PiggyBank, ShieldCheck, FilePieChart, CheckCircle } from 'lucide-react';
import SEO from './SEO';

const FahariLedger = () => {
  return (
    <div className="product-page">
      <SEO 
        title="Fahari Ledger - SACCO & MFI Management" 
        description="The SACCO & Microfinance management system built for Africa. Compliant with SASRA regulations."
        path="/fahari-ledger"
      />

      {/* Hero Section */}
      <section className="product-hero ledger-hero">
        <div className="container">
          <h1 className="hero-title">Every member trusts you with their savings. Give that trust the infrastructure it deserves.</h1>
          <p className="hero-subtitle">Fahari Ledger is the purpose-built core financial management system for SACCOs, microfinance institutions, and community cooperatives across East Africa — accurate, transparent, compliant, and built for the African cooperative context.</p>
          <div className="hero-cta" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/get-quote?service=Accounting" className="btn btn-primary">Book a Free Demo</Link>
            <a href="https://wa.me/254759437978?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20Fahari%20Ledger." className="btn btn-outline" style={{ color: 'white', borderColor: 'white', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              WhatsApp Us Now
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section ledger-features">
        <div className="container">
          <h2 className="section-title text-center">Core Capabilities</h2>
          <div className="features-grid">
            <div className="feature-card">
              <Users className="feature-icon" />
              <h3>Member Management</h3>
              <p>Maintain digital records, next-of-kin details, and membership status effortlessly.</p>
            </div>
            <div className="feature-card">
              <PiggyBank className="feature-icon" />
              <h3>Savings & Contributions</h3>
              <p>Track shares, deposits, and special contributions with automated statements.</p>
            </div>
            <div className="feature-card">
              <Landmark className="feature-icon" />
              <h3>Loan Lifecycle</h3>
              <p>From application and appraisal to disbursement and automated recovery.</p>
            </div>
            <div className="feature-card">
              <ShieldCheck className="feature-icon" />
              <h3>Interest & Penalties</h3>
              <p>Flexible interest calculation (reducing balance or flat rate) with automated penalty logic.</p>
            </div>
            <div className="feature-card">
              <FilePieChart className="feature-icon" />
              <h3>Financial Reporting</h3>
              <p>Generate trial balances, income statements, and SASRA-compliant reports instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Note */}
      <section className="section compliance-section bg-light">
        <div className="container">
          <div className="compliance-box">
            <div className="compliance-icon-box">
              <CheckCircle size={48} />
            </div>
            <div className="compliance-text">
              <h3>Regulatory Compliance</h3>
              <p>Fahari Ledger is built to be compliant with <strong>SASRA regulations</strong> and <strong>Kenya Cooperative Society requirements</strong>. We ensure your data is secure and your reporting is accurate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="section ledger-target">
        <div className="container">
          <h2 className="section-title text-center">Who Uses Fahari Ledger?</h2>
          <div className="target-grid-ledger">
            <div className="target-item">SACCOs (Small & Medium)</div>
            <div className="target-item">Microfinance Institutions</div>
            <div className="target-item">Church Cooperatives</div>
            <div className="target-item">Teacher Welfare Groups</div>
            <div className="target-item">Investment Groups (Chamas)</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section text-white text-center" style={{ background: '#0D1B3E', padding: '6rem 2rem' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 'bold', color: 'white' }}>
            Your members deserve a SACCO that operates at its full potential.
          </h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 2.5rem auto', fontSize: '1.15rem', color: '#D4C5A0', lineHeight: '1.6' }}>
            Modernize your financial group today with a core ledger system built for security, audit readiness, and member trust.
          </p>
          <div className="cta-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/get-quote?service=Accounting" className="btn btn-pill-primary" style={{ background: '#C89B2A', borderColor: '#C89B2A', padding: '0.8rem 2.5rem', color: 'white', borderRadius: '30px', fontWeight: 'bold', textDecoration: 'none' }}>
              Book a Free Demo
            </Link>
            <a href="https://wa.me/254759437978?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20Fahari%20Ledger." className="btn btn-primary" style={{ background: '#25D366', borderColor: '#25D366', padding: '0.8rem 2.5rem', color: 'white', borderRadius: '30px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              WhatsApp Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FahariLedger;
