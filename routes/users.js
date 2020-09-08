const { Router } = require("express");
const User = require("../models/User");
const router = Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users)
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
