import React, { useState } from 'react'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, Globe, MapPin, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const [openMenus, setOpenMenus] = useState({
        quickLinks: false,
        services: false
    });

    const toggleMenu = (menu) => {
        setOpenMenus(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-col brand-col">
                    <Link to="/" className="footer-logo">
                        <img src="/logo (2).png" alt="Royal Software Solutions" className="footer-logo-img" />
                        <span className="footer-logo-text">Royal Software Solutions</span>
                    </Link>
                    <p className="brand-desc">
                        Powering African Excellence and Pride Through Technology
                    </p>
                </div>

                <div className={`footer-col accordion-col ${openMenus.quickLinks ? 'open' : ''}`}>
                    <h4 onClick={() => toggleMenu('quickLinks')} className="accordion-header">
                        Quick Links
                        <ChevronDown size={20} className="accordion-icon desktop-none" />
                    </h4>
                    <ul className="footer-links accordion-content">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/products-services">Products</Link></li>
                        <li><Link to="/get-quote">Get Quote</Link></li>
                        <li><Link to="/login">Client Login</Link></li>
                        <li><Link to="/admin/login" className="footer-staff-link">Staff Terminal</Link></li>
                    </ul>
                </div>

                <div className={`footer-col accordion-col ${openMenus.services ? 'open' : ''}`}>
                    <h4 onClick={() => toggleMenu('services')} className="accordion-header">
                        Services
                        <ChevronDown size={20} className="accordion-icon desktop-none" />
                    </h4>
                    <ul className="footer-links accordion-content">
                        <li><Link to="/fahari-academia">Fahari Academia</Link></li>
                        <li><Link to="/fahari-nexus">Fahari Nexus</Link></li>
                        <li><Link to="/fahari-ledger">Fahari Ledger</Link></li>
                        <li><Link to="/products-services">Fahari Pulse</Link></li>
                    </ul>
                </div>

                <div className="footer-col contact-col">
                    <h4>Contact</h4>
                    <ul className="contact-info">
                        <li><Mail size={16} /> info@royalsoftwares.co.ke</li>
                        <li><Phone size={16} /> +254 759 437 978</li>
                        <li><MapPin size={16} /> Nakuru, Kenya</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom container">
                <p>&copy; {new Date().getFullYear()} Royal Software Solutions. All rights reserved.</p>
                <div className="social-links">
                    <a href="https://facebook.com/royalsoftwaresolutions" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={20} /></a>
                    <a href="https://x.com/royalsoftwareke" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter size={20} /></a>
                    <a href="https://linkedin.com/company/royal-software-solutions" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
                    <a href="https://instagram.com/royalsoftwareke" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
                    <a href="https://wa.me/254759437978?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20Fahari." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                        <svg viewBox="0 0 448 512" width="20" height="20" fill="currentColor">
                            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.1-3.2-5.5-.3-8.4 2.4-11.1 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.7 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
