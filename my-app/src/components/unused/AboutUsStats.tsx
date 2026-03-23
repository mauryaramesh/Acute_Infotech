import React from 'react';

const stats = [
    { label: "Years of Experience", value: "10+" },
    { label: "Successful Projects", value: "100+" },
    { label: "Team Members", value: "50+" },
    { label: "Client Retention Rate", value: "95%" },
];

const AboutUsStats: React.FC = () => {
    return (
        <section className="py-20 bg-white border-b border-gray-100">
            <div className="max-w-[1200px] mx-auto px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <h3 className="text-4xl md:text-6xl font-extrabold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                                {stat.value}
                            </h3>
                            <p className="text-gray-600 font-medium text-lg uppercase tracking-wide">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutUsStats;
