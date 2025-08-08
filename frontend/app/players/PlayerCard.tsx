import Image from "next/image";
import { useState } from "react";

export type Player = {
  id: string;
  name: string;
  number: number;
  position: string;
  email: string;
  phone: string;
  age: number;
  nationality: string;
  height: string;
  weight: string;
  joinDate: string;
  stats: {
    gamesPlayed: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    minutesPlayed: number;
    cleanSheets?: number;
    saves?: number;
  };
  profileImage: string;
  isActive: boolean;
  isInjured: boolean;
  injuryDetails: string | null;
  isFeatured: boolean;
  bio: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
};

interface PlayerCardProps {
  player: Player;
  onClick: (player: Player) => void;
}

// Utility functions
const getPositionColor = (position: string) => {
  switch (position) {
    case "GK":
      return "bg-yellow-500";
    case "DEF":
      return "bg-blue-500";
    case "MID":
      return "bg-green-500";
    case "ST":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getPositionFullName = (position: string) => {
  switch (position) {
    case "GK":
      return "Goalkeeper";
    case "DEF":
      return "Defender";
    case "MID":
      return "Midfielder";
    case "ST":
      return "Striker";
    default:
      return position;
  }
};

const getFlagEmoji = (country: string) => {
  const code = country
    .toUpperCase()
    .replace(/ /g, "")
    .slice(0, 2)
    .replace(/[^A-Z]/g, "");
  return code.replace(/./g, (char) =>
    String.fromCodePoint(char.charCodeAt(0) + 127397)
  );
};

export default function PlayerCard({ player, onClick }: PlayerCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 active:scale-95 outline-none"
      onClick={() => onClick(player)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(player)}
      role="button"
      aria-label={`View details of ${player.name}`}
    >
      {/* Player Image */}
      <div className="relative h-64 sm:h-72 md:h-80 bg-gradient-to-br from-red-500 to-purple-600">
        <div className="absolute top-4 left-4 z-10">
          <span
            title={getPositionFullName(player.position)}
            className={`${getPositionColor(
              player.position
            )} text-white px-2 py-1 rounded-full text-xs font-bold`}
          >
            {player.position}
          </span>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-lg font-bold">
            #{player.number}
          </span>
        </div>
        {player.isFeatured && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
              ⭐ Featured
            </span>
          </div>
        )}
        <Image
          src={
            !imgError && player.profileImage
              ? player.profileImage
              : "/img/players/default-player.png"
          }
          alt={`Profile photo of ${player.name}, #${
            player.number
          } - ${getPositionFullName(player.position)}`}
          fill
          className="object-contain"
          onError={() => setImgError(true)}
        />
      </div>

      {/* Player Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">
          {player.name}
        </h3>
        <p className="text-gray-600 mb-2">
          {getPositionFullName(player.position)}
        </p>
        <p className="text-sm text-gray-500 mb-3">
          Age: {player.age} • {player.nationality}{" "}
          {getFlagEmoji(player.nationality)}
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 p-2 rounded hover:bg-gray-100 transition">
            <span className="font-semibold">Games:</span>{" "}
            {player.stats.gamesPlayed}
          </div>
          <div className="bg-gray-50 p-2 rounded hover:bg-gray-100 transition">
            <span className="font-semibold">Goals:</span> {player.stats.goals}
          </div>
          <div className="bg-gray-50 p-2 rounded hover:bg-gray-100 transition">
            <span className="font-semibold">Assists:</span>{" "}
            {player.stats.assists}
          </div>
          <div className="bg-gray-50 p-2 rounded hover:bg-gray-100 transition">
            <span className="font-semibold">Minutes:</span>{" "}
            {player.stats.minutesPlayed}
          </div>

          {/* GK Specific Stats */}
          {player.position === "GK" &&
            player.stats.cleanSheets !== undefined && (
              <div className="bg-gray-50 p-2 rounded hover:bg-gray-100 transition col-span-2">
                <span className="font-semibold">Clean Sheets:</span>{" "}
                {player.stats.cleanSheets}
              </div>
            )}
        </div>

        {/* Injury/Inactive */}
        {player.isInjured && (
          <div className="mt-3 bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
            🚑 Injured
          </div>
        )}
        {!player.isActive && !player.isInjured && (
          <div className="mt-3 bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm italic">
            ⛔ Not in current lineup
          </div>
        )}
      </div>
    </div>
  );
}
