import { getUserByIdService,updateUserProfileService,getUserByUsernameService } from '../services/user.service.js'

export const getUserById = async (req, res) => {
    const { id } = req.user;
    if (!id) {
        return res.status(500).json({
            error: true,
            success: false,
            message: "Id is required"
        })
    }
    const userDetails = await getUserByIdService(req, res)
    if(!userDetails){
        return res.status(200).json({
        error: false,
        success: true,
        message: "Not User found with this Id"
    })
    }
    return res.status(200).json({
        error: false,
        success: true,
        message: userDetails
    })
} 
export const getUserByUsername = async (req, res) => {
    const { id } = req.user;
    if (!id) {
        return res.status(500).json({
            error: true,
            success: false,
            message: "Id must be require"
        })
    }
    const userDetails = await getUserByUsernameService(req, res)
    if(!userDetails){
        return res.status(200).json({
        error: false,
        success: true,
        message: "Not User found with this Id"
    })
    }
    return res.status(200).json({
        error: false,
        success: true,
        message: userDetails
    })
} 


export const updateUserProfile = async (req, res) => {
    const { id } = req.user;
    
    if (!id) {
        return res.status(500).json({
            error: true,
            success: false,
            message: "Id must be require"
        })
    }
    const userDetails = await updateUserProfileService(req, res)
    if(!userDetails){
        return res.status(400).json({
        error: true,
        success: false,
        message: "Error in updating profile"
    })
    }
    return res.status(200).json({
        error: false,
        success: true,
        message: userDetails
    })
} 