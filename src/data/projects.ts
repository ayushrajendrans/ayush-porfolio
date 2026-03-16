export interface Project {
  id: number;
  name: string;
  url: string;
  tech: string[];
  color: string;
  description: string;
  year: string;
  status: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "StuAb International",
    url: "https://stuabinternational.com/",
    tech: ["Next.js", "React", "Tailwind"],
    color: "#00d4ff",
    description: "Architecting a global education platform with a focus on scalable infrastructure.",
    year: "2023",
    status: "LIVE / OPERATIONAL",
  },
  {
    id: 2,
    name: "Bless Farm Flave",
    url: "https://blessfarmflave.com/",
    tech: ["React", "CSS", "GSAP"],
    color: "#a855f7",
    description: "Developing a high-performance e-commerce engine with fluid motion systems.",
    year: "2024",
    status: "PRODUCTION / STABLE",
  },
  {
    id: 3,
    name: "Sugandha Foods",
    url: "https://sugandhafoods.com/",
    tech: ["Next.js", "Tailwind", "Framer"],
    color: "#f59e0b",
    description: "Implementing a modern food distribution portal with precision-tuned UI components.",
    year: "2023",
    status: "LIVE / DEPLOYED",
  },
  {
    id: 4,
    name: "Moduluz",
    url: "https://moduluz.in/",
    tech: ["React", "Three.js", "GSAP"],
    color: "#10b981",
    description: "Engineering an immersive 3D architectural visualization platform.",
    year: "2024",
    status: "BETA / ACTIVE",
  },
  {
    id: 5,
    name: "Classmate Travels",
    url: "https://classmatetravels.com/",
    tech: ["Next.js", "Tailwind", "React"],
    color: "#f43f5e",
    description: "Building a robust travel management system with real-time data integration.",
    year: "2023",
    status: "LIVE / OPERATIONAL",
  },
  {
    id: 6,
    name: "PriceMaven",
    url: "https://pricemaven-landing.vercel.app/",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    color: "#6366f1",
    description: "Developing a technical landing page for an advanced price tracking algorithm.",
    year: "2024",
    status: "LIVE / STABLE",
  },
  {
    id: 7,
    name: "Rohido",
    url: "https://rohido.vercel.app/",
    tech: ["React", "Vite", "CSS"],
    color: "#ec4899",
    description: "Implementing a minimalist design-focused interface for a creative studio.",
    year: "2023",
    status: "PRODUCTION / ACTIVE",
  },
  {
    id: 8,
    name: "Padams",
    url: "https://padams.in/",
    tech: ["Next.js", "Tailwind", "GSAP"],
    color: "#14b8a6",
    description: "Engineering a high-conversion landing page with smooth industrial animations.",
    year: "2024",
    status: "LIVE / OPERATIONAL",
  },
  {
    id: 9,
    name: "Final Ten",
    url: "https://final-ten-rosy.vercel.app/",
    tech: ["React", "Tailwind", "Framer"],
    color: "#f97316",
    description: "Developing a technical showcase with structured grid-based layouts.",
    year: "2023",
    status: "STATIONARY / ARCHIVED",
  },
  {
    id: 10,
    name: "HGS 3JS React",
    url: "https://hgs-3js-react.vercel.app",
    tech: ["React", "Three.js", "R3F"],
    color: "#8b5cf6",
    description: "Experimenting with advanced WebGL shaders and React-Three-Fiber systems.",
    year: "2024",
    status: "EXPERIMENTAL / LAB",
  },
  {
    id: 11,
    name: "Kerala Sadhya",
    url: "https://www.keralasadhya.uk/",
    tech: ["Next.js", "Tailwind", "React"],
    color: "#fb923c",
    description: "Designing a premium food retail experience for the international market.",
    year: "2024",
    status: "LIVE / OPERATIONAL",
  },
];

export default projects;
