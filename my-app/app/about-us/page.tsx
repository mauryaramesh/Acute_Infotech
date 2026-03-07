import React from 'react';
import AboutUsHero from './AboutUsHero';
import AboutUsIntro from './AboutUsIntro';
import AboutUsTeam from './AboutUsTeam';

export default function AboutUsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <AboutUsHero />
            <AboutUsIntro />
            <AboutUsTeam />
        </div>
    );
}
