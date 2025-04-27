import express from "express";
import User from "../models/User.js";
import requireLogin from "../middleware/auth.js";

const router = express.Router();

// Liste de tous les utilisateurs
router.get("/", requireLogin, async (req, res) => {
  try {
    const users = await User.find({}, 'login isAdmin isValidated');
    res.json(users);
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Liste des utilisateurs en attente de validation
router.get("/pending", requireLogin, async (req, res) => {
  try {
    const pendingUsers = await User.find({ isValidated: false });
    res.json(pendingUsers);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Valider un utilisateur
router.patch("/validate/:id", requireLogin, async (req, res) => {
  if (!req.session.user?.isAdmin) {
    return res.status(403).json({ message: "Seuls les administrateurs peuvent valider des utilisateurs." });
  }

  try {
    await User.findByIdAndUpdate(req.params.id, { isValidated: true });
    res.json({ message: "Utilisateur validé avec succès." });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Inscription
router.post("/", async (req, res) => {
  const { login, password, isAdmin = false } = req.body;

  try {
    const existing = await User.findOne({ login });
    if (existing) return res.status(409).json({ message: "Utilisateur déjà existant" });

    const existingUsers = await User.find();
    let newUser;

    if (existingUsers.length === 0) {
      // Premier utilisateur => admin et validé automatiquement
      newUser = new User({ login, password, isAdmin: true, isValidated: true });
    } else {
      // Sinon inscription classique
      newUser = new User({ login, password, isAdmin: isAdmin, isValidated: false });
    }

    await newUser.save();


    res.status(201).json({ message: "Utilisateur créé en attente de validation" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// PATCH pour promouvoir un utilisateur
router.patch("/promote/:id", requireLogin, async (req, res) => {
  if (!req.session.user?.isAdmin) {
    return res.status(403).json({ message: "Seuls les administrateurs peuvent promouvoir des utilisateurs." });
  }

  try {
    await User.findByIdAndUpdate(req.params.id, { isAdmin: true });
    res.json({ message: "Utilisateur promu administrateur avec succès." });
  } catch (err) {
    console.error("Erreur lors de la promotion :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// PATCH pour retirer les droits d'admin
router.patch("/revoke/:id", requireLogin, async (req, res) => {
  if (!req.session.user?.isAdmin) {
    return res.status(403).json({ message: "Seuls les administrateurs peuvent retirer des droits." });
  }

  try {
    await User.findByIdAndUpdate(req.params.id, { isAdmin: false });
    res.json({ message: "Droits administrateur retirés avec succès." });
  } catch (err) {
    console.error("Erreur lors du retrait des droits :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// DELETE pour supprimer un utilisateur
router.delete('/:login', async (req, res) => {
  const { login } = req.params;
  try {
    await User.deleteOne({ login: login });
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    console.error("Erreur suppression utilisateur :", err);
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
});

export default router;