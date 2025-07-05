"use client";

import { useState } from "react";
import api from "../../lib/axios";
import toast from "react-hot-toast";

type AddPlayerFormProps = {
  onAdd: () => void;
};

type NewPlayer = {
  name: string;
  number: number;
  position: string;
  email: string;
  phone: string;
};

const initialPlayer: NewPlayer = {
  name: "",
  number: 0,
  position: "",
  email: "",
  phone: "",
};

export default function AddPlayerForm({ onAdd }: AddPlayerFormProps) {
  const [formData, setFormData] = useState<NewPlayer>(initialPlayer);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await api.post("/api/players", formData);
      toast.success("Player added!");
      setFormData(initialPlayer);
      onAdd(); // Refresh list
    } catch (err) {
      console.error(err);
      toast.error("Failed to add player");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-black bg-gray-50 p-6 rounded shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Player</h2>

      <div className="grid gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="number"
          placeholder="Jersey Number"
          required
          value={formData.number}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          required
          value={formData.position}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Add Player"}
        </button>

        {success && (
          <p className="text-green-600">Player added successfully!</p>
        )}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </form>
  );
}
