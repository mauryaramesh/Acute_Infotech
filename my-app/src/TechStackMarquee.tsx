"use client";

import React from "react";

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



const TechStackMarquee: React.FC = () => {
    // Duplicate the array to create a seamless loop
    const row1 = [...technologies, ...technologies];
    const row2 = [...technologies, ...technologies].reverse();

    return (
        <section
            className="bg-[#f1f5f9] overflow-hidden py-24 md:py-32 border-t-4 border-black border-b-4"
        >
            <div className="container mx-auto px-4 mb-20 text-center">
                <h2 className="text-4xl lg:text-6xl font-black text-black mb-6 uppercase tracking-tighter">
                    Technologies <span className="text-blue-600 underline decoration-black decoration-4 underline-offset-8">We Work With</span>
                </h2>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
                    We leverage leading platforms and tools to build robust, scalable solutions.
                </p>
            </div>

            <div className="flex flex-col gap-12">
                {/* Row 1 - Left to Right */}
                <div className="relative w-full overflow-hidden">
                    <div className="flex gap-8 w-max animate-scroll pause-on-hover">
                        {row1.map((tech, index) => (
                            <div
                                key={`row1-${index}`}
                                className="group flex flex-col items-center justify-center w-[220px] h-[140px] neo-card p-6 bg-white"
                            >
                                <img
                                    src={tech.logo}
                                    alt={tech.name}
                                    className="h-14 w-auto object-contain mb-4 grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                                />
                                <span className="text-sm font-black text-black uppercase tracking-widest">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2 - Right to Left (Reverse) */}
                <div className="relative w-full overflow-hidden">
                    <div className="flex gap-8 w-max animate-scroll-reverse pause-on-hover">
                        {row2.map((tech, index) => (
                            <div
                                key={`row2-${index}`}
                                className="group flex flex-col items-center justify-center w-[220px] h-[140px] neo-card p-6 bg-white"
                            >
                                <img
                                    src={tech.logo}
                                    alt={tech.name}
                                    className="h-14 w-auto object-contain mb-4 grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                                />
                                <span className="text-sm font-black text-black uppercase tracking-widest">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStackMarquee;
