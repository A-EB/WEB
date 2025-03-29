
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true }
});

export default mongoose.model("Message", MessageSchema);
