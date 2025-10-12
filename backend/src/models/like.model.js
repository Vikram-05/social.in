import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema(
  {
    postOn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    likedBy: {
      type: [String], 
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Like = mongoose.model('Like', LikeSchema);
