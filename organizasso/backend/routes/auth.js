
import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ login });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    req.session.user = login;
    res.status(200).json({ message: "Connexion réussie", login });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.delete("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Erreur à la déconnexion" });
    res.status(200).json({ message: "Déconnecté avec succès" });
  });
});

export default router;
