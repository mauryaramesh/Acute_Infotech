"use client";

import React, { useEffect, useRef, useState } from "react";

// Scroll reveal hook
function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const children = el.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
                        children.forEach((child, i) => {
                            setTimeout(() => {
                                child.classList.add('revealed');
                            }, i * 150);
                        });
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

// Parallax tilt on mouse move
function useTiltEffect() {
    const ref = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
        setTilt({ x, y });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return { ref, tilt, handleMouseMove, handleMouseLeave };
}

const BuildProduct: React.FC = () => {
    return (
        <section className="bg-[#f8fafc] py-24 md:py-32 border-t-4 border-black overflow-hidden relative">
            {/* Flat Grid Background */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            <div className="max-w-[1200px] mx-auto px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 neo-card p-12 bg-white">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-none bg-blue-300 border-2 border-black neo-shadow-sm mb-4">
                            <span className="w-2.5 h-2.5 bg-black mr-2"></span>
                            <span className="text-xs font-black text-black uppercase tracking-widest">AI-Enhanced Engineering</span>
                        </div>
                        <h2 className="text-4xl lg:text-7xl font-black text-black leading-none uppercase tracking-tighter">
                            Build your next <br />
                            <span className="text-blue-600 underline decoration-black decoration-4 underline-offset-4">product with us</span>
                        </h2>

                        <div className="space-y-6 text-xl text-gray-800 leading-relaxed font-medium">
                            <p className="border-l-8 border-blue-500 pl-6 bg-blue-50 py-4 border-2 border-black neo-shadow-sm">
                                Whether your idea is still in the very early stage or has already proven its worth to hundreds of users.
                            </p>

                            <p>
                                We like thinking about your business goals, pointing out user needs and helping you to express your brand. We can do it all. Research to concept. Design to development.
                            </p>

                            <p className="bg-yellow-100 p-4 border-2 border-black neo-shadow-sm italic">
                                "Oh, and you will get your hands dirty as well. Actually you're practically joining our team when you decide to work with us."
                            </p>
                        </div>

                        <div className="pt-8">
                            <a
                                href="/about-us"
                                className="neo-button text-xl bg-blue-600 text-white"
                            >
                                <span className="relative z-10 uppercase tracking-widest font-black">More About Us</span>
                                <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Right Images */}
                    <div className="relative">
                        {/* Decorative floating shapes - Static */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-300 border-4 border-black neo-shadow-sm rotate-12"></div>
                        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-300 border-4 border-black neo-shadow rotate-[-15deg]"></div>

                        <div className="grid grid-cols-2 gap-6 relative z-10">
                            <div className="col-span-2">
                                <img
                                    src="https://engrossinfotech.com/wp-content/uploads/2022/02/image-1.png"
                                    alt="Team collaboration"
                                    className="w-full h-auto neo-border-thick neo-shadow-lg grayscale hover:grayscale-0 transition-all duration-500 bg-white"
                                />
                            </div>
                            <div className="pt-10">
                                <img
                                    src="https://engrossinfotech.com/wp-content/uploads/2022/02/image-2.png"
                                    alt="Development process"
                                    className="w-full h-auto neo-border-thick neo-shadow grayscale hover:grayscale-0 transition-all duration-500 transform translate-y-6 bg-white"
                                />
                            </div>
                            <div>
                                <img
                                    src="https://engrossinfotech.com/wp-content/uploads/2022/02/image-3.png"
                                    alt="Product launch"
                                    className="w-full h-auto neo-border-thick neo-shadow grayscale hover:grayscale-0 transition-all duration-500 bg-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BuildProduct;
