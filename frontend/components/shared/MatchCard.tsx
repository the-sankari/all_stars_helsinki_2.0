"use client";

import { useState, useEffect } from "react";

interface MatchCardProps {
  opponent: string;
  tournament?: string;
  date: string;
  time: string;
  location: string;
  matchDate: string; // ISO date string for countdown
  className?: string;
}

export default function MatchCard({
  opponent,
  tournament,
  date,
  time,
  location,
  matchDate,
  className = "",
}: MatchCardProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(matchDate);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [matchDate]);

  return (
    <div
      className={`bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl p-6 shadow-xl border-2 border-yellow-400 ${className}`}
    >
      {/* Match Header */}
      <div className="text-yellow-400 font-bold text-sm uppercase tracking-wide mb-2">
        Next Match
      </div>

      {/* Match Title */}
      <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight">
        {tournament ? tournament : opponent}
      </h3>

      {/* Match Details */}
      <div className="space-y-2 mb-4 text-sm md:text-base">
        <div className="text-gray-200">
          {date} • {time}
        </div>
        <div className="text-yellow-400">📍 {location}</div>
      </div>

      {/* Countdown Timer */}
      <div className="bg-yellow-400 text-purple-800 rounded-lg p-4 text-center">
        <div className="text-xs font-bold uppercase mb-2">Countdown</div>
        <div className="grid grid-cols-4 gap-2 text-sm">
          <div>
            <div className="font-bold text-lg">{timeLeft.days}</div>
            <div className="text-xs">Days</div>
          </div>
          <div>
            <div className="font-bold text-lg">{timeLeft.hours}</div>
            <div className="text-xs">Hrs</div>
          </div>
          <div>
            <div className="font-bold text-lg">{timeLeft.minutes}</div>
            <div className="text-xs">Min</div>
          </div>
          <div>
            <div className="font-bold text-lg">{timeLeft.seconds}</div>
            <div className="text-xs">Sec</div>
          </div>
        </div>
      </div>
    </div>
  );
}
