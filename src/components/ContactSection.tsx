'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function useClock() {
    const [time, setTime] = useState('');
    useEffect(() => {
        const update = () => {
            const d = new Date();
            setTime(d.toLocaleTimeString('en-IN', {
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                timeZone: 'Asia/Kolkata', hour12: false,
            }));
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);
    return time;
}

const contacts = [
    {
        label: 'TRANSMISSION',
        method: 'WhatsApp',
        href: 'https://wa.me/919895745027?text=Hi%20Ayush!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.',
        id: 'CH-01',
        note: 'Response within 24h',
    },
    {
        label: 'SECURE_CHANNEL',
        method: 'Email Protocol',
        href: 'mailto:ayushrajendrans@gmail.com',
        id: 'CH-02',
        note: 'ayushrajendrans@gmail.com',
    },
    {
        label: 'SOCIAL_LINK',
        method: 'LinkedIn',
        href: 'https://linkedin.com/in/ayush-raj-673484260',
        id: 'CH-03',
        note: 'Professional network',
    },
];

export default function ContactSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const clock = useClock();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.contact-reveal',
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

    return (
        <section
            id="contact"
            ref={containerRef}
            className="relative py-32 px-6 bg-tech-black overflow-hidden"
        >
            <div className="absolute inset-0 technical-grid opacity-30 pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="contact-reveal mb-20">
                    <span className="text-tech-gray-700 text-[10px] uppercase font-mono tracking-widest block mb-4">
                        04 // Communication
                    </span>
                    <h2 className="heading-industrial text-4xl sm:text-5xl md:text-6xl text-tech-white tracking-tighter mb-4">
                        INITIALIZE <br />
                        <span className="text-tech-gray-700">CONTACT</span>
                    </h2>
                    <p className="body-technical text-tech-gray-700 max-w-sm text-sm">
                        Ready to deploy new systems. Open channels for professional inquiries and technical discussions.
                    </p>
                    <p className="font-mono text-[10px] text-tech-gray-700 mt-4 uppercase tracking-widest">
                        LOCAL_TIME: IST {clock}
                    </p>
                </div>

                {/* Contact Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10 border border-white/10 contact-reveal">
                    {contacts.map((contact) => (
                        <a
                            key={contact.id}
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-tech-black p-8 md:p-12 hover:bg-white/5 transition-colors group relative overflow-hidden flex flex-col justify-between min-h-[200px]"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <span className="font-mono text-[10px] text-tech-gray-700 uppercase tracking-widest">
                                    {contact.id}
                                </span>
                                <div className="w-2 h-2 bg-tech-gray-700 group-hover:bg-tech-white transition-colors" />
                            </div>

                            <div>
                                <span className="font-mono text-[10px] text-tech-gray-200 block mb-2 opacity-50">
                                    {contact.label}
                                </span>
                                <span className="heading-industrial text-2xl text-tech-white group-hover:text-tech-gray-200 transition-colors">
                                    {contact.method}
                                </span>
                                {contact.note && (
                                    <span className="block mt-3 font-mono text-[9px] text-tech-gray-700 uppercase tracking-widest">
                                        {contact.note}
                                    </span>
                                )}
                            </div>

                            {/* Hover scanline effect */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 -translate-y-full group-hover:animate-[scanline_2s_linear_infinite]" />
                        </a>
                    ))}
                </div>

                <style jsx>{`
                    @keyframes scanline {
                        0% { transform: translateY(-100%); opacity: 0; }
                        50% { opacity: 1; }
                        100% { transform: translateY(400px); opacity: 0; }
                    }
                `}</style>

                {/* Footer note */}
                <div className="contact-reveal flex flex-col md:flex-row items-center justify-between border-t border-white/10 mt-32 pt-8">
                    <p className="text-tech-gray-700 text-[10px] uppercase font-mono tracking-widest">
                        SYS // V1.0.0
                    </p>
                    <p className="text-tech-gray-700 text-[10px] uppercase font-mono tracking-widest text-center mt-4 md:mt-0">
                        © 2026 AYUSH RAJ. ALL SYSTEMS OPERATIONAL.
                    </p>
                    <p className="text-tech-gray-700 text-[10px] uppercase font-mono tracking-widest hidden md:block">
                        END OF DOCUMENT
                    </p>
                </div>
            </div>
        </section>
    );
}
