"use client";

import React from "react";

const solutions = [
    {
        title: "AI-Powered Analytics",
        description: "Automated data insights that predict trends before they happen.",
        icon: "📊"
    },
    {
        title: "Intelligent Automation",
        description: "Self-learning workflows that optimize your business processes 24/7.",
        icon: "🤖"
    },
    {
        title: "Smart Resource Scaling",
        description: "AI that automatically scales your infrastructure based on demand.",
        icon: "⚡"
    }
];

const AISolutions: React.FC = () => {
    return (
        <section className="bg-[#f8fafc] py-24 md:py-32 overflow-hidden relative border-t-4 border-black">
            {/* Flat Grid Background */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="max-w-[1200px] mx-auto px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-[#000] uppercase bg-blue-300 border-2 border-black neo-shadow-sm">
                        Next-Gen Automation
                    </span>
                    <h2 className="text-4xl lg:text-6xl font-black text-black mb-6 leading-tight">
                        AI-Driven <span className="text-blue-600 underline decoration-black decoration-4 underline-offset-8">Solutions</span>
                    </h2>
                    <p className="text-gray-700 max-w-2xl mx-auto text-xl font-medium">
                        We integrate advanced AI to automate complex tasks, enhancing efficiency and accuracy across your digital landscape.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {solutions.map((item, index) => (
                        <div
                            key={index}
                            className="group neo-card p-10 flex flex-col items-start"
                        >
                            <div className="text-5xl mb-8 p-4 bg-white border-4 border-black neo-shadow-sm group-hover:bg-blue-300 transition-colors">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-black text-black mb-4 group-hover:text-blue-600 transition-colors decoration-2 underline decoration-transparent group-hover:decoration-blue-600 underline-offset-4">
                                {item.title}
                            </h3>
                            <p className="text-gray-700 font-medium leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AISolutions;
