import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

export const User = mongoose.model("User", userSchema);


export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
}

export const comparePassword = async (planePassword, savedPassword) => {
  return await bcrypt.compare(planePassword, savedPassword);
}