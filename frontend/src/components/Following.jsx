import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import Loader from './Loader';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Following = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [following, setFollowing] = useState([]);
    const [isLoading, setisloading] = useState(false)
    const id = location?.state?.id
    // console.log("id",id)

    // const handleFollow = (index) => {
    //     setfollowing(prev =>
    //         prev.map((follower, i) =>
    //             i === index ? { ...follower, following: !follower.following } : follower
    //         )
    //     );
    // };


    useEffect(() => {
        setisloading(true)
        const handleGetFollower = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/follow/get-follwer`,
                    { withCredentials: true }
                );

                const followerIds = res.data.message?.following || [];

                // Use Promise.all to fetch all follower details in parallel
                const userDetailsResponses = await Promise.all(
                    followerIds.map((userId) =>
                        axios.get(
                            `${import.meta.env.VITE_BACKEND_URL}/user/getUserByUserId/${userId}`,
                            { withCredentials: true }
                        )
                    )
                );

                const userDetails = userDetailsResponses.map((res) => res.data.message);
                setFollowing(userDetails);

            } catch (error) {
                console.error("Error in follower.jsx", error);
            } finally {
                setisloading(false)
            }
        };
        const handleGetFollower2 = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/follow/get-follwerById/${id}`,
                    { withCredentials: true }
                );

                const followerIds = res.data.message?.following || [];

                // Use Promise.all to fetch all follower details in parallel
                const userDetailsResponses = await Promise.all(
                    followerIds.map((userId) =>
                        axios.get(
                            `${import.meta.env.VITE_BACKEND_URL}/user/getUserByUserId/${userId}`,
                            { withCredentials: true }
                        )
                    )
                );

                const userDetails = userDetailsResponses.map((res) => res.data.message);
                setFollowing(userDetails);

            } catch (error) {
                console.error("Error in follower.jsx", error);
            } finally {
                setisloading(false)
            }
        };
        if(id) handleGetFollower2()
        else handleGetFollower();
    }, []);

    return (
        <div className="min-h-screen p-4" style={{ backgroundColor: 'var(--bg-color)' }}>
            <div className="  font-semibold mb-7 text-center flex items-center justify-start gap-4" style={{ color: 'var(--text-color)' }}>
                <FaChevronLeft onClick={() => navigate(-1)} className='text-xl ' />
                <h1 className='text-2xl'>Following</h1>
            </div>
            {
                isLoading
                    ?
                    <Loader
                        screenHeight="h-[calc(100vh-100px)]"
                        screenWidth="w-full"
                        height="h-10"
                        width="w-10"
                        border="border-3"
                        borderColor="border-[var(--button-color)]" />
                    :
                    <>
                        <div className="space-y-4">
                            {!following.length > 0 ?
                            <p className='text-[var(--semi-text-color)]  h-[calc(100vh-100px)]  flex items-center justify-center '>No Follower</p>:

                            following.map((follower, index) => (
                                <div
                                    onClick={() => navigate(`/search-profile/${follower.username}`)}
                                    key={follower._id}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center space-x-3">
                                        {/* Avatar with initials */}
                                        <div
                                            className="overflow-hidden border-1 border-gray-400 relative w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold uppercase"
                                            style={{
                                                backgroundColor: 'var(--main-color)',
                                                color: 'var(--text-secondry-color)'
                                            }}
                                        >
                                            <img className='w-full h-full' src={follower.profile} alt="p" />

                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold" style={{ color: 'var(--text-color)' }}>
                                                {follower.fullName}
                                            </span>
                                            {follower.username && (
                                                <span className="text-xs" style={{ color: 'var(--semi-text-color)' }}>
                                                    {follower.username}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* <button
                            onClick={() => handleFollow(index)}
                            className="text-xs font-medium px-4 py-1.5 rounded-md transition"
                            style={{
                                backgroundColor: follower.following ? 'var(--semi-text-light-color)' : 'var(--button-color)',
                                color: follower.following ? 'var(--text-color)' : 'var(--text-secondry-color)'
                            }}
                        >
                            {follower.following ? 'Following' : 'Follow'}
                        </button> */}
                                </div>
                            ))}
                        </div>
                    </>
            }
            <Footer />
        </div>
    );
};




export default Following