import { Eye, Target, Shield, Lightbulb, Sprout, Scale, Heart } from 'lucide-react'
import SEO from './SEO'

const About = () => {
    const aboutStructuredData = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Royal Software Solutions",
        "description": "Learn about Royal Software Solutions, a research-driven technology company building reliable, scalable software solutions for African institutions.",
        "url": "https://royalsoftwares.co.ke/about",
        "mainEntity": {
            "@type": "Organization",
            "name": "Royal Software Solutions",
            "foundingDate": "2020",
            "slogan": "Powering African Excellence and Pride Through Technology",
            "knowsAbout": ["Software Development", "ERP Systems", "IT Consulting", "Digital Transformation"]
        }
    }

    return (
        <div id="about" className="about-page">
            <SEO
                title="About Us"
                description="Royal Software Solutions is a leading technology company dedicated to transforming how African businesses and institutions manage operations. Research-driven, innovative solutions for lasting impact."
                keywords="about Royal Software Solutions, African technology company, software company Kenya, IT innovation Africa, enterprise software development, technology vision mission"
                canonicalUrl="/about"
                structuredData={aboutStructuredData}
            />
            {/* 1. Page Hero */}
            <section className="about-hero">
                <div className="container">
                    <h1>About Us</h1>
                    <p className="hero-sub">
                        A research-driven technology company building reliable, scalable, and sustainable software solutions for institutions and businesses across Africa.
                    </p>
                </div>
                <div className="hero-background-effect"></div>
                <div className="hero-stars"></div>
            </section>

            {/* 2. About Us Overview */}
            <section className="section about-overview">
                <div className="container about-container">
                    <div className="about-image-wrapper" style={{ position: 'relative' }}>
                        <img src="/tech-globe.jpg" alt="Technology Innovation Strategy" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', display: 'block' }} />
                        <div className="floating-card" style={{ position: 'absolute', bottom: '-20px', right: '-20px', zIndex: 10 }}>
                            <span>Innovation Focused</span>
                        </div>
                    </div>
                    <div className="about-content">
                        <h2 className="section-title-left">Who We Are</h2>
                        <p>
                            Royal Software Solutions is a leading technology company dedicated to transforming how businesses and institutions manage their day-to-day operations. Founded with a vision to deliver innovative, research-driven solutions, the company provides modern, reliable, and sustainable software tailored for growth and long-term impact.
                        </p>
                        <p>
                            Our solutions streamline operations, simplify management, and enhance performance by delivering real-time insights into institutional and business activities. By combining global standards with local understanding, we empower institutions across Africa to focus on strategy and growth while we handle the technology.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Vision & Mission */}
            <section className="section vision-mission-section">
                <div className="container">
                    <div className="vm-grid">
                        <div className="vm-card vision">
                            <div className="vm-card-inner">
                                <div className="icon-box">
                                    <Eye size={40} />
                                </div>
                                <h3>Our Vision</h3>
                                <p>To be a leading technology institution delivering innovative, research-driven solutions that create lasting transformation.</p>
                            </div>
                        </div>
                        <div className="vm-card mission">
                            <div className="vm-card-inner">
                                <div className="icon-box">
                                    <Target size={40} />
                                </div>
                                <h3>Our Mission</h3>
                                <p>To build reliable, sustainable technology solutions that solve real-world problems through research, analysis, and continuous innovation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Core Values */}
            <section className="section values-section">
                <div className="container">
                    <h2 className="section-title center">Our Core Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <Shield className="value-icon" size={32} />
                            <h3>Integrity</h3>
                            <p>We uphold honesty and ethical practices in every solution we deliver.</p>
                        </div>
                        <div className="value-card">
                            <Lightbulb className="value-icon" size={32} />
                            <h3>Innovation</h3>
                            <p>Creativity and research-driven approaches guide our development.</p>
                        </div>
                        <div className="value-card">
                            <Sprout className="value-icon" size={32} />
                            <h3>Sustainability</h3>
                            <p>We provide solutions designed to last and create long-term impact.</p>
                        </div>
                        <div className="value-card">
                            <Scale className="value-icon" size={32} />
                            <h3>Equity</h3>
                            <p>We ensure fair and distributed access to software and technology solutions.</p>
                        </div>
                        <div className="value-card">
                            <Heart className="value-icon" size={32} />
                            <h3>Faith and Purpose</h3>
                            <p>Our work is grounded in values that honor purpose, community, and faith.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Brand Statement */}
            <section className="brand-statement-section">
                <div className="container">
                    <h2>"Powering African Excellence and Pride Through Technology"</h2>
                </div>
            </section>
        </div>
    )
}

export default About
