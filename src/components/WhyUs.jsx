import { MapPin, Zap, Layers, Headset } from 'lucide-react'

const WhyUs = () => {
    const reasons = [
        {
            icon: <MapPin size={40} />,
            title: "Built for East Africa. Not adapted for it.",
            description: "M-Pesa integrated from day one. NHIF, NSSF, and PAYE compliant by default. CBC, KCSE, and IGCSE curriculum-ready out of the box. We build for the African context because we are inside it — not observing it from outside."
        },
        {
            icon: <Zap size={40} />,
            title: "Live in 24 hours. Not 24 weeks.",
            description: "Most Fahari clients go live within one working day of signing up. No months-long implementation projects. No expensive consultants. Your staff is trained. Your data is migrated. Your system is running."
        },
        {
            icon: <Layers size={40} />,
            title: "One platform. Every department.",
            description: "Fahari connects your fees to your accounts, your payroll to your HR records, your procurement to your inventory. Nothing is siloed. Everything speaks to everything else. One login. One bill. One support relationship."
        },
        {
            icon: <Headset size={40} />,
            title: "Local support. Real people.",
            description: "Our team is based in Kenya. We speak Swahili and English. We visit your site, answer your calls, and stay until the problem is solved. No ticket system. No offshore helpdesk. Local people who understand your context."
        }
    ]

    return (
        <section className="section why-us-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Why Fahari?</h2>
                    <p className="section-subtitle">Four specific, Africa-native reasons. Not generic software selling points.</p>
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
