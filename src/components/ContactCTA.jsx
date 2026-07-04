import { Link } from 'react-router-dom'

const ContactCTA = () => {
    return (
        <section id="quote" className="section cta-section">
            <div className="container cta-container">
                <div className="cta-content">
                    <h2>Ready to see what your institution looks like on Fahari?</h2>
                    <p>Book a free 20-minute demo. We come to you. No commitment. No pressure. Your first 60 days are free.</p>
                    <div className="cta-actions">
                        <Link to="/get-quote" className="btn btn-secondary btn-lg">Book Your Free Demo</Link>
                        <a href="tel:+254759437978" className="btn btn-outline-white btn-lg">
                            Call: +254 759 437 978
                        </a>
                        <a href="https://wa.me/254759437978?text=Hi%2C%20I%27d%20like%20to%20learn%20more%20about%20Fahari." className="btn btn-whatsapp btn-lg">
                            WhatsApp Us Now
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactCTA
