import { useState, useRef } from 'react'
import { CheckCircle, Shield, Server, Users, Mail, Phone, MapPin, Loader2, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import SEO from './SEO'

const GetQuote = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        organization: '',
        institutionType: '',
        phone: '',
        email: '',
        productInterest: '',
        operationalChallenge: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'
    const formRef = useRef()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.fullName,
                    from_email: formData.email,
                    phone: formData.phone,
                    organization: formData.organization,
                    institution_type: formData.institutionType,
                    product_interest: formData.productInterest,
                    operational_challenge: formData.operationalChallenge,
                    // Legacy fallback fields for backward compatibility with EmailJS templates
                    service: formData.productInterest,
                    project_description: formData.operationalChallenge,
                    industry: formData.institutionType,
                    role: 'N/A'
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )

            setSubmitStatus('success')
            setFormData({
                fullName: '',
                organization: '',
                institutionType: '',
                phone: '',
                email: '',
                productInterest: '',
                operationalChallenge: ''
            })
        } catch (error) {
            console.error("EmailJS Error:", error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="quote-page">
            <SEO 
                title="Get a Demo" 
                description="Request a personalized demo of the Fahari operating system. Learn how we streamline operations, secure finances, and ensure compliance."
                path="/get-quote"
            />
            {/* 1. Hero Section */}
            <section className="quote-hero">
                <div className="container">
                    <h1 className="hero-title">Schedule a Personalized Demo</h1>
                    <p className="hero-subtitle">
                        See how the Fahari operating system can transform your organization's administrative, financial, and operational workflows.
                    </p>
                    <p className="hero-desc">
                        Experience native M-Pesa integrations, CBC/KCSE academic compliance, SASRA financial reporting, and unified business operations.
                    </p>
                </div>
            </section>

            {/* 2. Why Choose Us (Trust Builder) */}
            <section className="why-choose-quote">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Why Implement Fahari?</h2>
                    </div>
                    <div className="trust-grid-quote">
                        <div className="trust-card">
                            <CheckCircle className="trust-icon" size={32} />
                            <h3>Africa-Native Workflows</h3>
                            <p>Designed specifically for local operational realities and payment systems.</p>
                        </div>
                        <div className="trust-card">
                            <Server className="trust-icon" size={32} />
                            <h3>Zero-Infrastructure Cloud</h3>
                            <p>Access your school or business data from any device, anywhere, with absolute uptime.</p>
                        </div>
                        <div className="trust-card">
                            <Shield className="trust-icon" size={32} />
                            <h3>Automated Compliance</h3>
                            <p>Stay aligned with Ministry of Education, KRA, and SASRA regulatory frameworks.</p>
                        </div>
                        <div className="trust-card">
                            <Users className="trust-icon" size={32} />
                            <h3>Dedicated On-Site Training</h3>
                            <p>We don't just ship software. We train your staff on-site to ensure full adoption.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Get Quote Form (Main Section) */}
            <section className="quote-form-section">
                <div className="container">
                    <div className="quote-form-card">
                        <form onSubmit={handleSubmit} ref={formRef}>
                            <div className="form-section">
                                <h3 className="form-section-title">Demo Request Details</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Full Name <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            name="fullName" 
                                            value={formData.fullName} 
                                            onChange={handleChange} 
                                            required 
                                            placeholder="Enter your full name" 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Organisation / Institution Name <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            name="organization" 
                                            value={formData.organization} 
                                            onChange={handleChange} 
                                            required 
                                            placeholder="Company or School name" 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Institution Type <span className="required">*</span></label>
                                        <select 
                                            name="institutionType" 
                                            value={formData.institutionType} 
                                            onChange={handleChange} 
                                            required
                                        >
                                            <option value="">Select Institution Type</option>
                                            <option value="School">School / College</option>
                                            <option value="Business">Business / SME</option>
                                            <option value="SACCO">SACCO</option>
                                            <option value="NGO">NGO / Foundation</option>
                                            <option value="Hospital">Hospital / Clinic</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number <span className="required">*</span></label>
                                        <input 
                                            type="tel" 
                                            name="phone" 
                                            value={formData.phone} 
                                            onChange={handleChange} 
                                            required 
                                            placeholder="e.g. +254 759 437 978" 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address <span className="required">*</span></label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            value={formData.email} 
                                            onChange={handleChange} 
                                            required 
                                            placeholder="Enter email address" 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Product Interest <span className="required">*</span></label>
                                        <select 
                                            name="productInterest" 
                                            value={formData.productInterest} 
                                            onChange={handleChange} 
                                            required
                                        >
                                            <option value="">Select Product</option>
                                            <option value="Fahari Academia ERP">Fahari Academia ERP (School Management)</option>
                                            <option value="Fahari Ledger">Fahari Ledger (Financial/SACCO Accounting)</option>
                                            <option value="Fahari Nexus">Fahari Nexus (Business/SME Operations)</option>
                                            <option value="Custom Software Development">Custom Software Development</option>
                                            <option value="Other">Other Services</option>
                                        </select>
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Biggest Operational Challenge <span className="required">*</span></label>
                                        <textarea 
                                            name="operationalChallenge" 
                                            value={formData.operationalChallenge} 
                                            onChange={handleChange} 
                                            required 
                                            rows="5" 
                                            placeholder="What is the biggest operational hurdle your organization is facing today?"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {submitStatus === 'success' && (
                                <div className="submit-success-msg" style={{ background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <CheckCircle size={20} />
                                    <span>Thank you! Your demo request has been submitted successfully. A Fahari product consultant will contact you within 24 hours.</span>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="submit-error-msg" style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <AlertCircle size={20} />
                                    <span>Something went wrong. Please try again or reach out directly via WhatsApp or call at +254 759 437 978.</span>
                                </div>
                            )}

                            <button type="submit" className="btn-submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Scheduling...
                                    </>
                                ) : 'Request Free Demo'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* 4. What Happens Next */}
            <section className="next-steps-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">What Happens Next?</h2>
                    </div>
                    <div className="steps-grid">
                        <div className="step-card">
                            <span className="step-number">1</span>
                            <h3>Initial Contact</h3>
                            <p>Our product specialist reviews your operational challenges and contacts you within 24 hours.</p>
                        </div>
                        <div className="step-card">
                            <span className="step-number">2</span>
                            <h3>Customized Demo</h3>
                            <p>We schedule a 20-minute video session to walk you through Fahari's features relevant to your needs.</p>
                        </div>
                        <div className="step-card">
                            <span className="step-number">3</span>
                            <h3>Pilot Plan</h3>
                            <p>We set up a free trial instance for your institution populated with your initial data structures.</p>
                        </div>
                        <div className="step-card">
                            <span className="step-number">4</span>
                            <h3>Onboarding</h3>
                            <p>We deploy, import your historical records, and conduct hands-on training for your entire staff.</p>
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
                        <p>+254 759 437 978</p>
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
                    <h2>Ready to Elevate Your Operational Standards?</h2>
                    <br />
                    <button className="btn btn-secondary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        Book a Free Demo Now
                    </button>
                </div>
            </section>
        </div>
    )
}

export default GetQuote
