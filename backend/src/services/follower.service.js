import { Follow } from '../models/follow.model.js'
import { User } from '../models/user.model.js';

export const getFollowerService = async (req, res) => {
    try {
        const { id } = req.user;
        const response = await Follow.findOne({ 'user': id })
        return response;
    } catch (error) {
        console.log("Error in getFollowerService", error)
        throw error
        
    }
}
export const getFollowerByIdService = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Follow.findOne({ 'user': id })
        return response;
    } catch (error) {
        console.log("Error in getFollowerService", error)
        return null
    }
}
export const FollowUnFollowService = async (req, res) => {
    const { id } = req.user;
    const { followTo } = req.body;

    try {
        if (id === followTo) {
            return res.status(400).json({ message: "You cannot follow yourself." });
        }

        const userWhoFollow = await User.findById(id);
        const userWhomFollow = await User.findById(followTo);

        if (!userWhoFollow || !userWhomFollow) {
            return res.status(404).json({ message: "User not found." });
        }

        let followerDoc = await Follow.findOne({ user: id });
        let followingDoc = await Follow.findOne({ user: followTo });

        
        if (!followerDoc) {
            followerDoc = await Follow.create({ user: id, following: [] });
        }
        if (!followingDoc) {
            followingDoc = await Follow.create({ user: followTo, follower: [] });
        }

        const isFollowing = followerDoc.following.includes(followTo);

        if (!isFollowing) {
            // user ko follow
            followerDoc.following.push(followTo);
            followingDoc.follower.push(id);
        } else {
            // user ko unfollow
            followerDoc.following = followerDoc.following.filter(uid => uid.toString() !== followTo);
            followingDoc.follower = followingDoc.follower.filter(uid => uid.toString() !== id);
        }

        await followerDoc.save();
        await followingDoc.save();

        //user model me update user count
        userWhoFollow.following = followerDoc.following.length;
        userWhomFollow.followers = followingDoc.follower.length;

        await userWhoFollow.save();
        await userWhomFollow.save();

        return res.status(200).json({
            message: isFollowing ? "Unfollowed successfully." : "Followed successfully.",
            followerDoc,
            followingDoc,
        });

    } catch (error) {
        console.error("Error in FollowUnFollowService:", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const checkIsFollowOrNotService = async (req, res) => {
    const { id } = req.user;
    const { checkFor } = req.params;
    console.log("pa", req)
    try {
        const response = await Follow.findOne({ 'user': id });
        // console.log("re ",response)
        const isFollow = response.following.includes(checkFor)
        // console.log("ss ",isFollow,checkFor)
        return isFollow;
    } catch (error) {
        console.log("Error in checkIsFollowOrNot", error);
        return null
    }
}