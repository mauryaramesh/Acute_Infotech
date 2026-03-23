import React from 'react';
import AboutHero from '@/src/components/about-us/AboutHero';
import OurStory from '@/src/components/about-us/OurStory';
import HowWeWork from '@/src/components/about-us/HowWeWork';
import MeetTheTeam from '@/src/components/about-us/MeetTheTeam';
import WhyChooseUs from '@/src/components/about-us/WhyChooseUs';
import TechStackMarquee from '@/src/components/shared/TechStackMarquee';
import StartProject from '@/src/components/shared/StartProject';

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
