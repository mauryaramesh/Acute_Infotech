"use client";
import React, { useEffect, useRef } from "react";

const CursorEffect: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = el?.closest("a,button,[data-interactive]");
      if (dotRef.current) {
        dotRef.current.style.width = interactive ? "16px" : "10px";
        dotRef.current.style.height = interactive ? "16px" : "10px";
      }
      if (ringRef.current) {
        ringRef.current.style.width = interactive ? "52px" : "38px";
        ringRef.current.style.height = interactive ? "52px" : "38px";
        ringRef.current.style.borderColor = interactive ? "rgba(0,242,255,.9)" : "rgba(0,242,255,.55)";
      }
    };
    const onDown = (e: MouseEvent) => {
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%,-50%) scale(.65)";
      if (ringRef.current) ringRef.current.style.transform = "translate(-50%,-50%) scale(.8)";
      // ripple
      const r = document.createElement("div");
      r.style.cssText = `position:fixed;border-radius:50%;border:1.5px solid rgba(0,242,255,.5);pointer-events:none;z-index:9997;width:40px;height:40px;left:${e.clientX}px;top:${e.clientY}px;transform:translate(-50%,-50%) scale(0);animation:rippleOut .7s ease forwards`;
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 700);
    };
    const onUp = () => {
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%,-50%) scale(1)";
      if (ringRef.current) ringRef.current.style.transform = "translate(-50%,-50%) scale(1)";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    const lerp = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top = ring.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(lerp);
    };
    rafRef.current = requestAnimationFrame(lerp);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes rippleOut { to{transform:translate(-50%,-50%) scale(4);opacity:0} }
      `}</style>
      <div 
        ref={dotRef} 
        style={{ 
          position: "fixed", width: 10, height: 10, background: "#00f2ff", borderRadius: "50%", 
          pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)", 
          boxShadow: "0 0 12px #00f2ff,0 0 28px rgba(0,242,255,.35)", 
          transition: "width .2s,height .2s,transform .1s", mixBlendMode: "screen" 
        }} 
      />
      <div 
        ref={ringRef} 
        style={{ 
          position: "fixed", width: 38, height: 38, border: "1.5px solid rgba(0,242,255,.55)", 
          borderRadius: "50%", pointerEvents: "none", zIndex: 9998, 
          transform: "translate(-50%,-50%)", transition: "width .25s,height .25s,border-color .2s" 
        }} 
      />
    </>
  );
};

export default CursorEffect;
