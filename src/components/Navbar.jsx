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
                    <span className="logo-text desktop-only">Royal Software</span>
                </Link>

                <div className={`nav-pill-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    
                    <div className="nav-item-dropdown">
                        <Link to="/products-services" className="dropdown-trigger">
                            Products <ChevronDown size={14} />
                        </Link>
                        <div className="dropdown-menu">
                            <Link to="/fahari-academia" onClick={() => setIsMenuOpen(false)}>Fahari Academia</Link>
                            <Link to="/fahari-ledger" onClick={() => setIsMenuOpen(false)}>Fahari Ledger</Link>
                            <div className="dropdown-divider"></div>
                            <Link to="/products-services" className="view-all" onClick={() => setIsMenuOpen(false)}>All Solutions</Link>
                        </div>
                    </div>

                    <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                    <Link to="/support" onClick={() => setIsMenuOpen(false)}>Support</Link>
                </div>

                <div className="nav-pill-actions">
                    <Link to="/login" className="btn-pill-login desktop-only">New Ticket</Link>
                    <Link to="/get-quote" className="btn-pill-primary">Get Started</Link>
                    
                    <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ color: 'white' }}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
