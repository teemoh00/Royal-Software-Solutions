import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Landmark, PiggyBank, ShieldCheck, FilePieChart, CheckCircle, ArrowRight } from 'lucide-react';
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
      <section className="section ledger-features bg-light" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.03, backgroundImage: 'radial-gradient(#0D1B3E 1px, transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center animations-fade-in">
            <h2 className="section-title text-center" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0D1B3E', marginBottom: '1rem' }}>Core Capabilities</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Everything your SACCO needs to operate securely and efficiently.</p>
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

          <div className="features-grid bento-grid">
            {[
              {
                title: "Member Management",
                desc: "Maintain digital records, next-of-kin details, and membership status effortlessly.",
                icon: <Users size={28} />,
                color: "#3b82f6", colorLight: "rgba(59,130,246,0.1)", colorShadow: "rgba(59,130,246,0.3)",
                span: "bento-col-2"
              },
              {
                title: "Savings & Contributions",
                desc: "Track shares, deposits, and special contributions with automated statements.",
                icon: <PiggyBank size={28} />,
                color: "#10b981", colorLight: "rgba(16,185,129,0.1)", colorShadow: "rgba(16,185,129,0.3)",
                span: "bento-col-1"
              },
              {
                title: "Loan Lifecycle",
                desc: "From application and appraisal to disbursement and automated recovery.",
                icon: <Landmark size={28} />,
                color: "#C89B2A", colorLight: "rgba(200,155,42,0.1)", colorShadow: "rgba(200,155,42,0.3)",
                span: "bento-col-1"
              },
              {
                title: "Interest & Penalties",
                desc: "Flexible interest calculation (reducing balance or flat rate) with automated penalty logic.",
                icon: <ShieldCheck size={28} />,
                color: "#ef4444", colorLight: "rgba(239,68,68,0.1)", colorShadow: "rgba(239,68,68,0.3)",
                span: "bento-col-2"
              },
              {
                title: "Financial Reporting",
                desc: "Generate trial balances, income statements, and SASRA-compliant reports instantly.",
                icon: <FilePieChart size={28} />,
                color: "#8b5cf6", colorLight: "rgba(139,92,246,0.1)", colorShadow: "rgba(139,92,246,0.3)",
                span: "bento-col-2"
              }
            ].map((mod, i) => (
              <div 
                key={i} 
                className={`feature-card bento-item animations-fade-in ${mod.span}`} 
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
                  Explore Capability <ArrowRight size={16} />
                </div>
              </div>
            ))}
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
      <section className="section ledger-target" style={{ background: 'linear-gradient(to bottom, #f8fafc, #ffffff)', padding: '6rem 0' }}>
        <div className="container">
          <h2 className="section-title text-center" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0D1B3E', marginBottom: '3rem' }}>Who Uses Fahari Ledger?</h2>
          
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
          
          <div className="target-grid-ledger premium-target-grid">
            {[
              { icon: <Landmark size={24} />, text: "SACCOs (Small & Medium)" },
              { icon: <ShieldCheck size={24} />, text: "Microfinance Institutions" },
              { icon: <Users size={24} />, text: "Church Cooperatives" },
              { icon: <CheckCircle size={24} />, text: "Teacher Welfare Groups" },
              { icon: <PiggyBank size={24} />, text: "Investment Groups (Chamas)" }
            ].map((item, i) => (
              <div key={i} className="target-item premium-target-item animations-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="premium-target-icon">
                  {item.icon}
                </div>
                <span className="premium-target-text">{item.text}</span>
              </div>
            ))}
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
