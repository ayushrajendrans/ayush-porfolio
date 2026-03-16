'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

function useClock() {
    const [time, setTime] = useState('');
    useEffect(() => {
        const update = () => {
            const d = new Date();
            const t = d.toLocaleTimeString('en-IN', {
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                timeZone: 'Asia/Kolkata', hour12: false,
            });
            setTime(t);
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);
    return time;
}

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const clock = useClock();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.hero-reveal',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.12,
                    duration: 1.2,
                    ease: 'power3.out',
                    delay: 0.2,
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col technical-grid border-b border-white/10"
            id="hero"
        >
            {/* Corner coordinates */}
            <div className="absolute top-20 left-8 crosshair-corner opacity-50">
                <span className="absolute left-4 top-0 font-mono text-[8px] tracking-widest text-tech-gray-700 whitespace-nowrap">
                    LAT: 28.6139 / LONG: 77.2090
                </span>
            </div>
            <div className="absolute top-20 right-8 crosshair-corner opacity-50 flex flex-col items-end">
                <span className="absolute right-4 top-0 font-mono text-[8px] tracking-widest text-tech-gray-700 whitespace-nowrap">
                    SYS: V1.0.4
                </span>
            </div>

            {/* Main Content — left-aligned grid */}
            <div className="flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto px-6 pt-24 pb-12">

                {/* Header meta row */}
                <div className="hero-reveal flex items-center gap-6 mb-10">
                    <span className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-white/10 bg-tech-black/50 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 bg-tech-gray-200 animate-pulse rounded-full" />
                        <span className="text-tech-gray-200 text-[10px] uppercase font-mono tracking-widest">
                            SYS.STATUS: ONLINE
                        </span>
                    </span>
                    <span className="font-mono text-[10px] text-tech-gray-700 tracking-widest uppercase hidden sm:block">
                        NODE: IST {clock}
                    </span>
                </div>

                {/* Main Title */}
                <h1 className="hero-reveal heading-industrial text-[clamp(4rem,12vw,9rem)] text-tech-white leading-none tracking-tighter mb-6">
                    CREATIVE<br />
                    <span className="text-tech-gray-700">ENGINEER</span>
                </h1>

                {/* Divider */}
                <div className="hero-reveal w-full max-w-md h-[1px] bg-gradient-to-r from-white/20 via-white/10 to-transparent mb-6" />

                {/* Subtitle row */}
                <div className="hero-reveal flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-14">
                    <p className="text-tech-gray-200 text-sm tracking-widest uppercase font-mono max-w-xs">
                        [ Architecture • Interactive • Precision ]
                    </p>
                    <span className="font-mono text-xs text-tech-gray-700 tracking-[0.2em]">
                        Ayush Raj // Portfolio // 2026
                    </span>
                </div>

                {/* CTAs */}
                <div className="hero-reveal flex flex-col sm:flex-row items-start gap-5">
                    <a
                        href="#projects"
                        className="group relative px-8 py-4 bg-tech-white text-tech-black font-semibold text-sm uppercase tracking-widest hover:bg-tech-gray-200 transition-colors"
                    >
                        <span className="relative z-10">Explore Work</span>
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-4 border border-white/20 text-tech-white font-semibold text-sm uppercase tracking-widest hover:border-white/60 transition-colors"
                    >
                        Initialize Contact
                    </a>
                </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="border-t border-white/10 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-6">
                    <span className="font-mono text-[9px] text-tech-gray-700 uppercase tracking-widest">
                        PROTOCOL: HTTPS/2 • TLS 1.3
                    </span>
                    <span className="font-mono text-[9px] text-tech-gray-700 uppercase tracking-widest hidden md:block">
                        STACK: NEXT.JS 14 • R3F • GSAP
                    </span>
                </div>

                {/* Scroll indicator */}
                <div className="flex items-center gap-3 opacity-50">
                    <span className="font-mono text-[9px] text-tech-gray-700 uppercase tracking-widest">Scroll to explore</span>
                    <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[30%] bg-tech-white animate-scanline opacity-60" />
                    </div>
                </div>
            </div>
        </section>
    );
}

