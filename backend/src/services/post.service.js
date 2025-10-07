import { Post } from "../models/post.model.js";

export const postCreateService = async (req, res) => {
    const { id, email } = req.user
    const {
        postType,
        postImageOrVideoURL,
        postCaption,
        postCategory,
        isLikeHide,
        isCommenteHide
    } = req.body;

    const createdPost = await Post.create({
        postBy: id,
        postType,
        postImageOrVideoURL,
        postCaption,
        postCategory,
        isLikeHide,
        isCommenteHide
    })
    return createdPost;

} 