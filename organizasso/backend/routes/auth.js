import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Connexion
router.post("/", async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ login });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    if (!user.isValidated) {
      return res.status(403).json({ message: "Votre compte n'a pas encore été validé." });
    }

    req.session.user = {
      login: user.login,
      isAdmin: user.isAdmin,
    };

    res.status(200).json({ login: user.login, isAdmin: user.isAdmin, isValidated: user.isValidated });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Déconnexion
router.delete("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Erreur à la déconnexion" });
    res.status(200).json({ message: "Déconnecté avec succès" });
  });
});

export default router;