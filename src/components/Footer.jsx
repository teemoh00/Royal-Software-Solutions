import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'



const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-col brand-col">
                    <Link to="/" className="footer-logo">
                        <img src="/logo (2).png" alt="Royal Software Solutions" className="footer-logo-img" />
                        <span className="footer-logo-text">Royal Software Solutions</span>
                    </Link>
                    <p className="brand-desc">
                        Building reliable, scalable, and sustainable software systems for institutions and businesses across Africa.
                    </p>
                </div>

                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/products-services">Products</Link></li>
                        <li><Link to="/get-quote">Get Quote</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Services</h4>
                    <ul className="footer-links">
                        <li><Link to="/products-services">Academic ERP</Link></li>
                        <li><Link to="/products-services">Custom Software</Link></li>
                        <li><Link to="/products-services">IT Consulting</Link></li>
                        <li><Link to="/products-services">FAHARI Ecosystem</Link></li>
                    </ul>
                </div>

                <div className="footer-col contact-col">
                    <h4>Contact</h4>
                    <ul className="contact-info">
                        <li><Mail size={16} /> info@royalsoftwares.co.ke</li>
                        <li><Phone size={16} /> 0759437978</li>
                        <li><Globe size={16} /> www.royalsoftwares.co.ke</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom container">
                <p>&copy; {new Date().getFullYear()} Royal Software Solutions. All rights reserved.</p>
                <div className="social-links">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter size={20} /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
