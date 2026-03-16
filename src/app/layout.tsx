import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayush Raj — Creative Developer",
  description:
    "Premium 3D portfolio showcasing web development projects. Specialising in Next.js, React Three Fiber, and interactive experiences.",
  keywords: ["web developer", "portfolio", "Next.js", "Three.js", "React"],
  openGraph: {
    title: "Ayush Raj — Creative Developer",
    description: "Web • Motion • Interactive Experiences",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="noise-overlay antialiased">{children}</body>
    </html>
  );
}
