"use client";

import { useState, useEffect, useMemo } from "react";

interface MatchCardProps {
  opponent: string;
  tournament?: string;
  date?: string; // Optional display override
  time?: string; // Optional display override
  location: string;
  matchDate: string; // "2025-08-09" (local 20:00) OR ISO ("2025-08-09T20:00" or "...Z")
  opponentLogo?: string; // URL to opponent's logo
  className?: string;
  localKickoffHour?: number; // default 20
  localKickoffMinute?: number; // default 0
}

function buildTargetDate(
  matchDate: string,
  localHour = 20,
  localMinute = 0
): Date {
  // 1) Date-only (YYYY-MM-DD) => build local 20:00 that day
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(matchDate);
  if (dateOnly) {
    const [y, m, d] = matchDate.split("-").map(Number);
    return new Date(y, m - 1, d, localHour, localMinute, 0, 0); // LOCAL
  }

  // 2) Full ISO with or without Z
  // new Date(iso) will:
  // - parse with Z as UTC
  // - parse without Z as LOCAL
  return new Date(matchDate);
}

function formatLocal(dt: Date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(dt);
}

export default function MatchCard({
  opponent,
  tournament,
  date,
  time,
  location,
  matchDate,
  opponentLogo,
  className = "",
  localKickoffHour = 20,
  localKickoffMinute = 0,
}: MatchCardProps) {
  const targetDate = useMemo(
    () => buildTargetDate(matchDate, localKickoffHour, localKickoffMinute),
    [matchDate, localKickoffHour, localKickoffMinute]
  );

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: false,
  });

  useEffect(() => {
    function tick() {
      const now = Date.now();
      const diff = targetDate.getTime() - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, done: true });
        return true; // signal to stop
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        done: false,
      });

      return false;
    }

    // initial tick (avoid 1s delay)
    if (tick()) return;

    const id = setInterval(() => {
      if (tick()) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const displayDate = date ?? formatLocal(targetDate);
  const displayTime = time ?? ""; // already included in displayDate if not provided

  return (
    <div
      className={`bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl p-6 shadow-xl border-2 border-yellow-400 ${className}`}
    >
      {/* Match Header */}
      <div className="text-yellow-400 font-bold text-sm uppercase tracking-wide mb-2">
        Next Match
      </div>

      {/* Team vs Team with Logos */}
      <div className="flex items-center justify-center gap-4 mb-4">
        {/* All Stars Helsinki Logo */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-2 bg-white rounded-full p-2 shadow-lg flex items-center justify-center">
            <img
              src="/img/logos/log_v_2.png"
              alt="All Stars Helsinki"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xs font-bold text-center">
            All Stars
            <br />
            Helsinki
          </span>
        </div>

        {/* VS */}
        <div className="flex flex-col items-center">
          <div className="text-yellow-400 font-bold text-xl mb-1">VS</div>
          {tournament && (
            <div className="text-xs text-gray-300 text-center">
              {tournament}
            </div>
          )}
        </div>

        {/* Opponent Logo */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-2 bg-white rounded-full p-2 shadow-lg flex items-center justify-center">
            {opponentLogo ? (
              <img
                src={opponentLogo}
                alt={opponent}
                className="w-full h-full object-contain rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-xs font-bold">
                  {opponent.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <span className="text-xs font-bold text-center">{opponent}</span>
        </div>
      </div>

      {/* Match Details */}
      <div className="space-y-2 mb-4 text-sm md:text-base">
        <div className="text-gray-200">
          {displayDate}
          {displayTime ? ` • ${displayTime}` : ""}
        </div>
        <div className="text-yellow-400">📍 {location}</div>
      </div>

      {/* Countdown Timer */}
      <div className="bg-yellow-400 text-purple-800 rounded-lg p-4 text-center">
        <div className="text-xs font-bold uppercase mb-2">
          {timeLeft.done ? "Kickoff!" : "Countdown"}
        </div>

        {timeLeft.done ? (
          <div className="font-bold text-lg">Live now</div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
