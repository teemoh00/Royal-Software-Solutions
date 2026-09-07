import { ArrowRight, Play, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section 
            id="home" 
            className="home-hero" 
        >
            {/* Cinematic Volumetric Spotlight */}
            <div className="hero-cinematic-spotlight"></div>
            
            <div className="container home-hero-container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="hero-content">
                    <span className="hero-pre-headline cinematic-fade-in" style={{ animationDelay: '0.2s' }}>
                        Built for East Africa. Built for here.
                    </span>
                    <h1 className="cinematic-fade-in" style={{ animationDelay: '0.4s' }}>The infrastructure of African excellence.</h1>
                    <p className="hero-sub-headline cinematic-fade-in" style={{ animationDelay: '0.6s' }}>
                        Your school, your business, your SACCO — finally running with clarity.
                    </p>
                    <div className="hero-highlights cinematic-fade-in" style={{ animationDelay: '0.8s' }}>
                        <span className="highlight-tag"><CheckCircle size={14} /> M-Pesa integrated</span>
                        <span className="highlight-tag"><CheckCircle size={14} /> CBC compliant</span>
                        <span className="highlight-tag"><CheckCircle size={14} /> Live in 24 hours</span>
                    </div>
                    <div className="hero-buttons cinematic-fade-in" style={{ animationDelay: '1.0s' }}>
                        <Link to="/get-quote" className="btn btn-primary btn-glow">
                            Get a Free Demo <ArrowRight size={18} />
                        </Link>
                        <a href="#services" className="btn btn-glass">
                            See How It Works <Play size={16} style={{ marginLeft: '8px' }} />
                        </a>
                    </div>
                </div>
                
                <div className="hero-visual cinematic-fade-in" style={{ animationDelay: '1.2s' }}>
                    <div className="hero-dashboard-split">
                        {/* Left Dashboard - Fahari Academia */}
                        <div className="mockup-panel academia-panel cinematic-tilt">
                            <div className="panel-header">
                                <div className="panel-dots">
                                    <span></span><span></span><span></span>
                                </div>
                                <span className="panel-title">Greenwood Academia — Fees</span>
                            </div>
                            <div className="panel-body">
                                <div className="panel-metric">
                                    <span className="metric-label">Term Balance</span>
                                    <span className="metric-value">KES 1,245,000</span>
                                </div>
                                <div className="student-list">
                                    <div className="student-row">
                                        <div className="student-info">
                                            <span className="student-name">Mwangi Kamau</span>
                                            <span className="student-grade">Grade 4 Blue</span>
                                        </div>
                                        <span className="status-pill status-paid">M-Pesa Paid</span>
                                    </div>
                                    <div className="student-row">
                                        <div className="student-info">
                                            <span className="student-name">Amina Yusuf</span>
                                            <span className="student-grade">Grade 6 East</span>
                                        </div>
                                        <span className="status-pill status-pending">Pending</span>
                                    </div>
                                    <div className="student-row">
                                        <div className="student-info">
                                            <span className="student-name">Otieno Ochieng</span>
                                            <span className="student-grade">Grade 3 West</span>
                                        </div>
                                        <span className="status-pill status-cleared">Cleared</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Dashboard - Fahari Nexus */}
                        <div className="mockup-panel nexus-panel cinematic-tilt">
                            <div className="panel-header">
                                <div className="panel-dots">
                                    <span></span><span></span><span></span>
                                </div>
                                <span className="panel-title">Nexus ERP — SME Operations</span>
                            </div>
                            <div className="panel-body">
                                <div className="panel-metric">
                                    <span className="metric-label">Sales Revenue</span>
                                    <span className="metric-value">KES 1,420,000</span>
                                </div>
                                <div className="nexus-stats">
                                    <div className="stat-row">
                                        <span>Inventory Level</span>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: '89%' }}></div>
                                        </div>
                                        <span>89%</span>
                                    </div>
                                </div>
                                <div className="workflow-list">
                                    <div className="workflow-item">
                                        <span className="workflow-title">Safari Bakers LPO</span>
                                        <span className="status-pill status-approved">Approved</span>
                                    </div>
                                    <div className="workflow-item">
                                        <span className="workflow-title">Rift Distributors Invoice</span>
                                        <span className="status-pill status-pending">Pending</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Badges */}
                    <div className="floating-badge badge-mpesa">
                        <CheckCircle size={14} className="badge-icon" />
                        <span>M-Pesa Integrated</span>
                    </div>
                    <div className="floating-badge badge-golive">
                        <CheckCircle size={14} className="badge-icon" />
                        <span>1 Day Go-Live</span>
                    </div>
                    <div className="floating-badge badge-cbc">
                        <CheckCircle size={14} className="badge-icon" />
                        <span>CBC Compliant</span>
                    </div>
                    <div className="floating-badge badge-nhif">
                        <CheckCircle size={14} className="badge-icon" />
                        <span>NHIF/NSSF Ready</span>
                    </div>
                </div>
            </div>

            {/* Cinematic Fade Transition to next section */}
            <div className="hero-transition-fade"></div>
        </section>
    )
}

export default Hero
