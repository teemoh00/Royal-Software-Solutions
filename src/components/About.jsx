import { Eye, Target, Shield, Lightbulb, Sprout, Scale, Heart } from 'lucide-react'
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
                <div className="hero-background-effect"></div>
                <div className="hero-stars"></div>
            </section>

            {/* 2. About Us Overview */}
            <section className="section about-overview">
                <div className="container about-container">
                    <div className="about-image-wrapper" style={{ position: 'relative' }}>
                        <img src="/tech-globe.jpg" alt="Technology Innovation Strategy" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', display: 'block' }} />
                        <div className="floating-card" style={{ position: 'absolute', bottom: '-20px', right: '-20px', zIndex: 10 }}>
                            <span>Fahari Ecosystem</span>
                        </div>
                    </div>
                    <div className="about-content">
                        <h2 className="section-title-left">Our Story</h2>
                        <p>
                            Royal Software Solutions was founded in Nakuru, Kenya with a conviction that grew from watching African institutions operate at a fraction of their potential — not because of lack of ambition or talent, but because of the infrastructure they had been given.
                        </p>
                        <p>
                            Paper fee ledgers in school offices. Manual loan calculations in SACCO boardrooms. Procurement approvals via WhatsApp. Business owners who could not tell you their profit margin without making three phone calls.
                        </p>
                        <p>
                            We did not see a technology gap. We saw an infrastructure gap. And we decided to close it.
                        </p>
                        <p>
                            The Fahari Ecosystem — our flagship product suite — is the answer we built. 'Fahari' is the Swahili word for pride, excellence, and dignity. Every product we build carries that name because every institution we serve deserves to operate with exactly that.
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
                                <p>A continent where every institution — from a primary school in Nakuru to a manufacturing plant in Lagos — operates with the same clarity, intelligence, and operational excellence as the world's best-run organisations.</p>
                            </div>
                        </div>
                        <div className="vm-card mission">
                            <div className="vm-card-inner">
                                <div className="icon-box">
                                    <Target size={40} />
                                </div>
                                <h3>Our Mission</h3>
                                <p>To give every African institution — regardless of size, sector, or location — the operational infrastructure it needs to perform at its full potential.</p>
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

            {/* 5. Why We Build for Africa */}
            <section className="section bg-light build-for-africa-section" style={{ padding: '5rem 0' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 className="section-title" style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2.2rem', marginBottom: '1.5rem', fontWeight: 'bold', color: '#0D1B3E' }}>
                        Global software companies build for their context first and adapt for Africa later. We build for Africa first.
                    </h2>
                    <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#444444', textAlign: 'justify', marginBottom: 0 }}>
                        M-Pesa is not an integration we added to a Western product. It is the assumption we started with. CBC curriculum, NHIF and NSSF compliance, SACCO regulation, and East African procurement norms are not afterthoughts. They are the foundation. When you run Fahari, you run a system that was built specifically for your country, your compliance environment, and your operational reality.
                    </p>
                </div>
            </section>

            {/* 6. About Page CTA */}
            <section className="brand-statement-section text-center" style={{ background: '#0D1B3E', color: 'white', padding: '6rem 2rem' }}>
                <div className="container">
                    <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 'bold' }}>
                        We build the infrastructure. You lead the institution.
                    </h2>
                    <div className="cta-actions" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
                        <a href="/products-services" className="btn btn-pill-primary" style={{ background: '#C89B2A', borderColor: '#C89B2A', padding: '0.8rem 2rem', fontWeight: 'bold', textDecoration: 'none', color: 'white', borderRadius: '30px' }}>
                            See Our Products
                        </a>
                        <a href="https://wa.me/254759437978?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20Fahari." className="btn btn-outline" style={{ borderColor: '#FFFFFF', padding: '0.8rem 2rem', fontWeight: 'bold', textDecoration: 'none', color: 'white', borderRadius: '30px' }}>
                            Talk to Our Team
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
