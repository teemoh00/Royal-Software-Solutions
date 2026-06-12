import React, { useState } from 'react'
import { ArrowRight, CheckCircle, Database, Server, Shield, Globe, Cpu, BarChart, Users, BookOpen, Truck, Building, Activity, Briefcase } from 'lucide-react'
import { Link } from 'react-router-dom'

const erpFeatures = [
    {
        id: 'student-info',
        title: 'Student Information Management',
        description: 'Maintain comprehensive digital records of all students including personal details, academic history, disciplinary records, health information, and family contacts in a secure, centralized database. Enables powerful search, custom reporting, and automated document generation for quick access to student files.'
    },
    {
        id: 'academic-perf',
        title: 'Academic Performance Tracking',
        description: 'Monitor student progress over time with detailed analytics, continuous assessment tracking, and automated generation of insightful performance reports and transcripts. Identify learning gaps early with predictive analytics and easily share performance dashboards with parents.'
    },
    {
        id: 'curriculum',
        title: 'CBC, KCSE, IGCSE Aligned',
        description: 'Fully customized to support multiple curriculum standards simultaneously, ensuring seamless compliance with local and international educational grading systems. Built-in rubrics and competency tracking for CBC, along with standardized reporting for 8-4-4 and IGCSE.'
    },
    {
        id: 'payment',
        title: 'Bank & M-Pesa Integration',
        description: 'Automate fee collection and reconciliation with direct integrations to major banks and mobile money platforms (M-Pesa) for instant payment reflection. Dramatically reduces manual data entry, helps track defaulters automatically, and sends instant SMS receipts to parents upon payment.'
    },
    {
        id: 'timetable',
        title: 'Timetable & Exam Systems',
        description: 'Intelligently generate clash-free timetables considering teacher availability and room capacities. Manage exam scheduling, seating arrangements, securely process examination results, and calculate complex weighted averages effortlessly.'
    },
    {
        id: 'finance',
        title: 'Finance & Core Accounting',
        description: 'A complete financial management suite tailored for educational institutions. Handle complex fee structures, generate invoices, track departmental expenses, manage budgets, and produce comprehensive financial reporting like income statements and balance sheets.'
    },
    {
        id: 'hr',
        title: 'HR & Payroll Management',
        description: 'Digitize your entire staff management workflow. Handle employee records, monitor daily attendance, process leave applications online, and automate complex payroll processing including all statutory deductions (PAYE, NHIF, NSSF) and tax compliance.'
    },
    {
        id: 'portals',
        title: 'Parent & Teacher Portals',
        description: 'Provide dedicated, secure interfaces for parents and teachers. Parents can track their child\'s progress, view report cards, and check fee balances. Teachers can efficiently manage grading, record attendance, issue assignments, and communicate securely with parents.'
    }
];

const ProductsServices = () => {
    const [activeFeature, setActiveFeature] = useState(erpFeatures[0]);

    return (
        <div className="products-services-page">
            {/* 1. Page Hero Section */}
            <section className="corporate-hero">
                <div className="stars-container">
                    <div className="stars-sm"></div>
                    <div className="stars-md"></div>
                    <div className="stars-lg"></div>
                </div>
                <div className="container hero-container">
                    <div className="hero-content text-center">
                        <div className="corporate-badge animate-fade-in-up">Enterprise Software Ecosystem</div>
                        <h1 className="hero-title animate-fade-in-up delay-100">
                            Innovative Solutions Built <br /><span className="text-secondary">for Unstoppable Growth</span>
                        </h1>
                        <p className="hero-subtitle animate-fade-in-up delay-200">
                            From Academic ERPs to Enterprise Platforms, Royal Software Solutions delivers research-driven, scalable technology systems designed for African institutions and businesses.
                        </p>
                        <div className="hero-buttons animate-fade-in-up delay-300">
                            <Link to="/get-quote" className="btn btn-primary">
                                Get a Quote <ArrowRight size={18} />
                            </Link>
                            <a href="#fahari" className="btn btn-outline">
                                Explore FAHARI <Activity size={18} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="hero-bg-overlay"></div>
            </section>

            {/* 2. School Management Systems */}
            <section id="academic-erp" className="section corporate-academic-erp bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Academic ERP & School Management</h2>
                        <p className="section-subtitle">
                            Comprehensive digital platforms designed to streamline academic and administrative operations.
                        </p>
                    </div>
                    <div className="corporate-erp-container">
                        <div className="erp-content">
                            <ul className="corporate-feature-list interactive-list">
                                {erpFeatures.map(feature => (
                                    <li
                                        key={feature.id}
                                        className={`corporate-feature-item ${activeFeature.id === feature.id ? 'active' : ''}`}
                                        onClick={() => setActiveFeature(feature)}
                                    >
                                        <CheckCircle size={20} className="icon-check text-secondary" />
                                        <span>{feature.title}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="erp-cta mt-4">
                                <Link to="/get-quote" className="btn btn-secondary">Request School Demo</Link>
                            </div>
                        </div>
                        <div className="erp-visual">
                            <div className="corporate-details-panel">
                                <div key={activeFeature.id} className="feature-details-card">
                                    <div className="feature-icon-header">
                                        <CheckCircle size={32} className="text-secondary mb-3" />
                                    </div>
                                    <h3 className="feature-title-large">{activeFeature.title}</h3>
                                    <div className="feature-divider"></div>
                                    <p className="feature-description-large">{activeFeature.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Custom Software Development */}
            <section className="section custom-dev bg-white">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Custom Software Development</h2>
                        <p className="section-subtitle">
                            We design and develop tailored software systems for businesses and institutions across industries.
                        </p>
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
            
            @media (max-width: 992px) { .bento-grid { grid-template-columns: repeat(2, 1fr); } .bento-col-2 { grid-column: span 2; } .bento-col-1 { grid-column: span 1; } }
            @media (max-width: 768px) { .bento-grid { grid-template-columns: 1fr; } .bento-col-2, .bento-col-1 { grid-column: span 1; } }
          `}</style>

          <div className="corporate-services-grid bento-grid">
            {[
              {
                title: "ERP Systems",
                desc: "For All Industries",
                icon: <Database size={28} />,
                color: "#10b981", colorLight: "rgba(16,185,129,0.1)", colorShadow: "rgba(16,185,129,0.3)",
                span: "bento-col-2"
              },
              {
                title: "Point of Sale (POS)",
                desc: "Retail & Wholesale Systems",
                icon: <Activity size={28} />,
                color: "#3b82f6", colorLight: "rgba(59,130,246,0.1)", colorShadow: "rgba(59,130,246,0.3)",
                span: "bento-col-1"
              },
              {
                title: "Inventory Management",
                desc: "Stock & Supply Chain",
                icon: <Server size={28} />,
                color: "#ec4899", colorLight: "rgba(236,72,153,0.1)", colorShadow: "rgba(236,72,153,0.3)",
                span: "bento-col-1"
              },
              {
                title: "Financial & Accounting",
                desc: "Core Finance Systems",
                icon: <BarChart size={28} />,
                color: "#8b5cf6", colorLight: "rgba(139,92,246,0.1)", colorShadow: "rgba(139,92,246,0.3)",
                span: "bento-col-2"
              },
              {
                title: "Web & Mobile Apps",
                desc: "iOS, Android & Hybrid",
                icon: <Globe size={28} />,
                color: "#14b8a6", colorLight: "rgba(20,184,166,0.1)", colorShadow: "rgba(20,184,166,0.3)",
                span: "bento-col-2"
              },
              {
                title: "CRM Systems",
                desc: "Customer Relationship Management",
                icon: <Users size={28} />,
                color: "#C89B2A", colorLight: "rgba(200,155,42,0.1)", colorShadow: "rgba(200,155,42,0.3)",
                span: "bento-col-1"
              }
            ].map((mod, i) => (
              <div 
                key={i} 
                className={`corporate-card bento-item animations-fade-in ${mod.span}`} 
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
              </div>
            ))}
          </div>
                    <div className="section-cta text-center mt-5">
                        <Link to="/get-quote" className="btn btn-primary">Discuss Your Project</Link>
                    </div>
                </div>
            </section>

            {/* 4. IT Consulting */}
            <section className="section it-consulting animated-gradient-bg">
                <div className="container relative z-2">
                    <div className="section-header text-center">
                        <h2 className="section-title text-white">IT Consulting & Digital Transformation</h2>
                        <p className="section-subtitle text-white-80">
                            We guide institutions through technology modernization and operational optimization.
                        </p>
                    </div>

                    <div className="corporate-pathway">
                        <div className="corporate-pathway-line"></div>
                        <div className="corporate-pathway-list">
                            <div className="corporate-node">
                                <div className="corporate-node-icon">
                                    <Activity size={24} />
                                </div>
                                <span>System Analysis</span>
                            </div>
                            <div className="corporate-node">
                                <div className="corporate-node-icon">
                                    <BarChart size={24} />
                                </div>
                                <span>Process Optimization</span>
                            </div>
                            <div className="corporate-node">
                                <div className="corporate-node-icon">
                                    <Cpu size={24} />
                                </div>
                                <span>Tech Strategy</span>
                            </div>
                            <div className="corporate-node">
                                <div className="corporate-node-icon">
                                    <Shield size={24} />
                                </div>
                                <span>Security Audits</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        <Link to="/get-quote" className="btn btn-cyber-outline">Book a Consultation</Link>
                    </div>
                </div>
            </section>

            {/* 5. FAHARI Ecosystem (Flagship) */}
            <section id="fahari" className="section corporate-ecosystem bg-white">
                <div className="container">
                    <div className="section-header text-center">
                        <div className="corporate-badge animate-fade-in-up">Platform Flagship</div>
                        <h2 className="section-title animate-fade-in-up delay-100">FAHARI – The Unified SaaS Ecosystem</h2>
                        <p className="section-subtitle animate-fade-in-up delay-200">
                            FAHARI is a modular, cloud-based software ecosystem built by Royal Software Solutions to integrate core business and institutional functions into seamless digital platforms.
                        </p>
                    </div>

                    <div className="corporate-architecture-wrapper">
                        <div className="corporate-suite-grid">
                            {/* Education Solutions */}
                            <div className="corporate-cluster">
                                <div className="cluster-header bg-primary text-white">
                                    <h3 className="cluster-title">Education Solutions</h3>
                                </div>
                                <div className="cluster-body">
                                    <div className="corporate-suite-card">
                                        <h4>Fahari Academia</h4>
                                        <p>Primary & Secondary School Management</p>
                                    </div>
                                    <div className="corporate-suite-card">
                                        <h4>Fahari Campus</h4>
                                        <p>Tertiary & University Management</p>
                                    </div>
                                </div>
                            </div>

                            {/* Enterprise Solutions */}
                            <div className="corporate-cluster">
                                <div className="cluster-header bg-secondary text-white">
                                    <h3 className="cluster-title">Enterprise Solutions</h3>
                                </div>
                                <div className="cluster-body">
                                    <div className="corporate-suite-card">
                                        <h4>Fahari Salesforce</h4>
                                        <p>POS, Sales & Inventory</p>
                                    </div>
                                    <div className="corporate-suite-card">
                                        <h4>Fahari Financials</h4>
                                        <p>Accounting & Financial Management</p>
                                    </div>
                                    <div className="corporate-suite-card">
                                        <h4>Fahari Workforce</h4>
                                        <p>Human Resource & Payroll</p>
                                    </div>
                                    <div className="corporate-suite-card">
                                        <h4>Fahari Connect</h4>
                                        <p>Customer Relationship Management</p>
                                    </div>
                                    <div className="corporate-suite-card">
                                        <h4>Fahari Flow</h4>
                                        <p>Supply Chain Management</p>
                                    </div>
                                    <div className="corporate-suite-card">
                                        <h4>Fahari Zenith</h4>
                                        <p>Business Intelligence & Analytics</p>
                                    </div>
                                    <div className="corporate-suite-card">
                                        <h4>Fahari Vault</h4>
                                        <p>Secure Document & Data Management</p>
                                    </div>
                                </div>
                            </div>

                            {/* Industry Solutions */}
                            <div className="corporate-cluster">
                                <div className="cluster-header bg-dark text-white">
                                    <h3 className="cluster-title">Industry Solutions</h3>
                                </div>
                                <div className="cluster-body">
                                    <div className="corporate-suite-card">
                                        <h4>Fahari Hospitality</h4>
                                        <p>Hotel & Reservation Systems</p>
                                    </div>
                                    <div className="corporate-suite-card">
                                        <h4>Fahari Industrial</h4>
                                        <p>Manufacturing ERP</p>
                                    </div>
                                    <div className="corporate-suite-card">
                                        <h4>Fahari Transporter</h4>
                                        <p>Logistics & Fleet Management</p>
                                    </div>
                                    <div className="corporate-suite-card">
                                        <h4>Fahari Construct</h4>
                                        <p>Construction Project Management</p>
                                    </div>
                                    <div className="corporate-suite-card">
                                        <h4>Fahari Care</h4>
                                        <p>Healthcare Management Systems</p>
                                    </div>
                                    <div className="corporate-suite-card">
                                        <h4>Fahari Aid</h4>
                                        <p>NGO & Donor Management Systems</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Platform Architecture */}
            <section className="section corporate-architecture bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Secure & Scalable Architecture</h2>
                        <p className="section-subtitle">
                            FAHARI is designed as a modular SaaS ecosystem built on a shared core infrastructure.
                        </p>
                    </div>
                    <div className="corporate-arch-grid">
                        <div className="corporate-arch-node">
                            <div className="corporate-arch-icon-wrapper">
                                <Shield className="corporate-arch-icon text-primary" />
                            </div>
                            <span>Unified Auth</span>
                        </div>
                        <div className="corporate-arch-node">
                            <div className="corporate-arch-icon-wrapper">
                                <Users className="corporate-arch-icon text-primary" />
                            </div>
                            <span>RBAC</span>
                        </div>
                        <div className="corporate-arch-node">
                            <div className="corporate-arch-icon-wrapper">
                                <Activity className="corporate-arch-icon text-primary" />
                            </div>
                            <span>Integration API</span>
                        </div>
                        <div className="corporate-arch-node">
                            <div className="corporate-arch-icon-wrapper">
                                <Database className="corporate-arch-icon text-primary" />
                            </div>
                            <span>Data Lake</span>
                        </div>
                        <div className="corporate-arch-node">
                            <div className="corporate-arch-icon-wrapper">
                                <Activity className="corporate-arch-icon text-primary" />
                            </div>
                            <span>Analytics Engine</span>
                        </div>
                        <div className="corporate-arch-node">
                            <div className="corporate-arch-icon-wrapper">
                                <Shield className="corporate-arch-icon text-primary" />
                            </div>
                            <span>Cloud Backup</span>
                        </div>
                    </div>

                    <div className="corporate-base-plate mt-5">
                        <div className="corporate-base-glow"></div>
                        <p className="corporate-base-text">Enterprise Cloud Infrastructure</p>
                    </div>
                </div>
            </section>

            {/* 7. Industries We Serve */}
            <section className="section corporate-industries bg-white">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title animate-fade-in-up">Industries We Serve</h2>
                        <p className="section-subtitle animate-fade-in-up delay-100">
                            Delivering specialized technological solutions across multiple sectors.
                        </p>
                    </div>
          <style>{`
            .premium-target-grid {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 1.5rem;
              margin-top: 3rem;
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
          
          <div className="corporate-industries-grid premium-target-grid">
            {[
              { icon: <BookOpen size={24} />, text: "Education" },
              { icon: <Users size={24} />, text: "Retail & Commerce" },
              { icon: <Activity size={24} />, text: "Healthcare" },
              { icon: <Cpu size={24} />, text: "Manufacturing" },
              { icon: <Truck size={24} />, text: "Logistics" },
              { icon: <Building size={24} />, text: "Construction" },
              { icon: <Globe size={24} />, text: "NGOs" },
              { icon: <Briefcase size={24} />, text: "Hospitality" }
            ].map((item, i) => (
              <div key={i} className="corporate-industry-card premium-target-item animations-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="premium-target-icon">
                  {item.icon}
                </div>
                <span className="premium-target-text">{item.text}</span>
              </div>
            ))}
          </div>
                </div>
            </section>

            {/* 8. Call to Action */}
            <section className="section corporate-cta-banner">
                <div className="corporate-cta-overlay"></div>
                <div className="container text-center relative z-2">
                    <h2 className="corporate-cta-title">Ready to transform your institution or enterprise?</h2>
                    <p className="corporate-cta-subtitle">Let us design a scalable, secure digital solution tailored to your operational needs.</p>
                    <Link to="/get-quote" className="btn btn-primary mt-4">Get a Free Quote</Link>
                </div>
            </section>
        </div>
    )
}

export default ProductsServices
