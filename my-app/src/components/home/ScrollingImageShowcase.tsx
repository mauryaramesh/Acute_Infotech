"use client";

import React, { useEffect, useState, useRef } from "react";

const showcaseImages = [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop", // AI Abstract
    "https://images.unsplash.com/photo-1620712943543-bcc4638d9980?q=80&w=1632&auto=format&fit=crop", // Robot Hand
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1632&auto=format&fit=crop", // Blockchain Tech
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1470&auto=format&fit=crop", // Cybersecurity
    "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=1374&auto=format&fit=crop", // Code/Matrix
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1472&auto=format&fit=crop", // Digital Globe
];

const ScrollingImageShowcase: React.FC = () => {
    const [scrollOffset, setScrollOffset] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate how far the section is through the viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
                // Percentage of scroll through the section
                const distance = windowHeight - rect.top;
                setScrollOffset(distance * 0.2); // Sensitivity factor
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-20 bg-white overflow-hidden"
        >
            <div className="max-w-[1200px] mx-auto px-8 mb-12">
                <div className="flex flex-col items-center text-center">
                    <span className="text-blue-600 font-medium py-1 px-3 text-sm rounded-full border border-blue-100 bg-blue-50 mb-4 uppercase tracking-widest">
                        Visual Portfolio
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Innovative <span className="text-blue-600">Digital Solutions</span>
                    </h2>
                </div>
            </div>

            <div className="relative flex items-center h-[400px]">
                {/* Horizontal scrolling track */}
                <div
                    className="flex gap-8 px-8 transition-transform duration-300 ease-out will-change-transform"
                    style={{ transform: `translateX(${-scrollOffset}px)` }}
                >
                    {[...showcaseImages, ...showcaseImages].map((img, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-[400px] h-full rounded-2xl overflow-hidden shadow-2xl relative group"
                        >
                            <img
                                src={img}
                                alt={`Showcase ${idx}`}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                <div className="text-white">
                                    <h4 className="text-xl font-bold mb-2">Automation Project {idx % 6 + 1}</h4>
                                    <p className="text-sm text-gray-200">AI Integration & Cloud Infrastructure</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ScrollingImageShowcase;
