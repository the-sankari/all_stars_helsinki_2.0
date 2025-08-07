"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import { fetchFeaturedPlayer } from "../../lib/features/playersSlice";
import { User, Trophy, Clock, Target } from "lucide-react";
import type { RootState } from "../../lib/store";

export default function PlayerSpotlightSection() {
  const dispatch = useAppDispatch();
  const { featuredPlayer, loading, error } = useAppSelector(
    (state: RootState) => state.players
  );

  useEffect(() => {
    dispatch(fetchFeaturedPlayer());
  }, [dispatch]);

  // Dynamic month name
  const getCurrentMonth = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[new Date().getMonth()];
  };

  // Dynamic player title - simplified without using non-existent properties
  const getPlayerTitle = () => {
    return "Player of the Month";
  };

  // Dynamic spotlight title
  const getSpotlightTitle = () => {
    return `${getCurrentMonth()} Spotlight`;
  };

  if (loading) {
    return (
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 py-20 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-yellow-400 text-purple-800 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
              Loading Player...
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 uppercase">
              {getCurrentMonth()} Spotlight
            </h2>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-32 mx-auto mb-6"></div>
              <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
                <div className="h-16 bg-gray-300 rounded"></div>
                <div className="h-16 bg-gray-300 rounded"></div>
                <div className="h-16 bg-gray-300 rounded"></div>
                <div className="h-16 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 py-20 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Player Spotlight</h2>
            <p className="text-red-300 bg-red-900/30 px-4 py-2 rounded-lg inline-block">
              Error loading player spotlight: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!featuredPlayer) {
    return (
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 py-20 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Player Spotlight</h2>
            <p className="text-purple-200 bg-purple-800/50 px-4 py-2 rounded-lg inline-block">
              No featured player available
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-purple-600 to-purple-700 py-20 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-yellow-400 text-purple-800 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
            {getPlayerTitle()}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 uppercase">
            {getSpotlightTitle()}
          </h2>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="relative w-32 h-32 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center text-purple-800">
              <User className="w-16 h-16" />
              {featuredPlayer.number && (
                <span className="absolute -top-2 -right-2 bg-white text-purple-600 px-2 py-1 rounded-full text-sm font-bold">
                  #{featuredPlayer.number}
                </span>
              )}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              {featuredPlayer.name || "Featured Player"}
            </h3>
            <p className="text-yellow-400 text-lg font-medium">
              {featuredPlayer.position || "Team Member"}
            </p>
          </div>

          <p className="text-lg text-purple-100 mb-6 leading-relaxed max-w-2xl mx-auto">
            {featuredPlayer.bio ||
              "This talented player brings exceptional skill and dedication to All Stars Helsinki."}
          </p>

          <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Target className="w-4 h-4 text-yellow-400 mr-1" />
                <div className="text-2xl font-bold">
                  {featuredPlayer.stats?.goals ?? 0}
                </div>
              </div>
              <div className="text-sm text-purple-200">Goals</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Trophy className="w-4 h-4 text-yellow-400 mr-1" />
                <div className="text-2xl font-bold">
                  {featuredPlayer.stats?.assists ?? 0}
                </div>
              </div>
              <div className="text-sm text-purple-200">Assists</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="w-4 h-4 text-yellow-400 mr-1" />
                <div className="text-2xl font-bold">
                  {featuredPlayer.stats?.gamesPlayed ?? 0}
                </div>
              </div>
              <div className="text-sm text-purple-200">Games</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {featuredPlayer.age ?? "N/A"}
              </div>
              <div className="text-sm text-purple-200">Years</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="text-sm text-purple-200 space-y-1">
              <p>
                <span className="font-semibold text-yellow-400">
                  Nationality:
                </span>{" "}
                {featuredPlayer.nationality || "Not specified"}
              </p>
              <p>
                <span className="font-semibold text-yellow-400">Joined:</span>{" "}
                {featuredPlayer.joinDate
                  ? new Date(featuredPlayer.joinDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "Date not available"}
              </p>
              <p>
                <span className="font-semibold text-yellow-400">Height:</span>{" "}
                {featuredPlayer.height || "Not specified"}
              </p>
              {featuredPlayer.weight && (
                <p>
                  <span className="font-semibold text-yellow-400">Weight:</span>{" "}
                  {featuredPlayer.weight}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
