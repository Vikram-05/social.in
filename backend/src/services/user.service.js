import { User } from "../models/user.model.js";
import {uploadImage} from './cloudinary.service.js'
import { Follow } from "../models/follow.model.js";

export const getUserByIdService = async (req, res) => {
    try {
        const { id } = req.user;
        const NoOfFollow = await Follow.findOne({ "user" : id });
        const userDetails = await User.findOne({ "_id" : id });
        if(userDetails){

            userDetails.followers = NoOfFollow?.follower.length || userDetails.followers
            userDetails.following = NoOfFollow?.following.length || userDetails.following
        }
        await userDetails.save();
        console.log("dd => ",userDetails)
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