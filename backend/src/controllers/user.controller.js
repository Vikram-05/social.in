import { getUserByIdService } from '../services/user.service.js'

export const getUserById = async (req, res) => {
    const { id } = req.user;
    if (!id) {
        return res.status(500).json({
            error: true,
            success: false,
            message: "Id must be require"
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