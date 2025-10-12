import mongoose from 'mongoose';
import { User } from './user.model.js';

const PostSchema = new mongoose.Schema({
    postBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postByUserName: {
        type: String,
        required: true
    },
    postType: {
        type: String,
        enum: ['REEL', 'STORY', 'POST'],
        required: true
    },
    postImageOrVideoURL: {
        type: String,
        required: true
    },
    postCaption: {
        type: String
    },
    postCategory: {
        type: String,
        enum: ['IGTV', 'Shop', 'Sports', 'Auto', 'Decor', 'Art', 'Food', 'Nature', 'Other'],
        default: 'Other'
    },

    postLikeCount: {
        type: Number,
        default: 0
    },
    postCommentCount: {
        type: Number,
        default: 0
    },
    isLikeHide: {
        type: Boolean,
        default: false
    },
    isCommentHide: { // fixed typo from isCommenteHide
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const Post = mongoose.model('Post', PostSchema);
