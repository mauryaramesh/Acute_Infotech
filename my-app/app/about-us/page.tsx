import React from 'react';
import AboutHero from './Abouthero';
import OurStory from './Ourstory';
import HowWeWork from './Howwework';
import MeetTheTeam from './Meettheteam';
import WhyChooseUs from './Whychooseus';
import TechStackMarquee from '@/src/TechStackMarquee';
import StartProject from '@/src/Startproject';

export default function AboutUsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <AboutHero />
            <OurStory />
            <HowWeWork />
             <WhyChooseUs />
              <TechStackMarquee />
               <StartProject />
        </div>
    );
}
