import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, BarChart3, ShieldCheck, ShoppingCart, Warehouse, Truck, Users2, FileSpreadsheet, Globe, ArrowRight } from 'lucide-react';
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
          <h2 className="section-title text-center">Stop Chasing Your Business. Start Directing It.</h2>
          <p className="text-center text-muted mb-5" style={{ maxWidth: '800px', margin: '0 auto 3rem auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Most African SMEs are making their most critical decisions — hiring, investing, expanding — on incomplete information. Sales tracked in one place. Stock managed somewhere else. Procurement approvals going through WhatsApp. Finance updated once a month when the accountant visits. Nobody can tell you the real profit margin without making three calls. You are not running your business. You are chasing it. Fahari Nexus ends that.
          </p>
          <div className="prob-sol-grid">
            <div className="prob-card">
              <h3>The Problems</h3>
              <ul>
                <li><strong>Invisible Profit Margins:</strong> Sales, inventory, and accounting in three systems with no integration.</li>
                <li><strong>Stock Surprises:</strong> Running out of inventory with no warning. Over-ordering. Supplier disputes with no records.</li>
                <li><strong>Approval Bottlenecks:</strong> Purchase approvals via WhatsApp. No audit trail. Money leaving untracked.</li>
                <li><strong>Lost Sales:</strong> No pipeline visibility. Quotes forgotten. Customers following up before your team does.</li>
              </ul>
            </div>
            <div className="sol-card">
              <h3>The Fahari Nexus Solution</h3>
              <ul>
                <li><strong>Live Business Intelligence:</strong> Real-time revenue, cost, and margin visibility across every department, every day.</li>
                <li><strong>Full Inventory Control:</strong> Stock levels, reorder points, supplier performance — always visible, always accurate.</li>
                <li><strong>Structured Approval Workflows:</strong> Multi-level purchase approvals with a complete audit trail from request to payment.</li>
                <li><strong>Sales Pipeline Clarity:</strong> Every lead, every quote, every order tracked. Your team closes faster and follows up on time.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="section modules-section bg-light">
        <div className="container">
          <h2 className="section-title text-center">One Unified Business Platform</h2>
          <p className="section-subtitle text-center mb-5">Connected modules that share a common data layer and a single billing relation.</p>
          <div className="modules-grid">
            <div className="module-card">
              <ShoppingCart className="module-icon" />
              <h3>Sales Management</h3>
              <p>Lead tracking, quotation management, sales orders, customer profiles, and real-time revenue pipeline.</p>
            </div>
            <div className="module-card">
              <ShieldCheck className="module-icon" />
              <h3>Finance & Approvals</h3>
              <p>Budget management, expense tracking, multi-level approval workflows, accounts payable and receivable.</p>
            </div>
            <div className="module-card">
              <Truck className="module-icon" />
              <h3>Procurement</h3>
              <p>Purchase requisitions, LPO generation, supplier management, goods receipt notes, and three-way matching.</p>
            </div>
            <div className="module-card">
              <Warehouse className="module-icon" />
              <h3>Inventory & Stores</h3>
              <p>Real-time stock levels, reorder point alerts, stock movement history, and automated low-stock notifications.</p>
            </div>
            <div className="module-card">
              <Users2 className="module-icon" />
              <h3>Supplier Management</h3>
              <p>Supplier profiles, price lists, contract management, delivery tracking, and supplier performance scoring.</p>
            </div>
            <div className="module-card">
              <BarChart3 className="module-icon" />
              <h3>Reports & Analytics</h3>
              <p>Custom dashboards for sales, procurement, and inventory. Export-ready reports generated in one click.</p>
            </div>
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
          
          <div className="pricing-grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {/* Plan 1: SME Starter */}
            <div className="pricing-card" style={{ background: 'white', padding: '2.5rem 2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0D1B3E', marginBottom: '1rem' }}>SME Starter</h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1B6B6B', marginBottom: '1.5rem' }}>
                  KES 8,000<span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#64748b' }}>/month</span>
                </div>
                <p style={{ color: '#444444', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Sales + Inventory core features. Perfect for growing retail or wholesale setups. Up to 5 users.
                </p>
              </div>
              <Link to="/get-quote?service=Business ERP&plan=Starter" className="btn btn-outline" style={{ textAlign: 'center', display: 'block' }}>Get Started</Link>
            </div>

            {/* Plan 2: Full Business */}
            <div className="pricing-card" style={{ background: '#0D1B3E', color: 'white', padding: '2.5rem 2rem', borderRadius: '16px', border: '2px solid #C89B2A', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: 'scale(1.02)' }}>
              <div>
                <div style={{ background: '#C89B2A', color: 'white', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>Recommended</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Full Business</h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#C89B2A', marginBottom: '1.5rem' }}>
                  KES 20,000<span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#94a3b8' }}>/month</span>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  All 6 core modules. Unlimited users. Advanced approvals, procurement integration, and priority support.
                </p>
              </div>
              <Link to="/get-quote?service=Business ERP&plan=Full Business" className="btn btn-secondary" style={{ textAlign: 'center', display: 'block' }}>Get Started</Link>
            </div>

            {/* Plan 3: Free Pilot */}
            <div className="pricing-card" style={{ background: 'white', padding: '2.5rem 2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0D1B3E', marginBottom: '1rem' }}>Free Pilot</h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1B6B6B', marginBottom: '1.5rem' }}>
                  KES 0<span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#64748b' }}>/30 days</span>
                </div>
                <p style={{ color: '#444444', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Full system access. Explore all modules in your business environment. No obligation.
                </p>
              </div>
              <Link to="/get-quote?service=Business ERP&plan=Free Pilot" className="btn btn-outline" style={{ textAlign: 'center', display: 'block' }}>Start Pilot</Link>
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
