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
        

        const getUsername =await User.findOne({"_id":id})
        
        const createdPost = await Post.create({
            postBy: id,
            postByUserName : getUsername.username,
            postType,
            postImageOrVideoURL,
            postCaption,
            postCategory,
            isLikeHide,
            isCommentHide
        })
        return createdPost;
    } catch (error) {
        console.log("Error in postCreateService post.service.js ",error)
    }

}

//Random post for home page
export const getrandomPostForhomePage = async (req, res) => {
    try {
        const { postType } = req.body;

        const getPost = await Post.find({ "postType": postType })
        return getPost;
    } catch (error) {
        console.log("Error in getrandomPostForhomePage Post.service.js",error)
    }
} 