import { GraduationCap, LineChart, Layers, ArrowUpRight, Wallet, Network, Ticket } from 'lucide-react'
import { Link } from 'react-router-dom'

const Services = () => {
    const services = [
        {
            icon: <Layers size={32} />,
            title: "FAHARI SaaS Ecosystem",
            desc: "The core foundation providing unified authentication and modular integration for all Royal Software products.",
            features: ["Unified Identity", "Modular Core", "API First"],
            size: "bento-lg",
            dark: true,
            link: "/products-services"
        },
        {
            icon: <GraduationCap size={32} />,
            title: "Fahari Academia",
            desc: "Streamlined school management covering fee collection, performance tracking, and parent communication.",
            features: ["Fee Management", "CBC/KCSE Analytics"],
            size: "bento-sm",
            link: "/fahari-academia"
        },
        {
            icon: <Wallet size={32} />,
            title: "Fahari Ledger",
            desc: "Advanced financial management and accounting system designed for transparency and fiscal efficiency.",
            features: ["Real-time Audit", "M-Pesa Integrated"],
            size: "bento-sm",
            link: "/fahari-ledger"
        },
        {
            icon: <Network size={32} />,
            title: "Fahari Nexus",
            desc: "Business operations and ERP for SMEs and enterprises — sales, inventory, procurement, and financial workflows, connected and live.",
            features: ["Sales & CRM", "Inventory & LPO", "Approvals Flow"],
            size: "bento-sm",
            link: "/fahari-nexus"
        },
        {
            icon: <Ticket size={32} />,
            title: "Fahari Pulse",
            desc: "Comprehensive event management and ticketing platform for seamless planning and attendance tracking.",
            features: ["Digital Ticketing", "Event Planning", "Real-time Access"],
            size: "bento-sm",
            link: "/products-services"
        },
        {
            icon: <LineChart size={32} />,
            title: "Corporate IT Consulting",
            desc: "Expert advisory for digital transformation, infrastructure optimization, and scalable technology strategy.",
            features: ["Strategy", "Transformation", "Scale"],
            size: "bento-lg",
            link: "/products-services"
        }
    ]

    return (
        <section id="services" className="section bg-light">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">The Fahari Suite</h2>
                    <p className="section-subtitle">Empowering African institutions with a unified ecosystem of specialized technology solutions.</p>
                </div>

                <div className="bento-grid">
                    {services.map((service, index) => (
                        <div 
                            key={index} 
                            className={`bento-card ${service.size} ${service.dark ? 'dark' : ''}`}
                        >
                            <div className="bento-card-top">
                                <div className="service-icon">{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                            </div>
                            
                            <div className="bento-card-bottom">
                                <ul className="service-features">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            <Link to={service.link} className="bento-link" aria-label={`Learn more about ${service.title}`}>
                                <ArrowUpRight size={24} />
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="center-actions">
                    <Link to="/products-services" className="btn btn-pill-primary">Explore All Solutions</Link>
                </div>
            </div>
        </section>
    )
}

export default Services
