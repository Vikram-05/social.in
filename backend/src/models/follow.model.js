import mongoose from 'mongoose';

const FollowScema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    follower: {
      type: [String], 
      default: [],
    },
    following: {
      type: [String], 
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Follow = mongoose.model('Follow', FollowScema);
