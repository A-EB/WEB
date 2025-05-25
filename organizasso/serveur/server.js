
import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import messageRoutes from "./routes/messages.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}));

app.use("/api/login", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🟢 Serveur sur http://localhost:${PORT}`));
