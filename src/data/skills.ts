export interface Skill {
    name: string;
    icon: string;
    color: string;
}

const skills: Skill[] = [
    { name: "React", icon: "⚛️", color: "#61dafb" },
    { name: "Three.js", icon: "🔷", color: "#ffffff" },
    { name: "Next.js", icon: "▲", color: "#ffffff" },
    { name: "Tailwind", icon: "🌊", color: "#06b6d4" },
    { name: "GSAP", icon: "🚀", color: "#88ce02" },
    { name: "Framer", icon: "✦", color: "#bb4ae8" },
    { name: "TypeScript", icon: "TS", color: "#3178c6" },
    { name: "WebGL", icon: "⬡", color: "#990000" },
];

export default skills;
