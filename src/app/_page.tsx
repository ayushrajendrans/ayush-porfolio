'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Navbar from '@/components/Navbar';

// Dynamic imports for Three.js components (no SSR)
const ParticleStars = dynamic(() => import('@/components/ParticleStars'), { ssr: false });
const ProjectUniverse = dynamic(() => import('@/components/ProjectUniverse'), { ssr: false });
const SkillsSection = dynamic(() => import('@/components/SkillsSection'), { ssr: false });
const ClientIntroWrapper = dynamic(() => import('@/components/ClientIntroWrapper'), { ssr: false });

export default function Home() {
  const handleIntroComplete = () => { };

  return (
    <>
      <ClientIntroWrapper onComplete={handleIntroComplete} />

      {/* Persistent starfield background */}
      <ParticleStars />

      {/* Main content */}
      <main className="relative z-10">
        <Navbar />
        <HeroSection />
        <ProjectUniverse />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </>
  );
}
