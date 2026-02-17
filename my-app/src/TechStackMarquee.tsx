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
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 mb-16 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Technologies We Work With
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    We leverage leading platforms and tools to build robust, scalable solutions.
                </p>
            </div>

            <div className="flex flex-col gap-8">
                {/* Row 1 - Left to Right (Technically Right because of Scroll) */}
                <div className="relative w-full overflow-hidden">
                    <div className="flex gap-6 w-max animate-scroll pause-on-hover">
                        {row1.map((tech, index) => (
                            <div
                                key={`row1-${index}`}
                                className="flex flex-col items-center justify-center w-[200px] h-[120px] bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300"
                            >
                                <img
                                    src={tech.logo}
                                    alt={tech.name}
                                    className="h-12 w-auto object-contain mb-3 grayscale hover:grayscale-0 transition-all duration-300"
                                />
                                <span className="text-sm font-medium text-gray-400">{tech.name}</span>
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
                                className="flex flex-col items-center justify-center w-[200px] h-[120px] bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300"
                            >
                                <img
                                    src={tech.logo}
                                    alt={tech.name}
                                    className="h-12 w-auto object-contain mb-3 grayscale hover:grayscale-0 transition-all duration-300"
                                />
                                <span className="text-sm font-medium text-gray-400">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStackMarquee;
