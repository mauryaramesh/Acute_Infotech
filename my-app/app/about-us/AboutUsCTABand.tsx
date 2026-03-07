"use client";

import React, { useEffect, useRef, useState } from "react";
import "./animations.css";

function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    el.querySelectorAll(".reveal-item").forEach((child, i) => {
                        setTimeout(() => (child as HTMLElement).classList.add("revealed"), i * 100);
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

const values = [
    {
        title: "Radical Innovation",
        text: "We push for breakthroughs that redefine the silicon standard at every layer of execution.",
        num: "01",
    },
    {
        title: "Deep Synergy",
        text: "Our engineers merge into your legacy stacks, creating a unified field of execution.",
        num: "02",
    },
    {
        title: "Absolute Integrity",
        text: "Transparency is our default mode. We provide full zero-knowledge ownership.",
        num: "03",
    },
    {
        title: "Global Resilience",
        text: "Every unit we deploy is hardened for infinite growth and cross-stack reliability.",
        num: "04",
    },
];

interface ValueCardItem {
    num: string;
    title: string;
    text: string;
}

interface ValueCardProps {
    v: ValueCardItem;
}

const ValueCard: React.FC<ValueCardProps> = ({ v }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const particles = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; life: number }>>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = 300;
        canvas.height = 300;
        let frame: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.current.forEach((p, idx) => {
                p.x += p.vx; p.y += p.vy; p.life -= 0.025;
                ctx.fillStyle = `rgba(0, 123, 255, ${p.life})`;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
                if (p.life <= 0) particles.current.splice(idx, 1);
            });
            frame = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(frame);
    }, []);

    const onCardMove = (e: React.MouseEvent) => {
        setIsHovered(true);
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: x * 15, y: -y * 15 });
        for (let i = 0; i < 2; i++) {
            particles.current.push({
                x: e.clientX - rect.left, y: e.clientY - rect.top,
                vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3,
                size: Math.random() * 2 + 1, life: 1.0,
            });
        }
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={onCardMove}
            onMouseLeave={() => {
                setTilt({ x: 0, y: 0 });
                setIsHovered(false);
            }}
            className="reveal-item transition-all duration-1000 opacity-0 translate-y-8 [&.revealed]:opacity-100 [&.revealed]:translate-y-0 perspective-1000 group"
        >
            <div
                className="relative h-full bg-gradient-to-br from-cyan-900/40 to-black/60 backdrop-blur-3xl border-2 border-cyan-500/40 rounded-[1.5rem] p-8 transition-all duration-700 transform-gpu overflow-hidden shadow-2xl group-hover:border-cyan-400/80 hover-lift"
                style={{
                    transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(${isHovered ? '30px' : '0px'})`,
                    boxShadow: isHovered ? '0 30px 60px rgba(0, 200, 255, 0.5), inset 0 0 30px rgba(0, 200, 255, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(0, 200, 255, 0.05)'
                }}
            >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-500 bg-gradient-to-br from-cyan-600/30 via-blue-600/20 to-transparent animate-aurora-flow blur-2xl pointer-events-none" style={{ backgroundSize: '200% auto' }} />
                <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 opacity-50" />
                <div className="relative z-20">
                    <div className="flex justify-between items-center mb-10">
                        <div className="text-[8px] font-black text-cyan-300 tracking-[0.5em] uppercase animate-neon-flicker group-hover:text-cyan-200 transition-colors">CMD // {v.num}</div>
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-neon-pulse transition-colors group-hover:bg-cyan-300" />
                    </div>
                    <h3 className="text-2xl font-black text-cyan-100 mb-4 transition-all duration-300 group-hover:text-cyan-200 group-hover:translate-x-2 group-hover:drop-shadow-[0_0_15px_rgba(0,200,255,0.6)]">{v.title}</h3>
                    <p className="text-cyan-200/70 text-base leading-relaxed font-light group-hover:text-cyan-100 transition-colors duration-300">{v.text}</p>
                </div>
                <div className="absolute inset-0 border-[1px] border-transparent group-hover:border-cyan-300/50 rounded-[1.5rem] pointer-events-none z-30 transition-colors duration-300" />
            </div>
        </div>
        );
};

const AboutUsValues: React.FC = () => {
    const sectionRef = useScrollReveal();

    return (
        <section className="relative py-16 lg:py-24 bg-black/60 overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(10,15,40,0.7) 50%, rgba(0,0,0,0.9) 100%)'
        }} ref={sectionRef}>
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#00e5ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            {/* Floating Gradient Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-cyan-600/40 rounded-full blur-[120px] opacity-40 animate-float-side animate-aurora-flow" />
                <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-[100px] opacity-30 animate-float animate-plasma-wave" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[80px] opacity-20 animate-float-3d animate-rainbow-shift" />
            </div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 reveal-item transition-all duration-1000 opacity-0 translate-y-8 [&.revealed]:opacity-100 [&.revealed]:translate-y-0">
                    <div className="max-w-xl">
                        <span className="inline-block text-[9px] font-black tracking-[0.5em] text-cyan-400 uppercase mb-6 animate-neon-flicker">Core Directives</span>
                        <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight" style={{
                            textShadow: '0 0 30px rgba(0, 200, 255, 0.5)'
                        }}>
                            Powered by <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-rainbow-shift" style={{ backgroundSize: '300% auto', filter: 'drop-shadow(0 0 20px rgba(0, 200, 255, 0.6))' }}>Quantum Logic.</span>
                        </h2>
                    </div>
                    <p className="max-w-xs text-cyan-200/80 text-lg font-light leading-relaxed hover:text-cyan-100 transition-colors group">
                        Our operational axioms are immutable protocols that govern decisioning at scale. <span className="animate-plasma-wave">Quantum verified.</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((v, i) => <ValueCard key={i} v={v} />)}
                </div>
            </div>

            <style jsx global>{`
        @keyframes holographic { 0% { background-position: 0% 50%; filter: hue-rotate(0deg); } 50% { background-position: 100% 50%; filter: hue-rotate(180deg); } 100% { background-position: 0% 50%; filter: hue-rotate(360deg); } }
        .animate-holographic { animation: holographic 4s ease infinite; }
        
        @keyframes auroraFlow { 0% { background-position: 0% 0%, 100% 0%, 0% 100%; filter: hue-rotate(0deg) saturate(150%); } 50% { background-position: 100% 100%, 0% 100%, 100% 0%; filter: hue-rotate(180deg) saturate(200%); } 100% { background-position: 0% 0%, 100% 0%, 0% 100%; filter: hue-rotate(360deg) saturate(150%); } }
        .animate-aurora-flow { animation: auroraFlow 6s ease-in-out infinite; }
        
        @keyframes plasmaWave { 0% { filter: hue-rotate(0deg) saturate(150%) brightness(1) drop-shadow(0 0 10px rgba(0, 200, 255, 0.5)); } 25% { filter: hue-rotate(90deg) saturate(200%) brightness(1.2) drop-shadow(0 0 30px rgba(100, 200, 255, 0.8)); } 50% { filter: hue-rotate(180deg) saturate(200%) brightness(1.3) drop-shadow(0 0 40px rgba(0, 200, 255, 0.8)); } 75% { filter: hue-rotate(270deg) saturate(200%) brightness(1.2) drop-shadow(0 0 30px rgba(100, 200, 255, 0.8)); } 100% { filter: hue-rotate(360deg) saturate(150%) brightness(1) drop-shadow(0 0 10px rgba(0, 200, 255, 0.5)); } }
        .animate-plasma-wave { animation: plasmaWave 5s ease-in-out infinite; }
        
        @keyframes rainbowShift { 0% { filter: hue-rotate(0deg) saturate(150%) brightness(1.1); } 25% { filter: hue-rotate(90deg) saturate(180%) brightness(1.2); } 50% { filter: hue-rotate(180deg) saturate(180%) brightness(1.15); } 75% { filter: hue-rotate(270deg) saturate(180%) brightness(1.1); } 100% { filter: hue-rotate(360deg) saturate(150%) brightness(1.1); } }
        .animate-rainbow-shift { animation: rainbowShift 4s ease-in-out infinite; }
        
        @keyframes textGlow { 0%, 100% { text-shadow: 0 0 10px rgba(0, 123, 255, 0.5); } 50% { text-shadow: 0 0 20px rgba(0, 123, 255, 0.8); } }
        .animate-text-glow { animation: textGlow 3s ease-in-out infinite; }
        
        @keyframes floatUp { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .animate-float { animation: floatUp 8s ease-in-out infinite; }
        
        @keyframes floatSide { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(15px); } }
        .animate-float-side { animation: floatSide 8s ease-in-out infinite; }
        
        @keyframes float3D { 0% { transform: translateY(0px) translateZ(0px) rotateZ(0deg); } 25% { transform: translateY(-15px) translateZ(20px) rotateZ(1deg); } 50% { transform: translateY(-25px) translateZ(40px) rotateZ(0deg); } 75% { transform: translateY(-15px) translateZ(20px) rotateZ(-1deg); } 100% { transform: translateY(0px) translateZ(0px) rotateZ(0deg); } }
        .animate-float-3d { animation: float3D 8s ease-in-out infinite; }
        
        @keyframes neonFlicker { 0%, 18%,22%, 25%, 54%, 56%, 100% { filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 20px rgba(0, 255, 255, 0.5)); opacity: 1; } 20%, 24%, 55% { filter: drop-shadow(0 0 2px rgba(0, 255, 255, 0.3)); opacity: 0.3; } }
        .animate-neon-flicker { animation: neonFlicker 2s ease-in-out infinite; }
        
        .perspective-1000 { perspective: 1000px; }
        
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 200, 255, 0.25);
        }
      `}</style>
        </section>
    );
};

export default AboutUsValues;
