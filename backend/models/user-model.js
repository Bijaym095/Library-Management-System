import mongoose from "mongoose";
import { comparePassword, hashPassword } from "../utils/password.js";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

userSchema.pre("save", async function (next) {
  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.compareHashPassword = async function (password) {
  try {
    return await comparePassword(password, this.password);
  } catch (error) {
    console.error(error.message);
  }
};

export default mongoose.model("User", userSchema);
