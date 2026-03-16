'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import projects from '@/data/projects';

export default function ProjectUniverse() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const projectItems = gsap.utils.toArray('.project-item') as HTMLElement[];

            projectItems.forEach((item) => {
                gsap.fromTo(
                    item,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            id="projects"
            className="relative w-full min-h-screen py-32 bg-tech-gray-900 border-b border-white/10"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 technical-grid opacity-30 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-white/10">
                    <div>
                        <span className="text-tech-gray-700 text-[10px] uppercase font-mono tracking-widest block mb-4">
                            01 // Index
                        </span>
                        <h2 className="heading-industrial text-4xl sm:text-5xl md:text-6xl text-tech-white tracking-tighter">
                            SELECTED <span className="text-tech-gray-700">WORKS</span>
                        </h2>
                    </div>
                    <div className="mt-6 md:mt-0 text-right">
                        <p className="text-tech-gray-200 text-sm font-mono uppercase tracking-widest max-w-xs">
                            Engineering robust digital environments with high precision.
                        </p>
                    </div>
                </div>

                {/* Project List */}
                <div className="flex flex-col border-t border-white/10">
                    {projects.map((project, index) => (
                        <a
                            key={project.id}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-item group relative flex flex-col md:grid md:grid-cols-12 gap-6 py-16 border-b border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover Reveal Side Bar */}
                            <div
                                className="absolute left-0 top-0 bottom-0 w-1 origin-left scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
                                style={{ backgroundColor: project.color }}
                            />

                            {/* Column 1: Index & Title */}
                            <div className="relative z-10 col-span-4 flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-tech-gray-700 font-mono text-[10px] tracking-widest">
                                        [{String(index + 1).padStart(2, '0')}]
                                    </span>
                                    <span className="text-tech-gray-700 font-mono text-[10px] tracking-widest uppercase">
                                        Release // {project.year}
                                    </span>
                                </div>
                                <h3 className="heading-industrial text-4xl sm:text-5xl text-tech-white group-hover:translate-x-2 transition-transform duration-500">
                                    {project.name}
                                </h3>
                            </div>

                            {/* Column 2: Technical Description */}
                            <div className="relative z-10 col-span-4 flex flex-col justify-center">
                                <p className="body-technical text-tech-gray-200 text-sm max-w-sm opacity-80 group-hover:opacity-100 transition-opacity">
                                    {project.description}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 border border-white/5 text-tech-gray-700 group-hover:text-tech-gray-200 group-hover:border-white/10 transition-colors"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Column 3: Status & Interactive Meta */}
                            <div className="relative z-10 col-span-3 flex flex-col justify-center md:items-end text-left md:text-right">
                                <span className="text-tech-gray-700 font-mono text-[10px] tracking-widest uppercase mb-1">
                                    Status
                                </span>
                                <span className="text-tech-white font-mono text-xs tracking-widest uppercase group-hover:text-white transition-colors">
                                    {project.status}
                                </span>
                                <div className="mt-4 flex items-center gap-2 md:justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <span className="text-tech-gray-700 font-mono text-[9px] uppercase tracking-tighter">Access System</span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-tech-white">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            {/* Interactive Hover Preview Area (Stylized) */}
                            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/[0.02] translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-tech pointer-events-none overflow-hidden">
                                <div className="absolute inset-0 technical-grid opacity-10" />
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 animate-scanline" />
                                <div
                                    className="absolute inset-x-8 inset-y-12 border border-white/5 flex items-center justify-center opacity-40"
                                    style={{ borderColor: `${project.color}20` }}
                                >
                                    <span className="font-mono text-[40px] font-black text-white/5 select-none tracking-tighter">
                                        {project.name.split(' ')[0]}
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-20 text-center">
                    <span className="text-tech-gray-700 text-[10px] uppercase font-mono tracking-widest inline-flex items-center gap-4 before:h-[1px] before:w-12 before:bg-white/10 after:h-[1px] after:w-12 after:bg-white/10">
                        End of Index
                    </span>
                </div>
            </div>
        </section>
    );
}
