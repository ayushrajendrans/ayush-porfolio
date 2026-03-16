'use client';

import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import skills from '@/data/skills';

gsap.registerPlugin(ScrollTrigger);
function TechnicalCore() {
    const ref = useRef<THREE.Group>(null!);
    useFrame((state) => {
        ref.current.rotation.y = state.clock.elapsedTime * 0.2;
        ref.current.rotation.x = state.clock.elapsedTime * 0.1;
    });

    const materialProps = {
        color: "#111",
        metalness: 0.9,
        roughness: 0.1,
        envMapIntensity: 1,
    };

    return (
        <group ref={ref}>
            <Environment preset="city" />
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} intensity={20} color="#fff" />
            <mesh>
                <icosahedronGeometry args={[2.5, 1]} />
                <meshStandardMaterial {...materialProps} wireframe={false} color="#0a0a0a" />
            </mesh>
            <mesh>
                <icosahedronGeometry args={[2.6, 2]} />
                <meshStandardMaterial color="#fff" wireframe={true} transparent opacity={0.05} />
            </mesh>
            <mesh>
                <octahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial color="#333" metalness={1} roughness={0} />
            </mesh>
        </group>
    );
}

export default function SkillsSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.skill-row',
                { x: -20, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.skills-list',
                        start: 'top 80%',
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="skills"
            ref={containerRef}
            className="relative py-32 px-6 bg-tech-gray-100/50 backdrop-blur-sm text-tech-black border-b border-black/10 overflow-hidden"
        >
            <div className="absolute inset-0 technical-grid-light opacity-30 pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: 3D Visualization */}
                    <div className="relative h-[400px] lg:h-[600px] border border-black/10 bg-tech-white crosshair-corner">
                        <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-tech-gray-700 z-10">
                            FIG 1. // CORE COMPETENCIES
                        </div>
                        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                            <Suspense fallback={null}>
                                <TechnicalCore />
                            </Suspense>
                        </Canvas>
                    </div>

                    {/* Right: Tabular Skills List */}
                    <div>
                        <span className="text-tech-gray-700 text-[10px] uppercase font-mono tracking-widest block mb-4">
                            03 // Capabilities
                        </span>
                        <h2 className="heading-industrial text-3xl sm:text-5xl tracking-tighter mb-12 text-tech-black">
                            TECHNICAL <br />
                            <span className="text-tech-gray-700">SPECIFICATIONS</span>
                        </h2>

                        <div className="skills-list border-t border-black/10">
                            {skills.map((skill, index) => (
                                <div
                                    key={skill.name}
                                    className="skill-row flex items-center justify-between py-4 border-b border-black/10 hover:bg-black/5 transition-colors px-4 -mx-4 cursor-default"
                                >
                                    <div className="flex items-center gap-4 w-1/2">
                                        <span className="text-tech-gray-700 font-mono text-[10px] w-6">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="font-mono text-sm uppercase tracking-widest font-semibold flex items-center gap-3">
                                            {skill.icon} {skill.name}
                                        </span>
                                    </div>
                                    <div className="w-1/2 flex items-center justify-end">
                                        {/* Progress Bar (Technical Style) */}
                                        <div className="w-full max-w-[120px] h-1 bg-black/10 relative overflow-hidden">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-tech-black"
                                                style={{ width: `${80 + (index % 3) * 10}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
