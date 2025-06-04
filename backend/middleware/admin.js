const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

// Example: Protected route
router.get("/secret-data", verifyToken, (req, res) => {
  res.json({
    message: "This is protected admin content.",
    user: req.user,
  });
});

module.exports = router;
