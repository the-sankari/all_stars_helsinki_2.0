"use client";

import { useAppSelector } from "../../lib/hooks";
import type { RootState } from "../../lib/store";

export default function TeamStatsSection() {
  const {
    stats: teamStats,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.teamStats);

  // Fallback stats in case data is still loading
  const fallbackStats = [
    { number: "25+", label: "Active Players" },
    { number: "18", label: "Matches Won" },
    { number: "3", label: "Tournaments" },
    { number: "5", label: "Years Active" },
  ];

  const displayStats = teamStats
    ? [
        { number: "20", label: "Matches Played" },
        { number: teamStats.matches.won.toString(), label: "Matches Won" },
        { number: teamStats.achievements.length.toString(), label: "Trophies" },
        { number: "5", label: "Years Active" },
      ]
    : fallbackStats;

  return (
    <section className="bg-purple-600 py-16 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 uppercase">
            Our Achievements
          </h2>
          <p className="text-purple-200 text-lg">
            Numbers that speak for our dedication and teamwork
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <div className="animate-pulse">
                  <div className="h-12 bg-gray-300 rounded w-16 mx-auto mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-24 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-300 bg-red-900/30 px-4 py-2 rounded-lg inline-block">
              Error loading team statistics: {error}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {displayStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
