import { Lightbulb, Search, Cloud, Headset } from 'lucide-react'

const WhyUs = () => {
    const reasons = [
        {
            icon: <Lightbulb size={40} />,
            title: "Innovative Solutions",
            description: "Cutting-edge technology tailored for modern problems."
        },
        {
            icon: <Search size={40} />,
            title: "Research-Driven Approach",
            description: "Data-backed strategies ensures sustainable growth."
        },
        {
            icon: <Cloud size={40} />,
            title: "Scalable Cloud Systems",
            description: "Infrastructure that grows with your organization."
        },
        {
            icon: <Headset size={40} />,
            title: "Dedicated Support",
            description: "24/7 expert assistance whenever you need it."
        }
    ]

    return (
        <section className="section why-us-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Why Choose Royal Software?</h2>
                    <p className="section-subtitle">We deliver excellence through innovation and dedication.</p>
                </div>

                <div className="why-us-grid">
                    {reasons.map((reason, index) => (
                        <div key={index} className="why-us-card">
                            <div className="icon-wrapper default-color">
                                {reason.icon}
                            </div>
                            <h3>{reason.title}</h3>
                            <p>{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyUs
