import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GeminiParticles from "@/components/GeminiParticles";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Garuda | Autonomous Stealth Drone",
    description: "Advanced autonomous drone for tactical precision and intelligence.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-sans bg-[#050505] text-white antialiased selection:bg-white/20 relative`}>
                <GeminiParticles />
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
