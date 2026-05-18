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
          <h1 className="hero-title">The SACCO & Microfinance Management System Built for Africa</h1>
          <p className="hero-subtitle">Secure, transparent, and compliant management for financial cooperatives and groups.</p>
          <div className="hero-cta">
            <Link to="/get-quote?service=Accounting" className="btn btn-primary">Book a Demo</Link>
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
      <section className="section ledger-cta">
        <div className="container text-center">
          <h2>Modernize Your Financial Group Today</h2>
          <p>Get a system that works as hard as you do.</p>
          <br />
          <Link to="/get-quote?service=Accounting" className="btn btn-primary">Request a Custom Quote</Link>
        </div>
      </section>
    </div>
  );
};

export default FahariLedger;
