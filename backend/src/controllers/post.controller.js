import { postCreateService, getrandomPostForhomePage,getrandomUserPostForhomePage,getrandomPostByCategory,getrandomUserPostByIdForhomePage } from "../services/post.service.js";


export const createPost = async (req, res) => {
    const {postType} = req.body;

    if (!postType ) {
        return res.status(500).json({ success: false, error: true, message: "All fields required" })
    }

    const createdPost = await postCreateService(req, res);
    return res.status(201)
        .json({
            success : true,
            error : false,
            data : createdPost
        })

}


export const getPosts = async (req, res) => {

    const getRandomPostForHome = await getrandomPostForhomePage(req, res);
    return res.status(201)
        .json({
            success: true,
            error: false,
            data: getRandomPostForHome
        })

}

export const getPostsByCategory = async (req, res) => {


    const getRandomPostForHome = await getrandomPostByCategory(req, res);
    return res.status(201)
        .json({
            success: true,
            error: false,
            data: getRandomPostForHome
        })

}


export const getUserPosts = async (req, res) => {

    const getRandomPostForHome = await getrandomUserPostForhomePage(req, res);
    return res.status(201)
        .json({
            success: true,
            error: false,
            data: getRandomPostForHome
        })

}


export const getUserPostsById = async (req, res) => {
    const {id} = req.body;
    // console.log("pp",id)
    const getRandomPostForHome = await getrandomUserPostByIdForhomePage(req, res);
    return res.status(201)
        .json({
            success: true,
            error: false,
            data: getRandomPostForHome
        })

}