'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

export default function ClientModeIntro({ onComplete }: { onComplete: () => void }) {
    const searchParams = useSearchParams();
    const isClientMode = searchParams.get('ref') === 'whatsapp';
    const [visible, setVisible] = useState(isClientMode);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isClientMode) {
            onComplete();
            return;
        }

        // Animate progress bar
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setVisible(false);
                        onComplete();
                    }, 400);
                    return 100;
                }
                return p + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [isClientMode, onComplete]);

    if (!isClientMode) return null;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6 }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
                    style={{ background: '#030712' }}
                >
                    {/* Background glow */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20"
                            style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
                        />
                    </div>

                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="relative z-10 text-center mb-12"
                    >
                        <div className="text-7xl font-bold text-gradient mb-3" style={{ fontFamily: 'Space Grotesk' }}>AR</div>
                        <div className="text-white/50 text-sm tracking-[0.3em] uppercase">Loading Portfolio</div>
                    </motion.div>

                    {/* Progress bar */}
                    <div className="relative z-10 w-64 h-0.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                width: `${progress}%`,
                                background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
                                boxShadow: '0 0 10px rgba(168,85,247,0.6)',
                            }}
                        />
                    </div>
                    <div className="mt-3 text-white/30 text-xs">{Math.round(progress)}%</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
