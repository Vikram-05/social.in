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
  fullName : {
    type : String
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  profile : {
    type : String,
    default:"https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
  },
  bio : {
    type : String,
  },
  post: {
    type: Number,
    default: 0
  },
  followers: {
    type: Number,
    default: 0
  },
  following: {
    type: Number,
    default: 0
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