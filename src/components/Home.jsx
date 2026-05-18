import Hero from './Hero'
import Services from './Services'
import WhyUs from './WhyUs'
import Testimonials from './Testimonials'
import Industries from './Industries'
import ContactCTA from './ContactCTA'
import SEO from './SEO'

const Home = () => {
    return (
        <>
            <SEO 
                title="Home" 
                description="Powering African Excellence and Pride Through Technology. We build modern, scalable software solutions for schools, businesses, and institutions."
                path="/"
            />
            <Hero />
            <Services />
            <WhyUs />
            <Testimonials />
            <Industries />
            <ContactCTA />
        </>
    )
}

export default Home
