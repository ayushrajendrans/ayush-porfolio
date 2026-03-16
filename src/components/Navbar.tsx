'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const links = [
        { label: 'Works', href: '#projects' },
        { label: 'Philosophy', href: '#about' },
        { label: 'Specs', href: '#skills' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-tech-black/90 backdrop-blur-md border-white/10' : 'bg-transparent border-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#"
                    className="flex items-center gap-4 group"
                >
                    <div className="w-8 h-8 bg-tech-white text-tech-black flex items-center justify-center font-mono text-sm tracking-tighter group-hover:bg-tech-gray-200 transition-colors">
                        AR
                    </div>
                    <div className="hidden sm:flex flex-col">
                        <span className="text-tech-white font-mono text-[10px] tracking-widest uppercase leading-none mb-1">
                            Ayush Raj
                        </span>
                        <span className="text-tech-gray-700 font-mono text-[8px] tracking-[0.2em] uppercase leading-none">
                            Engineer
                        </span>
                    </div>
                </a>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8 h-full">
                    <div className="flex items-center gap-3 mr-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-tech-white animate-blink" />
                        <span className="text-tech-gray-700 font-mono text-[8px] tracking-widest uppercase">
                            SYS.STATUS: <span className="text-tech-gray-200">ACTIVE</span> {'//'} SYNC: <span className="text-tech-gray-200">100%</span>
                        </span>
                    </div>

                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="relative h-full flex items-center text-tech-gray-200 hover:text-tech-white text-[10px] font-mono tracking-widest uppercase transition-colors group"
                        >
                            {link.label}
                            {/* Hover indicator line */}
                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-tech-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </a>
                    ))}
                    <div className="h-4 w-[1px] bg-white/20 mx-2" />
                    <a
                        href="#contact"
                        className="px-4 py-2 border border-white/20 text-tech-white text-[10px] font-mono tracking-widest uppercase hover:border-white/60 transition-colors"
                    >
                        Initialize
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`w-6 h-[1px] bg-tech-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`w-6 h-[1px] bg-tech-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`w-6 h-[1px] bg-tech-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-tech-black border-t border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-tech-gray-200 hover:text-tech-white text-sm font-mono tracking-widest uppercase transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
