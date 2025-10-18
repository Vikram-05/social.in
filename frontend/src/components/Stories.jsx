import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StoryLoader from './StoryLoader'

function Stories() {
    const [following, setFollowing] = useState([])
    const [userStory, setUserStory] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getAllFollowingStatuses = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/follow/get-follwer`,
                    { withCredentials: true }
                );

                const followingUsers = response.data.message.following;
                setFollowing(followingUsers);

                const storyData = await Promise.all(
                    followingUsers.map(async (userId) => {
                        const res = await axios.post(
                            `${import.meta.env.VITE_BACKEND_URL}/status/getStatusById`,
                            { id: userId },
                            { withCredentials: true }
                        );
                        return res.data.message || [];
                    })
                );
                // console.log("storyDa ",storyData)
                setUserStory(storyData.filter((user) => user.status.length > 0));
            } catch (err) {
                console.error('Error fetching user stories:', err);
            } finally {
                setIsLoading(false)
            }
        };

        getAllFollowingStatuses();
    }, []);

    useEffect(() => {
        console.log(" Updated userStory:", userStory);
    }, [userStory]);

    if (isLoading) {
        return <StoryLoader
            screenheight="h-25"
            screenwidth='w-screen'
        />
    }


    return (
        <div className="py-2 ">
            <div className="max-w-3xl mx-auto pl-3">
                <div className="flex space-x-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {/* Your Story */}
                    <div className="flex flex-col items-center space-y-1 flex-shrink-0">
                        <div className="w-16 h-16 bg-[var(--main-color)] rounded-full p-0.5">
                            <div className="w-full h-full bg-[var(--bg-color)] rounded-full flex items-center justify-center">
                                <div className="w-14 h-14 bg-gray-500 rounded-full flex items-center justify-center">
                                    <span className="text-xs text-[#ffffff]">You</span>
                                </div>
                            </div>
                        </div>
                        <span className="text-xs text-[var(--text-color)]">Your Story</span>
                    </div>

                    {/* Other Stories */}
                    {userStory.map((user) => (
                        <div key={user.status[0]._id} className=" flex flex-col items-center space-y-1 flex-shrink-0">
                            <div onClick={() => navigate("/see-story", { state: { story: user } })
                            } className=" w-16 h-16 bg-gradient-to-r from-[var(--button-color)] to-[#2DD4BF] rounded-full p-0.5">
                                <div className="w-full h-full bg-[var(--bg-color)] rounded-full flex items-center justify-center"
                                >
                                    <div className="w-14 h-14 overflow-hidden bg-gray-500 rounded-full flex items-center justify-center text-lg">
                                        <img className='h-full w-full object-cover' src={user.userData.profile} alt="" />
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs text-[var(--text-color)]">{user.userData.fullName.length > 10 ? user.userData.fullName.slice(0, 10) + "..." : user.userData.fullName}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Stories