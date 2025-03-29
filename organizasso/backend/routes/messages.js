
import express from "express";
import Message from "../models/Message.js";
import requireLogin from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireLogin, async (req, res) => {
  const messages = await Message.find().sort({ _id: -1 });
  res.json(messages);
});

router.post("/", requireLogin, async (req, res) => {
  const { content } = req.body;
  const date = new Date().toISOString().split('T')[0];

  const message = new Message({
    owner: req.session.user,
    date,
    content
  });

  await message.save();
  res.status(201).json(message);
});

export default router;
