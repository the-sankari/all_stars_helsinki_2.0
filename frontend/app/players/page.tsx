"use client";

import { useState, useMemo } from "react";
import mockData from "../../../mock_database.json";
import PlayerCard, { Player } from "./PlayerCard";
import PlayerModal from "./PlayerModal";
import { getPositionFullName } from "./utils";
import Image from "next/image";

export default function PlayersPage() {
  const [selectedPosition, setSelectedPosition] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const players: Player[] = mockData.players;

  // Filter players based on position and search term
  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesPosition =
        selectedPosition === "ALL" || player.position === selectedPosition;
      const matchesSearch =
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.number.toString().includes(searchTerm);
      return matchesPosition && matchesSearch && player.isActive;
    });
  }, [selectedPosition, searchTerm, players]);

  // Get unique positions for filter
  const positions = useMemo(() => {
    const uniquePositions = [
      ...new Set(players.map((player) => player.position)),
    ];
    return ["ALL", ...uniquePositions];
  }, [players]);

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
  };

  const handleCloseModal = () => {
    setSelectedPlayer(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            All Stars Helsinki
          </h1>
          <p className="text-xl text-gray-600 mb-2">Our Team Players</p>
          <p className="text-lg text-gray-500">
            {players.filter((p) => p.isActive).length} Active Players
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-6">
          {/* Search and Layout Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            {/* Search */}
            <div className="w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search players by name or number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-800 shadow-sm"
              />
            </div>

            {/* Layout Switch */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setLayout("grid")}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  layout === "grid"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  layout === "list"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                List
              </button>
            </div>
          </div>

          {/* Position Filters */}
          <div className="flex justify-center">
            <div className="flex gap-2 flex-wrap justify-center">
              {positions.map((position) => (
                <button
                  key={position}
                  onClick={() => setSelectedPosition(position)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedPosition === position
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 hover:border-blue-300"
                  }`}
                >
                  {position === "ALL"
                    ? "All Positions"
                    : getPositionFullName(position)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Players */}
        {filteredPlayers.length > 0 ? (
          layout === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlayers.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onClick={handlePlayerClick}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPlayers.map((player) => (
                <div
                  key={player.id}
                  className="bg-white p-4 rounded-lg shadow flex items-center gap-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => handlePlayerClick(player)}
                >
                  <div className="w-16 h-16 relative flex-shrink-0">
                    <Image
                      src={
                        player.profileImage || "/img/players/default-player.png"
                      }
                      alt={player.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {player.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      #{player.number} • {getPositionFullName(player.position)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              No players found matching your criteria.
            </p>
          </div>
        )}

        {/* Modal */}
        {selectedPlayer && (
          <PlayerModal player={selectedPlayer} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}
