import React, { useState } from 'react'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const [openMenus, setOpenMenus] = useState({ quickLinks: false, products: false });
    const toggleMenu = (menu) => setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));

    const products = [
        { name: 'Fahari Academia', path: '/fahari-academia', color: '#10b981', desc: 'School ERP' },
        { name: 'Fahari Nexus',    path: '/fahari-nexus',    color: '#1b6b6b', desc: 'Business ERP' },
        { name: 'Fahari Ledger',   path: '/fahari-ledger',   color: '#C89B2A', desc: 'Accounting' },
        { name: 'Fahari Pulse',    path: '/products-services',color: '#8b5cf6', desc: 'Analytics' },
    ];

    const socials = [
        { label: 'Facebook',  href: 'https://facebook.com/royalsoftwaresolutions',           color: '#1877f2', rgb: '24,119,242' },
        { label: 'Twitter',   href: 'https://x.com/royalsoftwareke',                         color: '#1da1f2', rgb: '29,161,242' },
        { label: 'LinkedIn',  href: 'https://linkedin.com/in/royal-software-solutions', color: '#0a66c2', rgb: '10,102,194' },
        { label: 'Instagram', href: 'https://instagram.com/royal_softwares_ke',                 color: '#e1306c', rgb: '225,48,108' },
        { label: 'WhatsApp',  href: 'https://wa.me/254759437978',                            color: '#25d366', rgb: '37,211,102' },
    ];

    const SocialIcon = ({ label }) => {
        if (label === 'Facebook')  return <Facebook size={17} />;
        if (label === 'Twitter')   return <Twitter size={17} />;
        if (label === 'LinkedIn')  return <Linkedin size={17} />;
        if (label === 'Instagram') return <Instagram size={17} />;
        return (
            <svg viewBox="0 0 448 512" width="17" height="17" fill="currentColor">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.1-3.2-5.5-.3-8.4 2.4-11.1 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.7 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
        );
    };

    const trustItems = [
        'Registered in Kenya',
        'Serving 5 East African Countries',
        'AfCFTA Cross-Border Ready',
        'Data Secure & Compliant',
        'Go Live in 24 Hours',
    ];

    return (
        <footer className="footer">
            <style>{`
                .footer { background: #051414; color: #94a3b8; padding: 5rem 0 0; border-top: 1px solid rgba(255,255,255,0.05); }
                .ftr-grid { display: grid; grid-template-columns: 2.2fr 1fr 1.4fr 1.5fr; gap: 3.5rem; padding-bottom: 4rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
                @media (max-width: 1024px) { .ftr-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; } }
                @media (max-width: 600px) { .ftr-grid { grid-template-columns: 1fr; gap: 2rem; } }
                .ftr-brand-tag { font-size: 0.78rem; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1.5px; margin: 1.2rem 0 0.4rem; }
                .ftr-brand-txt { font-size: 0.9rem; color: #64748b; line-height: 1.7; max-width: 270px; margin-bottom: 1.4rem; }
                .ftr-socials { display: flex; gap: 0.55rem; flex-wrap: wrap; }
                .ftr-soc { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.45); text-decoration: none; transition: all 0.25s ease; }
                .ftr-soc:hover { color: white; transform: translateY(-3px); border-color: var(--sc); background: rgba(var(--sr),0.12); box-shadow: 0 6px 16px rgba(var(--sr),0.25); }
                .ftr-hdr { font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1.8px; color: rgba(255,255,255,0.35); margin-bottom: 1.4rem; }
                .ftr-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.65rem; }
                .ftr-links a { color: #64748b; font-size: 0.88rem; text-decoration: none; transition: all 0.2s; display: inline-block; }
                .ftr-links a:hover { color: #C89B2A; transform: translateX(4px); }
                .ftr-pill { display: flex; align-items: center; gap: 10px; padding: 0.6rem 0.8rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.03); text-decoration: none; transition: all 0.25s; margin-bottom: 0.45rem; }
                .ftr-pill:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.12); transform: translateX(4px); }
                .ftr-pill-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
                .ftr-pill-name { font-size: 0.86rem; font-weight: 700; color: #e2e8f0; }
                .ftr-pill-sub { font-size: 0.7rem; color: #475569; }
                .ftr-contact { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 0.9rem; font-size: 0.87rem; color: #64748b; text-decoration: none; transition: color 0.2s; }
                a.ftr-contact:hover { color: #94a3b8; }
                .ftr-contact-ic { width: 30px; height: 30px; border-radius: 8px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: #1b6b6b; flex-shrink: 0; }
                .ftr-wa { display: inline-flex; align-items: center; gap: 7px; margin-top: 1.1rem; padding: 0.6rem 1.1rem; background: rgba(37,211,102,0.1); border: 1px solid rgba(37,211,102,0.25); color: #25d366; border-radius: 50px; font-size: 0.8rem; font-weight: 700; text-decoration: none; transition: all 0.25s; }
                .ftr-wa:hover { background: rgba(37,211,102,0.18); border-color: rgba(37,211,102,0.45); transform: translateY(-2px); }
                .ftr-trust { padding: 1.2rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap; }
                .ftr-trust-item { display: flex; align-items: center; gap: 7px; font-size: 0.76rem; color: rgba(255,255,255,0.28); white-space: nowrap; }
                .ftr-trust-dot { width: 5px; height: 5px; border-radius: 50%; background: #1b6b6b; flex-shrink: 0; }
                .ftr-bottom { padding: 1.6rem 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; font-size: 0.78rem; color: rgba(255,255,255,0.22); }
                .ftr-legal { display: flex; gap: 1.4rem; }
                .ftr-legal a { color: rgba(255,255,255,0.22); text-decoration: none; font-size: 0.78rem; transition: color 0.2s; }
                .ftr-legal a:hover { color: rgba(255,255,255,0.5); }
                @media (max-width: 600px) { .ftr-bottom { flex-direction: column; text-align: center; } .ftr-trust { gap: 1rem; } }
            `}</style>

            <div className="container">
                <div className="ftr-grid">

                    {/* Brand */}
                    <div>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
                            <img src="/logo (2).png" alt="Royal Software Solutions" style={{ height: 38, width: 'auto' }} />
                            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white', lineHeight: 1.2 }}>Royal Software Solutions</span>
                        </Link>
                        <p className="ftr-brand-tag">Powering African Excellence Through Technology</p>
                        <p className="ftr-brand-txt">We build ERP systems that help African businesses see clearly, move faster, and grow without chaos.</p>
                        <div className="ftr-socials">
                            {socials.map((s, i) => (
                                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                                    className="ftr-soc" style={{ '--sc': s.color, '--sr': s.rgb }}>
                                    <SocialIcon label={s.label} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <div className="ftr-hdr">Quick Links</div>
                        <ul className="ftr-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/products-services">Products</Link></li>
                            <li><Link to="/get-quote">Get a Quote</Link></li>
                            <li><Link to="/login">Client Login</Link></li>
                            <li><Link to="/admin/login" style={{ color: '#334155', fontSize: '0.8rem' }}>Staff Terminal</Link></li>
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <div className="ftr-hdr">Our Products</div>
                        {products.map((p, i) => (
                            <Link key={i} to={p.path} className="ftr-pill">
                                <div className="ftr-pill-dot" style={{ background: p.color, boxShadow: `0 0 6px ${p.color}` }} />
                                <div>
                                    <div className="ftr-pill-name">{p.name}</div>
                                    <div className="ftr-pill-sub">{p.desc}</div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Contact */}
                    <div>
                        <div className="ftr-hdr" style={{ cursor: 'default' }}>Contact Us</div>
                        <a href="mailto:info@royalsoftwares.co.ke" className="ftr-contact">
                            <div className="ftr-contact-ic"><Mail size={14} /></div>
                            <span>info@royalsoftwares.co.ke</span>
                        </a>
                        <a href="tel:+254759437978" className="ftr-contact">
                            <div className="ftr-contact-ic"><Phone size={14} /></div>
                            <span>+254 759 437 978</span>
                        </a>
                        <div className="ftr-contact">
                            <div className="ftr-contact-ic"><MapPin size={14} /></div>
                            <span>Nakuru, Kenya</span>
                        </div>
                        <a href="https://wa.me/254759437978?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20Fahari." target="_blank" rel="noopener noreferrer" className="ftr-wa">
                            <svg viewBox="0 0 448 512" width="14" height="14" fill="currentColor">
                                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.1-3.2-5.5-.3-8.4 2.4-11.1 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.7 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                            </svg>
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>

                {/* Trust strip */}
                <div className="ftr-trust">
                    {trustItems.map((t, i) => (
                        <div key={i} className="ftr-trust-item"><span className="ftr-trust-dot" />{t}</div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="ftr-bottom">
                    <span>&#169; {new Date().getFullYear()} Royal Software Solutions Ltd. All rights reserved.</span>
                    <div className="ftr-legal">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                        <Link to="/get-quote">Get a Quote</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
