import { Shield, BookOpen, Settings, Mail, Phone, Globe, MapPin, User, Lock, Server, Cloud, Database, Cpu, Activity, CheckCircle, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from './SEO'

const Support = () => {
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        // Simulate login
        alert('Simulating login... Redirecting to Admin Dashboard.')
        // In a real app: window.location.href = '/admin/dashboard'
    }



    return (
        <div className="support-page">
            <SEO 
                title="Support" 
                description="Get help with Royal Software Solutions. Contact our support team for assistance with Fahari products and custom software."
                path="/support"
            />
            {/* 1. Hero Section */}
            <section className="support-hero">
                <div className="container hero-container text-center">
                    <h1 className="hero-title animate-fade-in-up">Welcome to Royal Support </h1>
                </div>
                <div className="hero-background-effect"></div>
                <div className="hero-stars"></div>
            </section>
            {/* 3. Contact Support */}
            <section className="section contact-support bg-neutral">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Contact Our Support Team</h2>
                    </div>
                    <div className="contact-cards-grid">
                        <div className="contact-card">
                            <Mail className="contact-icon" />
                            <h3>Email Support</h3>
                            <a href="mailto:info@royalsoftwares.co.ke">info@royalsoftwares.co.ke</a>
                            <p className="text-sm mt-2">Response within 24 hours</p>
                        </div>
                        <div className="contact-card">
                            <Phone className="contact-icon" />
                            <h3>Phone & WhatsApp</h3>
                            <a href="tel:+254759437978" style={{ display: 'block', marginBottom: '0.5rem' }}>+254 759 437 978</a>
                            <a href="https://wa.me/254759437978?text=Hi,%20I'd%20like%20to%20learn%20more%20about%20Fahari." target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#25D366', fontWeight: '600' }}>
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ verticalAlign: 'middle' }}>
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Chat on WhatsApp
                            </a>
                            <p className="text-sm mt-2">Mon-Fri, 8am - 5pm</p>
                        </div>
                        <div className="contact-card">
                            <MapPin className="contact-icon" />
                            <h3>Location</h3>
                            <span>Nakuru, Kenya</span>
                            <p className="text-sm mt-2">Head office</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Client Login Section (Vital) */}
            <section id="login" className="section client-login-teaser">
                <div className="container">
                    <div className="login-teaser-card">
                        <h2>Client Login</h2>
                        <p>Login to create tickets and track your support requests.</p>
                        <Link to="/login" className="btn btn-primary btn-login-link">
                            <span className="arrow-icon">➜</span> Login / Register
                        </Link>
                    </div>
                </div>
            </section>



            {/* 6. Why Trust Us */}
            <section className="section trust-factors">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Why Choose Royal Software Solutions?</h2>
                    </div>
                    <div className="trust-grid">
                        <div className="trust-item">

                            <Cpu className="trust-icon" />
                            <h4>Research-Driven</h4>
                            <p>Development based on deep industry analysis.</p>
                        </div>
                        <div className="trust-item">
                            <Server className="trust-icon" />
                            <h4>Scalable Architecture</h4>
                            <p>Cloud-native systems that grow with you.</p>
                        </div>
                        <div className="trust-item">
                            <Shield className="trust-icon" />
                            <h4>Secure By Design</h4>
                            <p>Enterprise-grade security standards.</p>
                        </div>
                        <div className="trust-item">
                            <User className="trust-icon" />
                            <h4>Client-Centric</h4>
                            <p>Dedicated support for your long-term success.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. CTA */}
            <section className="section cta-banner">
                <div className="container text-center">
                    <h2 className="cta-title">Need immediate assistance?</h2>
                    <a href="mailto:info@royalsoftwares.co.ke" className="btn btn-white">Contact Support Now</a>
                </div>
            </section>
        </div>
    )
}

export default Support
