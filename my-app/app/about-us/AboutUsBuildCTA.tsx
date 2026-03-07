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

interface CommitmentCard {
    num: string;
    title: string;
    text: string;
}

const commitments: CommitmentCard[] = [
    {
        num: "01",
        title: "Exponential Delivery",
        text: "Accelerated timelines without compromise on quality or architectural purity."
    },
    {
        num: "02",
        title: "Obsessive Optimization",
        text: "Every millisecond matters—we architect solutions for nanosecond-level performance."
    },
    {
        num: "03",
        title: "Infinite Resilience",
        text: "Systems designed to scale infinitely while maintaining sub-millisecond latency."
    },
    {
        num: "04",
        title: "Transparent Innovation",
        text: "Full visibility into our processes, decisions, and the intelligence that drives them."
    },
];

interface CommitmentCardProps {
    card: CommitmentCard;
}

const CommitmentCardComponent: React.FC<CommitmentCardProps> = ({ card }) => {
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
                ctx.fillStyle = `rgba(0, 229, 255, ${p.life})`;
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
                    boxShadow: isHovered ? '0 30px 60px rgba(0, 229, 255, 0.5), inset 0 0 30px rgba(0, 229, 255, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(0, 229, 255, 0.05)'
                }}
            >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-500 bg-gradient-to-br from-cyan-600/30 via-blue-600/20 to-transparent animate-aurora-flow blur-2xl pointer-events-none" style={{ backgroundSize: '200% auto' }} />
                <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 opacity-50" />
                <div className="relative z-20">
                    <div className="flex justify-between items-center mb-10">
                        <div className="text-[8px] font-black text-cyan-300 tracking-[0.5em] uppercase animate-neon-flicker group-hover:text-cyan-200 transition-colors">COMMITMENT // {card.num}</div>
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-neon-pulse transition-colors group-hover:bg-cyan-300" />
                    </div>
                    <h3 className="text-2xl font-black text-cyan-100 mb-4 transition-all duration-300 group-hover:text-cyan-200 group-hover:translate-x-2 group-hover:drop-shadow-[0_0_15px_rgba(0,229,255,0.6)]">{card.title}</h3>
                    <p className="text-cyan-200/70 text-base leading-relaxed font-light group-hover:text-cyan-100 transition-colors duration-300">{card.text}</p>
                </div>
                <div className="absolute inset-0 border-[1px] border-transparent group-hover:border-cyan-300/50 rounded-[1.5rem] pointer-events-none z-30 transition-colors duration-300" />
            </div>
        </div>
    );
};

const AboutUsBuildCTA: React.FC = () => {
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
                        <span className="inline-block text-[9px] font-black tracking-[0.5em] text-cyan-400 uppercase mb-6 animate-neon-flicker">Why Partner With Us</span>
                        <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight" style={{
                            textShadow: '0 0 30px rgba(0, 229, 255, 0.5)'
                        }}>
                            Our <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-rainbow-shift" style={{ backgroundSize: '300% auto' }}>Commitments.</span>
                        </h2>
                    </div>
                    <p className="max-w-xs text-cyan-200/80 text-lg font-light leading-relaxed hover:text-cyan-100 transition-colors group">
                        The promises we keep to <span className="animate-plasma-wave">every partner.</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {commitments.map((card, i) => <CommitmentCardComponent key={i} card={card} />)}
                </div>
            </div>

            <style jsx global>{`
        .hover-lift { transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1); }
        .hover-lift:hover { transform: translateY(-6px); }
      `}</style>
        </section>
    );
};

export default AboutUsBuildCTA;
