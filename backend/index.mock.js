const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for testing without Firebase
let players = [
  {
    id: "1",
    name: "John Doe",
    number: 10,
    position: "Forward",
    email: "john@example.com",
    phone: "+358 123 456 789",
  },
  {
    id: "2",
    name: "Jane Smith",
    number: 7,
    position: "Midfielder",
    email: "jane@example.com",
    phone: "+358 987 654 321",
  },
  {
    id: "3",
    name: "Mike Johnson",
    number: 1,
    position: "Goalkeeper",
    email: "mike@example.com",
    phone: "+358 555 123 456",
  },
];

// API Routes
// Get all Players
app.get("/api/players", async (req, res) => {
  try {
    console.log("GET /api/players - Returning mock players");
    res.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

// Add a new player
app.post("/api/players", async (req, res) => {
  try {
    const { name, number, position, email, phone } = req.body;

    const newPlayer = {
      id: Date.now().toString(), // Simple ID generation
      name,
      number: parseInt(number),
      position,
      email,
      phone,
    };

    players.push(newPlayer);
    console.log("POST /api/players - Added new player:", newPlayer);
    res.status(201).json(newPlayer);
  } catch (error) {
    console.error("Error adding player:", error);
    res.status(500).json({ error: "Failed to add player" });
  }
});

// Update a player
app.put("/api/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const playerIndex = players.findIndex((p) => p.id === id);
    if (playerIndex === -1) {
      return res.status(404).json({ error: "Player not found" });
    }

    players[playerIndex] = { ...players[playerIndex], ...updates };
    console.log(
      "PUT /api/players/" + id + " - Updated player:",
      players[playerIndex]
    );
    res.json(players[playerIndex]);
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({ error: "Failed to update player" });
  }
});

// Delete a player
app.delete("/api/players/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const playerIndex = players.findIndex((p) => p.id === id);
    if (playerIndex === -1) {
      return res.status(404).json({ error: "Player not found" });
    }

    const deletedPlayer = players.splice(playerIndex, 1)[0];
    console.log(
      "DELETE /api/players/" + id + " - Deleted player:",
      deletedPlayer
    );
    res.json({ message: "Player deleted successfully" });
  } catch (error) {
    console.error("Error deleting player:", error);
    res.status(500).json({ error: "Failed to delete player" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "All Stars Helsinki API is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 All Stars Helsinki Backend Server running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api/`);
  console.log(`🏃‍♂️ Players endpoint: http://localhost:${PORT}/api/players`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
  console.log(`⚠️  Note: Running in MOCK mode (no Firebase connection)`);
});
