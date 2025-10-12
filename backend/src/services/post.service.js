import { Like } from "../models/like.model.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

export const postCreateService = async (req, res) => {
    try {
        const { id, email } = req.user
        const {
            postType,
            postImageOrVideoURL,
            postCaption,
            postCategory,
            isLikeHide,
            isCommentHide
        } = req.body;


        const getUsername = await User.findOne({ "_id": id })

        const createdPost = await Post.create({
            postBy: id,
            postByUserName: getUsername.username,
            postType,
            postImageOrVideoURL,
            postCaption,
            postCategory,
            isLikeHide,
            isCommentHide
        })
        return createdPost;
    } catch (error) {
        console.log("Error in postCreateService post.service.js ", error)
    }

}

//Random post for home page
export const getrandomPostForhomePage = async (req, res) => {
    try {
        const { id } = req.user;
        const { postType } = req.body;

      
        const posts = await Post.find({ postType });

        
        const postsWithLikeInfo = await Promise.all(posts.map(async (post) => {
            const likeDoc = await Like.findOne({ postOn: post._id });
            const isLiked = likeDoc ? likeDoc.likedBy.includes(id) : false;

            
            return {
                ...post.toObject(),
                isLiked,
            };
        }));

        return postsWithLikeInfo;

    } catch (error) {
        console.log("Error in getrandomPostForhomePage Post.service.js", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}



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