import React from 'react';

const AboutUsHero: React.FC = () => {
    return (
        <section className="relative py-32 bg-gray-900 overflow-hidden">
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-blue-900/50 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Team working together"
                    className="w-full h-full object-cover opacity-30"
                />
            </div>

            <div className="relative z-10 max-w-[1200px] mx-auto px-8 py-12 text-center text-white">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                    50+ Minds. <span className="text-blue-400">100+ Digital Stories.</span> <br />
                    One Vision.
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed font-light">
                    We are a digital engineering powerhouse trusted by enterprises to transform their boldest visions into market-leading realities. Armed with top-tier talent and deep expertise, we don't just build solutions—we architect competitive advantages that scale.
                </p>

                <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white transition-all duration-300 bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                >
                    Consult Our Experts
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
            </div>
        </section>
    );
};

export default AboutUsHero;
