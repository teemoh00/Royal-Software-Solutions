import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TypewriterText = ({ text, delay = 0, className = '', Component = 'p', showCursor = false }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

    const chars = text.split("");

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay }
        }
    };

    const child = {
        visible: { opacity: 1, display: 'inline-block' },
        hidden: { opacity: 0, display: 'inline-block' }
    };

    return (
        <Component ref={ref} className={className}>
            <motion.span
                variants={container}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                aria-label={text}
            >
                {chars.map((char, index) => (
                    <motion.span variants={child} key={index}>
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
                {showCursor && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: [0, 1, 1, 0], transition: { delay, duration: 1, repeat: Infinity } } : { opacity: 0 }}
                        className="blinking-cursor"
                    >
                        |
                    </motion.span>
                )}
            </motion.span>
        </Component>
    );
};

const Manifesto = () => {
    return (
        <section className="section manifesto-section text-center" style={{ backgroundColor: '#0D2B1D', color: '#FDFBF7', position: 'relative', overflow: 'hidden' }}>
            {/* Blurred Background Image */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(20px)',
                transform: 'scale(1.1)',
                opacity: 0.3,
                zIndex: 0,
                pointerEvents: 'none'
            }}></div>
            
            <div className="container manifesto-container" style={{ padding: '120px 0', position: 'relative', zIndex: 1 }}>
                <div className="manifesto-content">
                    <TypewriterText 
                        Component="h2"
                        className="manifesto-title" 
                        text="We believe African institutions deserve to operate at their full potential." 
                        delay={0.2}
                    />
                    <TypewriterText 
                        className="manifesto-subtitle" 
                        text="Not someday. Not with a bigger budget. Not after the next funding round." 
                        delay={2.5}
                    />
                    <TypewriterText 
                        className="manifesto-highlight" 
                        text="Now. With the infrastructure they have available today." 
                        delay={5.0}
                    />
                    <TypewriterText 
                        className="manifesto-conclusion" 
                        text="Fahari is that infrastructure." 
                        delay={7.0}
                        showCursor={true}
                    />
                </div>
            </div>
            <div className="manifesto-bg-effect"></div>
        </section>
    )
}

export default Manifesto
