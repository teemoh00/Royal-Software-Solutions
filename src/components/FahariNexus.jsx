import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, BarChart3, ShieldCheck, ShoppingCart, Warehouse, Truck, Users2, FileSpreadsheet, Globe, ArrowRight, XCircle, CheckCircle2 } from 'lucide-react';
import SEO from './SEO';

const FahariNexus = () => {
  return (
    <div className="product-page">
      <SEO 
        title="Fahari Nexus - Business Operations & ERP" 
        description="Fahari Nexus connects sales, inventory, procurement, and finance for African SMEs and enterprises. Built for East Africa. Live in 24 hours."
        path="/fahari-nexus"
      />
      
      {/* Hero Section */}
      <section className="product-hero nexus-hero" style={{ background: 'linear-gradient(135deg, #0d1b3e 0%, #1b6b6b 100%)' }}>
        <div className="container">
          <h1 className="hero-title">Your business should never make decisions in the dark.</h1>
          <p className="hero-subtitle">Fahari Nexus connects your sales, procurement, inventory, and finances into one intelligent system — so you see your business clearly, move faster than your competition, and grow without operational chaos holding you back.</p>
          <div className="hero-cta" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/get-quote?service=Business ERP" className="btn btn-primary">Book a Free Demo</Link>
            <Link to="/get-quote?service=Business ERP" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>Start Your 30-Day Free Pilot</Link>
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
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, #0D1B3E 0%, #1B6B6B 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem'
            }}>
              Stop Chasing Your Business. Start Directing It.
            </h2>
            
            <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.7', color: '#475569' }}>
              Most African SMEs are making their most critical decisions on incomplete information. Sales tracked in one place. Stock managed somewhere else. Procurement via WhatsApp. <span style={{ color: '#ef4444', fontWeight: 600 }}>You are not running your business. You are chasing it.</span>
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
                <span>Nobody can tell you the real profit margin without making three calls. Fahari Nexus ends that.</span>
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
            .problem-side { padding-right: 1rem; }
            .solution-side { padding-left: 1rem; }
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
              .comparison-row { grid-template-columns: 1fr; gap: 1rem; padding: 1.5rem; text-align: center; }
              .comparison-icon-center { transform: rotate(90deg); margin: 0 auto; }
              .problem-header, .solution-header { justify-content: center; }
              .problem-side { padding-right: 0; padding-bottom: 1rem; border-bottom: 1px dashed #e2e8f0; }
              .solution-side { padding-left: 0; padding-top: 1rem; }
            }
          `}</style>

          <div className="comparison-container">
            {[
              {
                probTitle: "Invisible Profit Margins",
                probDesc: "Sales, inventory, and accounting in three systems with no integration.",
                solTitle: "Live Business Intelligence",
                solDesc: "Real-time revenue, cost, and margin visibility across every department, every day."
              },
              {
                probTitle: "Stock Surprises",
                probDesc: "Running out of inventory with no warning. Over-ordering. Supplier disputes.",
                solTitle: "Full Inventory Control",
                solDesc: "Stock levels, reorder points, supplier performance — always visible, always accurate."
              },
              {
                probTitle: "Approval Bottlenecks",
                probDesc: "Purchase approvals via WhatsApp. No audit trail. Money leaving untracked.",
                solTitle: "Structured Approval Workflows",
                solDesc: "Multi-level purchase approvals with a complete audit trail from request to payment."
              },
              {
                probTitle: "Lost Sales",
                probDesc: "No pipeline visibility. Quotes forgotten. Customers following up before you do.",
                solTitle: "Sales Pipeline Clarity",
                solDesc: "Every lead, every quote, every order tracked. Your team closes faster and follows up on time."
              }
            ].map((item, i) => (
              <div className="comparison-row animations-fade-in" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="problem-side">
                  <div className="problem-header"><XCircle size={18} /> {item.probTitle}</div>
                  <div className="prob-desc">{item.probDesc}</div>
                </div>
                <div className="comparison-icon-center"><ArrowRight size={24} /></div>
                <div className="solution-side">
                  <div className="solution-header"><CheckCircle2 size={18} /> {item.solTitle}</div>
                  <div className="sol-desc">{item.solDesc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="section modules-section bg-light" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.03, backgroundImage: 'radial-gradient(#0D1B3E 1px, transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center animations-fade-in">
            <h2 className="section-title text-center" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0D1B3E', marginBottom: '1rem' }}>One Unified Business Platform</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Connected modules that share a common data layer and a single billing relation.</p>
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
            .bento-item:hover .bento-bg-glow { opacity: 1; }
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
            .bento-title { font-size: 1.4rem; font-weight: 800; color: #1e293b; margin-bottom: 1rem; }
            .bento-desc { color: #64748b; font-size: 1.05rem; line-height: 1.6; }
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
            .bento-item:hover .bento-explore { opacity: 1; transform: translateX(0); }
            @media (max-width: 992px) { .bento-grid { grid-template-columns: repeat(2, 1fr); } .bento-col-2 { grid-column: span 2; } .bento-col-1 { grid-column: span 1; } }
            @media (max-width: 768px) { .bento-grid { grid-template-columns: 1fr; } .bento-col-2, .bento-col-1 { grid-column: span 1; } }
          `}</style>

          <div className="modules-grid bento-grid">
            {[
              {
                title: "Sales Management",
                desc: "Lead tracking, quotation management, sales orders, and real-time revenue pipeline.",
                icon: <ShoppingCart size={28} />,
                color: "#10b981", colorLight: "rgba(16,185,129,0.1)", colorShadow: "rgba(16,185,129,0.3)",
                span: "bento-col-2"
              },
              {
                title: "Finance & Approvals",
                desc: "Budget management, multi-level workflows, and accounts payable/receivable.",
                icon: <ShieldCheck size={28} />,
                color: "#3b82f6", colorLight: "rgba(59,130,246,0.1)", colorShadow: "rgba(59,130,246,0.3)",
                span: "bento-col-1"
              },
              {
                title: "Procurement",
                desc: "Purchase requisitions, LPO generation, and supplier goods matching.",
                icon: <Truck size={28} />,
                color: "#ec4899", colorLight: "rgba(236,72,153,0.1)", colorShadow: "rgba(236,72,153,0.3)",
                span: "bento-col-1"
              },
              {
                title: "Inventory & Stores",
                desc: "Real-time stock levels, reorder point alerts, and stock movement history.",
                icon: <Warehouse size={28} />,
                color: "#8b5cf6", colorLight: "rgba(139,92,246,0.1)", colorShadow: "rgba(139,92,246,0.3)",
                span: "bento-col-2"
              },
              {
                title: "Supplier Management",
                desc: "Supplier profiles, contract management, delivery tracking, and performance scoring.",
                icon: <Users2 size={28} />,
                color: "#14b8a6", colorLight: "rgba(20,184,166,0.1)", colorShadow: "rgba(20,184,166,0.3)",
                span: "bento-col-2"
              },
              {
                title: "Reports & Analytics",
                desc: "Custom dashboards for sales, procurement, and inventory. Export-ready in one click.",
                icon: <BarChart3 size={28} />,
                color: "#C89B2A", colorLight: "rgba(200,155,42,0.1)", colorShadow: "rgba(200,155,42,0.3)",
                span: "bento-col-1"
              }
            ].map((mod, i) => (
              <div 
                key={i} 
                className={`module-card bento-item animations-fade-in ${mod.span}`} 
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

      {/* AfCFTA Section */}
      <section className="section afcfta-section bg-white" style={{ padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: '#1b6b6b18', color: '#1b6b6b', padding: '6px 16px', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '1px' }}>
            Cross-Border Ready
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2.4rem', color: '#0d1b3e', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Built for the AfCFTA era — trade without borders.
          </h2>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#444444', textAlign: 'justify', marginBottom: 0 }}>
            As the African Continental Free Trade Area opens intra-African commerce, businesses need cross-border inventory visibility, multi-currency financial management, and procurement systems that work across Kenya, Uganda, Tanzania, and beyond. Fahari Nexus is designed for exactly this — your operational infrastructure for the continent.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section pricing-section bg-light" style={{ padding: '6rem 0' }}>
        <div className="container">
          <h2 className="section-title text-center">Simple, Transparent Pricing</h2>
          <p className="section-subtitle text-center mb-5">Grow your business without operational bottlenecks or hidden fees.</p>
          
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
                Tailored For Your Business
              </div>
              <h3 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                Enterprise-grade ERP, scaled to your operational volume.
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2.5rem', maxWidth: '500px' }}>
                Whether you're processing 50 invoices a month or 5,000, you get access to the exact same powerful suite. Our custom pricing ensures you only pay for the value and scale you use.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/get-quote?service=Business ERP" className="btn" style={{ background: '#C89B2A', color: 'white', padding: '1rem 2rem', borderRadius: '30px', fontWeight: 'bold', border: 'none', boxShadow: '0 4px 14px 0 rgba(200, 155, 42, 0.39)', textDecoration: 'none' }}>
                  Request a Custom Quote
                </Link>
                <Link to="/get-quote?service=Business ERP" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '1rem 2rem', borderRadius: '30px', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', textDecoration: 'none' }}>
                  Book a 30-Day Pilot
                </Link>
              </div>
            </div>

            <div className="pricing-features" style={{ flex: '1 1 40%', background: 'rgba(0, 0, 0, 0.2)', padding: '4rem 3rem', zIndex: 1, borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
              <h4 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '2rem' }}>What's Always Included:</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  "All Core ERP Modules",
                  "Multi-Level Approval Workflows",
                  "AfCFTA Cross-Border Readiness",
                  "Live Financial Dashboards",
                  "Unlimited User Seats",
                  "Priority B2B Support"
                ].map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#f1f5f9', fontSize: '1.05rem' }}>
                    <CheckCircle2 size={20} color="#10b981" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section text-white text-center" style={{ background: '#0D1B3E', padding: '6rem 2rem' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 'bold', color: 'white' }}>
            See Fahari Nexus running your business.
          </h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 2.5rem auto', fontSize: '1.15rem', color: '#D4C5A0', lineHeight: '1.6' }}>
            Book a free 30-minute live demo. We map the system to your specific business operations — no generic walkthrough.
          </p>
          <div className="cta-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/get-quote?service=Business ERP" className="btn btn-pill-primary" style={{ background: '#C89B2A', borderColor: '#C89B2A', padding: '0.8rem 2.5rem', color: 'white', borderRadius: '30px', fontWeight: 'bold', textDecoration: 'none' }}>
              Book Your Free Demo
            </Link>
            <a href="https://wa.me/254759437978?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20Fahari%20Nexus." className="btn btn-primary" style={{ background: '#25D366', borderColor: '#25D366', padding: '0.8rem 2.5rem', color: 'white', borderRadius: '30px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              WhatsApp Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FahariNexus;
