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
    const sectionRef = useScrollReveal();
    const tiltProps = useTiltEffect();

    return (
        <section className="bg-white">
            <div className="max-w-[1200px] mx-auto px-8" ref={sectionRef}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 scroll-reveal-left">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            Build your next <br />
                            <span className="text-blue-600">product with us</span>
                        </h2>

                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                            <p className="font-medium text-gray-800 border-l-4 border-blue-500 pl-4">
                                Whether your idea is still in the very early stage or has already proven its worth to hundreds of users.
                            </p>

                            <p>
                                We like thinking about your business goals, pointing out user needs and helping you to express your brand. We can do it all. Research to concept. Design to development.
                            </p>

                            <p>
                                Oh, and you will get your hands dirty as well. Actually you're practically joining our team when you decide to work with us. By adding your (team's) skillset to your own, we know we can crack any challenge. Go Home Avengers.
                            </p>
                        </div>

                        <div className="pt-4">
                            <a
                                href="/about-us"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 relative overflow-hidden group"
                            >
                                <span className="relative z-10">More About Us</span>
                                <svg className="w-5 h-5 ml-2 -mr-1 relative z-10 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                {/* Shimmer sweep */}
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </a>
                        </div>
                    </div>

                    {/* Right Images */}
                    <div
                        className="relative scroll-reveal-right"
                        ref={tiltProps.ref}
                        onMouseMove={tiltProps.handleMouseMove}
                        onMouseLeave={tiltProps.handleMouseLeave}
                    >
                        {/* Background decorative elements — now with float animation */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none animate-float-slow"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-50 pointer-events-none animate-float" style={{ animationDelay: '3s' }}></div>

                        <div
                            className="grid grid-cols-2 gap-4 relative z-10 transition-transform duration-300 ease-out"
                            style={{
                                transform: `perspective(800px) rotateY(${tiltProps.tilt.x}deg) rotateX(${tiltProps.tilt.y}deg)`,
                            }}
                        >
                            <div className="col-span-2 space-y-4">
                                <img
                                    src="https://engrossinfotech.com/wp-content/uploads/2022/02/image-1.png"
                                    alt="Team collaboration"
                                    className="w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                                />
                            </div>
                            <div className="pt-8">
                                <img
                                    src="https://engrossinfotech.com/wp-content/uploads/2022/02/image-2.png"
                                    alt="Development process"
                                    className="w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform translate-y-4 hover:scale-[1.02]"
                                />
                            </div>
                            <div>
                                <img
                                    src="https://engrossinfotech.com/wp-content/uploads/2022/02/image-3.png"
                                    alt="Product launch"
                                    className="w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
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
