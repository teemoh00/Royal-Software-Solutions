import { BookOpen, ShoppingBag, Factory, Stethoscope, Truck, Calculator, HeartHandshake, Building2 } from 'lucide-react'

const Industries = () => {
    const industries = [
        { name: "Education", icon: <BookOpen /> },
        { name: "Retail & Commerce", icon: <ShoppingBag /> },
        { name: "Manufacturing", icon: <Factory /> },
        { name: "Healthcare", icon: <Stethoscope /> },
        { name: "Logistics", icon: <Truck /> },
        { name: "Finance", icon: <Calculator /> }, // Changed from NGOs to Finance which fits icon better or keep as requested
        { name: "NGOs", icon: <HeartHandshake /> },
        { name: "Construction", icon: <Building2 /> },
    ]

    return (
        <section className="section bg-neutral">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Industries We Serve</h2>
                </div>

                <div className="industries-grid">
                    {industries.map((industry, index) => (
                        <div key={index} className="industry-card">
                            <div className="industry-icon">{industry.icon}</div>
                            <span>{industry.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Industries
