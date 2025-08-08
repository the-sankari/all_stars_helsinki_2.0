import Image from "next/image";
import { Player } from "./PlayerCard";
import { useEffect } from "react";
import StatsRadar from "./StatsRadar";

interface PlayerModalProps {
  player: Player;
  onClose: () => void;
}

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

export default function PlayerModal({ player, onClose }: PlayerModalProps) {
  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-800">Player Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Top section */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            {/* Image */}
            <div className="lg:w-1/3 flex justify-center">
              <div className="relative w-60 h-60 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={player.profileImage || "/img/players/default-player.png"}
                  alt={`Photo of ${player.name}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Info */}
            <div className="lg:w-2/3">
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {player.name}
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xl text-gray-600">
                    {getPositionFullName(player.position)}
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    #{player.number}
                  </span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {player.bio}
                </p>
              </div>

              {/* Personal and Contact Info */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Personal Info
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Age:</span> {player.age}
                    </div>
                    <div>
                      <span className="font-medium">Nationality:</span>{" "}
                      {player.nationality} {getFlagEmoji(player.nationality)}
                    </div>
                    <div>
                      <span className="font-medium">Height:</span>{" "}
                      {player.height}
                    </div>
                    <div>
                      <span className="font-medium">Weight:</span>{" "}
                      {player.weight}
                    </div>
                    <div>
                      <span className="font-medium">Joined:</span>{" "}
                      {new Date(player.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Contact Info
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Email:</span> {player.email}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {player.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 text-xl mb-6 text-center">
              Season Statistics
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <Stat
                label="Games Played"
                value={player.stats.gamesPlayed}
                color="blue"
              />
              <Stat label="Goals" value={player.stats.goals} color="green" />
              <Stat
                label="Assists"
                value={player.stats.assists}
                color="purple"
              />
              <Stat
                label="Full Games"
                value={Math.round(player.stats.minutesPlayed / 90)}
                color="gray"
              />
              <Stat
                label="Yellow Cards"
                value={player.stats.yellowCards}
                color="yellow"
              />
              <Stat
                label="Red Cards"
                value={player.stats.redCards}
                color="red"
              />

              {player.stats.cleanSheets !== undefined && (
                <Stat
                  label="Clean Sheets"
                  value={player.stats.cleanSheets}
                  color="blue"
                />
              )}
              {player.stats.saves !== undefined && (
                <Stat label="Saves" value={player.stats.saves} color="orange" />
              )}
            </div>
            <div className="mt-10">
              <h4 className="text-xl font-bold text-center text-gray-800 mb-4">
                Performance Overview
              </h4>
              <StatsRadar stats={player.stats} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="text-center">
      <div className={`text-3xl font-bold text-${color}-600 mb-1`}>{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
