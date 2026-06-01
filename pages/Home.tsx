import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Process from '../components/sections/Process';
import Products from '../components/sections/Products';
import Impact from '../components/sections/Impact';
import Technology from '../components/sections/Technology';
import Market from '../components/sections/Market';
import Team from '../components/sections/Team';
import Partners from '../components/sections/Partners';
import Contact from '../components/sections/Contact';
import SectionBridge from '../components/layout/SectionBridge';

/**
 * Choreographed page flow — sections overlap and transition visually.
 * z-index escalates through the narrative, then resets for contact.
 */
export const Home: React.FC = () => (
  <div className="immersive-flow">
    <Hero />

    <SectionBridge variant="dark-to-light" />
    <About />

    <SectionBridge variant="light-to-dark" />
    <Process />

    <Products />

    <SectionBridge variant="dark-to-warm" />
    <Impact />

    <SectionBridge variant="dark-to-light" />
    <Technology />

    <Market />

    <SectionBridge variant="light-to-dark" />
    <Team />

    <Partners />

    <Contact />
  </div>
);

export default Home;
