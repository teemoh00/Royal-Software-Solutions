import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
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

    // Handle hash scrolling on page load or valid same-page clicks
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
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <Link to="/" className="logo">
                    <img src="/logo (2).png" alt="Royal Software Solutions" className="navbar-logo-img" />
                    <span className="logo-text">Royal Software Solutions</span>
                </Link>

                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                    <Link to="/products-services" onClick={() => setIsMenuOpen(false)}>Products & Services</Link>
                    <Link to="/support" className="btn-support" onClick={() => setIsMenuOpen(false)}>Support</Link>
                    <Link to="/get-quote" className="btn btn-secondary mobile-only" onClick={() => setIsMenuOpen(false)}>Get Quote</Link>
                </div>

                <div className="nav-actions">
                    <Link to="/get-quote" className="btn btn-secondary desktop-only">Get Quote</Link>
                    <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
