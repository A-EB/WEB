import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
  forum: { type: String, enum: ["open", "admin"], default: "open" }
});

export default mongoose.model("Message", MessageSchema);
