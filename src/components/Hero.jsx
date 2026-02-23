import { ArrowRight, Code, Server, Shield, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="stars-container">
                <div className="stars-sm"></div>
                <div className="stars-md"></div>
                <div className="stars-lg"></div>
            </div>
            <div className="container hero-container">
                <div className="hero-content">
                    <h1>Powering African Excellence and Pride Through Technology</h1>
                    <p>
                        We build modern, scalable software solutions for schools, businesses, and institutions across Africa.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/get-quote" className="btn btn-primary">
                            Get a Quote <ArrowRight size={18} />
                        </Link>
                        <Link to="/products-services" className="btn btn-outline">
                            Explore Products
                        </Link>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="abstract-shape"></div>
                    {/* Tech Grid for 3D Effect */}
                    <div className="tech-grid">
                        <div className="grid-item">
                            <Code size={48} className="brand-icon" />
                        </div>
                        <div className="grid-item">
                            <Server size={48} className="brand-icon" />
                        </div>
                        <div className="grid-item">
                            <Shield size={48} className="brand-icon" />
                        </div>
                        <div className="grid-item">
                            <Globe size={48} className="brand-icon" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
