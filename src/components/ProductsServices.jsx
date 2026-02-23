import { ArrowRight, CheckCircle, Database, Server, Shield, Globe, Cpu, BarChart, Users, BookOpen, Truck, Building, Activity, Briefcase } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProductsServices = () => {
    return (
        <div className="products-services-page">
            {/* 1. Page Hero Section */}
            <section className="products-hero">
                <div className="stars-container">
                    <div className="stars-sm"></div>
                    <div className="stars-md"></div>
                    <div className="stars-lg"></div>
                </div>
                <div className="container hero-container">
                    <div className="hero-content text-center">
                        <h1 className="hero-title animate-fade-in-up">Innovative Software Solutions Built for Growth</h1>
                        <p className="hero-subtitle animate-fade-in-up delay-100">
                            From Academic ERPs to Enterprise Platforms, Royal Software Solutions delivers research-driven, scalable technology systems designed for African institutions and businesses.
                        </p>
                        <div className="hero-buttons animate-fade-in-up delay-200">
                            <Link to="/get-quote" className="btn btn-primary">
                                Get a Quote <ArrowRight size={18} />
                            </Link>
                            <a href="#fahari" className="btn btn-outline">
                                Explore FAHARI Ecosystem
                            </a>
                        </div>
                    </div>
                </div>
                <div className="hero-bg-overlay"></div>
            </section>

            {/* 2. School Management Systems */}
            <section id="academic-erp" className="section academic-erp">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Academic ERP & School Management Systems</h2>
                        <p className="section-subtitle">
                            Comprehensive digital platforms for primary, secondary, and tertiary education institutions designed to streamline academic and administrative operations.
                        </p>
                    </div>
                    <div className="erp-grid">
                        <div className="erp-content">
                            <ul className="feature-list">
                                <li><CheckCircle size={20} className="icon-check" /> Student Information Management</li>
                                <li><CheckCircle size={20} className="icon-check" /> Academic Performance Tracking</li>
                                <li><CheckCircle size={20} className="icon-check" /> CBC, KCSE, IGCSE aligned tracking</li>
                                <li><CheckCircle size={20} className="icon-check" /> Fee Management with Bank & M-Pesa integration</li>
                                <li><CheckCircle size={20} className="icon-check" /> Timetable & Examination Management</li>
                                <li><CheckCircle size={20} className="icon-check" /> Finance & Core Accounting</li>
                                <li><CheckCircle size={20} className="icon-check" /> Human Resource & Payroll Management</li>
                                <li><CheckCircle size={20} className="icon-check" /> Parent & Teacher Portals</li>
                            </ul>
                            <div className="erp-cta">
                                <Link to="/get-quote" className="btn btn-primary">Request School Demo</Link>
                            </div>
                        </div>
                        <div className="erp-visual">
                            {/* Placeholder for illustration */}
                            <div className="visual-placeholder">
                                <BookOpen size={64} className="visual-icon" />
                                <span>Academic Excellence</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Custom Software Development */}
            <section className="section custom-dev bg-neutral">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Custom Software Development</h2>
                        <p className="section-subtitle">
                            We design and develop tailored software systems for businesses and institutions across industries.
                        </p>
                    </div>
                    <div className="services-grid-3">
                        <div className="service-card">
                            <Database size={32} className="service-icon" />
                            <h3>ERP Systems</h3>
                            <p>For All Industries</p>
                        </div>
                        <div className="service-card">
                            <Activity size={32} className="service-icon" />
                            <h3>Point of Sale (POS)</h3>
                            <p>Retail & Wholesale Systems</p>
                        </div>
                        <div className="service-card">
                            <Server size={32} className="service-icon" />
                            <h3>Inventory Management</h3>
                            <p>Stock & Supply Chain</p>
                        </div>
                        <div className="service-card">
                            <BarChart size={32} className="service-icon" />
                            <h3>Financial & Accounting</h3>
                            <p>Core Finance Systems</p>
                        </div>
                        <div className="service-card">
                            <Globe size={32} className="service-icon" />
                            <h3>Web & Mobile Apps</h3>
                            <p>iOS, Android & Hybrid</p>
                        </div>
                        <div className="service-card">
                            <Users size={32} className="service-icon" />
                            <h3>CRM Systems</h3>
                            <p>Customer Relationship Management</p>
                        </div>
                    </div>
                    <div className="section-cta text-center mt-4">
                        <Link to="/get-quote" className="btn btn-secondary">Discuss Your Project</Link>
                    </div>
                </div>
            </section>

            {/* 4. IT Consulting */}
            <section className="section it-consulting">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">IT Consulting & Digital Transformation</h2>
                        <p className="section-subtitle">
                            We guide institutions through technology modernization and operational optimization.
                        </p>
                    </div>
                    <div className="consulting-list">
                        <div className="consulting-item">
                            <Activity size={24} className="consulting-icon" />
                            <span>System Analysis</span>
                        </div>
                        <div className="consulting-item">
                            <BarChart size={24} className="consulting-icon" />
                            <span>Business Process Optimization</span>
                        </div>
                        <div className="consulting-item">
                            <Cpu size={24} className="consulting-icon" />
                            <span>Software Deployment & Training</span>
                        </div>
                        <div className="consulting-item">
                            <Database size={24} className="consulting-icon" />
                            <span>Data Migration</span>
                        </div>
                        <div className="consulting-item">
                            <Shield size={24} className="consulting-icon" />
                            <span>Technology Advisory Services</span>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <Link to="/get-quote" className="btn btn-outline">Book a Consultation</Link>
                    </div>
                </div>
            </section>

            {/* 5. FAHARI Ecosystem (Flagship) */}
            <section id="fahari" className="section fahari-ecosystem">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title text-white">FAHARI – The Unified SaaS Ecosystem</h2>
                        <p className="section-subtitle text-white-opacity">
                            FAHARI is a modular, cloud-based software ecosystem built by Royal Software Solutions to integrate core business and institutional functions into seamless digital platforms.
                        </p>
                    </div>

                    <div className="fahari-suite">
                        {/* Education Solutions */}
                        <div className="suite-cluster">
                            <h3 className="cluster-title">Education Solutions</h3>
                            <div className="suite-grid">
                                <div className="suite-card">
                                    <h4>Fahari Academia</h4>
                                    <p>Primary & Secondary School Management</p>
                                </div>
                                <div className="suite-card">
                                    <h4>Fahari Campus</h4>
                                    <p>Tertiary & University Management</p>
                                </div>
                            </div>
                        </div>

                        {/* Enterprise Solutions */}
                        <div className="suite-cluster">
                            <h3 className="cluster-title">Enterprise Solutions</h3>
                            <div className="suite-grid">
                                <div className="suite-card">
                                    <h4>Fahari Salesforce</h4>
                                    <p>POS, Sales & Inventory</p>
                                </div>
                                <div className="suite-card">
                                    <h4>Fahari Financials</h4>
                                    <p>Accounting & Financial Management</p>
                                </div>
                                <div className="suite-card">
                                    <h4>Fahari Workforce</h4>
                                    <p>Human Resource & Payroll</p>
                                </div>
                                <div className="suite-card">
                                    <h4>Fahari Connect</h4>
                                    <p>Customer Relationship Management</p>
                                </div>
                                <div className="suite-card">
                                    <h4>Fahari Flow</h4>
                                    <p>Supply Chain Management</p>
                                </div>
                                <div className="suite-card">
                                    <h4>Fahari Zenith</h4>
                                    <p>Business Intelligence & Analytics</p>
                                </div>
                                <div className="suite-card">
                                    <h4>Fahari Vault</h4>
                                    <p>Secure Document & Data Management</p>
                                </div>
                            </div>
                        </div>

                        {/* Industry Solutions */}
                        <div className="suite-cluster">
                            <h3 className="cluster-title">Industry Solutions</h3>
                            <div className="suite-grid">
                                <div className="suite-card">
                                    <h4>Fahari Hospitality</h4>
                                    <p>Hotel & Reservation Systems</p>
                                </div>
                                <div className="suite-card">
                                    <h4>Fahari Industrial</h4>
                                    <p>Manufacturing ERP</p>
                                </div>
                                <div className="suite-card">
                                    <h4>Fahari Transporter</h4>
                                    <p>Logistics & Fleet Management</p>
                                </div>
                                <div className="suite-card">
                                    <h4>Fahari Construct</h4>
                                    <p>Construction Project Management</p>
                                </div>
                                <div className="suite-card">
                                    <h4>Fahari Care</h4>
                                    <p>Healthcare Management Systems</p>
                                </div>
                                <div className="suite-card">
                                    <h4>Fahari Aid</h4>
                                    <p>NGO & Donor Management Systems</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Platform Architecture */}
            <section className="section architecture bg-neutral">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Built on a Secure & Scalable Architecture</h2>
                        <p className="section-subtitle">
                            FAHARI is designed as a modular SaaS ecosystem built on a shared core infrastructure.
                        </p>
                    </div>
                    <div className="architecture-grid">
                        <div className="arch-item">
                            <Shield className="arch-icon" />
                            <span>Unified Authentication</span>
                        </div>
                        <div className="arch-item">
                            <Users className="arch-icon" />
                            <span>Role-Based Access Control</span>
                        </div>
                        <div className="arch-item">
                            <Activity className="arch-icon" />
                            <span>Centralized Billing Engine</span>
                        </div>
                        <div className="arch-item">
                            <Globe className="arch-icon" />
                            <span>Cloud Deployment</span>
                        </div>
                        <div className="arch-item">
                            <Server className="arch-icon" />
                            <span>API-Driven Integration</span>
                        </div>
                        <div className="arch-item">
                            <Database className="arch-icon" />
                            <span>Data Security & Encryption</span>
                        </div>
                    </div>
                    <p className="text-center mt-4 font-semibold text-primary">
                        This architecture ensures scalability, interoperability, and long-term sustainability.
                    </p>
                </div>
            </section>

            {/* 7. Industries We Serve */}
            <section className="section industries">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Industries We Serve</h2>
                    </div>
                    <div className="industries-grid">
                        <div className="industry-card">
                            <BookOpen className="industry-icon" />
                            <span>Education</span>
                        </div>
                        <div className="industry-card">
                            <Users className="industry-icon" />
                            <span>Retail & Commerce</span>
                        </div>
                        <div className="industry-card">
                            <Activity className="industry-icon" />
                            <span>Healthcare</span>
                        </div>
                        <div className="industry-card">
                            <Cpu className="industry-icon" />
                            <span>Manufacturing</span>
                        </div>
                        <div className="industry-card">
                            <Truck className="industry-icon" />
                            <span>Logistics</span>
                        </div>
                        <div className="industry-card">
                            <Building className="industry-icon" />
                            <span>Construction</span>
                        </div>
                        <div className="industry-card">
                            <Globe className="industry-icon" />
                            <span>NGOs</span>
                        </div>
                        <div className="industry-card">
                            <Briefcase className="industry-icon" />
                            <span>Hospitality</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Call to Action */}
            <section className="section cta-banner">
                <div className="container text-center">
                    <h2 className="cta-title">Ready to transform your institution or enterprise?</h2>
                    <p className="cta-subtitle">Let us design a scalable solution tailored to your needs.</p>
                    <Link to="/get-quote" className="btn btn-white">Get a free Quote</Link>
                </div>
            </section>
        </div>
    )
}

export default ProductsServices
