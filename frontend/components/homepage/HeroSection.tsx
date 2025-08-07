"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import { fetchNextMatch } from "../../lib/features/matchesSlice";
import MatchCard from "@/components/shared/MatchCard";
import type { RootState } from "../../lib/store";

export default function HeroSection() {
  const dispatch = useAppDispatch();
  const { nextMatch, loading, error } = useAppSelector(
    (state: RootState) => state.matches
  );

  useEffect(() => {
    dispatch(fetchNextMatch());
  }, [dispatch]);

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
          {loading ? (
            <div className="w-full max-w-sm lg:max-w-md bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded w-48 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
          ) : error ? (
            <div className="w-full max-w-sm lg:max-w-md bg-red-500/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-red-400">
              <p className="text-red-200">Error loading match data: {error}</p>
            </div>
          ) : nextMatch ? (
            <MatchCard
              opponent={nextMatch.opponent}
              tournament={nextMatch.tournament}
              date={new Date(nextMatch.dateTime).toLocaleDateString()}
              time={new Date(nextMatch.dateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              location={nextMatch.location}
              matchDate={nextMatch.dateTime}
              className="w-full max-w-sm lg:max-w-md"
            />
          ) : (
            <div className="w-full max-w-sm lg:max-w-md bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <p className="text-white/80">No upcoming matches</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
