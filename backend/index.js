const express = require("express");
const cors = require("cors");
const db = require("./firebase");
const adminRoutes = require("./middleware/admin");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/admin", adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something broke!" });
});

// API Routes
// Get all Players
app.get("/api/players", async (req, res, next) => {
  try {
    const snapshot = await db.collection("players").get();
    const players = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(players);
  } catch (err) {
    next(err);
  }
});

// POST new player
app.post("/api/players", async (req, res, next) => {
  try {
    const data = req.body;
    const ref = await db.collection("players").add(data);
    res.status(201).json({ id: ref.id });
  } catch (err) {
    next(err);
  }
});

// PUT update player
app.put("/api/players/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    await db.collection("players").doc(id).update(updatedData);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// DELETE a player by ID
app.delete("/api/players/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.collection("players").doc(id).delete();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
