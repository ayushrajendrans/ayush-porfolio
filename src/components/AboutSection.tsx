'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.about-reveal',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 75%',
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const stats = [
        { label: 'DELIVERED', value: '13+' },
        { label: 'STACKS', value: '10+' },
        { label: 'EXPERIENCE', value: '3YRS' },
        { label: 'PRECISION', value: '100%' },
    ];

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative py-32 px-6 bg-tech-gray-100/40 backdrop-blur-[2px] text-tech-black border-b border-black/10 overflow-hidden"
        >
            {/* Background Grid - Dark on Light */}
            <div className="absolute inset-0 technical-grid-light opacity-30 pointer-events-none" />
            <div className="absolute top-8 right-8 crosshair-corner opacity-30">
                <span className="absolute right-4 top-0 font-mono text-[8px] tracking-widest text-tech-gray-700 whitespace-nowrap">
                    COORD_X: 40.7128 / COORD_Y: -74.0060
                </span>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Left Column: Title & Info */}
                    <div className="lg:col-span-5 flex flex-col justify-between about-reveal">
                        <div>
                            <span className="text-tech-gray-700 text-[10px] uppercase font-mono tracking-widest block mb-4">
                                02 // Philosophy
                            </span>
                            <h2 className="heading-industrial text-4xl sm:text-5xl md:text-6xl tracking-tighter mb-8 text-tech-black">
                                THE <br />
                                <span className="text-tech-gray-700">ARCHITECT</span>
                            </h2>
                            <p className="body-technical text-tech-gray-800 text-base md:text-lg mb-8 max-w-md">
                                Engineering premium digital experiences where code meets artistry. Specializing in highly interactive environments, precision performance, and interfaces that convey absolute quality.
                            </p>
                            <p className="font-mono text-xs text-tech-gray-700 uppercase tracking-widest">
                                Status: Accepting new structural challenges
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Grid Layout Stats */}
                    <div className="lg:col-span-7 grid grid-cols-2 gap-[1px] bg-black/10 border border-black/10 about-reveal">
                        {/* Profile Block */}
                        <div className="col-span-2 md:col-span-1 bg-tech-white p-8 md:p-12 flex flex-col justify-end min-h-[300px]">
                            <div className="w-16 h-16 bg-tech-black text-tech-white flex items-center justify-center font-mono text-xl tracking-tighter mb-8">
                                AR
                            </div>
                            <h3 className="heading-industrial text-2xl mb-2">Ayush Raj</h3>
                            <p className="font-mono text-xs text-tech-gray-700 uppercase tracking-widest">
                                Chief Engineer & Developer
                            </p>
                        </div>

                        {/* Text Block */}
                        <div className="col-span-2 md:col-span-1 bg-tech-gray-100 p-8 flex flex-col justify-center">
                            <p className="body-technical text-sm text-tech-gray-800 leading-relaxed">
                                Every project is treated as a piece of high-end machinery. By utilizing modern web technologies like Next.js and Three.js, I build robust, scalable architectures that don&apos;t just work—they perform.
                            </p>
                        </div>

                        {/* Stats Blocks */}
                        {stats.map((stat, i) => (
                            <div key={i} className="col-span-1 bg-tech-white p-6 flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[160px]">
                                <span className="font-mono text-[10px] text-tech-gray-700 uppercase tracking-widest">
                                    {stat.label}
                                </span>
                                <span className="heading-industrial text-3xl md:text-4xl lg:text-5xl text-tech-black">
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
