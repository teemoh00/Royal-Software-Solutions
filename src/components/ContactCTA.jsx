import { Link } from 'react-router-dom'

const ContactCTA = () => {
    return (
        <section id="quote" className="section cta-section">
            <div className="container cta-container">
                <div className="cta-content">
                    <h2>Ready to transform your institution or business?</h2>
                    <p>Get a customized software solution tailored to your needs.</p>
                    <Link to="/get-quote" className="btn btn-secondary btn-lg">Get a Free Quote</Link>
                </div>
            </div>
        </section>
    )
}

export default ContactCTA
