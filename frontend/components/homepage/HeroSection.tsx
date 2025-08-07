"use client";

import Image from "next/image";
import MatchCard from "@/components/shared/MatchCard";

export default function HeroSection() {
  return (
    <section
      className="relative bg-primary text-white min-h-screen flex flex-col"
      style={{
        backgroundImage: "url(/img/hero.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content Container */}
      <div className="relative z-10 flex-1 container mx-auto px-4 py-12 flex flex-col">
        {/* Main Content - Centered */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6">
            {/* Logo */}
            <Image
              src="/img/logo.png"
              alt="All Stars Helsinki"
              width={300}
              height={300}
              className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto"
              priority
            />

            {/* Tagline */}
            <div className="bg-yellow-400 text-purple-800 px-6 py-3 rounded-full font-bold text-sm md:text-base lg:text-lg tracking-wide inline-block shadow-lg">
              FOR THE LOVE OF THE GAME
            </div>
          </div>
        </div>

        {/* Match Card - Bottom Right (Desktop) / Bottom Center (Mobile) */}
        <div className="w-full flex justify-center lg:justify-end lg:items-end">
          <MatchCard
            opponent="Finn-Bangla"
            tournament="Finn-Bangla Tournament"
            date="August 15, 2025"
            time="10:00 AM"
            location="Helsinki Sports Center"
            matchDate="2025-08-15T10:00:00"
            className="w-full max-w-sm lg:max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
