import { ArrowRight, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section 
            id="home" 
            className="home-hero" 
        >
            {/* Tech Mesh Overlay (handled in CSS via pseudo element) */}
            <div className="hero-mesh-overlay"></div>
            
            <div className="container home-hero-container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="hero-content">
                    <p className="hero-tagline">
                        Your institution isn't broken. It's running on infrastructure that was never built for it.
                    </p>
                    <h1>The infrastructure of African excellence.</h1>
                    <p>
                        One operating system for African institutions. Live in 24 hours. CBC compliant. Payments built in.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/get-quote" className="btn btn-primary">
                            Book a free demo <ArrowRight size={18} />
                        </Link>
                        <a href="https://wa.me/254759437978" target="_blank" rel="noreferrer" className="btn btn-outline">
                            Chat with us <MessageSquare size={18} style={{ marginLeft: '8px' }} />
                        </a>
                    </div>
                </div>
                
                <div className="hero-visual">
                    <div className="hero-mockup-wrapper">
                        <img 
                            src="/premium-tech-mockup.png" 
                            alt="Fahari Platform Interface" 
                            className="hero-mockup-img" 
                        />
                        
                        {/* Floating Stats over the mockup */}
                        <div className="floating-stat stat-1">
                            <h3>M-Pesa</h3>
                            <p>Integrated</p>
                        </div>
                        <div className="floating-stat stat-2">
                            <h3>1 Day</h3>
                            <p>Go-live</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
