import { increaseLikeService,checkIsLikeService } from '../services/like.service.js'

export const increaseLike = async (req, res) => {

    const { id } = req.user;
    const { postOn } = req.body;

    try {
        if (!postOn) {
            return res.status(401).json({
                error: true,
                success: false,
                message: "PostId must require"
            })
        }

        const updated = await increaseLikeService(req, res);
        if (!updated.success) {
            return res.status(401).json({
                error: true,
                success: false,
                message: "Error while like"
            })
        }
        return res.status(200).json({
            message: updated
        })
    } catch (error) {
        console.log("Error in incLike controller ",error)
    }
}


export const isLiked = async (req, res) => {

    const { postId } = req.params;

    try {
        if (!postId) {
            return res.status(401).json({
                error: true,
                success: false,
                message: "PostId must require"
            })
        }

        const isLiked = await checkIsLikeService(req, res);
        return res.status(200).json({
            error: false,
            success: true,
            message: isLiked
        })
    } catch (error) {
        console.log("Error in incLike controller ",error)
    }
}