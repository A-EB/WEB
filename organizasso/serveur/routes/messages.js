import express from "express";
import Message from "../models/Message.js";
import requireLogin from "../middleware/auth.js";

const router = express.Router();

// Messages forum ouvert
router.get("/", requireLogin, async (req, res) => {
  const messages = await Message.find({ forum: "open" }).sort({ date: -1 });
  res.json(messages);
});

// Messages forum fermé pour admin
router.get("/admin", requireLogin, async (req, res) => {
  if (!req.session.user?.isAdmin) {
    return res.status(403).json({ message: "Accès réservé aux administrateurs." });
  }

  const messages = await Message.find({ forum: "admin" }).sort({ date: -1 });
  res.json(messages);
});

// DELETE /api/messages/user/:login
router.delete('/user/:login', async (req, res) => {
  const { login } = req.params;
  try {
    await Message.deleteMany({ owner: login });
    res.status(200).json({ message: "Messages supprimés avec succès" });
  } catch (err) {
    console.error("Erreur suppression messages :", err);
    res.status(500).json({ message: "Erreur lors de la suppression des messages" });
  }
});

// DELETE /api/messages/:id - Supprimer un message spécifique
router.delete('/:id', requireLogin, async (req, res) => {
  const { id } = req.params;

  try {
    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({ message: "Message introuvable" });
    }

    // Optionnel : empêcher de supprimer les messages des autres
    if (message.owner !== req.session.user.login && !req.session.user.isAdmin) {
      return res.status(403).json({ message: "Vous n'avez pas le droit de supprimer ce message." });
    }

    await Message.findByIdAndDelete(id);
    res.status(200).json({ message: "Message supprimé avec succès." });

  } catch (err) {
    console.error("Erreur suppression message :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Poster un message
router.post("/", requireLogin, async (req, res) => {
  const { content, forum } = req.body;
  const date = new Date().toISOString().split('T')[0];

  const message = new Message({
    owner: req.session.user.login,
    date,
    content,
    forum: forum || "open",
  });

  await message.save();
  res.status(201).json(message);
});

export default router;