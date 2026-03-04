import { useState } from 'react'
import { CheckCircle, Shield, Server, Users, Mail, Phone, Globe, MapPin } from 'lucide-react'
import SEO from './SEO'

const GetQuote = () => {
    const quoteStructuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Get a Quote - Royal Software Solutions",
        "description": "Request a customized software solution quote from Royal Software Solutions.",
        "url": "https://royalsoftwares.co.ke/get-quote",
        "potentialAction": {
            "@type": "CommunicateAction",
            "target": "https://royalsoftwares.co.ke/get-quote"
        }
    }

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        role: '',
        service: '',
        projectDescription: '',
        users: '',
        industry: '',
        budget: '',
        timeline: '',
        options: {
            cloudHosting: false,
            training: false,
            integration: false,
            maintenance: false
        }
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                options: {
                    ...formData.options,
                    [name]: checked
                }
            })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form Submitted:", formData)
        alert("Thank you! Your quote request has been submitted. We will contact you shortly.")
    }

    return (
        <div className="quote-page">
            {/* 1. Hero Section */}
            <section className="quote-hero">
                <div className="container">
                    <h1 className="hero-title">Request a Customized Software Solution</h1>
                    <p className="hero-subtitle">
                        Tell us about your institution or business needs, and our team will design a scalable, research-driven solution tailored specifically for you.
                    </p>
                    <p className="hero-desc">
                        We provide Academic ERP systems, enterprise software, custom development, and the FAHARI SaaS ecosystem.
                    </p>
                </div>
            </section>

            {/* 2. Why Choose Us (Trust Builder) */}
            <section className="why-choose-quote">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Why Work With Royal Software Solutions?</h2>
                    </div>
                    <div className="trust-grid-quote">
                        <div className="trust-card">
                            <CheckCircle className="trust-icon" size={32} />
                            <h3>Research-Driven Technology</h3>
                            <p>Solutions built on data and market research.</p>
                        </div>
                        <div className="trust-card">
                            <Server className="trust-icon" size={32} />
                            <h3>Scalable Cloud-Based Systems</h3>
                            <p>Grow your business without technical limits.</p>
                        </div>
                        <div className="trust-card">
                            <Shield className="trust-icon" size={32} />
                            <h3>Secure & Integrated Architecture</h3>
                            <p>Enterprise-grade security and API integrations.</p>
                        </div>
                        <div className="trust-card">
                            <Users className="trust-icon" size={32} />
                            <h3>Dedicated Client Support</h3>
                            <p>24/7 support and training for your team.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Get Quote Form (Main Section) */}
            <section className="quote-form-section">
                <div className="container">
                    <div className="quote-form-card">
                        <form onSubmit={handleSubmit}>
                            {/* Section A: Contact Details */}
                            <div className="form-section">
                                <h3 className="form-section-title">A. Contact Details</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Full Name <span className="required">*</span></label>
                                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter your full name" />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address <span className="required">*</span></label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number <span className="required">*</span></label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter your phone number" />
                                    </div>
                                    <div className="form-group">
                                        <label>Organization Name <span className="required">*</span></label>
                                        <input type="text" name="organization" value={formData.organization} onChange={handleChange} required placeholder="Company or Institution name" />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Position / Role</label>
                                        <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="e.g. CEO, IT Manager, Principal" />
                                    </div>
                                </div>
                            </div>

                            {/* Section B: Service Selection */}
                            <div className="form-section">
                                <h3 className="form-section-title">B. Service Selection</h3>
                                <div className="form-group full-width">
                                    <label>Service Interested In</label>
                                    <select name="service" value={formData.service} onChange={handleChange}>
                                        <option value="">Select a Service</option>
                                        <option value="Academic ERP">Academic ERP System</option>
                                        <option value="Custom Software">Custom Software Development</option>
                                        <option value="IT Consulting">IT Consulting & Digital Transformation</option>
                                        <option value="FAHARI Ecosystem">FAHARI Ecosystem</option>
                                        <option value="POS Inventory">POS & Inventory System</option>
                                        <option value="CRM">CRM System</option>
                                        <option value="Accounting">Accounting & Financial Systems</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Section C: Project Details */}
                            <div className="form-section">
                                <h3 className="form-section-title">C. Project Details</h3>
                                <div className="form-group full-width">
                                    <label>Describe Your Project</label>
                                    <textarea name="projectDescription" value={formData.projectDescription} onChange={handleChange} rows="4" placeholder="Briefly describe what you need..."></textarea>
                                </div>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Estimated Number of Users</label>
                                        <input type="number" name="users" value={formData.users} onChange={handleChange} placeholder="e.g. 50" />
                                    </div>
                                    <div className="form-group">
                                        <label>Industry Type</label>
                                        <select name="industry" value={formData.industry} onChange={handleChange}>
                                            <option value="">Select Industry</option>
                                            <option value="Education">Education</option>
                                            <option value="Retail">Retail</option>
                                            <option value="Healthcare">Healthcare</option>
                                            <option value="Manufacturing">Manufacturing</option>
                                            <option value="Logistics">Logistics</option>
                                            <option value="Construction">Construction</option>
                                            <option value="NGO">NGO</option>
                                            <option value="Hospitality">Hospitality</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Budget Range</label>
                                        <select name="budget" value={formData.budget} onChange={handleChange}>
                                            <option value="">Select Budget Range</option>
                                            <option value="Below 100k">Below KES 100,000</option>
                                            <option value="100k-500k">KES 100,000 – 500,000</option>
                                            <option value="500k-1M">KES 500,000 – 1,000,000</option>
                                            <option value="Above 1M">Above KES 1,000,000</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Project Timeline</label>
                                        <select name="timeline" value={formData.timeline} onChange={handleChange}>
                                            <option value="">Select Timeline</option>
                                            <option value="Immediate">Immediate</option>
                                            <option value="1-3 Months">1–3 Months</option>
                                            <option value="3-6 Months">3–6 Months</option>
                                            <option value="Flexible">Flexible</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Section D: Additional Options */}
                            <div className="form-section">
                                <h3 className="form-section-title">D. Additional Options</h3>
                                <div className="checkbox-group">
                                    <label className="checkbox-container">
                                        <input type="checkbox" name="cloudHosting" checked={formData.options.cloudHosting} onChange={handleChange} />
                                        <span className="checkmark"></span>
                                        I need cloud hosting
                                    </label>
                                    <label className="checkbox-container">
                                        <input type="checkbox" name="training" checked={formData.options.training} onChange={handleChange} />
                                        <span className="checkmark"></span>
                                        I require training for staff
                                    </label>
                                    <label className="checkbox-container">
                                        <input type="checkbox" name="integration" checked={formData.options.integration} onChange={handleChange} />
                                        <span className="checkmark"></span>
                                        I need system integration with existing tools
                                    </label>
                                    <label className="checkbox-container">
                                        <input type="checkbox" name="maintenance" checked={formData.options.maintenance} onChange={handleChange} />
                                        <span className="checkmark"></span>
                                        I want ongoing maintenance support
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="btn-submit">Submit Request</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* 4. What Happens Next */}
            <section className="next-steps-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">What Happens After You Submit?</h2>
                    </div>
                    <div className="steps-grid">
                        <div className="step-card">
                            <span className="step-number">1</span>
                            <h3>Request Review</h3>
                            <p>Our team reviews your request within 24 hours.</p>
                        </div>
                        <div className="step-card">
                            <span className="step-number">2</span>
                            <h3>Consultation</h3>
                            <p>We schedule a free consultation to discuss needs.</p>
                        </div>
                        <div className="step-card">
                            <span className="step-number">3</span>
                            <h3>Analysis</h3>
                            <p>We analyze your requirements in depth.</p>
                        </div>
                        <div className="step-card">
                            <span className="step-number">4</span>
                            <h3>Proposal</h3>
                            <p>You receive a customized proposal and quote.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Contact Information */}
            <section className="contact-info-section">
                <div className="container contact-info-container">
                    <div className="contact-item">
                        <Mail size={24} className="contact-icon" />
                        <p>info@royalsoftwares.co.ke</p>
                    </div>
                    <div className="contact-item">
                        <Phone size={24} className="contact-icon" />
                        <p>0759437978</p>
                    </div>
                    <div className="contact-item">
                        <MapPin size={24} className="contact-icon" />
                        <p>Nakuru, Kenya</p>
                    </div>
                </div>
            </section>

            {/* 6. CTA Banner */}
            <section className="cta-banner">
                <div className="container">
                    <h2>Let’s Build Something Powerful Together</h2>
                    <br />
                    <button className="btn btn-secondary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        Schedule Consultation
                    </button>
                </div>
            </section>
        </div>
    )
}

export default GetQuote
