import { Link } from 'react-router-dom'

const ContactCTA = () => {
    return (
        <section id="quote" className="section cta-section">
            <div className="container cta-container">
                <div className="cta-content">
                    <h2>Ready to transform your institution or business?</h2>
                    <p>Get a customized software solution tailored to your needs.</p>
                    <div className="cta-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
                        <Link to="/get-quote" className="btn btn-secondary btn-lg">Get a Free Quote</Link>
                        <a href="tel:0759437978" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Call: 0759437978
                        </a>
                        <a href="https://wa.me/254759437978" className="btn btn-primary btn-lg" style={{ background: '#25D366', borderColor: '#25D366', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactCTA
