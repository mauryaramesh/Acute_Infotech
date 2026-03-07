"use client";

import React, { useEffect, useRef, useState } from "react";
import "./animations.css";
import Image from "next/image";

function useMagnetic() {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const onMouseMove = (e: MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = el.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) < 100) {
            setPosition({ x: deltaX * 0.3, y: deltaY * 0.3 });
        } else {
            setPosition({ x: 0, y: 0 });
        }
    };
    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);
    return { ref, position };
}

function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    el.querySelectorAll(".reveal-up").forEach((child, i) => {
                        setTimeout(() => (child as HTMLElement).classList.add("revealed"), i * 150);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return ref;
}

const AboutUsFounder: React.FC = () => {
    const sectionRef = useScrollReveal();

    const MagneticStat = ({ value, label }: { value: string, label: string }) => {
        const { ref, position } = useMagnetic();
        return (
            <div ref={ref} style={{ transform: `translate(${position.x}px, ${position.y}px)` }} className="group border-t-2 border-cyan-500/50 pt-8 transition-all duration-300 ease-out hover-lift">
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 tracking-tighter animate-rainbow-shift" style={{
                    filter: 'drop-shadow(0 0 15px rgba(0, 200, 255, 0.6))'
                }}>{value}</div>
                <div className="text-[9px] text-cyan-500/60 uppercase tracking-[0.4em] font-black mt-2 group-hover:text-cyan-400 transition-colors animate-neon-flicker">{label}</div>
            </div>
        );
    };

    return (
        <section className="bg-black overflow-hidden relative py-16 lg:py-28" ref={sectionRef}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {/* Background gradient */}
                <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, rgba(0,10,30,0.95) 0%, rgba(5,15,45,0.8) 50%, rgba(0,5,20,0.95) 100%)'
                }} />
                
                {/* Non-blocking animated blobs - lower opacity, positioned behind */}
                <div className="absolute top-1/4 left-[-5%] w-[50%] h-[50%] bg-cyan-600 rounded-full blur-[120px] opacity-10 animate-aurora-flow" />
                <div className="absolute bottom-1/3 right-[-10%] w-[45%] h-[45%] bg-blue-600 rounded-full blur-[110px] opacity-8 animate-plasma-wave" style={{ animationDelay: '1s' }} />
                <div className="absolute top-0 right-1/3 w-[40%] h-[40%] bg-purple-600 rounded-full blur-[100px] opacity-5 animate-float-3d animate-rainbow-shift" style={{ animationDelay: '2s' }} />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Image Section - Enhanced and Visible */}
                    <div className="reveal-up relative opacity-0 translate-y-12 transition-all duration-1000 [&.revealed]:opacity-100 [&.revealed]:translate-y-0 group/founder-img perspective-1000 order-2 lg:order-1">
                        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-cyan-600/40 via-blue-600/20 to-purple-600/10 blur-[100px] opacity-0 group-hover/founder-img:opacity-60 transition-opacity duration-700 animate-extreme-glow" style={{
                            filter: 'blur(100px)',
                            top: '-40px',
                            left: '-40px',
                            right: '-40px',
                            bottom: '-40px'
                        }} />
                        
                        <div className="relative z-20 rounded-[2.5rem] overflow-hidden shadow-2xl bg-black/20 backdrop-blur-xl border-2 border-cyan-400/60 group/founder hover-lift transition-all" style={{
                            boxShadow: '0 0 80px rgba(0, 229, 255, 0.5), inset 0 0 40px rgba(0, 229, 255, 0.15), 0 25px 50px rgba(0, 15, 45, 0.8)'
                        }}>
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover/founder:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                            
                            <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
                                <Image 
                                    src="https://images.unsplash.com/photo-1556157382-97dee2dcb9d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=90" 
                                    alt="Founder - Rajesh Kumar"
                                    fill
                                    className="object-cover group-hover/founder:scale-110 transition-transform duration-1000 ease-out filter" 
                                    style={{
                                        filter: 'brightness(1.1) contrast(1.1) saturate(0.9)'
                                    }}
                                    priority
                                />
                                {/* Scan line effect */}
                                <div className="absolute inset-0 pointer-events-none opacity-20 group-hover/founder:opacity-40 transition-opacity" style={{
                                    backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 229, 255, 0.15) 0px, rgba(0, 229, 255, 0.15) 1px, transparent 1px, transparent 2px)',
                                    animation: 'scanlines 8s linear infinite'
                                }} />
                            </div>
                        </div>

                        {/* Enhanced Badge */}
                        <div className="absolute -bottom-6 -right-6 z-30 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-2xl p-6 rounded-[1.5rem] shadow-2xl border-2 border-cyan-400/70 group-hover/founder-img:scale-110 group-hover/founder-img:translate-y-3 transition-all duration-700 hover-lift" style={{ 
                            boxShadow: '0 0 50px rgba(0, 229, 255, 0.8), inset 0 0 25px rgba(0, 229, 255, 0.2), 0 20px 40px rgba(0, 15, 45, 0.9)'
                        }}>
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white mb-4 animate-neon-pulse shadow-lg" style={{
                                boxShadow: '0 0 40px rgba(0, 229, 255, 1), inset 0 0 20px rgba(255, 255, 255, 0.2)'
                            }}><svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>
                            <div className="text-[9px] font-black text-cyan-300 uppercase tracking-[0.6em] mb-3 animate-neon-flicker">Founder</div>
                            <div className="text-xs font-black text-cyan-200 mb-2">Rajesh Kumar</div>
                            <div className="text-[10px] text-cyan-400/80 font-bold uppercase tracking-widest">30+ Years • Architect</div>
                        </div>
                    </div>

                    {/* Text Content Section - Enhanced Visibility */}
                    <div className="reveal-up opacity-0 translate-y-12 transition-all duration-1000 delay-300 [&.revealed]:opacity-100 [&.revealed]:translate-y-0 order-1 lg:order-2">
                        <div className="flex items-center gap-6 mb-10">
                            <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent" />
                            <span className="text-[11px] font-black tracking-[0.6em] text-cyan-400 uppercase animate-neon-flicker drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]">Leadership Vision</span>
                        </div>

                        <h2 className="text-5xl lg:text-7xl font-black text-white leading-[1.15] tracking-tight mb-8 reveal-up" style={{
                            textShadow: '0 0 30px rgba(0, 229, 255, 0.5), 0 0 60px rgba(0, 100, 255, 0.2)'
                        }}>
                            Building the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 animate-rainbow-shift" style={{ 
                                backgroundSize: '300% auto',
                                filter: 'drop-shadow(0 0 25px rgba(0, 229, 255, 0.7))'
                            }}>Singularity.</span>
                        </h2>

                        <div className="relative mb-12 pl-8 border-l-4 border-cyan-500/80 group/quote">
                            <div className="absolute -left-[18px] top-0 w-3 h-3 bg-cyan-500 rounded-full animate-neon-pulse" style={{
                                boxShadow: '0 0 15px rgba(0, 229, 255, 0.8)'
                            }} />
                            <p className="text-2xl lg:text-3xl font-light leading-relaxed text-cyan-100 italic mb-8 group-hover/quote:text-cyan-50 transition-colors" style={{
                                textShadow: '0 0 15px rgba(0, 229, 255, 0.3)',
                                letterSpacing: '0.3px'
                            }}>&ldquo;The age of incrementalism is over. We engineer exponential leaps.&rdquo;</p>
                            
                            <div className="flex flex-col gap-3">
                                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Rajesh Kumar</div>
                                <div className="flex items-center gap-4 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-cyan-500 rounded-full animate-neon-pulse" />
                                        Founder & CTO
                                    </span>
                                    <span className="text-cyan-500/50">•</span>
                                    <span>30+ Years Experience</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-lg text-cyan-100/80 leading-relaxed font-light mb-10 max-w-2xl group-hover:text-cyan-100 transition-colors drop-shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                            With three decades architecting quantum-grade systems, Rajesh pioneered the synthesis of AI and enterprise scale. His vision: eliminate the gap between human potential and machine precision through exponential thinking.
                        </p>

                        <div className="grid grid-cols-2 gap-12 mb-10">
                            <MagneticStat value="30Y+" label="Quantum Engineering" />
                            <MagneticStat value="12B+" label="Transactions Architected" />
                        </div>

                        {/* CTA Button */}
                        <div className="pt-6 reveal-up opacity-0 translate-y-4 transition-all duration-1000 delay-500 [&.revealed]:opacity-100 [&.revealed]:translate-y-0">
                            <a href="/contact" className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all duration-500 hover:gap-5 hover:shadow-[0_0_40px_rgba(0,229,255,0.6)]" style={{
                                boxShadow: '0 0 30px rgba(0, 229, 255, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.1)'
                            }}>
                                Connect with Rajesh
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes shimmer { 0% { background-position: -150% 0; } 100% { background-position: 150% 0; } }
        .animate-shimmer { background: linear-gradient(90deg, rgba(37,99,235,0.05) 25%, rgba(37,99,235,0.5) 50%, rgba(37,99,235,0.05) 75%); background-size: 200% 100%; animation: shimmer 2s infinite linear; }
        
        @keyframes scanlines { 0% { transform: translateY(0); } 100% { transform: translateY(10px); } }
        
        .hover-lift { transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1); }
        .hover-lift:hover { transform: translateY(-6px); }
      `}</style>
        </section>
    );
};

export default AboutUsFounder;
