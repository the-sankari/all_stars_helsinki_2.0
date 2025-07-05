"use client";

import { useEffect, useState } from "react";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import AddPlayerForm from "./AddPlayerForm";

type Player = {
  id: string;
  name: string;
  number: number;
  position: string;
  email: string;
  phone: string;
};

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Player>>({});

  const fetchPlayers = async () => {
    try {
      const res = await api.get<Player[]>("/api/players");
      setPlayers(res.data || []); // Ensure it's always an array
    } catch (err) {
      console.error("Error fetching players:", err);
      setError("Failed to load players.");
      setPlayers([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/players/${id}`);
      toast.success("Player deleted");
      fetchPlayers();
    } catch {
      toast.error("Failed to delete player");
    }
  };

  const startEdit = (player: Player) => {
    setEditId(player.id);
    setEditData(player);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: name === "number" ? Number(value) : value,
    });
  };

  const saveEdit = async () => {
    if (!editId) return;
    try {
      await api.put(`/api/players/${editId}`, editData);
      toast.success("Player updated");
      setEditId(null);
      fetchPlayers();
    } catch {
      toast.error("Failed to update player");
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        All Stars Helsinki – Player List
      </h1>

      {loading && <p>Loading players...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <ul className="space-y-4 mb-8">
        {Array.isArray(players) &&
          players.map((player) => (
            <li
              key={player.id}
              className="text-black bg-white p-4 rounded shadow relative"
            >
              {editId === player.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="name"
                    value={editData.name || ""}
                    onChange={handleEditChange}
                    className="p-2 border rounded w-full"
                    placeholder="Name"
                  />
                  <input
                    type="number"
                    name="number"
                    value={editData.number || ""}
                    onChange={handleEditChange}
                    className="p-2 border rounded w-full"
                    placeholder="Number"
                  />
                  <input
                    type="text"
                    name="position"
                    value={editData.position || ""}
                    onChange={handleEditChange}
                    className="p-2 border rounded w-full"
                    placeholder="Position"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editData.email || ""}
                    onChange={handleEditChange}
                    className="p-2 border rounded w-full"
                    placeholder="Email"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone || ""}
                    onChange={handleEditChange}
                    className="p-2 border rounded w-full"
                    placeholder="Phone"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={saveEdit}
                      className="bg-green-600 text-white px-4 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 text-white px-4 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleDelete(player.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                  <button
                    onClick={() => startEdit(player)}
                    className="absolute top-2 right-8 text-blue-500 hover:text-blue-700"
                  >
                    ✎
                  </button>
                  <h2 className="text-xl font-semibold">{player.name}</h2>
                  <p>Number: #{player.number}</p>
                  <p>Position: {player.position}</p>
                  <p>Email: {player.email}</p>
                  <p>Phone: {player.phone}</p>
                </>
              )}
            </li>
          ))}
      </ul>

      <AddPlayerForm onAdd={fetchPlayers} />
    </div>
  );
}
