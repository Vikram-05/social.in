import { postCreateService } from "../services/post.service.js";


export const createPost = async (req, res) => {
    const {
        postBy,
        postType,
        postImageOrVideoURL,
        postCaption,
        postCategory,
        isLikeHide,
        isCommenteHide
    } = req.body;

    if (!postType || !postImageOrVideoURL ) {
        return res.status(500).json({ success: false, error: true, message: "All fields required" })
    }

    const createdPost = await postCreateService(req, res);
    return res.status(201)
        .json({
            "postBy": createdPost.postBy,
            "postType": createdPost.postType,
            "postImageOrVideoURL": createdPost.postImageOrVideoURL,
            "postCaption": createdPost.postCaption,
            "postCategory": createdPost.postCategory,
            "isLikeHide": createdPost.isLikeHide,
            "isCommenteHide": createdPost.isCommenteHide
        })

}