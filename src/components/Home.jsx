import Hero from './Hero'
import Services from './Services'
import WhyUs from './WhyUs'
import Industries from './Industries'
import ContactCTA from './ContactCTA'
import SEO from './SEO'

const Home = () => {
    const homeStructuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Royal Software Solutions - Home",
        "description": "Leading African technology company providing custom software development, Academic ERP systems, and IT consulting services.",
        "url": "https://royalsoftwares.co.ke/",
        "mainEntity": {
            "@type": "Organization",
            "name": "Royal Software Solutions"
        }
    }

    return (
        <>
            <SEO
                title={null}
                description="Royal Software Solutions builds modern, scalable software solutions for schools, businesses, and institutions across Africa. Academic ERP, custom software development, and FAHARI SaaS ecosystem."
                keywords="software development Africa, ERP systems Kenya, school management system, university ERP, FAHARI SaaS, custom software development, IT consulting, African technology company"
                canonicalUrl="/"
                structuredData={homeStructuredData}
            />
            <Hero />
            <Services />
            <WhyUs />
            <Industries />
            <ContactCTA />
        </>
    )
}

export default Home
