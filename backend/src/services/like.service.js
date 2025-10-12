import { Like } from "../models/like.model.js";
import { Post } from "../models/post.model.js";

export const increaseLikeService = async (req, res) => {
    try {
        const { id } = req.user;
        const { postOn } = req.body;

        // Find the post
        const postData = await Post.findById(postOn);
        if (!postData) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // Find the like document
        let likeDoc = await Like.findOne({ postOn });

        if (likeDoc) {
            const index = likeDoc.likedBy.indexOf(id);
            //like nki kiya hoga to -1 index aayega
            if (index === -1) {
                likeDoc.likedBy.push(id);
                postData.postLikeCount += 1;
            } else {
                likeDoc.likedBy.splice(index, 1);
                postData.postLikeCount = Math.max(0, postData.postLikeCount - 1);
            }

            await likeDoc.save();
            await postData.save();
        } else {

            likeDoc = await Like.create({
                postOn,
                likedBy: [id],
            });

            postData.postLikeCount += 1;
            await postData.save();
        }

        return res.status(200).json({
            success: true,
            liked: likeDoc.likedBy.includes(id),
            totalLikes: postData.postLikeCount,
        });
    } catch (error) {
        console.error("Error in increaseLikeService:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


export const checkIsLikeService = async (req, res) => {
    try {
        const { id } = req.user;
        const { postId } = req.params;

        // Find the post
        const postData = await Post.findById(postId);
        if (!postData) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // Find the like document
        let likeDoc = await Like.findOne({ "postOn": postId });

        const index = likeDoc.likedBy.includes(id);

        return index;
    } catch (error) {
        console.error("Error in increaseLikeService:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
