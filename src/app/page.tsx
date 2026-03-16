import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectUniverse from "@/components/ProjectUniverse";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import dynamic from "next/dynamic";

const ParticleStars = dynamic(() => import('@/components/ParticleStars'), { ssr: false });

export default function Home() {
    return (
        <main className="relative bg-tech-black text-white selection:bg-white/30">
            <ParticleStars />
            <div className="relative z-10">
                <Navbar />
                <HeroSection />
                <ProjectUniverse />
                <AboutSection />
                <SkillsSection />
                <ContactSection />
            </div>
        </main>
    );
}
