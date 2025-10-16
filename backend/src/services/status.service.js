import { Status } from "../models/status.model.js";
import { User } from "../models/user.model.js";
import { uploadImage } from "./cloudinary.service.js";

export const getStatusService = async (req, res) => {
    const { id } = req.user;
    try {
        const statusResponse = await Status.find({'statusBy' : id})
        return statusResponse
    } catch (error) {
        console.log("Error in uploadstatus service", error)
        return null
    }
}
export const getStatusByIdService = async (req, res) => {
    const { id } = req.body;
    try {
        const statusResponse = await Status.find({'statusBy' : id})
        return statusResponse
    } catch (error) {
        console.log("Error in uploadstatus service", error)
        return null
    }
}
export const uploadStatusService = async (req, res) => {
    const { id } = req.user;
    const { caption ,category} = req.body
    try {
        const isUserExist = await User.findById(id)
        if(!isUserExist) {
            return null;
        }
        const uploadedimage = await uploadImage(req.file?.path)
        const statusResponse = await Status.create({
            "statusBy": id,
            'image': uploadedimage.secure_url,
            'caption': caption || "",
            "category" : category || "",
            "ststusByProfile" : isUserExist.profile,
            "ststusByUsername" : isUserExist.username,
            "ststusByFullName" : isUserExist.fullName
        })
        return statusResponse
    } catch (error) {
        console.log("Error in uploadstatus service", error)
        return null
    }
}