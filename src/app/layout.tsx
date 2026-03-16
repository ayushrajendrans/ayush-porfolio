import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise-overlay antialiased">{children}</body>
    </html>
  );
}
