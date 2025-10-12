import { User } from "../models/user.model.js";

export const getUserByIdService = async (req, res) => {
    try {
        const { id } = req.user;
        const userDetails = await User.findOne({ "_id" : id });
        return userDetails;
    } catch (error) {
        console.log("error in getUserByIdService in user service.js ",error)
    }
}