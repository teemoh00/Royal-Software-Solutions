import { Link } from 'react-router-dom'

const ContactCTA = () => {
    return (
        <section id="quote" className="section cta-section">
            <div className="container cta-container">
                <div className="cta-content">
                    <h2>Ready to see what your institution looks like on Fahari?</h2>
                    <p>Book a free 20-minute demo. We come to you. No commitment. No pressure. Your first 60 days are free.</p>
                    <div className="cta-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
                        <Link to="/get-quote" className="btn btn-secondary btn-lg">Book Your Free Demo</Link>
                        <a href="tel:+254759437978" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Call: +254 759 437 978
                        </a>
                        <a href="https://wa.me/254759437978?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20Fahari." className="btn btn-primary btn-lg" style={{ background: '#25D366', borderColor: '#25D366', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            WhatsApp Us Now
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactCTA
