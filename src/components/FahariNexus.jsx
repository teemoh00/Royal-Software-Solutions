import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, BarChart3, ShieldCheck, ShoppingCart, Warehouse, Truck, Users2, FileSpreadsheet, Globe, ArrowRight, XCircle, CheckCircle2 } from 'lucide-react';
import SEO from './SEO';

const FahariNexus = () => {
  return (
    <div className="product-page">
      <SEO 
        title="Fahari Nexus — Business ERP for African SMEs & Enterprises" 
        description="Run your entire business on Fahari Nexus. Sales, inventory, procurement, HR, and finance — unified. Built for East Africa. M-Pesa integrated. Live in 24 hours."
        path="/fahari-nexus"
      />
      
      {/* Hero Section */}
      <section className="nexus-hero-v2" style={{ position: 'relative', overflow: 'hidden', background: '#070f1e', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        {/* Deep space gradient layers */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(27,107,107,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 10% 80%, rgba(200,155,42,0.07) 0%, transparent 50%), linear-gradient(180deg, #070f1e 0%, #0d1b3e 100%)', pointerEvents: 'none' }} />
        {/* Grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none', maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '9rem', paddingBottom: '5rem', width: '100%' }}>

          <style>{`
            .nexus-hero-v2 { font-family: 'Inter', system-ui, sans-serif; }
            .nexus-hero-inner {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 4rem;
              align-items: center;
            }
            @media (max-width: 900px) {
              .nexus-hero-inner { grid-template-columns: 1fr; gap: 3rem; text-align: center; }
              .nexus-hero-cta { justify-content: center !important; }
              .nexus-hero-badges { justify-content: center !important; }
              .nexus-orb-wrap { display: none; }
            }
            .nexus-stats-row { display: flex; gap: 2.5rem; margin-top: 2.5rem; flex-wrap: wrap; }
            @media (max-width: 900px) { .nexus-stats-row { justify-content: center; } }
            .nexus-stat { display: flex; flex-direction: column; }
            .nexus-stat-val { font-size: 2rem; font-weight: 900; color: #ffffff; line-height: 1; letter-spacing: -1px; }
            .nexus-stat-label { font-size: 0.78rem; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
            .nexus-float-card {
              position: absolute;
              background: rgba(13,27,62,0.85);
              backdrop-filter: blur(16px);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 16px;
              padding: 0.9rem 1.2rem;
              display: flex;
              align-items: center;
              gap: 0.75rem;
              box-shadow: 0 8px 32px rgba(0,0,0,0.4);
              animation: nexus-float 4s ease-in-out infinite;
              min-width: 180px;
            }
            .nexus-float-card:nth-child(2) { animation-delay: -2s; }
            @keyframes nexus-float {
              0%,100% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
            }
            .nexus-card-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
            .nexus-card-val { font-size: 1rem; font-weight: 800; color: #fff; line-height: 1.1; }
            .nexus-card-sub { font-size: 0.7rem; color: #64748b; }
            .nexus-orb-wrap { position: relative; height: 500px; display: flex; align-items: center; justify-content: center; }
            .nexus-orb {
              width: 360px; height: 360px;
              border-radius: 50%;
              background: radial-gradient(circle at 35% 35%, rgba(27,107,107,0.35) 0%, rgba(13,27,62,0.6) 50%, transparent 70%);
              border: 1px solid rgba(27,107,107,0.3);
              position: relative;
              animation: nexus-pulse 5s ease-in-out infinite;
              box-shadow: 0 0 80px rgba(27,107,107,0.2), inset 0 0 60px rgba(27,107,107,0.1);
            }
            @keyframes nexus-pulse {
              0%,100% { box-shadow: 0 0 80px rgba(27,107,107,0.2), inset 0 0 60px rgba(27,107,107,0.1); }
              50% { box-shadow: 0 0 120px rgba(27,107,107,0.35), inset 0 0 80px rgba(27,107,107,0.18); }
            }
            .nexus-orb-ring {
              position: absolute; border-radius: 50%;
              border: 1px solid rgba(27,107,107,0.2);
              animation: nexus-ring-spin 20s linear infinite;
            }
            .nexus-orb-ring:nth-child(2) { width: 430px; height: 430px; top: -35px; left: -35px; animation-duration: 15s; border-color: rgba(200,155,42,0.15); }
            .nexus-orb-ring:nth-child(3) { width: 510px; height: 510px; top: -75px; left: -75px; animation-duration: 25s; animation-direction: reverse; }
            @keyframes nexus-ring-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .nexus-orb-ring::before, .nexus-orb-ring::after {
              content: ''; position: absolute; width: 8px; height: 8px; border-radius: 50%;
              background: #1b6b6b; top: 50%; left: -4px; box-shadow: 0 0 10px #1b6b6b;
            }
            .nexus-orb-ring::after { top: 0; left: 50%; background: #C89B2A; box-shadow: 0 0 10px #C89B2A; }
            .nexus-mockup-panel {
              position: absolute; bottom: 20px; left: -30px; width: 240px;
              background: rgba(7,15,30,0.92); backdrop-filter: blur(20px);
              border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;
              padding: 1.2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            }
            .nexus-mockup-hdr { display: flex; align-items: center; gap: 6px; margin-bottom: 1rem; }
            .nexus-mock-dot { width: 8px; height: 8px; border-radius: 50%; }
            .nexus-mock-title { font-size: 0.7rem; color: rgba(255,255,255,0.4); font-weight: 600; margin-left: 4px; }
            .nexus-mock-row {
              display: flex; justify-content: space-between; align-items: center;
              padding: 0.45rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.78rem;
            }
            .nexus-mock-row:last-child { border-bottom: none; }
            .nexus-mock-row-label { color: rgba(255,255,255,0.45); }
            .nexus-mock-row-val { color: #fff; font-weight: 700; }
            .nexus-mock-badge { font-size: 0.65rem; padding: 2px 7px; border-radius: 20px; font-weight: 700; }
            .nexus-afcfta-badge {
              position: absolute; top: 40px; right: -20px;
              background: linear-gradient(135deg, rgba(200,155,42,0.2), rgba(200,155,42,0.05));
              border: 1px solid rgba(200,155,42,0.4); border-radius: 12px;
              padding: 0.7rem 1rem; text-align: center; backdrop-filter: blur(12px);
            }
            .nexus-afcfta-label { font-size: 0.65rem; color: #C89B2A; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; line-height: 1.4; margin-top: 4px; }
            .nexus-trust-strip { margin-top: 4rem; padding-top: 2.5rem; border-top: 1px solid rgba(255,255,255,0.06); }
            .nexus-trust-label { font-size: 0.75rem; color: #475569; text-transform: uppercase; letter-spacing: 1.5px; text-align: center; margin-bottom: 1.5rem; }
            .nexus-logos-row { display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap; }
            .nexus-logo-pill {
              padding: 0.5rem 1.4rem; border: 1px solid rgba(255,255,255,0.08);
              border-radius: 50px; color: rgba(255,255,255,0.35); font-size: 0.85rem;
              font-weight: 700; letter-spacing: 0.5px; white-space: nowrap;
              transition: all 0.3s ease;
            }
            .nexus-logo-pill:hover { color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.2); }
          `}</style>

          <div className="nexus-hero-inner">
            {/* LEFT: Text + Stats */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', background: 'rgba(27,107,107,0.15)', border: '1px solid rgba(27,107,107,0.35)', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 700, color: '#4db8b8', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '1.5rem' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#1b6b6b', boxShadow: '0 0 8px #1b6b6b', display: 'inline-block' }} />
                Business ERP — East Africa
              </div>

              <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-1.5px' }}>
                Your business should never<br />
                <span style={{ background: 'linear-gradient(90deg, #1b9e9e, #4dd4ac)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>make decisions in the dark.</span>
              </h1>

              <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.8, maxWidth: '520px', marginBottom: '2.5rem' }}>
                Fahari Nexus connects your sales, procurement, inventory, and finances into <strong style={{ color: '#e2e8f0' }}>one intelligent system</strong> — so you see your business clearly, move faster, and grow without chaos.
              </p>

              <div className="nexus-hero-cta" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <Link to="/get-quote?service=Business ERP" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.9rem 2rem', background: 'linear-gradient(135deg, #1b6b6b, #0d9488)', color: '#fff', borderRadius: '50px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 8px 28px rgba(27,107,107,0.4)', transition: 'all 0.25s ease' }}>
                  Book a Free Demo <ArrowRight size={18} />
                </Link>
                <Link to="/get-quote?service=Business ERP" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.9rem 2rem', background: 'rgba(255,255,255,0.06)', color: '#e2e8f0', borderRadius: '50px', fontWeight: 600, fontSize: '1rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', transition: 'all 0.25s ease' }}>
                  Start 30-Day Free Pilot
                </Link>
              </div>

              <div className="nexus-hero-badges" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.5rem' }}>
                {['No credit card required', 'Live in 24 hours', 'M-Pesa integrated'].map((t, i) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.82rem' }}>
                    <CheckCircle size={14} color="#1b6b6b" /> {t}
                  </span>
                ))}
              </div>

              <div className="nexus-stats-row">
                {[
                  { val: '40+', label: 'Businesses Live' },
                  { val: 'KSh 2B+', label: 'Processed' },
                  { val: '5', label: 'EA Countries' },
                  { val: '24hr', label: 'Setup Time' },
                ].map((s, i) => (
                  <div key={i} className="nexus-stat">
                    <div className="nexus-stat-val">{s.val}</div>
                    <div className="nexus-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Orb + floating cards */}
            <div className="nexus-orb-wrap">
              <div className="nexus-orb">
                <div className="nexus-orb-ring" />
                <div className="nexus-orb-ring" />
                <div className="nexus-orb-ring" />
                <svg viewBox="0 0 360 360" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }}>
                  <ellipse cx="180" cy="180" rx="120" ry="160" fill="none" stroke="#4dd4ac" strokeWidth="0.8" />
                  <ellipse cx="180" cy="180" rx="160" ry="120" fill="none" stroke="#4dd4ac" strokeWidth="0.8" />
                  <ellipse cx="180" cy="180" rx="80" ry="160" fill="none" stroke="#1b6b6b" strokeWidth="0.8" />
                  <line x1="40" y1="180" x2="320" y2="180" stroke="#1b6b6b" strokeWidth="0.8" />
                  <line x1="180" y1="20" x2="180" y2="340" stroke="#1b6b6b" strokeWidth="0.8" />
                  <circle cx="180" cy="180" r="120" fill="none" stroke="#4dd4ac" strokeWidth="0.8" />
                  {[[180,100],[240,150],[130,200],[220,220],[150,140]].map(([cx,cy],i) => (
                    <g key={i}>
                      <circle cx={cx} cy={cy} r="5" fill="#C89B2A" opacity="0.9" />
                      <circle cx={cx} cy={cy} r="10" fill="none" stroke="#C89B2A" strokeWidth="0.6" opacity="0.5" />
                    </g>
                  ))}
                  <line x1="180" y1="100" x2="240" y2="150" stroke="#C89B2A" strokeWidth="0.6" opacity="0.5" />
                  <line x1="240" y1="150" x2="220" y2="220" stroke="#C89B2A" strokeWidth="0.6" opacity="0.5" />
                  <line x1="130" y1="200" x2="150" y2="140" stroke="#C89B2A" strokeWidth="0.6" opacity="0.5" />
                  <line x1="150" y1="140" x2="180" y2="100" stroke="#C89B2A" strokeWidth="0.6" opacity="0.5" />
                </svg>
              </div>

              {/* Float card 1 */}
              <div className="nexus-float-card" style={{ top: 30, left: -20 }}>
                <div className="nexus-card-icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>
                  <BarChart3 size={18} />
                </div>
                <div>
                  <div className="nexus-card-val">KSh 4.2M</div>
                  <div className="nexus-card-sub">Revenue this month</div>
                </div>
              </div>

              {/* Float card 2 */}
              <div className="nexus-float-card" style={{ bottom: 80, right: -30 }}>
                <div className="nexus-card-icon" style={{ background: 'rgba(200,155,42,0.15)', color: '#C89B2A' }}>
                  <ShoppingCart size={18} />
                </div>
                <div>
                  <div className="nexus-card-val">142 Orders</div>
                  <div className="nexus-card-sub">Processed today</div>
                </div>
              </div>

              {/* Live mockup panel */}
              <div className="nexus-mockup-panel">
                <div className="nexus-mockup-hdr">
                  <div className="nexus-mock-dot" style={{ background: '#ef4444' }} />
                  <div className="nexus-mock-dot" style={{ background: '#f59e0b' }} />
                  <div className="nexus-mock-dot" style={{ background: '#10b981' }} />
                  <span className="nexus-mock-title">Nexus — Live Dashboard</span>
                </div>
                {[
                  { label: 'Inventory', val: '98.4%', badge: 'Healthy', badgeBg: 'rgba(16,185,129,0.15)', badgeColor: '#10b981' },
                  { label: 'Open LPOs', val: '7', badge: 'Pending', badgeBg: 'rgba(245,158,11,0.15)', badgeColor: '#f59e0b' },
                  { label: 'Payables', val: 'KSh 840K', badge: 'On Time', badgeBg: 'rgba(16,185,129,0.15)', badgeColor: '#10b981' },
                  { label: 'Pipeline', val: 'KSh 3.1M', badge: 'Active', badgeBg: 'rgba(27,107,107,0.15)', badgeColor: '#4db8b8' },
                ].map((r, i) => (
                  <div key={i} className="nexus-mock-row">
                    <span className="nexus-mock-row-label">{r.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="nexus-mock-row-val">{r.val}</span>
                      <span className="nexus-mock-badge" style={{ background: r.badgeBg, color: r.badgeColor }}>{r.badge}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AfCFTA badge */}
              <div className="nexus-afcfta-badge">
                <Globe size={22} color="#C89B2A" />
                <div className="nexus-afcfta-label">AfCFTA<br />Ready</div>
              </div>
            </div>
          </div>

          {/* Trust / sector strip */}
          <div className="nexus-trust-strip">
            <div className="nexus-trust-label">Trusted by businesses across East Africa</div>
            <div className="nexus-logos-row">
              {['Retail', 'Manufacturing', 'Distribution', 'Hospitality', 'Agribusiness', 'NGOs & Institutions'].map((sector, i) => (
                <div key={i} className="nexus-logo-pill">{sector}</div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* Problems vs Solutions — Before/After Split Cards */}
      <section style={{ position: 'relative', background: 'linear-gradient(180deg, #0a1628 0%, #0d1b3e 100%)', padding: '7rem 0', overflow: 'hidden' }}>
        {/* subtle diagonal pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div className="text-center animations-fade-in" style={{ marginBottom: '5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.5rem' }}>
              The Reality Check
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#ffffff', marginBottom: '1.2rem', lineHeight: 1.15 }}>
              Stop Chasing Your Business.<br />
              <span style={{ background: 'linear-gradient(135deg, #1B6B6B, #0d9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Start Directing It.</span>
            </h2>
            <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.8, color: '#94a3b8' }}>
              Most African SMEs make critical decisions on incomplete information — sales in one app, stock in another, procurement via WhatsApp. <strong style={{ color: '#fca5a5' }}>You are not running your business. You are chasing it.</strong>
            </p>
          </div>

          <style>{`
            /* ---- Before/After Split Cards ---- */
            .bac-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 1.5rem;
            }
            @media (max-width: 768px) { .bac-grid { grid-template-columns: 1fr; } }

            .bac-card {
              border-radius: 24px;
              overflow: hidden;
              box-shadow: 0 4px 24px rgba(0,0,0,0.3);
              transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease;
              position: relative;
            }
            .bac-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 20px 48px rgba(0,0,0,0.14);
            }

            /* Split halves */
            .bac-split {
              display: grid;
              grid-template-columns: 1fr 1fr;
              min-height: 220px;
            }

            /* BEFORE half */
            .bac-before {
              background: #1a0a0a;
              padding: 2rem;
              position: relative;
              overflow: hidden;
            }
            .bac-before::before {
              content: '';
              position: absolute; inset: 0;
              background: repeating-linear-gradient(
                -45deg,
                rgba(239,68,68,0.04) 0px, rgba(239,68,68,0.04) 1px,
                transparent 1px, transparent 8px
              );
            }
            .bac-before-label {
              display: inline-flex; align-items: center; gap: 6px;
              font-size: 0.68rem; font-weight: 800; text-transform: uppercase;
              letter-spacing: 1.5px; color: #ef4444;
              background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.2);
              padding: 3px 10px; border-radius: 20px; margin-bottom: 1rem;
            }
            .bac-before-title {
              font-size: 1.05rem; font-weight: 800; color: #fca5a5;
              margin-bottom: 0.75rem; line-height: 1.3; position: relative; z-index: 1;
            }
            .bac-before-desc {
              font-size: 0.875rem; color: #9ca3af; line-height: 1.6; position: relative; z-index: 1;
            }
            .bac-before-cost {
              margin-top: 1.25rem; display: flex; align-items: center; gap: 6px;
              font-size: 0.78rem; color: #ef4444; font-weight: 700;
              background: rgba(239,68,68,0.1); border-radius: 8px; padding: 6px 10px;
              position: relative; z-index: 1;
              border: 1px solid rgba(239,68,68,0.15);
            }

            /* Divider line */
            .bac-divider {
              width: 4px;
              background: linear-gradient(180deg, #ef4444 0%, #C89B2A 50%, #1B6B6B 100%);
              position: relative;
              z-index: 2;
              flex-shrink: 0;
            }
            .bac-divider::after {
              content: '';
              position: absolute; top: 50%; left: 50%;
              transform: translate(-50%, -50%);
              width: 32px; height: 32px;
              border-radius: 50%;
              background: #C89B2A;
              border: 3px solid white;
              box-shadow: 0 0 0 4px rgba(200,155,42,0.2);
            }

            /* AFTER half */
            .bac-after {
              background: #f0fdf8;
              padding: 2rem;
              position: relative;
              overflow: hidden;
            }
            .bac-after::before {
              content: '';
              position: absolute; inset: 0;
              background: radial-gradient(ellipse at top right, rgba(16,185,129,0.08) 0%, transparent 60%);
            }
            .bac-after-label {
              display: inline-flex; align-items: center; gap: 6px;
              font-size: 0.68rem; font-weight: 800; text-transform: uppercase;
              letter-spacing: 1.5px; color: #059669;
              background: rgba(5,150,105,0.1); border: 1px solid rgba(5,150,105,0.2);
              padding: 3px 10px; border-radius: 20px; margin-bottom: 1rem;
            }
            .bac-after-title {
              font-size: 1.05rem; font-weight: 800; color: #065f46;
              margin-bottom: 0.75rem; line-height: 1.3; position: relative; z-index: 1;
            }
            .bac-after-desc {
              font-size: 0.875rem; color: #374151; line-height: 1.6;
              font-weight: 500; position: relative; z-index: 1;
            }
            .bac-after-gain {
              margin-top: 1.25rem; display: flex; align-items: center; gap: 6px;
              font-size: 0.78rem; color: #059669; font-weight: 700;
              background: rgba(5,150,105,0.08); border-radius: 8px; padding: 6px 10px;
              position: relative; z-index: 1;
              border: 1px solid rgba(5,150,105,0.15);
            }

            /* Bottom CTA strip */
            .bac-cta-strip {
              margin-top: 4rem;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 1.5rem;
              flex-wrap: wrap;
              padding: 2.5rem;
              background: linear-gradient(135deg, #0D1B3E 0%, #1B3B5A 100%);
              border-radius: 24px;
              box-shadow: 0 20px 40px rgba(13,27,62,0.25);
            }
            .bac-cta-text h3 { color: white; font-size: 1.4rem; font-weight: 800; margin-bottom: 0.3rem; }
            .bac-cta-text p { color: #94a3b8; font-size: 0.95rem; margin: 0; }
          `}</style>

          <div className="bac-grid">
            {[
              {
                probTitle: "Invisible Profit Margins",
                probDesc: "Sales in one spreadsheet. Costs in another. Accounting in a third. Nobody knows the real margin without making three calls.",
                probCost: "Est. KSh 80K/month in missed decisions",
                solTitle: "Live Business Intelligence",
                solDesc: "Real-time revenue, cost, and margin visibility across every department — on any device, every day, instantly.",
                solGain: "Full P&L visibility in under 10 seconds",
              },
              {
                probTitle: "Stock Surprises",
                probDesc: "Running out of fast movers with no warning. Over-stocking slow items. Supplier disputes with no paper trail.",
                probCost: "Est. 30% of stock cost wasted annually",
                solTitle: "Full Inventory Control",
                solDesc: "Stock levels, reorder alerts, supplier performance — always visible, always accurate, always up to date.",
                solGain: "Stockouts reduced by up to 80%",
              },
              {
                probTitle: "Approval Bottlenecks",
                probDesc: "Purchase approvals via WhatsApp chat. No audit trail. Money leaving the business with zero documentation.",
                probCost: "Avg. 3 days lost per procurement cycle",
                solTitle: "Structured Approval Workflows",
                solDesc: "Multi-level purchase approvals with a complete, timestamped audit trail from request to payment.",
                solGain: "Procurement cycle cut to under 4 hours",
              },
              {
                probTitle: "Lost Sales",
                probDesc: "No pipeline visibility. Quotes forgotten. Customers following up before your team does. Revenue walking away.",
                probCost: "Est. 15–20% of revenue lost in follow-up gaps",
                solTitle: "Sales Pipeline Clarity",
                solDesc: "Every lead, quote, and order tracked. Your team closes faster and follows up on time — automatically.",
                solGain: "Average 22% increase in close rate",
              },
            ].map((item, i) => (
              <div key={i} className="bac-card animations-fade-in" style={{ animationDelay: `${i * 0.12}s` }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 4px 1fr', minHeight: 240 }}>
                  {/* BEFORE */}
                  <div className="bac-before">
                    <div className="bac-before-label">
                      <XCircle size={11} /> Before Nexus
                    </div>
                    <div className="bac-before-title">{item.probTitle}</div>
                    <div className="bac-before-desc">{item.probDesc}</div>
                    <div className="bac-before-cost">
                      <XCircle size={12} /> {item.probCost}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="bac-divider" />

                  {/* AFTER */}
                  <div className="bac-after">
                    <div className="bac-after-label">
                      <CheckCircle2 size={11} /> With Nexus
                    </div>
                    <div className="bac-after-title">{item.solTitle}</div>
                    <div className="bac-after-desc">{item.solDesc}</div>
                    <div className="bac-after-gain">
                      <CheckCircle2 size={12} /> {item.solGain}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div className="bac-cta-strip animations-fade-in">
            <div className="bac-cta-text">
              <h3>Which side of this picture are you on?</h3>
              <p>Book a 30-minute live demo. We map Nexus to your exact operations — no generic walkthrough.</p>
            </div>
            <Link to="/get-quote?service=Business ERP" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.9rem 2rem', background: 'linear-gradient(135deg, #1B6B6B, #0d9488)', color: '#fff', borderRadius: '50px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 8px 24px rgba(27,107,107,0.4)', whiteSpace: 'nowrap', flexShrink: 0 }}>
              Book Free Demo <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </section>


      {/* Modules Section — Glassmorphic Dark Bento */}
      <section style={{ position: 'relative', background: 'linear-gradient(160deg, #070f1e 0%, #0d1b3e 50%, #091a1a 100%)', padding: '7rem 0', overflow: 'hidden' }}>
        {/* Ambient glows */}
        <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,107,107,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,155,42,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Grid lines */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div className="text-center animations-fade-in" style={{ marginBottom: '4.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', background: 'rgba(27,107,107,0.15)', border: '1px solid rgba(27,107,107,0.3)', color: '#4db8b8', borderRadius: '30px', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.5rem' }}>
              6 Connected Modules
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#ffffff', marginBottom: '1rem', lineHeight: 1.15 }}>
              One Unified Business Platform.
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7 }}>
              Connected modules sharing one data layer — no silos, no manual syncing, no duplicate entries.
            </p>
          </div>

          <style>{`
            /* ===== NEXUS GLASSMORPHIC BENTO ===== */
            .nx-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 1.25rem;
            }
            .nx-col-2 { grid-column: span 2; }
            .nx-col-1 { grid-column: span 1; }
            @media (max-width: 1024px) {
              .nx-grid { grid-template-columns: repeat(2, 1fr); }
              .nx-col-2, .nx-col-1 { grid-column: span 1; }
            }
            @media (max-width: 600px) {
              .nx-grid { grid-template-columns: 1fr; }
            }

            /* Base card */
            .nx-card {
              position: relative;
              border-radius: 24px;
              padding: 2.2rem;
              background: rgba(255,255,255,0.04);
              backdrop-filter: blur(20px);
              -webkit-backdrop-filter: blur(20px);
              border: 1px solid rgba(255,255,255,0.08);
              overflow: hidden;
              cursor: pointer;
              transition: transform 0.35s cubic-bezier(0.4,0,0.2,1),
                          box-shadow 0.35s ease,
                          border-color 0.35s ease,
                          background 0.35s ease;
              display: flex;
              flex-direction: column;
            }
            .nx-card:hover {
              transform: translateY(-8px);
              background: rgba(255,255,255,0.07);
              border-color: var(--nx-color);
              box-shadow: 0 0 0 1px var(--nx-color),
                          0 20px 60px rgba(0,0,0,0.4),
                          0 0 40px var(--nx-shadow);
            }

            /* Animated border glow trace */
            .nx-card::before {
              content: '';
              position: absolute;
              inset: -1px;
              border-radius: 24px;
              padding: 1px;
              background: linear-gradient(135deg, var(--nx-color), transparent 60%);
              -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
              -webkit-mask-composite: destination-out;
              mask-composite: exclude;
              opacity: 0;
              transition: opacity 0.4s ease;
              pointer-events: none;
            }
            .nx-card:hover::before { opacity: 1; }

            /* Radial glow inside card */
            .nx-card-glow {
              position: absolute;
              top: -60%;
              right: -40%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle at 60% 40%, var(--nx-glow) 0%, transparent 55%);
              opacity: 0;
              transition: opacity 0.5s ease;
              pointer-events: none;
              z-index: 0;
            }
            .nx-card:hover .nx-card-glow { opacity: 1; }

            /* Floating particle dots */
            .nx-particle {
              position: absolute;
              width: 4px; height: 4px;
              border-radius: 50%;
              background: var(--nx-color);
              opacity: 0;
              pointer-events: none;
              z-index: 0;
            }
            .nx-card:hover .nx-particle { opacity: 0.5; animation: nx-drift 3s ease-in-out infinite; }
            .nx-particle:nth-child(2) { animation-delay: -1s; width: 3px; height: 3px; }
            .nx-particle:nth-child(3) { animation-delay: -2s; width: 5px; height: 5px; }
            @keyframes nx-drift {
              0%   { transform: translateY(0) translateX(0); opacity: 0.5; }
              50%  { transform: translateY(-20px) translateX(10px); opacity: 0.2; }
              100% { transform: translateY(0) translateX(0); opacity: 0.5; }
            }

            /* Icon */
            .nx-icon {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 60px; height: 60px;
              border-radius: 16px;
              background: rgba(255,255,255,0.06);
              border: 1px solid rgba(255,255,255,0.1);
              color: var(--nx-color);
              margin-bottom: 1.5rem;
              transition: all 0.3s ease;
              position: relative; z-index: 1;
              flex-shrink: 0;
            }
            .nx-card:hover .nx-icon {
              background: var(--nx-color);
              color: white;
              border-color: var(--nx-color);
              box-shadow: 0 8px 24px var(--nx-shadow);
              transform: scale(1.1) rotate(5deg);
            }

            /* Content */
            .nx-title {
              font-size: 1.2rem;
              font-weight: 800;
              color: #f1f5f9;
              margin-bottom: 0.6rem;
              position: relative; z-index: 1;
            }
            .nx-desc {
              font-size: 0.9rem;
              color: #94a3b8;
              line-height: 1.65;
              position: relative; z-index: 1;
              margin-bottom: 0;
            }

            /* Feature list — slides up on hover */
            .nx-features {
              list-style: none;
              padding: 0; margin: 0;
              display: flex;
              flex-direction: column;
              gap: 0.4rem;
              max-height: 0;
              overflow: hidden;
              opacity: 0;
              transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease, margin-top 0.35s ease;
              position: relative; z-index: 1;
            }
            .nx-card:hover .nx-features {
              max-height: 160px;
              opacity: 1;
              margin-top: 1.2rem;
            }
            .nx-features li {
              display: flex; align-items: center; gap: 8px;
              font-size: 0.8rem; color: #94a3b8; line-height: 1.4;
            }
            .nx-feat-dot {
              width: 6px; height: 6px; border-radius: 50%;
              background: var(--nx-color); flex-shrink: 0;
            }

            /* CTA arrow */
            .nx-cta {
              margin-top: auto;
              padding-top: 1.5rem;
              display: flex; align-items: center; gap: 6px;
              font-size: 0.85rem; font-weight: 700;
              color: var(--nx-color);
              opacity: 0;
              transform: translateX(-8px);
              transition: all 0.3s ease 0.05s;
              position: relative; z-index: 1;
            }
            .nx-card:hover .nx-cta { opacity: 1; transform: translateX(0); }

            /* Wide card mini bar chart */
            .nx-mini-chart {
              display: flex;
              align-items: flex-end;
              gap: 6px;
              height: 48px;
              margin-top: 1.5rem;
              position: relative; z-index: 1;
              opacity: 0.4;
              transition: opacity 0.3s ease;
            }
            .nx-card:hover .nx-mini-chart { opacity: 1; }
            .nx-bar {
              flex: 1;
              border-radius: 4px 4px 0 0;
              background: var(--nx-color);
              opacity: 0.6;
              transition: opacity 0.3s ease, height 0.4s cubic-bezier(0.4,0,0.2,1);
            }
            .nx-card:hover .nx-bar { opacity: 1; }
            .nx-chart-label {
              display: flex; gap: 6px; margin-top: 0.4rem;
              position: relative; z-index: 1;
            }
            .nx-chart-label span {
              flex: 1; text-align: center; font-size: 0.6rem; color: #64748b;
            }
          `}</style>

          <div className="nx-grid">
            {[
              {
                title: "Sales Management",
                desc: "Lead tracking, quotations, sales orders, and a real-time revenue pipeline — so your team never loses a deal.",
                icon: <ShoppingCart size={26} />,
                color: "#10b981", glow: "rgba(16,185,129,0.08)", shadow: "rgba(16,185,129,0.25)",
                span: "nx-col-2",
                features: ["Lead-to-order pipeline with stage tracking", "Quote generation & e-signature support", "Customer credit limits & payment history"],
                showChart: true,
                chartBars: [65, 80, 55, 90, 72, 95, 60],
                chartLabels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
              },
              {
                title: "Finance & Approvals",
                desc: "Budget management, multi-level approval workflows, and full accounts payable/receivable.",
                icon: <ShieldCheck size={26} />,
                color: "#1b6b6b", glow: "rgba(27,107,107,0.1)", shadow: "rgba(27,107,107,0.3)",
                span: "nx-col-1",
                features: ["Multi-level purchase approvals with audit trail", "Accounts payable & receivable dashboards", "M-Pesa reconciliation & bank feeds"],
              },
              {
                title: "Procurement",
                desc: "Purchase requisitions, LPO generation, goods receipt, and supplier payment matching.",
                icon: <Truck size={26} />,
                color: "#ec4899", glow: "rgba(236,72,153,0.08)", shadow: "rgba(236,72,153,0.25)",
                span: "nx-col-1",
                features: ["LPO generation with approval workflow", "Goods receipt & 3-way matching", "Supplier performance scoring"],
              },
              {
                title: "Inventory & Stores",
                desc: "Real-time stock levels, reorder point alerts, and complete stock movement history across all warehouses.",
                icon: <Warehouse size={26} />,
                color: "#8b5cf6", glow: "rgba(139,92,246,0.08)", shadow: "rgba(139,92,246,0.25)",
                span: "nx-col-2",
                features: ["Multi-warehouse stock management", "Automatic reorder point alerts", "Batch, serial & expiry tracking"],
                showChart: true,
                chartBars: [90, 70, 85, 60, 78, 92, 55],
                chartLabels: ["Wk1","Wk2","Wk3","Wk4","Wk5","Wk6","Wk7"],
              },
              {
                title: "Supplier Management",
                desc: "Supplier profiles, contract management, delivery tracking, and performance scorecards.",
                icon: <Users2 size={26} />,
                color: "#14b8a6", glow: "rgba(20,184,166,0.08)", shadow: "rgba(20,184,166,0.25)",
                span: "nx-col-1",
                features: ["Supplier onboarding & compliance docs", "Delivery SLA tracking & alerts", "Performance scorecards with ratings"],
              },
              {
                title: "Reports & Analytics",
                desc: "Custom dashboards for sales, procurement, and inventory — export-ready in one click.",
                icon: <BarChart3 size={26} />,
                color: "#C89B2A", glow: "rgba(200,155,42,0.08)", shadow: "rgba(200,155,42,0.25)",
                span: "nx-col-1",
                features: ["Drag-and-drop custom dashboards", "Scheduled PDF/Excel report delivery", "Cross-module drill-down analytics"],
              },
            ].map((mod, i) => (
              <div
                key={i}
                className={`nx-card animations-fade-in ${mod.span}`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  '--nx-color': mod.color,
                  '--nx-glow': mod.glow,
                  '--nx-shadow': mod.shadow,
                }}
              >
                {/* Ambient glow */}
                <div className="nx-card-glow" />

                {/* Floating particles */}
                <div className="nx-particle" style={{ top: '20%', right: '15%' }} />
                <div className="nx-particle" style={{ top: '60%', right: '25%' }} />
                <div className="nx-particle" style={{ top: '40%', right: '8%' }} />

                {/* Icon */}
                <div className="nx-icon">{mod.icon}</div>

                {/* Text */}
                <h3 className="nx-title">{mod.title}</h3>
                <p className="nx-desc">{mod.desc}</p>

                {/* Slide-up feature list */}
                <ul className="nx-features">
                  {mod.features.map((f, fi) => (
                    <li key={fi}>
                      <span className="nx-feat-dot" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Mini bar chart for wide cards */}
                {mod.showChart && (
                  <>
                    <div className="nx-mini-chart">
                      {mod.chartBars.map((h, bi) => (
                        <div key={bi} className="nx-bar" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <div className="nx-chart-label">
                      {mod.chartLabels.map((l, li) => <span key={li}>{l}</span>)}
                    </div>
                  </>
                )}

                {/* CTA */}
                <div className="nx-cta">
                  Explore Module <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* AfCFTA Section */}
      <section style={{ position: 'relative', background: 'linear-gradient(135deg, #0d2e2e 0%, #1b6b6b 45%, #134040 100%)', padding: '7rem 0', overflow: 'hidden' }}>
        {/* Continent outline glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,107,107,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <style>{`
            .afcfta-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
            @media (max-width: 900px) { .afcfta-inner { grid-template-columns: 1fr; gap: 3rem; } }
          `}</style>
          <div className="afcfta-inner">


            {/* LEFT: Text */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', background: 'rgba(200,155,42,0.12)', border: '1px solid rgba(200,155,42,0.3)', color: '#C89B2A', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.5rem' }}>
                <Globe size={12} /> AfCFTA Ready
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.15, marginBottom: '1.2rem' }}>
                Built for the AfCFTA era —<br />
                <span style={{ background: 'linear-gradient(90deg, #C89B2A, #e8c96a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>trade without borders.</span>
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#94a3b8', marginBottom: '2.5rem' }}>
                As the African Continental Free Trade Area opens intra-African commerce, businesses need cross-border inventory visibility, multi-currency financial management, and procurement that works across the continent. Fahari Nexus is built for exactly this.
              </p>

              {/* Country pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem' }}>
                {['🇰🇪 Kenya', '🇺🇬 Uganda', '🇹🇿 Tanzania', '🇷🇼 Rwanda', '🇪🇹 Ethiopia', '+ More'].map((c, i) => (
                  <span key={i} style={{ padding: '5px 12px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '30px', fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600 }}>{c}</span>
                ))}
              </div>

              <Link to="/get-quote?service=Business ERP" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.85rem 1.8rem', background: 'linear-gradient(135deg, #C89B2A, #b8852a)', color: '#fff', borderRadius: '50px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 8px 24px rgba(200,155,42,0.3)', transition: 'all 0.25s ease' }}>
                Explore Cross-Border Features <ArrowRight size={16} />
              </Link>
            </div>

            {/* RIGHT: Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { val: '54', label: 'AU Member States', sub: 'under AfCFTA framework', color: '#C89B2A', icon: <Globe size={20} /> },
                { val: '$3.4T', label: 'Combined GDP', sub: 'of the African market', color: '#10b981', icon: <BarChart3 size={20} /> },
                { val: '5', label: 'EA Countries', sub: 'Nexus operates across', color: '#1b6b6b', icon: <CheckCircle size={20} /> },
                { val: 'Multi', label: 'Currency Support', sub: 'KES, UGX, TZS, RWF, USD', color: '#8b5cf6', icon: <ShieldCheck size={20} /> },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '1.5rem', transition: 'all 0.3s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: s.color, marginBottom: '0.75rem' }}>{s.icon}</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', lineHeight: 1, marginBottom: '0.3rem' }}>{s.val}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.2rem' }}>{s.label}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{s.sub}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ position: 'relative', background: 'linear-gradient(180deg, #0d1b3e 0%, #070f1e 100%)', padding: '7rem 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,155,42,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,107,107,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', background: 'rgba(200,155,42,0.12)', border: '1px solid rgba(200,155,42,0.3)', color: '#C89B2A', borderRadius: '30px', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.5rem' }}>
              Pricing
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#ffffff', marginBottom: '1rem', lineHeight: 1.15 }}>
              Simple, Transparent Pricing.
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Grow your business without operational bottlenecks or hidden fees. One subscription, the full platform.
            </p>
          </div>

          <style>{`
            .nx-pricing-card {
              display: grid;
              grid-template-columns: 3fr 2fr;
              border-radius: 28px;
              overflow: hidden;
              border: 1px solid rgba(255,255,255,0.08);
              box-shadow: 0 32px 80px rgba(0,0,0,0.4);
              position: relative;
              background: rgba(255,255,255,0.03);
              backdrop-filter: blur(24px);
            }
            @media (max-width: 768px) { .nx-pricing-card { grid-template-columns: 1fr; } }
            .nx-pricing-main { padding: 3.5rem; position: relative; overflow: hidden; }
            .nx-pricing-main::before {
              content: '';
              position: absolute; top: -40%; right: -20%;
              width: 400px; height: 400px; border-radius: 50%;
              background: radial-gradient(circle, rgba(200,155,42,0.1) 0%, transparent 60%);
              pointer-events: none;
            }
            .nx-pricing-sidebar {
              background: rgba(0,0,0,0.25);
              border-left: 1px solid rgba(255,255,255,0.06);
              padding: 3.5rem 2.5rem;
            }
            .nx-pricing-pill-row { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 2.5rem; }
            .nx-pricing-pill {
              padding: 4px 12px; border-radius: 20px; font-size: 0.78rem; font-weight: 700;
              background: rgba(255,255,255,0.06); color: #94a3b8;
              border: 1px solid rgba(255,255,255,0.1);
            }
          `}</style>

          <div className="nx-pricing-card animations-fade-in">
            {/* LEFT: Main content */}
            <div className="nx-pricing-main">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(200,155,42,0.15)', color: '#C89B2A', padding: '5px 14px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                Tailored For Your Business
              </div>
              <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.2, marginBottom: '1.2rem', position: 'relative', zIndex: 1 }}>
                Enterprise-grade ERP, scaled to your operational volume.
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '480px', position: 'relative', zIndex: 1 }}>
                Whether you process 50 invoices a month or 5,000 — same powerful suite. You only pay for the value and scale you actually use.
              </p>

              {/* Scale indicators */}
              <div style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
                {[
                  { label: 'Startup (1–10 staff)', active: false },
                  { label: 'SME (10–100 staff)', active: true },
                  { label: 'Enterprise (100+ staff)', active: false },
                ].map((tier, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.6rem' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: tier.active ? '#C89B2A' : 'rgba(255,255,255,0.15)', flexShrink: 0, boxShadow: tier.active ? '0 0 10px rgba(200,155,42,0.6)' : 'none' }} />
                    <span style={{ fontSize: '0.88rem', color: tier.active ? '#e2e8f0' : '#475569', fontWeight: tier.active ? 700 : 400 }}>{tier.label}</span>
                    {tier.active && <span style={{ fontSize: '0.72rem', padding: '2px 8px', background: 'rgba(200,155,42,0.15)', color: '#C89B2A', borderRadius: '20px', fontWeight: 700, border: '1px solid rgba(200,155,42,0.25)' }}>Most Popular</span>}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                <Link to="/get-quote?service=Business ERP" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.9rem 2rem', background: 'linear-gradient(135deg, #C89B2A, #b8852a)', color: '#fff', borderRadius: '50px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 8px 24px rgba(200,155,42,0.35)' }}>
                  Request a Custom Quote <ArrowRight size={16} />
                </Link>
                <Link to="/get-quote?service=Business ERP" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.9rem 2rem', background: 'rgba(255,255,255,0.06)', color: '#e2e8f0', borderRadius: '50px', fontWeight: 600, fontSize: '1rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
                  Book a 30-Day Pilot
                </Link>
              </div>
            </div>

            {/* RIGHT: Feature list */}
            <div className="nx-pricing-sidebar">
              <h4 style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.8rem', opacity: 0.7 }}>Always Included</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '2rem' }}>
                {[
                  { text: "All 6 Core ERP Modules", highlight: true },
                  "Multi-Level Approval Workflows",
                  "AfCFTA Cross-Border Readiness",
                  "Live Financial Dashboards",
                  "Unlimited User Seats",
                  "Priority B2B Support",
                  "24-hour Go-Live Setup",
                ].map((feature, i) => {
                  const text = typeof feature === 'string' ? feature : feature.text;
                  const highlight = typeof feature === 'object' && feature.highlight;
                  return (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: highlight ? '#ffffff' : '#94a3b8', fontSize: '0.92rem', fontWeight: highlight ? 700 : 400 }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: highlight ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${highlight ? '#10b981' : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCircle2 size={12} color={highlight ? '#10b981' : '#475569'} />
                      </div>
                      {text}
                    </li>
                  );
                })}
              </ul>
              <div style={{ padding: '1rem', background: 'rgba(27,107,107,0.1)', border: '1px solid rgba(27,107,107,0.2)', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.78rem', color: '#4db8b8', fontWeight: 700, marginBottom: '0.3rem' }}>🇰🇪 M-Pesa Ready</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5 }}>Direct M-Pesa reconciliation included at no extra cost.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ position: 'relative', background: 'linear-gradient(135deg, #070f1e 0%, #0d2e2e 50%, #070f1e 100%)', padding: '8rem 2rem', overflow: 'hidden' }}>
        {/* Animated concentric rings */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '800px', borderRadius: '50%', border: '1px solid rgba(27,107,107,0.1)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', border: '1px solid rgba(27,107,107,0.12)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(27,107,107,0.15)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,107,107,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 14px', background: 'rgba(27,107,107,0.15)', border: '1px solid rgba(27,107,107,0.35)', color: '#4db8b8', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '2rem' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1b6b6b', boxShadow: '0 0 8px #1b6b6b', display: 'inline-block' }} />
            Free 30-Minute Demo
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
            See Fahari Nexus<br />
            <span style={{ background: 'linear-gradient(90deg, #1b9e9e, #4dd4ac)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>running your business.</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 3rem auto', fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.8 }}>
            We map the system to your specific operations in a live 30-minute session — no generic walkthroughs, no sales pressure.
          </p>

          {/* Trust micro-stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {[
              { val: '30 min', label: 'Live demo' },
              { val: 'Free', label: 'No cost, no obligation' },
              { val: '24hr', label: 'Go live after sign-up' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: '0.75rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/get-quote?service=Business ERP" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '1rem 2.4rem', background: 'linear-gradient(135deg, #1b6b6b, #0d9488)', color: '#fff', borderRadius: '50px', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none', boxShadow: '0 8px 28px rgba(27,107,107,0.45)' }}>
              Book Your Free Demo <ArrowRight size={18} />
            </Link>
            <a href="https://wa.me/254759437978?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20Fahari%20Nexus." style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '1rem 2.4rem', background: '#25D366', color: 'white', borderRadius: '50px', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none', boxShadow: '0 8px 24px rgba(37,211,102,0.3)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.528 5.85L0 24l6.312-1.505A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.895 0-3.67-.502-5.2-1.378l-.374-.217-3.745.893.924-3.654-.241-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              WhatsApp Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FahariNexus;
