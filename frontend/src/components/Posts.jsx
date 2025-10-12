import React from 'react'
import { FaHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { HiOutlineBookmark } from "react-icons/hi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';



function Posts() {
    const [posts, setPosts] = useState([]);
    const [isLiked, setIsLiked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const getPosts = async () => {
            setIsLoading(true)
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/post/get-random-post`, { "postType": "POST" }, { withCredentials: true })
                console.log("data => ", response.data.data)
                setPosts([...response.data.data].reverse())
            } catch (error) {
                console.log("Error in getPost function ", error)
            } finally {
                setIsLoading(false)
            }
        }
        getPosts()
    }, [])

    const handleLikeCount = async (id) => {
        //ui lo update krne ke liye
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === id
                    ? {
                        ...post,
                        isLiked: !post.isLiked,
                        postLikeCount: post.isLiked
                            ? post.postLikeCount - 1
                            : post.postLikeCount + 1,
                    }
                    : post
            )
        );
        //database me update krne ke liye
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/like/inc-like`,
                { postOn: id },
                { withCredentials: true }
            );
        } catch (error) {
            console.error("Error in like function ", error);
        }
    };

    const handleCommentCount = () => {

    }

    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]"  >
            {
                isLoading ?
                    <Loader
                        screenHeight="h-100"
                        screenWidth="w-screen"
                        height="h-10"
                        width="w-10"
                        border="border-3"
                        borderColor="border-[var(--button-color)]" />
                    :

                    // {/* Posts Section */ }
                    < div className="max-w-3xl mx-auto  pb-20">
                        {posts.map((post) => (
                            <div key={post._id} className="mb-8">

                                {/* Post Image */}
                                <div className=" relative  aspect-square overflow-hidden">
                                    {/* Post Header */}
                                    <div className="px-3 absolute top-0 left-0 w-full flex items-center justify-between py-3">
                                        <div className="flex items-center space-x-3 ">
                                            <div className="w-8 h-8 rounded-full overflow-hidden ">
                                                <img className='w-full h-full object-cover object-center' src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" alt="user image" />
                                            </div>
                                            <div>
                                                <span className="text-sm font-semibold text-[var(--text-secondry-color)]">{post.postByUserName}</span>
                                                <div className="flex items-center space-x-1 text-xs text-[var(--text-secondry-color)]" ><span>
                                                    {
                                                        post.postCaption.length < 25 ?
                                                            post.postCaption :
                                                            post.postCaption.slice(0, 25) + "... | " + post.postCategory
                                                    }
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className='text-[var(--text-secondry-color)]'>
                                            <HiOutlineDotsHorizontal className='w-5 h-5' />
                                        </button>
                                    </div>

                                    <img
                                        src={post.postImageOrVideoURL}
                                        // src='https://tse3.mm.bing.net/th/id/OIP.0ehNbvweAFVhwiB4zJRPjQHaEo?pid=Api&P=0&h=180'
                                        alt={post.postByUserName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Post Actions */}
                                <div className="px-3 flex justify-between items-center py-3">
                                    <div className="flex space-x-6">
                                        <div
                                            onClick={() => handleLikeCount(post._id)}
                                            className=' flex  space-x-2'>
                                            <button className="" >
                                                <FaHeart className={`w-6 h-6  ${post.isLiked ? 'text-red-500' : 'text-[var(--semi-text-color)]'}`} />
                                            </button>
                                            <span>{post.postLikeCount}</span>
                                        </div>

                                        <div
                                            onClick={handleCommentCount}
                                            className='flex space-x-2'>
                                            <button className="transition-colors" style={{ color: 'var(--text-color)' }}>
                                                <FaRegCommentDots className="w-6 h-6" />
                                            </button>
                                            <span>{post.postCommentCount}</span>
                                        </div>
                                    </div>
                                    <button className="transition-colors" style={{ color: 'var(--text-color)' }}>
                                        <HiOutlineBookmark className='w-6 h-6' />
                                    </button>
                                </div>

                                {/* Caption */}
                                <div className="text-sm px-3 flex flex-col">
                                    <span className="font-semibold text-[var(--text-color)]" >{post.postByUserName}</span>
                                    <span className=" text-[var(--semi-text-color)]" >{post.postCaption}</span>
                                </div>
                            </div>
                        ))}
                    </div>

            }
        </div >
    )
}

export default Posts


