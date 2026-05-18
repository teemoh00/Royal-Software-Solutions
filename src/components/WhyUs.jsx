import { MapPin, Zap, Layers, Headset } from 'lucide-react'

const WhyUs = () => {
    const reasons = [
        {
            icon: <MapPin size={40} />,
            title: "Built for East Africa",
            description: "M-Pesa integration, NHIF/NSSF/PAYE compliance, and CBC curriculum support — built in from day one, not added as an afterthought."
        },
        {
            icon: <Zap size={40} />,
            title: "Live in 24 Hours",
            description: "Most schools and businesses go live within one day of signing up. No lengthy implementation timelines. No expensive consultants."
        },
        {
            icon: <Layers size={40} />,
            title: "One Platform, Every Department",
            description: "Fees, exams, HR, payroll, procurement, and accounting — all connected under one login. No more switching between disconnected tools."
        },
        {
            icon: <Headset size={40} />,
            title: "Local Support, Real People",
            description: "Our team is based in Kenya. We speak Swahili and English. We visit your site, answer your calls, and stay until the problem is solved."
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
