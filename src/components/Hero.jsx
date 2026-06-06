import { ArrowRight, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section 
            id="home" 
            className="corporate-hero" 
        >
            <div className="stars-container">
                <div className="stars-sm"></div>
                <div className="stars-md"></div>
                <div className="stars-lg"></div>
            </div>
            
            
            
            <div className="container hero-container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="hero-content">
                    <p style={{ color: '#C89B2A', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        Your institution isn't broken. It's running on infrastructure that was never built for it.
                    </p>
                    <h1>The infrastructure of African excellence.</h1>
                    <p>
                        One operating system for African institutions. Live in 24 hours. CBC compliant. Payments built in.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/get-quote" className="btn btn-pill-primary">
                            Book a free demo <ArrowRight size={18} />
                        </Link>
                        <a href="https://wa.me/254759437978" target="_blank" rel="noreferrer" className="btn btn-outline">
                            Chat with us <MessageSquare size={18} style={{ marginLeft: '8px' }} />
                        </a>
                    </div>
                </div>
                
                <div className="hero-visual">
                    <div className="stat-grid-glass">
                        <div className="stat-card-glass">
                            <h3>M-Pesa</h3>
                            <p>Integrated payments</p>
                        </div>
                        <div className="stat-card-glass">
                            <h3>1 Day</h3>
                            <p>Average go-live</p>
                        </div>
                        <div className="stat-card-glass">
                            <h3>CBC Ready</h3>
                            <p>Fully compliant</p>
                        </div>
                        <div className="stat-card-glass" style={{ border: '1px solid #C89B2A', background: 'rgba(200, 155, 42, 0.1)' }}>
                            <h3 style={{ fontSize: '1rem', color: '#F9F6EF', fontStyle: 'italic', marginBottom: '0' }}>
                                "Your institution deserves to run with clarity, calm, and pride."
                            </h3>
                            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#8A9BAB' }}>— James Mbugua</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
