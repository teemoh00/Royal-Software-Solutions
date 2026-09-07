import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useNav } from '../context/NavContext'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(null) // 'products' | 'solutions' | null
    const { isMenuOpen, setIsMenuOpen } = useNav()
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

    // Close drawer + reset accordion on route change
    useEffect(() => {
        setIsMenuOpen(false)
        setOpenDropdown(null)
    }, [location.pathname, location.hash, setIsMenuOpen])

    const handleMenuToggle = () => {
        const next = !isMenuOpen
        setIsMenuOpen(next)
        if (!next) setOpenDropdown(null) // reset accordion when closing
    }

    const handleDropdownToggle = (name, e) => {
        // Only intercept click for accordion on mobile; on desktop CSS hover handles it
        if (window.innerWidth <= 992) {
            e.preventDefault()
            setOpenDropdown(prev => prev === name ? null : name)
        }
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
        setOpenDropdown(null)
    }

    return (
        <div className={`navbar-pill-wrapper ${isScrolled ? 'scrolled' : ''}`}>
            <nav className="navbar-pill">
                {/* ── Logo ── */}
                <Link to="/" className="logo">
                    <img src="/logo (2).png" alt="Royal Software Solutions" className="navbar-logo-img" style={{ height: '32px' }} />
                    <div className="logo-meta">
                        {/* Full name — hidden below 768px via CSS */}
                        <span className="logo-text logo-name-full">Royal Software Solutions</span>
                        {/* Abbreviated name — shown on mobile/tablet only */}
                        <span className="logo-text logo-name-short">Royal Software</span>
                        <span className="logo-tagline">The Infrastructure of African Excellence</span>
                    </div>
                </Link>

                {/* ── Nav Links / Mobile Drawer ── */}
                <div className={`nav-pill-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link
                        to="/"
                        className={location.pathname === '/' ? 'active-nav-link' : ''}
                        onClick={closeMenu}
                    >Home</Link>

                    {/* Products dropdown */}
                    <div className={`nav-item-dropdown ${openDropdown === 'products' ? 'dropdown-open' : ''}`}>
                        <Link
                            to="/products-services"
                            className={`dropdown-trigger ${location.pathname.startsWith('/fahari-') || location.pathname === '/products-services' ? 'active-nav-link' : ''}`}
                            onClick={(e) => handleDropdownToggle('products', e)}
                        >
                            Products <ChevronDown size={14} />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-products">
                            <div className="dropdown-column">
                                <span className="dropdown-column-title">Active Products</span>
                                <Link to="/fahari-academia" onClick={closeMenu}>
                                    <strong>Fahari Academia</strong>
                                    <span>School Management System</span>
                                </Link>
                                <Link to="/fahari-nexus" onClick={closeMenu}>
                                    <strong>Fahari Nexus</strong>
                                    <span>Business Operations ERP</span>
                                </Link>
                            </div>
                            <div className="dropdown-column">
                                <span className="dropdown-column-title">Coming Soon</span>
                                <Link to="/fahari-ledger" onClick={closeMenu}>
                                    <strong>Fahari Ledger</strong>
                                    <span>SACCO &amp; Microfinance</span>
                                </Link>
                                <div className="coming-soon-item">
                                    <strong>Fahari Connect</strong>
                                    <span>CRM &amp; Engagement</span>
                                </div>
                                <div className="coming-soon-item">
                                    <strong>Fahari Pulse</strong>
                                    <span>Events &amp; Ticketing</span>
                                </div>
                                <div className="dropdown-divider"></div>
                                <Link to="/products-services" className="view-all" onClick={closeMenu}>
                                    View Full Ecosystem →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Solutions dropdown */}
                    <div className={`nav-item-dropdown ${openDropdown === 'solutions' ? 'dropdown-open' : ''}`}>
                        <Link
                            to="/products-services"
                            className={`dropdown-trigger ${location.pathname.startsWith('/fahari-') || location.pathname === '/products-services' ? 'active-nav-link' : ''}`}
                            onClick={(e) => handleDropdownToggle('solutions', e)}
                        >
                            Solutions <ChevronDown size={14} />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-solutions">
                            <div className="dropdown-column">
                                <span className="dropdown-column-title">By Audience</span>
                                <Link to="/fahari-academia" onClick={closeMenu}>
                                    <span>For Schools — <strong>Fahari Academia</strong></span>
                                </Link>
                                <Link to="/fahari-nexus" onClick={closeMenu}>
                                    <span>For Businesses — <strong>Fahari Nexus</strong></span>
                                </Link>
                                <Link to="/fahari-ledger" onClick={closeMenu}>
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

                    <Link to="/about" className={location.pathname === '/about' ? 'active-nav-link' : ''} onClick={closeMenu}>About</Link>
                    <Link to="/#quote" className={location.hash === '#quote' ? 'active-nav-link' : ''} onClick={closeMenu}>Contact</Link>

                    {/* ── Mobile-only CTA inside drawer ── */}
                    <Link to="/get-quote" className="nav-drawer-cta" onClick={closeMenu}>
                        Get a Free Demo
                    </Link>
                </div>

                {/* ── Actions bar ── */}
                <div className="nav-pill-actions">
                    <a
                        href="https://wa.me/254759437978?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20Fahari."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-pill-whatsapp desktop-only"
                    >WhatsApp Us</a>
                    {/* Hidden below 480px via CSS — redundant with hero CTA on mobile */}
                    <Link to="/get-quote" className="btn-pill-primary nav-pill-cta-header">Get a Demo</Link>

                    <button className="menu-toggle" onClick={handleMenuToggle} style={{ color: 'white' }}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
