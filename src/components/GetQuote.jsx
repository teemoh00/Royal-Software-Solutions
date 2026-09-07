import { useState, useEffect } from 'react'
import { CheckCircle, Shield, Server, Users, Mail, Phone, MapPin, Loader2, AlertCircle, ArrowRight, Clock, Zap, Globe } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useSearchParams } from 'react-router-dom'
import SEO from './SEO'

const PRODUCTS = [
    { id: 'Fahari Academia ERP', label: 'Fahari Academia', sub: 'School Management ERP', color: '#10b981', rgb: '16,185,129', emoji: '🎓' },
    { id: 'Fahari Nexus',        label: 'Fahari Nexus',   sub: 'Business / SME ERP',    color: '#1b6b6b', rgb: '27,107,107', emoji: '📊' },
    { id: 'Fahari Ledger',       label: 'Fahari Ledger',  sub: 'Financial / SACCO',     color: '#C89B2A', rgb: '200,155,42', emoji: '💰' },
    { id: 'Custom Software Development', label: 'Custom Dev', sub: 'Bespoke Solutions', color: '#8b5cf6', rgb: '139,92,246', emoji: '⚙️' },
];

const GetQuote = () => {
    const [searchParams] = useSearchParams()
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
    const [submitStatus, setSubmitStatus] = useState(null)

    // Pre-select product from query param
    useEffect(() => {
        const serviceParam = searchParams.get('service')
        if (serviceParam) {
            const match = PRODUCTS.find(p =>
                p.id.toLowerCase().includes(serviceParam.toLowerCase()) ||
                serviceParam.toLowerCase().includes(p.label.toLowerCase())
            )
            if (match) setFormData(prev => ({ ...prev, productInterest: match.id }))
        }
    }, [searchParams])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const selectProduct = (id) => setFormData({ ...formData, productInterest: id })

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
                    service: formData.productInterest,
                    project_description: formData.operationalChallenge,
                    industry: formData.institutionType,
                    role: 'N/A'
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            setSubmitStatus('success')
            setFormData({ fullName: '', organization: '', institutionType: '', phone: '', email: '', productInterest: '', operationalChallenge: '' })
        } catch (error) {
            console.error('EmailJS Error:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const selectedProduct = PRODUCTS.find(p => p.id === formData.productInterest)

    return (
        <div className="quote-page">
            <SEO
                title="Book a Free Demo — See Fahari in Action"
                description="Schedule a personalized demo of the Fahari operating system. See how we help schools, businesses, and SACCOs streamline operations and go digital — fast."
                path="/get-quote"
            />

            <style>{`
                /* ===== GET QUOTE PAGE V2 ===== */
                .gq-page { background: #051414; min-height: 100vh; }

                /* Hero */
                .gq-hero {
                    position: relative;
                    background: linear-gradient(160deg, #0d2e2e 0%, #1b6b6b 60%, #071f1f 100%);
                    padding: 9rem 0 5rem;
                    overflow: hidden;
                    text-align: center;
                }
                .gq-hero::before {
                    content: '';
                    position: absolute; inset: 0;
                    background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
                    background-size: 56px 56px;
                    pointer-events: none;
                }
                .gq-hero-glow {
                    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
                    width: 800px; height: 400px;
                    background: radial-gradient(ellipse at center top, rgba(27,107,107,0.18) 0%, transparent 65%);
                    pointer-events: none;
                }

                /* Main layout */
                .gq-main {
                    background: #f1f5f9;
                    padding: 5rem 0 6rem;
                }
                .gq-split {
                    display: grid;
                    grid-template-columns: 1.4fr 1fr;
                    gap: 3rem;
                    align-items: start;
                }
                @media (max-width: 900px) { .gq-split { grid-template-columns: 1fr; } }

                /* Form card */
                .gq-form-card {
                    background: white;
                    border-radius: 24px;
                    padding: 2.5rem;
                    box-shadow: 0 4px 40px rgba(0,0,0,0.08);
                    border: 1px solid #e2e8f0;
                }
                .gq-form-title { font-size: 1.4rem; font-weight: 900; color: #0D1B3E; margin-bottom: 0.3rem; }
                .gq-form-sub { font-size: 0.88rem; color: #64748b; margin-bottom: 2rem; }

                /* Product selector cards */
                .gq-product-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-bottom: 1.5rem; }
                .gq-product-card {
                    padding: 0.8rem 1rem;
                    border-radius: 14px;
                    border: 2px solid #e2e8f0;
                    background: #f8fafc;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex; align-items: center; gap: 10px;
                }
                .gq-product-card:hover { border-color: var(--pc); background: rgba(var(--pr),0.05); }
                .gq-product-card.selected { border-color: var(--pc); background: rgba(var(--pr),0.08); box-shadow: 0 0 0 4px rgba(var(--pr),0.1); }
                .gq-product-emoji { font-size: 1.2rem; }
                .gq-product-name { font-size: 0.88rem; font-weight: 700; color: #1e293b; }
                .gq-product-sub { font-size: 0.7rem; color: #64748b; }

                /* Form fields */
                .gq-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
                @media (max-width: 600px) { .gq-fields { grid-template-columns: 1fr; } .gq-product-grid { grid-template-columns: 1fr; } }
                .gq-full { grid-column: 1 / -1; }
                .gq-label { display: block; font-size: 0.82rem; font-weight: 700; color: #374151; margin-bottom: 0.4rem; }
                .gq-required { color: #ef4444; }
                .gq-input, .gq-select, .gq-textarea {
                    width: 100%; padding: 0.75rem 1rem;
                    border: 1.5px solid #e2e8f0; border-radius: 10px;
                    font-size: 0.92rem; color: #1e293b;
                    background: #f8fafc;
                    transition: all 0.2s ease; box-sizing: border-box;
                    font-family: inherit;
                }
                .gq-input:focus, .gq-select:focus, .gq-textarea:focus {
                    outline: none; border-color: #1b6b6b;
                    box-shadow: 0 0 0 3px rgba(27,107,107,0.12);
                    background: white;
                }
                .gq-textarea { resize: vertical; min-height: 100px; }
                .gq-select { appearance: none; cursor: pointer; }

                /* Submit button */
                .gq-submit {
                    width: 100%; padding: 1rem;
                    background: linear-gradient(135deg, #1b6b6b, #0d9488);
                    color: white; border: none; border-radius: 12px;
                    font-size: 1rem; font-weight: 700; cursor: pointer;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    transition: all 0.25s ease; margin-top: 1.5rem;
                    box-shadow: 0 4px 16px rgba(13,27,62,0.3);
                }
                .gq-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(13,27,62,0.35); }
                .gq-submit:disabled { opacity: 0.7; cursor: not-allowed; }

                /* Status messages */
                .gq-success { background: #dcfce7; color: #166534; padding: 1rem 1.2rem; border-radius: 12px; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; font-size: 0.9rem; font-weight: 600; border: 1px solid #bbf7d0; }
                .gq-error { background: #fee2e2; color: #991b1b; padding: 1rem 1.2rem; border-radius: 12px; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; font-size: 0.9rem; border: 1px solid #fecaca; }

                /* Sidebar */
                .gq-sidebar { display: flex; flex-direction: column; gap: 1.2rem; position: sticky; top: 120px; }
                .gq-sidebar-card {
                    background: white;
                    border-radius: 20px;
                    padding: 1.8rem;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
                    border: 1px solid #e2e8f0;
                }
                .gq-sidebar-card.dark {
                    background: linear-gradient(135deg, #1b6b6b, #0d9488);
                    border-color: rgba(255,255,255,0.08);
                }

                /* Timeline */
                .gq-timeline { display: flex; flex-direction: column; gap: 0; }
                .gq-tl-item { display: flex; gap: 14px; position: relative; padding-bottom: 1.5rem; }
                .gq-tl-item:last-child { padding-bottom: 0; }
                .gq-tl-left { display: flex; flex-direction: column; align-items: center; gap: 0; flex-shrink: 0; }
                .gq-tl-num {
                    width: 32px; height: 32px; border-radius: 50%;
                    background: linear-gradient(135deg, #1b6b6b, #0d9488);
                    color: white; font-size: 0.8rem; font-weight: 800;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }
                .gq-tl-line { width: 2px; flex: 1; background: linear-gradient(to bottom, #1b6b6b, #e2e8f0); margin-top: 4px; min-height: 24px; }
                .gq-tl-item:last-child .gq-tl-line { display: none; }
                .gq-tl-title { font-size: 0.9rem; font-weight: 700; color: #1e293b; margin-bottom: 0.2rem; }
                .gq-tl-desc { font-size: 0.8rem; color: #64748b; line-height: 1.5; }

                /* Stat strip */
                .gq-stat-row { display: flex; gap: 1rem; flex-wrap: wrap; }
                .gq-stat { flex: 1; min-width: 80px; text-align: center; }
                .gq-stat-val { font-size: 1.5rem; font-weight: 900; color: white; line-height: 1; }
                .gq-stat-lbl { font-size: 0.68rem; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-top: 3px; }

                /* Includes list */
                .gq-includes { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.7rem; }
                .gq-includes li { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #374151; }

                /* WhatsApp card */
                .gq-wa-card {
                    background: rgba(37,211,102,0.06);
                    border: 1px solid rgba(37,211,102,0.2);
                    border-radius: 16px; padding: 1.2rem 1.5rem;
                    display: flex; align-items: center; gap: 1rem;
                }
                .gq-wa-text { font-size: 0.85rem; color: #374151; line-height: 1.5; }
                .gq-wa-link {
                    display: inline-flex; align-items: center; gap: 6px;
                    background: #25d366; color: white;
                    padding: 0.5rem 1rem; border-radius: 50px;
                    font-size: 0.82rem; font-weight: 700; text-decoration: none;
                    white-space: nowrap; transition: all 0.2s ease;
                    flex-shrink: 0;
                }
                .gq-wa-link:hover { background: #1fb659; transform: translateY(-2px); }

                /* Friction reducer */
                .gq-friction { display: flex; align-items: center; justify-content: center; gap: 1.5rem; flex-wrap: wrap; margin-top: 1.2rem; }
                .gq-friction-item { display: flex; align-items: center; gap: 5px; font-size: 0.75rem; color: #94a3b8; }

                /* Steps section */
                .gq-steps { background: white; padding: 5rem 0; }

                /* Responsive */
                @media (max-width: 600px) {
                    .gq-hero { padding: 8rem 0 4rem; }
                    .gq-form-card { padding: 1.5rem; }
                    .gq-sidebar { position: static; }
                }
            `}</style>

            <div className="gq-page">

                {/* ── Hero ── */}
                <section className="gq-hero">
                    <div className="gq-hero-glow" />
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', background: 'rgba(27,107,107,0.15)', border: '1px solid rgba(27,107,107,0.35)', color: '#4db8b8', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.5rem' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1b6b6b', boxShadow: '0 0 8px #1b6b6b', display: 'inline-block' }} />
                            Free 30-Minute Demo
                        </div>
                        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.1, marginBottom: '1.2rem', letterSpacing: '-1px' }}>
                            Schedule a Personalized Demo
                        </h1>
                        <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.8, maxWidth: '580px', margin: '0 auto 2rem' }}>
                            See how the Fahari platform transforms your operations — we map the demo to your exact workflow, not a generic walkthrough.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                            {[
                                { val: '40+', label: 'Live deployments' },
                                { val: '30 min', label: 'Demo session' },
                                { val: '24hr', label: 'Response time' },
                            ].map((s, i) => (
                                <div key={i} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>{s.val}</div>
                                    <div style={{ fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '3px' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Form + Sidebar ── */}
                <section className="gq-main">
                    <div className="container">
                        <div className="gq-split">

                            {/* FORM */}
                            <div className="gq-form-card">
                                <div className="gq-form-title">Demo Request Details</div>
                                <div className="gq-form-sub">Takes less than 2 minutes. No payment required.</div>

                                <form onSubmit={handleSubmit}>
                                    {/* Product selector */}
                                    <label className="gq-label" style={{ marginBottom: '0.6rem', display: 'block' }}>
                                        Which product are you interested in? <span className="gq-required">*</span>
                                    </label>
                                    <div className="gq-product-grid">
                                        {PRODUCTS.map(p => (
                                            <div
                                                key={p.id}
                                                className={`gq-product-card${formData.productInterest === p.id ? ' selected' : ''}`}
                                                onClick={() => selectProduct(p.id)}
                                                style={{ '--pc': p.color, '--pr': p.rgb }}
                                            >
                                                <span className="gq-product-emoji">{p.emoji}</span>
                                                <div>
                                                    <div className="gq-product-name">{p.label}</div>
                                                    <div className="gq-product-sub">{p.sub}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="gq-fields">
                                        <div>
                                            <label className="gq-label">Full Name <span className="gq-required">*</span></label>
                                            <input className="gq-input" type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Your full name" />
                                        </div>
                                        <div>
                                            <label className="gq-label">Organisation <span className="gq-required">*</span></label>
                                            <input className="gq-input" type="text" name="organization" value={formData.organization} onChange={handleChange} required placeholder="Company or School name" />
                                        </div>
                                        <div>
                                            <label className="gq-label">Phone Number <span className="gq-required">*</span></label>
                                            <input className="gq-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+254 7XX XXX XXX" />
                                        </div>
                                        <div>
                                            <label className="gq-label">Email Address <span className="gq-required">*</span></label>
                                            <input className="gq-input" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@company.com" />
                                        </div>
                                        <div>
                                            <label className="gq-label">Institution Type <span className="gq-required">*</span></label>
                                            <select className="gq-select" name="institutionType" value={formData.institutionType} onChange={handleChange} required>
                                                <option value="">Select type</option>
                                                <option value="School">School / College</option>
                                                <option value="Business">Business / SME</option>
                                                <option value="SACCO">SACCO</option>
                                                <option value="NGO">NGO / Foundation</option>
                                                <option value="Hospital">Hospital / Clinic</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="gq-full">
                                            <label className="gq-label">Biggest Operational Challenge <span className="gq-required">*</span></label>
                                            <textarea className="gq-textarea" name="operationalChallenge" value={formData.operationalChallenge} onChange={handleChange} required placeholder="What is the biggest hurdle your organisation is facing today? The more specific, the better we can tailor your demo." />
                                        </div>
                                    </div>

                                    {submitStatus === 'success' && (
                                        <div className="gq-success">
                                            <CheckCircle size={18} /> Thank you! A Fahari consultant will contact you within 24 hours.
                                        </div>
                                    )}
                                    {submitStatus === 'error' && (
                                        <div className="gq-error">
                                            <AlertCircle size={18} /> Something went wrong. Please WhatsApp us at +254 759 437 978.
                                        </div>
                                    )}

                                    <button type="submit" className="gq-submit" disabled={isSubmitting || !formData.productInterest}>
                                        {isSubmitting ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Sending...</> : <>Request Free Demo <ArrowRight size={18} /></>}
                                    </button>

                                    {/* Friction reducers */}
                                    <div className="gq-friction">
                                        {['No credit card', 'No commitment', 'Response within 24hrs'].map((t, i) => (
                                            <span key={i} className="gq-friction-item"><CheckCircle size={12} color="#1b6b6b" /> {t}</span>
                                        ))}
                                    </div>
                                </form>
                            </div>

                            {/* SIDEBAR */}
                            <div className="gq-sidebar">

                                {/* Stats dark card */}
                                <div className="gq-sidebar-card dark">
                                    <div style={{ fontSize: '0.72rem', color: '#4db8b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1.2rem' }}>
                                        Trusted across East Africa
                                    </div>
                                    <div className="gq-stat-row">
                                        {[{ val: '40+', lbl: 'Organisations' }, { val: '5', lbl: 'EA Countries' }, { val: '24hr', lbl: 'Go-Live' }].map((s, i) => (
                                            <div key={i} className="gq-stat">
                                                <div className="gq-stat-val">{s.val}</div>
                                                <div className="gq-stat-lbl">{s.lbl}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* What's included */}
                                <div className="gq-sidebar-card">
                                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0D1B3E', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '1.2rem' }}>What You Get</div>
                                    <ul className="gq-includes">
                                        {[
                                            'Personalised 30-min live demo',
                                            'Workflow mapped to your operations',
                                            '30-day free pilot instance',
                                            'On-site staff training included',
                                            'M-Pesa integration at no extra cost',
                                            'Dedicated setup consultant',
                                        ].map((item, i) => (
                                            <li key={i}>
                                                <CheckCircle size={14} color="#1b6b6b" style={{ flexShrink: 0 }} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* What happens next — timeline */}
                                <div className="gq-sidebar-card">
                                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0D1B3E', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '1.4rem' }}>What Happens Next</div>
                                    <div className="gq-timeline">
                                        {[
                                            { n: 1, title: 'We review your submission', desc: 'Within 24 hours, a consultant reads your challenge and prepares.' },
                                            { n: 2, title: 'Personalized live demo', desc: 'A 30-min session tailored to your specific operations.' },
                                            { n: 3, title: 'Free 30-day pilot', desc: 'We set up your trial instance with your real data structures.' },
                                            { n: 4, title: 'Go live in 24 hours', desc: 'We deploy, import records, and train your team on-site.' },
                                        ].map((step, i) => (
                                            <div key={i} className="gq-tl-item">
                                                <div className="gq-tl-left">
                                                    <div className="gq-tl-num">{step.n}</div>
                                                    <div className="gq-tl-line" />
                                                </div>
                                                <div>
                                                    <div className="gq-tl-title">{step.title}</div>
                                                    <div className="gq-tl-desc">{step.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* WhatsApp fallback */}
                                <div className="gq-wa-card">
                                    <div className="gq-wa-text">
                                        <strong style={{ color: '#1e293b' }}>Prefer to chat?</strong><br />
                                        Message us directly on WhatsApp.
                                    </div>
                                    <a href="https://wa.me/254759437978?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Fahari%20demo." target="_blank" rel="noopener noreferrer" className="gq-wa-link">
                                        <svg viewBox="0 0 448 512" width="14" height="14" fill="currentColor"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.1-3.2-5.5-.3-8.4 2.4-11.1 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.7 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                                        WhatsApp
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default GetQuote
