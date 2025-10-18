import { error } from "console";
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
        const userData = await User.findById(id)
        const a = {...statusResponse,...userData}
        console.log("stroy ",a)
        return {status : statusResponse,userData :userData}
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
        })
        return statusResponse
    } catch (error) {
        console.log("Error in uploadstatus service", error)
        return null
    }
}
export const deleteStatusService = async (req, res) => {
    const { id } = req.user;
    const { storyId } = req.body
    try {
        const isStoryExist = await Status.findById(storyId)
        if(!isStoryExist) {
            return null;
        }
        if(id != isStoryExist.statusBy){
            return {success : false,error : true, message : "Not valid user"}
        }
        const deletedResponse = await Status.deleteOne({"_id" : storyId})
        // console.log('de ',deletedResponse)
        // console.log('ff ',id == isStoryExist.statusBy)
        return {success : true,error : false , message :deletedResponse }
    } catch (error) {
        console.log("Error in deleted status service", error)
        return null
    }
}