import { Eye, Target, Shield, Lightbulb, Sprout, Scale, Heart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from './SEO'

const About = () => {
    return (
        <div id="about" className="about-page">
            <SEO 
                title="About Us" 
                description="Royal Software Solutions is a research-driven technology company building reliable, scalable, and sustainable software solutions for institutions and businesses across Africa."
                path="/about"
            />

            {/* 1. Page Hero */}
            <section className="about-hero">
                <div className="container">
                    <h1>We are building the infrastructure of African excellence.</h1>
                    <p className="hero-sub">
                        Not a software company in the traditional sense. Not a startup looking for its next pivot. A technology institution with a specific conviction: that every African school, business, cooperative, and organisation deserves to operate at its full potential.
                    </p>
                </div>
                {/* Tech grid overlay */}
            </section>

            {/* 2. About Us Overview */}
            <section className="section about-overview">
                <div className="container about-container">
                    <div className="about-image-wrapper">
                        <img src="/tech-globe.jpg" alt="Technology Innovation Strategy" className="about-image" />
                        <div className="glass-badge">
                            <span>Fahari Ecosystem</span>
                        </div>
                    </div>
                    <div className="about-content">
                        <h2 className="section-title-left">Our Story</h2>
                        <div className="about-text-content">
                            <p>
                                Royal Software Solutions was founded in Nakuru, Kenya with a conviction that grew from watching African institutions operate at a fraction of their potential — not because of lack of ambition or talent, but because of the infrastructure they had been given.
                            </p>
                            <p>
                                Paper fee ledgers in school offices. Manual loan calculations in SACCO boardrooms. Procurement approvals via WhatsApp. Business owners who could not tell you their profit margin without making three phone calls.
                            </p>
                            <p>
                                We did not see a technology gap. We saw an infrastructure gap. And we decided to close it.
                            </p>
                            <p className="highlight-text">
                                The <strong>Fahari Ecosystem</strong> — our flagship product suite — is the answer we built. 'Fahari' is the Swahili word for pride, excellence, and dignity. Every product we build carries that name because every institution we serve deserves to operate with exactly that.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Vision & Mission (Bento Grid) */}
            <section className="section vision-mission-section bg-neutral">
                <div className="container">
                    <div className="bento-grid-2">
                        <div className="bento-card tech-card">
                            <div className="tech-icon-wrapper">
                                <Eye size={36} />
                            </div>
                            <h3>Our Vision</h3>
                            <p>A continent where every institution — from a primary school in Nakuru to a manufacturing plant in Lagos — operates with the same clarity, intelligence, and operational excellence as the world's best-run organisations.</p>
                        </div>
                        <div className="bento-card tech-card">
                            <div className="tech-icon-wrapper">
                                <Target size={36} />
                            </div>
                            <h3>Our Mission</h3>
                            <p>To give every African institution — regardless of size, sector, or location — the operational infrastructure it needs to perform at its full potential.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Core Values */}
            <section className="section values-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Our Core Values</h2>
                    </div>
                    <div className="bento-grid-3">
                        <div className="bento-card tech-card value-card-modern">
                            <Shield className="tech-icon" size={32} />
                            <h3>Integrity</h3>
                            <p>We uphold honesty and ethical practices in every solution we deliver.</p>
                        </div>
                        <div className="bento-card tech-card value-card-modern">
                            <Lightbulb className="tech-icon" size={32} />
                            <h3>Innovation</h3>
                            <p>Creativity and research-driven approaches guide our development.</p>
                        </div>
                        <div className="bento-card tech-card value-card-modern">
                            <Sprout className="tech-icon" size={32} />
                            <h3>Sustainability</h3>
                            <p>We provide solutions designed to last and create long-term impact.</p>
                        </div>
                        <div className="bento-card tech-card value-card-modern">
                            <Scale className="tech-icon" size={32} />
                            <h3>Equity</h3>
                            <p>We ensure fair and distributed access to software and technology solutions.</p>
                        </div>
                        <div className="bento-card tech-card value-card-modern">
                            <Heart className="tech-icon" size={32} />
                            <h3>Faith and Purpose</h3>
                            <p>Our work is grounded in values that honor purpose, community, and faith.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Why We Build for Africa (Manifesto Style) */}
            <section className="section manifesto-section text-center">
                <div className="container manifesto-container">
                    <div className="manifesto-content">
                        <h2 className="manifesto-title">
                            Global software companies build for their context first and adapt for Africa later.<br/>We build for Africa first.
                        </h2>
                        <p className="manifesto-text">
                            M-Pesa is not an integration we added to a Western product. It is the assumption we started with. CBC curriculum, NHIF and NSSF compliance, SACCO regulation, and East African procurement norms are not afterthoughts. They are the foundation. When you run Fahari, you run a system that was built specifically for your country, your compliance environment, and your operational reality.
                        </p>
                    </div>
                </div>
            </section>

            {/* 6. About Page CTA */}
            <section className="section cta-section text-center">
                <div className="container cta-container">
                    <div className="cta-content">
                        <h2>We build the infrastructure.<br/>You lead the institution.</h2>
                    </div>
                    <div className="cta-actions">
                        <Link to="/products-services" className="btn btn-secondary btn-lg">
                            See Our Products <ArrowRight size={20} />
                        </Link>
                        <a href="https://wa.me/254759437978?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20Fahari." className="btn btn-outline-white btn-lg" target="_blank" rel="noopener noreferrer">
                            Talk to Our Team
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About

