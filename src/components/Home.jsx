import Hero from './Hero'
import Services from './Services'
import WhyUs from './WhyUs'
import Testimonials from './Testimonials'
import Industries from './Industries'
import Manifesto from './Manifesto'
import ContactCTA from './ContactCTA'
import SEO from './SEO'

const Home = () => {
    return (
        <>
            <SEO 
                title="Fahari — The Institutional Operating System for Africa" 
                description="Fahari by Royal Software Solutions is the integrated enterprise platform for African schools, businesses, SACCOs, and institutions. Built for East Africa. Live in 24 hours."
                path="/"
            />
            <Hero />
            <Services />
            <WhyUs />
            <Testimonials />
            <Industries />
            <Manifesto />
            <ContactCTA />
        </>
    )
}

export default Home
