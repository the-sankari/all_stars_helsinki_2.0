const express = require("express");
const cors = require("cors");
const db = require("./firebase");

const app = express();
app.use(cors());
app.use(express.json());

// Gett all Players
app.get("/players", async (req, res) => {
  try {
    const snapshot = await db.collection("players").get();
    const players = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.send(players);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// POST new player

app.post("/players", async (req, res) => {
  try {
    const data = req.body;
    const ref = await db.collection("players").add(data);
    res.send({ id: ref.id });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// PUT update player
app.put("/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    await db.collection("players").doc(id).update(updatedData);
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE a player by ID
app.delete("/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("players").doc(id).delete();
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
