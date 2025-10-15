import {getFollowerService,FollowUnFollowService,checkIsFollowOrNotService }from '../services/follower.service.js'

export const getFollower = async (req,res) => {
    try {
        const response = await getFollowerService(req,res);
        if(!response){
            res.status(400).json({
            error : true,
            success:false,
            message : response
        })
        }
        res.status(200).json({
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