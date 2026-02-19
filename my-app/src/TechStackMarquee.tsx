"use client";

import React, { useEffect, useRef } from "react";

const technologies = [
    { name: "Azure", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" },
    { name: "ServiceNow", logo: "https://upload.wikimedia.org/wikipedia/commons/1/10/ServiceNow_logo.svg" },
    { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png" },
    { name: "Magento", logo: "https://upload.wikimedia.org/wikipedia/commons/5/55/Magento_Logo.svg" },
    { name: "Databricks", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Databricks_Logo.png/1200px-Databricks_Logo.png" },
    { name: "Snowflake", logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Snowflake_Logo.svg" },
    { name: "HubSpot", logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/HubSpot_Logo.png" },
    { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
    { name: "Cloudinary", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Cloudinary_logo.svg" },
    { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
    { name: "MuleSoft", logo: "https://upload.wikimedia.org/wikipedia/commons/2/22/MuleSoft_logo.svg" },
    { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
];

// Scroll reveal hook
function useScrollReveal() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        el.classList.add('tech-section-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}

const TechStackMarquee: React.FC = () => {
    // Duplicate the array to create a seamless loop
    const row1 = [...technologies, ...technologies];
    const row2 = [...technologies, ...technologies].reverse();

    const sectionRef = useScrollReveal();

    return (
        <section
            ref={sectionRef}
            className="bg-gray-50 overflow-hidden tech-section-hidden"
        >
            <div className="container mx-auto px-4 mb-16 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Technologies We Work With
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    We leverage leading platforms and tools to build robust, scalable solutions.
                </p>
            </div>

            <div className="flex flex-col gap-8">
                {/* Row 1 - Left to Right */}
                <div className="relative w-full overflow-hidden">
                    <div className="flex gap-6 w-max animate-scroll pause-on-hover">
                        {row1.map((tech, index) => (
                            <div
                                key={`row1-${index}`}
                                className="group flex flex-col items-center justify-center w-[200px] h-[120px] bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: 'radial-gradient(circle at center, rgba(0,123,255,0.06) 0%, transparent 70%)' }}
                                />
                                <img
                                    src={tech.logo}
                                    alt={tech.name}
                                    className="h-12 w-auto object-contain mb-3 grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                                />
                                <span className="text-sm font-medium text-gray-400 group-hover:text-blue-600 transition-colors duration-300">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2 - Right to Left (Reverse) */}
                <div className="relative w-full overflow-hidden">
                    <div className="flex gap-6 w-max animate-scroll-reverse pause-on-hover">
                        {row2.map((tech, index) => (
                            <div
                                key={`row2-${index}`}
                                className="group flex flex-col items-center justify-center w-[200px] h-[120px] bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: 'radial-gradient(circle at center, rgba(0,123,255,0.06) 0%, transparent 70%)' }}
                                />
                                <img
                                    src={tech.logo}
                                    alt={tech.name}
                                    className="h-12 w-auto object-contain mb-3 grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                                />
                                <span className="text-sm font-medium text-gray-400 group-hover:text-blue-600 transition-colors duration-300">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Inline style for section fade-in */}
            <style jsx>{`
                .tech-section-hidden {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
                                transform 1s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .tech-section-visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `}</style>
        </section>
    );
};

export default TechStackMarquee;
