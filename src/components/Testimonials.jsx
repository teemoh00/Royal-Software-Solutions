import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Fahari Academia transformed how we manage fee collection. What used to take our bursar three days of reconciliation now takes less than an hour.",
      name: "School Administrator",
      org: "Private Primary School, Nakuru",
      initials: "SA"
    },
    {
      quote: "The M-Pesa integration alone was worth the switch. Parents pay, the system updates instantly, and I can see the school's financial position in real time.",
      name: "School Owner",
      org: "Secondary School, Kenya",
      initials: "SO"
    }
  ];

  return (
    <section className="section testimonials-section bg-light">
      <div className="container">
        <h2 className="section-title text-center">What institutions are saying about Fahari.</h2>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="quote-icon">“</div>
              <p className="quote-text">{t.quote}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.initials}</div>
                <div className="author-info">
                  <h4>{t.name}</h4>
                  <p>{t.org}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
