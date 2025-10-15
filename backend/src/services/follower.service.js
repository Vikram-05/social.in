import { Follow } from '../models/follow.model.js'

export const getFollowerService = async (req, res) => {
    try {
        const { id } = req.user;
        const response = await Follow.findOne({ 'user': id })
        console.log("resp : ", response)
    } catch (error) {
        console.log("Error in getFollowerService", error)
    }
}
export const FollowUnFollowService = async (req, res) => {
    const { id } = req.user;
    const { followTo } = req.body;
    try {
        const response = await Follow.findOne({ 'user': id })
        const forFollowing = await Follow.findOne({ 'user': followTo })
        if (!response) {
            const followCreated = await Follow.create({ 'user': id })
            followCreated.following.push(followTo)
            await followCreated.save();
            if (!forFollowing) {
                const followingCreated = await Follow.create({ 'user': followTo })
                followingCreated.follower.push(id)
                await followingCreated.save();
            }
            return saved;
        }
        if (!forFollowing) {
            const followingCreated = await Follow.create({ 'user': followTo })
            followingCreated.follower.push(id);
            response.following.push(followTo)
            await response.save();
            const saved = await followingCreated.save();
            return {saved,response};
        }

        // const isFollow = response.following.includes(followTo)
        // const isFollowing = forFollowing.follower.includes(id)
        const indexOfFollower = response.following.indexOf(followTo)
        const indexOfFollowing = forFollowing.follower.indexOf(id)
        console.log("aa ",indexOfFollower)
        if (indexOfFollower == -1) {
            response.following.push(followTo)
            await response.save();
            if (indexOfFollowing == -1) {
                forFollowing.follower.push(followTo)
                await forFollowing.save();
            }
            return {response,forFollowing};
        }
        if (indexOfFollower == -1) {
            forFollowing.follower.push(followTo)
            const saved = await response.save();
            return saved;
        }
        // const indexOfFollower = response.following.indexOf(followTo)
        // const indexOfFollowing = forFollowing.follower.indexOf(id)
        response.following.splice(indexOfFollower, 1);
        forFollowing.follower.splice(indexOfFollowing, 1);
        await response.save();
        await forFollowing.save();
        return { response, forFollowing }
    } catch (error) {
        console.log("Error in getFollowerService", error)
    }
}