import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isValidated: { type: Boolean, default: false }
});

export default mongoose.model("User", UserSchema);
