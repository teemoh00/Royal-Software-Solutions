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

    const supportStructuredData = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Royal Software Solutions Support",
        "description": "Get support for Royal Software Solutions products and services. Contact our team via email or phone.",
        "url": "https://royalsoftwares.co.ke/support",
        "mainEntity": {
            "@type": "Organization",
            "name": "Royal Software Solutions",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+254-759-437-978",
                "email": "info@royalsoftwares.co.ke",
                "contactType": "customer support",
                "areaServed": "Africa",
                "availableLanguage": ["English", "Swahili"]
            }
        }
    }

    return (
        <div className="support-page">
            <SEO
                title="Support"
                description="Get expert support for Royal Software Solutions products. Contact our dedicated team via email at info@royalsoftwares.co.ke or phone. 24-hour response time guaranteed."
                keywords="Royal Software Solutions support, technical support Kenya, software support Africa, ERP support, customer service, IT helpdesk"
                canonicalUrl="/support"
                structuredData={supportStructuredData}
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
                            <h3>Phone Support</h3>
                            <a href="tel:0759437978">0759437978</a>
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
