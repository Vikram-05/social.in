import { error } from "console";
import { Like } from "../models/like.model.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { uploadImage } from "./cloudinary.service.js";
import { create } from "domain";

export const postCreateService = async (req, res) => {
    try {
        const { id, email } = req.user
        const {
            postType,
            postCaption,
            postCategory,
            isLikeHide,
            isCommentHide
        } = req.body;

        const uploadedPost = await uploadImage(req.file?.path)
        // console.log("fole -. ",req.file)


        const getUsername = await User.findOne({ "_id": id })

        const createdPost = await Post.create({
            postBy: id,
            postType,
            postImageOrVideoURL: uploadedPost?.secure_url,
            postCaption,
            postCategory : postCategory || 'Other',
            isLikeHide,
            isCommentHide,
        })
        const user = await User.findById(id)
        user.post += 1;
        await user.save()
        // console.log("user ",createdPost)
        return createdPost;
    } catch (error) {
        console.log("Error in postCreateService post.service.js ", error)
    }

}

//Random post for home page
export const getrandomPostForhomePage = async (userId, postType, page = 1, limit = 5) => {
    try {
        const PAGE_NUMBER = Number(page);
        const LIMIT = Number(limit);
        const skip = (PAGE_NUMBER - 1) * LIMIT;

        const postCount = await Post.countDocuments({ postType });

        if (skip >= postCount) {
            return { success: true, posts: [], hasMore: false };
        }

        const posts = await Post.find({ postType }).sort({createdAt : -1}).skip(skip).limit(LIMIT).lean();

        const postsWithLikeInfo = await Promise.all(posts.map(async (post) => {
            const likeDoc = await Like.findOne({ postOn: post._id });
            const isLiked = likeDoc ? likeDoc.likedBy.includes(userId) : false;
            const userData = await User.findOne({ "_id": post.postBy });

            return {
                ...post,
                isLiked,
                userData
            };
        }));

        return { success: true, posts: postsWithLikeInfo, hasMore: skip + LIMIT < postCount };
    } catch (error) {
        console.error("Error in getrandomPostForhomePage", error);
        return { success: false, posts: [], hasMore: false };
    }
};




export const getrandomUserPostForhomePage = async (req, res) => {
    try {
        const { id } = req.user
        const { postType } = req.body;

        const getPost = await Post.find({ "postBy": id, "postType": postType })
        return getPost;
    } catch (error) {
        console.log("Error in getrandomPostForhomePage Post.service.js", error)
    }
}
export const getrandomUserPostByIdForhomePage = async (req, res) => {
    try {
        const { postType, id } = req.body;

        // console.log(id,postType)
        const getPost = await Post.find({ "postBy": id, "postType": postType })
        // console.log(getPost)
        return getPost;
    } catch (error) {
        console.log("Error in getrandomPostForhomePage Post.service.js", error)
    }
}

export const getrandomPostByCategory = async (req, res) => {
    try {
        const { postCategory } = req.body;

        const getPost = await Post.find({
            postCategory: { $regex: postCategory, $options: 'i' },
        });
        return getPost;
    } catch (error) {
        console.log("Error in getrandomPostForhomePage Post.service.js", error)
    }
} 