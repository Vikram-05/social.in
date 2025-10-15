import {getFollowerService,FollowUnFollowService }from '../services/follower.service.js'

export const getFollower = async (req,res) => {
    try {
        const response = await getFollowerService(req,res);
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