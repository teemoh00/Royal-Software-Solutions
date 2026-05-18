import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section 
            id="home" 
            className="hero-corporate" 
            style={{ backgroundImage: 'url("/hero-bg.png")' }}
        >
            <div className="hero-overlay"></div>
            
            <div className="container hero-container">
                <div className="hero-content">
                    <h1>Powering African Excellence and Pride Through Technology</h1>
                    <p>
                        We build modern, scalable software solutions for schools, businesses, and institutions across Africa.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/get-quote" className="btn btn-pill-primary">
                            Get Started <ArrowRight size={18} />
                        </Link>
                        <Link to="/products-services" className="btn btn-outline">
                            Explore Solutions
                        </Link>
                    </div>
                </div>
                
                <div className="hero-visual">
                    <div className="stat-grid-glass">
                        <div className="stat-card-glass">
                            <h3>5+</h3>
                            <p>Fahari Products Live</p>
                        </div>
                        <div className="stat-card-glass">
                            <h3>CBC/KCSE</h3>
                            <p>Curriculum Compliant</p>
                        </div>
                        <div className="stat-card-glass">
                            <h3>M-Pesa</h3>
                            <p>Integrated Payments</p>
                        </div>
                        <div className="stat-card-glass">
                            <h3>1 Day</h3>
                            <p>Average Go-Live</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
