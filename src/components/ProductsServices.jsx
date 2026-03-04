import React, { useState } from 'react'
import { ArrowRight, CheckCircle, Database, Server, Shield, Globe, Cpu, BarChart, Users, BookOpen, Truck, Building, Activity, Briefcase } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from './SEO'

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
                    <div className="corporate-services-grid">
                        <div className="corporate-card">
                            <div className="corporate-icon-wrapper">
                                <Database size={32} className="corporate-icon text-primary" />
                            </div>
                            <h3>ERP Systems</h3>
                            <p>For All Industries</p>
                        </div>
                        <div className="corporate-card">
                            <div className="corporate-icon-wrapper">
                                <Activity size={32} className="corporate-icon text-primary" />
                            </div>
                            <h3>Point of Sale (POS)</h3>
                            <p>Retail & Wholesale Systems</p>
                        </div>
                        <div className="corporate-card">
                            <div className="corporate-icon-wrapper">
                                <Server size={32} className="corporate-icon text-primary" />
                            </div>
                            <h3>Inventory Management</h3>
                            <p>Stock & Supply Chain</p>
                        </div>
                        <div className="corporate-card">
                            <div className="corporate-icon-wrapper">
                                <BarChart size={32} className="corporate-icon text-primary" />
                            </div>
                            <h3>Financial & Accounting</h3>
                            <p>Core Finance Systems</p>
                        </div>
                        <div className="corporate-card">
                            <div className="corporate-icon-wrapper">
                                <Globe size={32} className="corporate-icon text-primary" />
                            </div>
                            <h3>Web & Mobile Apps</h3>
                            <p>iOS, Android & Hybrid</p>
                        </div>
                        <div className="corporate-card">
                            <div className="corporate-icon-wrapper">
                                <Users size={32} className="corporate-icon text-primary" />
                            </div>
                            <h3>CRM Systems</h3>
                            <p>Customer Relationship Management</p>
                        </div>
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
                    <div className="corporate-industries-grid">
                        <div className="corporate-industry-card animate-fade-in-up delay-100">
                            <div className="corporate-industry-icon-wrapper">
                                <BookOpen className="corporate-industry-icon" />
                            </div>
                            <span>Education</span>
                        </div>
                        <div className="corporate-industry-card animate-fade-in-up delay-200">
                            <div className="corporate-industry-icon-wrapper">
                                <Users className="corporate-industry-icon" />
                            </div>
                            <span>Retail & Commerce</span>
                        </div>
                        <div className="corporate-industry-card animate-fade-in-up delay-300">
                            <div className="corporate-industry-icon-wrapper">
                                <Activity className="corporate-industry-icon" />
                            </div>
                            <span>Healthcare</span>
                        </div>
                        <div className="corporate-industry-card animate-fade-in-up delay-100">
                            <div className="corporate-industry-icon-wrapper">
                                <Cpu className="corporate-industry-icon" />
                            </div>
                            <span>Manufacturing</span>
                        </div>
                        <div className="corporate-industry-card animate-fade-in-up delay-200">
                            <div className="corporate-industry-icon-wrapper">
                                <Truck className="corporate-industry-icon" />
                            </div>
                            <span>Logistics</span>
                        </div>
                        <div className="corporate-industry-card animate-fade-in-up delay-300">
                            <div className="corporate-industry-icon-wrapper">
                                <Building className="corporate-industry-icon" />
                            </div>
                            <span>Construction</span>
                        </div>
                        <div className="corporate-industry-card animate-fade-in-up delay-100">
                            <div className="corporate-industry-icon-wrapper">
                                <Globe className="corporate-industry-icon" />
                            </div>
                            <span>NGOs</span>
                        </div>
                        <div className="corporate-industry-card animate-fade-in-up delay-200">
                            <div className="corporate-industry-icon-wrapper">
                                <Briefcase className="corporate-industry-icon" />
                            </div>
                            <span>Hospitality</span>
                        </div>
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
