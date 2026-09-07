import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Fahari Academia transformed how we manage fee collection. What used to take our bursar three days of reconciliation now takes less than an hour.",
      name: "School Administrator",
      org: "Prosper Primary School, Nakuru",
      initials: "SA",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      featured: true
    },
    {
      quote: "The M-Pesa integration alone was worth the switch. Parents pay, the system updates instantly, and I can see the school's financial position in real time.",
      name: "School Owner",
      org: "Fahari Secondary School, Kenya",
      initials: "SO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      featured: false
    },
    {
      quote: "Fahari Nexus brought all our branches together. Inventory and sales are now perfectly synced, and the reporting is exactly what our management team needed.",
      name: "Operations Manager",
      org: "Bataka Shops, Kakamega",
      initials: "OM",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      featured: false
    },
    {
      quote: "SASRA compliance was always a headache until we moved to Fahari Ledger. The automated reporting and member portals have completely transformed our SACCO.",
      name: "SACCO CEO",
      org: "Teachers SACCO, Uganda",
      initials: "SC",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      featured: false
    },
    {
      quote: "The speed of implementation was unbelievable. We went live in 24 hours, and the support team walked our staff through everything. Highly recommended.",
      name: "Finance Director",
      org: "NGO Consortium",
      initials: "FD",
      image: "https://randomuser.me/api/portraits/women/90.jpg",
      featured: false
    }
  ];

  // We duplicate the array to create a seamless infinite loop
  const scrollItems = [...testimonials, ...testimonials];

  return (
    <section className="section testimonials-section bg-light">
      <div className="container">
        <h2 className="section-title text-center">What institutions are saying about Fahari.</h2>
        <div className="testimonials-scroll-container">
          <div className="testimonials-scroll-track">
            {scrollItems.map((t, i) => (
              <div key={i} className={`testimonial-card ${t.featured ? 'featured-card' : ''}`}>
                <div className="quote-icon">“</div>
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} size={16} fill="currentColor" className="star-icon" />
                  ))}
                </div>
                <p className="quote-text">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {t.image ? (
                      <img src={t.image} alt={t.name} className="avatar-img" />
                    ) : (
                      t.initials
                    )}
                  </div>
                  <div className="author-info">
                    <h4>{t.name}</h4>
                    <p>{t.org}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
