import { GraduationCap, Code2, LineChart, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'

const Services = () => {
    const services = [
        {
            icon: <GraduationCap size={32} />,
            title: "Academic ERP Systems",
            features: ["School and university management", "CBC, KCSE, IGCSE tracking", "Fee and performance management"]
        },
        {
            icon: <Code2 size={32} />,
            title: "Custom Software Development",
            features: ["ERP, POS, CRM systems", "Web and mobile applications", "Tailored business solutions"]
        },
        {
            icon: <LineChart size={32} />,
            title: "IT Consulting & Digital Transformation",
            features: ["Process optimization", "Data migration", "Technology advisory"]
        },
        {
            icon: <Layers size={32} />,
            title: "FAHARI SaaS Ecosystem",
            features: ["Modular cloud-based platform", "Unified authentication", "Enterprise & industry solutions"],
            highlight: true
        }
    ]

    return (
        <section id="services" className="section bg-neutral">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Our Products & Services</h2>
                    <p className="section-subtitle">Comprehensive technology solutions for modern institutions.</p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className={`service-card ${service.highlight ? 'highlight-card' : ''}`}>
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <ul className="service-features">
                                {service.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="center-actions">
                    <Link to="/products-services" className="btn btn-outline">View All Products & Services</Link>
                </div>
            </div>
        </section>
    )
}

export default Services
