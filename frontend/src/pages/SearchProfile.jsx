


import React, { act, useEffect, useState, useCallback } from 'react'
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import Loader from '../components/Loader'
import { FaChevronLeft } from "react-icons/fa";
import StoryLoader from '../components/StoryLoader';


function SearchProfile() {
    useEffect(() => { console.log("Profle") }, [])
    useEffect(() => { handlePost() }, [])
    const navigate = useNavigate();
    const { username } = useParams();
    const [activeTab, setActiveTab] = useState("post")
    const [reel, setReel] = useState([])
    const [post, setPost] = useState([])
    const [userDetails, setUserDetails] = useState('')
    const [isLoadingPost, setIsLoadingPost] = useState(false)
    const [isLoadingUserDetails, setIsLoadingUserDetails] = useState(false)
    const [isFollow, setIsfollow] = useState(false)
    const [isStoryLoader, setIsStoryLoaded] = useState(false);
    const [userStatus, setUserStatus] = useState([])
    const [userData,setUserData ] = useState()
    



    const fetchRandomPosts = useCallback(async (type) => {
        setIsLoadingPost(true);
        setIsLoadingUserDetails(true)
        setIsStoryLoaded(true)
        setActiveTab(type.toLowerCase());

        try {


            const responseUserDetails = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/user/getUserByUsername/${username}`,
                { withCredentials: true }
            );
            setUserDetails(responseUserDetails.data.message[0].user)
            // console.log("ff ",  responseUserDetails.data.message[0].user)

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/post/get-random-post-use-related-byId`,
                { 'id': responseUserDetails.data.message[0].user._id, 'postType': type, },
                { withCredentials: true }
            );
            // console.log("res",response)
            if (type === "POST") {
                setPost(response.data.data);
            } else if (type === "REEL") {
                setReel(response.data.data);
            }
            
            const isFollowOrNot = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/follow/isFollow/${responseUserDetails.data.message[0].user._id}`, {
                withCredentials: true
            })
            setIsfollow(isFollowOrNot.data.message)
            // console.log("ff ", isFollowOrNot)
            
            const status = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/status/getStatusById`, { "id": responseUserDetails.data.message[0].user._id }, { withCredentials: true })
            setUserStatus(status.data.message.status)
            setUserData(status.data.message.userData)
            setIsStoryLoaded(false)
            console.log("us",status.data.message.userData)
            


        } catch (error) {
            console.error(`Error fetching ${type}:`, error);
        } finally {
            setIsLoadingPost(false);
            setIsLoadingUserDetails(false)
        }
    }, []);

    const handleFollow = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/follow/follow-unfollow`, {
                'followTo': userDetails._id
            }, {
                withCredentials: true
            });

            // Toggle follow state
            setIsfollow((prev) => !prev);

            // Optionally update follower count in UI
            setUserDetails((prevDetails) => ({
                ...prevDetails,
                followers: isFollow ? prevDetails.followers - 1 : prevDetails.followers + 1
            }));
        } catch (error) {
            console.error("Failed to follow/unfollow:", error);
        }
    };


    const handlePost = (e) => {
        if (e) e.preventDefault();
        fetchRandomPosts("POST");
    };

    const handleReel = (e) => {
        if (e) e.preventDefault();
        fetchRandomPosts("REEL");
    };



    return (
        <div className="min-h-screen text-[var(--text-color)] bg-[var(--bg-color)]">


            {/* Profile Content */}
            <div className=" max-w-3xl mx-auto  pt-4">
                {
                    isLoadingUserDetails ?
                        <Loader
                            screenHeight="h-40"
                            screenWidth="w-screen"
                            height="h-8"
                            width="w-8"
                            border="border-3"
                            borderColor="border-[var(--button-color)]" />
                        :
                        <>
                            <div className=" px-3 font-semibold mb-4  text-center flex items-center justify-between gap-4 " style={{ color: 'var(--text-color) ' }}>
                                <div className='flex items-center justify-center gap-3'><FaChevronLeft onClick={() => navigate(-1)} className='text-xl ' />
                                <h1 className='text-xl mb-2'>{userDetails.fullName}</h1></div>
                                <button onClick={() => navigate("/setting")} style={{ color: 'var(--text-color)' }}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                    </svg>
                                </button>
                            </div>
                            {/* Profile Header */}
                            <div className="px-3 flex items-start space-x-6 mb-2">


                                {/* Profile Image */}
                                <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                                    <img
                                        src={userDetails.profile}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Profile Stats */}
                                <div className="flex-1 ">
                                    <div className="flex items-center justify-between mb-4">
                                        <h1 className="text-md font-semibold" style={{ color: 'var(--semi-text-color)' }}>{userDetails.username}</h1>


                                    </div>

                                    {/* Stats */}
                                    <div className="flex space-x-6 mb-4">
                                        <div className="text-center">
                                            <div className="font-semibold" style={{ color: 'var(--text-color)' }}>{userDetails.post}</div>
                                            <div className="text-sm" style={{ color: 'var(--text-color)' }}>posts</div>
                                        </div>
                                        <div className="text-center">
                                            <div
                                                onClick={() => navigate('/follower', { state: { id: userDetails._id } })}
                                                className="font-semibold" style={{ color: 'var(--text-color)' }}>{userDetails.followers}</div>
                                            <div className="text-sm" style={{ color: 'var(--text-color)' }}>followers</div>
                                        </div>

                                        <div
                                            onClick={() => navigate('/following', { state: { id: userDetails._id } })}
                                            className="text-center">
                                            <div className="font-semibold" style={{ color: 'var(--text-color)' }}>{userDetails.following}</div>
                                            <div className="text-sm" style={{ color: 'var(--text-color)' }}>following</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Info fullName */}
                            {/* <div className="px-3  ">
                                <p className="text-md mb-2 font-semibold " style={{ color: 'var(--semi-text-color) ' }}>{userDetails.fullName}</p>
                            </div> */}

                            {/* Profile Info bio */}
                            <div className="px-3 mb-6 ">
                                <p className="text-sm mb-2" style={{ color: 'var(--semi-text-color)' }}>{userDetails.bio}</p>
                            </div>
                        </>
                }

                {/* Action Buttons */}
                <div className="px-3 flex space-x-2 mb-6">
                    <button onClick={handleFollow} className="flex-1 py-2 rounded text-sm font-medium text-center"
                        style={{ backgroundColor: 'var(--button-color)', color: 'var(--bg-color)' }}>
                        {isFollow ? "Unfollow" : "Follow"}
                    </button>
                    <button className="flex-1 py-2 rounded text-sm font-medium text-center border"
                        style={{ borderColor: 'var(--semi-text-light-color)', color: 'var(--text-color)' }}>
                        Send Message
                    </button>
                </div>

                {/* Highlights Stories */}
                {
                    isStoryLoader ?
                        <StoryLoader
                            screenheight='h-25'
                            screenwidth='w-screen'
                        />
                        :

                        <div className="px-3 mb-3 ">
                            <div className="flex space-x-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                                <div onClick={() => navigate("/upload-status")} className="flex flex-col items-center space-y-1 flex-shrink-0">
                                    <div className="border-3 border-dashed border-[var(--button-color)] w-16 h-16 rounded-full p-0.5 " >
                                        <div className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-color)' }}>
                                            <div className="w-14 h-14 rounded-full flex items-center justify-center font-medium text-2xl"
                                                style={{ backgroundColor: 'var(--semi-text-light-color)', color: 'var(--dark-color)' }}>
                                                +
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs" style={{ color: 'var(--text-color)' }}>Add</span>


                                </div>
                                {userStatus.map((status, index) => (
                                    <div key={status._id} className=" flex flex-col items-center space-y-1 flex-shrink-0">
                                        <div onClick={() => navigate('/see-story', { state: { story: { status :Array(status), userData }} })} className="w-16 h-16 rounded-full p-0.5" style={{ background: 'linear-gradient(to right, var(--button-color), #2DD4BF)' }}>
                                            <div
                                                className="w-full h-full rounded-full flex items-center justify-center"
                                                style={{ backgroundColor: 'var(--bg-color)' }}
                                            >
                                                <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        src={status.image}
                                                        alt="status"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        <span className="text-xs capitalize" style={{ color: 'var(--text-color)' }}>{status.category.length > 8 ? status.category.slice(0, 8) + "..." : status.category}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                }

                {/* Posts Grid */}
                <div className="mb-4 ">
                    <div className="flex" style={{ borderColor: 'var(--semi-text-light-color)' }}>
                        <button onClick={handlePost} className={`flex-1 py-3 text-sm font-medium text-center ${activeTab == "post" && 'border-b-2'}`}
                            style={{ borderColor: 'var(--button-color)', color: 'var(--text-color)' }}>
                            <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            Posts
                        </button>
                        <button onClick={handleReel} className={`flex-1 py-3 text-sm font-medium text-center ${activeTab == "reel" && 'border-b-2 border-[var(--button-color)]'}`}
                            style={{ color: 'var(--text-color)' }}>
                            <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Reels
                        </button>
                        <button className="flex-1 py-3 text-sm font-medium text-center"
                            style={{ color: 'var(--text-color)' }}>
                            <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            Tagged
                        </button>
                    </div>
                </div>

                {/* Posts Grid */}
                {
                    isLoadingPost ?
                        <Loader
                            screenHeight="h-30"
                            screenWidth="w-screen"
                            height="h-7"
                            width="w-7"
                            border="border-3"
                            borderColor="border-[var(--button-color)]" /> :
                        <div className="grid grid-cols-3  pb-20">
                            {
                                activeTab == "post" ?
                                    (

                                        post.map((post) => (
                                            <div key={post._id} className="aspect-square bg-gray-700 rounded-none overflow-hidden">
                                                <img
                                                    src={post.postImageOrVideoURL}
                                                    alt={`Post ${post.postBy}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))
                                    ) :
                                    (
                                        reel.map((post) => (
                                            <div key={post._id} className="aspect-square bg-gray-700 rounded-none overflow-hidden">
                                                <video
                                                    src={post.postImageOrVideoURL}
                                                    alt={`Post ${post.postBy}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))
                                    )
                            }
                        </div>

                }
            </div>

            {/* footer */}
            <Footer />


        </div>
    )
}
export default SearchProfile
