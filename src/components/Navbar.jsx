import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return (
        <div className={`navbar-pill-wrapper ${isScrolled ? 'scrolled' : ''}`}>
            <nav className="navbar-pill">
                <Link to="/" className="logo">
                    <img src="/logo (2).png" alt="Royal Software Solutions" className="navbar-logo-img" style={{ height: '32px' }} />
                    <div className="logo-meta desktop-only">
                        <span className="logo-text">Royal Software Solutions</span>
                        <span className="logo-tagline">The Infrastructure of African Excellence</span>
                    </div>
                </Link>

                <div className={`nav-pill-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" className={location.pathname === '/' ? 'active-nav-link' : ''} onClick={() => setIsMenuOpen(false)}>Home</Link>
                    
                    <div className="nav-item-dropdown">
                        <Link to="/products-services" className={`dropdown-trigger ${location.pathname.startsWith('/fahari-') || location.pathname === '/products-services' ? 'active-nav-link' : ''}`}>
                            Products <ChevronDown size={14} />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-products">
                            <div className="dropdown-column">
                                <span className="dropdown-column-title">Active Products</span>
                                <Link to="/fahari-academia" onClick={() => setIsMenuOpen(false)}>
                                    <strong>Fahari Academia</strong>
                                    <span>School Management System</span>
                                </Link>
                                <Link to="/fahari-nexus" onClick={() => setIsMenuOpen(false)}>
                                    <strong>Fahari Nexus</strong>
                                    <span>Business Operations ERP</span>
                                </Link>
                            </div>
                            <div className="dropdown-column">
                                <span className="dropdown-column-title">Coming Soon</span>
                                <Link to="/fahari-ledger" onClick={() => setIsMenuOpen(false)}>
                                    <strong>Fahari Ledger</strong>
                                    <span>SACCO & Microfinance</span>
                                </Link>
                                <div className="coming-soon-item">
                                    <strong>Fahari Connect</strong>
                                    <span>CRM & Engagement</span>
                                </div>
                                <div className="coming-soon-item">
                                    <strong>Fahari Pulse</strong>
                                    <span>Events & Ticketing</span>
                                </div>
                                <div className="dropdown-divider"></div>
                                <Link to="/products-services" className="view-all" onClick={() => setIsMenuOpen(false)}>
                                    View Full Ecosystem →
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="nav-item-dropdown">
                        <Link to="/products-services" className={`dropdown-trigger ${location.pathname.startsWith('/fahari-') || location.pathname === '/products-services' ? 'active-nav-link' : ''}`}>
                            Solutions <ChevronDown size={14} />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-solutions">
                            <div className="dropdown-column">
                                <span className="dropdown-column-title">By Audience</span>
                                <Link to="/fahari-academia" onClick={() => setIsMenuOpen(false)}>
                                    <span>For Schools — <strong>Fahari Academia</strong></span>
                                </Link>
                                <Link to="/fahari-nexus" onClick={() => setIsMenuOpen(false)}>
                                    <span>For Businesses — <strong>Fahari Nexus</strong></span>
                                </Link>
                                <Link to="/fahari-ledger" onClick={() => setIsMenuOpen(false)}>
                                    <span>For SACCOs — <strong>Fahari Ledger</strong></span>
                                </Link>
                                <div className="coming-soon-item">
                                    <span>For NGOs — <strong>Fahari Aid</strong></span>
                                </div>
                                <div className="coming-soon-item">
                                    <span>For Healthcare — <strong>Fahari Care</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link to="/about" className={location.pathname === '/about' ? 'active-nav-link' : ''} onClick={() => setIsMenuOpen(false)}>About</Link>
                    <Link to="/#quote" className={location.hash === '#quote' ? 'active-nav-link' : ''} onClick={() => setIsMenuOpen(false)}>Contact</Link>
                </div>

                <div className="nav-pill-actions">
                    <a href="https://wa.me/254759437978?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20Fahari." target="_blank" rel="noopener noreferrer" className="btn-pill-whatsapp desktop-only">WhatsApp Us</a>
                    <Link to="/get-quote" className="btn-pill-primary">Get a Demo</Link>
                    
                    <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ color: 'white' }}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
