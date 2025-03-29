
import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { login, password } = req.body;

  try {
    const existing = await User.findOne({ login });
    if (existing) return res.status(409).json({ message: "Utilisateur déjà existant" });

    const user = new User({ login, password });
    await user.save();

    res.status(201).json({ message: "Utilisateur créé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
