import React from 'react'

const Manifesto = () => {
    return (
        <section className="section manifesto-section text-center" style={{ background: '#0D1B3E', padding: '6rem 2rem', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                    <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2.8rem', marginBottom: '2.5rem', color: '#FFFFFF', lineHeight: '1.3', fontWeight: '700' }}>
                        We believe African institutions deserve to operate at their full potential.
                    </h2>
                    <p style={{ fontSize: '1.3rem', lineHeight: '1.8', color: '#D4C5A0', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                        Not someday. Not with a bigger budget. Not after the next funding round.
                    </p>
                    <p style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#C89B2A', textTransform: 'uppercase', letterSpacing: '2px', margin: '2rem 0' }}>
                        Now. With the infrastructure they have available today.
                    </p>
                    <p style={{ fontSize: '1.4rem', color: '#FFFFFF', fontWeight: '600', letterSpacing: '1px' }}>
                        Fahari is that infrastructure.
                    </p>
                </div>
            </div>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, rgba(27, 107, 107, 0.15) 0%, rgba(13, 27, 62, 0) 70%)', zIndex: 1 }}></div>
        </section>
    )
}

export default Manifesto
