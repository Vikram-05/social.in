import { User } from "../models/user.model.js";
import {uploadImage} from './cloudinary.service.js'

export const getUserByIdService = async (req, res) => {
    try {
        const { id } = req.user;
        const userDetails = await User.findOne({ "_id" : id });
        return userDetails;
    } catch (error) {
        console.log("error in getUserByIdService in user service.js ",error)
    }
}

export const getUserByUsernameService = async (req, res) => {
    try {
        const {username} = req.params
        const userDetails = await User.find({ username :{ $regex: username, $options: 'i' }});
        return userDetails;
    } catch (error) {
        console.log("error in getUserByIdService in user service.js ",error)
    }
}
export const updateUserProfileService = async (req, res) => {
    try {
        const { id } = req.user;
        const {username,bio,email,fullName} = req.body; 
        const uploadedImage = await uploadImage(req.file?.path)
        // console.log("uploaded => ",uploadedImage)
        const userDetails = await User.updateOne({ "_id" : id },{
            username,
            bio,
            email,
            fullName,
            profile : uploadedImage?.secure_url
        });
        return userDetails;
    } catch (error) {
        console.log("error in updateUserProfileService in user service.js ",error)
    }
}