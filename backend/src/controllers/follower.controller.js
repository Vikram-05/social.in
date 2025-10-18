import {getFollowerService,FollowUnFollowService,checkIsFollowOrNotService ,getFollowerByIdService}from '../services/follower.service.js'

export const getFollower = async (req,res) => {
    try {
        const response = await getFollowerService(req,res);
        if(!response){
            return  res.status(404).json({
            error : true,
            success:false,
            message : "No follower found"
        })
        }
        return res.status(200).json({
            error : false,
            success:true,
            message : response
        })
    } catch (error) {
        console.log("Error in getFollower controller",error);
        return res.status(500).json({
            error : false,
            success:true,
            message : "Internal server error"
        })
    }
}
export const getFollowerById = async (req,res) => {
    try {
        const response = await getFollowerByIdService(req,res);
        if(!response){
            return res.status(400).json({
            error : true,
            success:false,
            message : "No follower found"
        })
        }
        return res.status(200).json({
            error : false,
            success:true,
            message : response
        })
    } catch (error) {
        console.log("Error in getFollower controller",error);
    }
}
export const FollowUnFollow = async (req,res) => {
    try {
        const response = await FollowUnFollowService(req,res);
        res.status(200).json({
            error:false,
            success:true,
            message : response
        })
    } catch (error) {
        console.log("Error in getFollower controller",error);
        res.status(200).json({
            error:false,
            success:true,
            message : error
        })
    }
}
export const checkIsFollowOrNot = async (req,res) => {
    try {
        const response = await checkIsFollowOrNotService(req,res);
        res.status(200).json({
            error:false,
            success:true,
            message : response
        })
    } catch (error) {
        console.log("Error in getFollower controller",error);
        res.status(200).json({
            error:false,
            success:true,
            message : error
        })
    }
}