import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
import { HiOutlineBookmark, HiOutlineDotsHorizontal } from "react-icons/hi";
import axios from 'axios';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

function Posts() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const observerRef = useRef(null); // Reference for the last post
    const [hasMoreData, sethasMoreData] = useState(true)
    const [isDescOpen, setIsDescOpen] = useState(false);

    // Fetch posts
    const getPosts = useCallback(async () => {
        if (!hasMoreData) return;

        setIsLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/post/get-random-post`,
                { postType: "POST", page },
                { withCredentials: true }
            );

            if (response.status === 200) {
                const newPosts = response.data.data;
                console.log("ppppp ",newPosts)
                setPosts(prev => [...prev, ...newPosts]);

                // Set hasMoreData based on backend flag
                if (!response.data.hasMore || newPosts.length === 0) {
                    sethasMoreData(false);
                }
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setIsLoading(false);
        }
    }, [page, hasMoreData]);

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    // Infinite scroll observer
    const lastPostRef = useCallback((node) => {
        if (isLoading) return;

        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMoreData) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (node) observerRef.current.observe(node);
    }, [isLoading]);

    // Like handler
    const handleLikeCount = async (id) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
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

        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/like/inc-like`,
                { postOn: id },
                { withCredentials: true }
            );
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };

    const handleOpenDesc = (id) => {
        if (isDescOpen === id) {
            setIsDescOpen(null);  // Close if already open
        } else {
            setIsDescOpen(id);    // Open if different or none
        }
    };


    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
            <div className="max-w-3xl mx-auto pb-20 item">
                {posts.map((post, index) => {
                    const isLastPost = (index === posts.length - 1 && hasMoreData);
                    return (
                        <div
                            key={post._id}
                            ref={isLastPost ? lastPostRef : null}
                            className="mb-8"
                        >

                            <div className="relative aspect-square overflow-hidden">

                                <div className="px-3 absolute top-0 left-0 w-full flex items-center justify-between py-3">
                                    <div className="flex items-center space-x-3">
                                        <div onClick={() => navigate(`/search-profile/${post.userData.username }`)} className="w-8 h-8 rounded-full overflow-hidden">
                                            <img
                                                className='w-full h-full object-cover object-center'
                                                src={post.userData.profile}
                                                alt="user"
                                            />
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold text-[var(--text-secondry-color)]">
                                                {post.userData.username}
                                            </span>
                                            <div className="flex items-center space-x-1 text-xs text-[var(--text-secondry-color)]">
                                                <span>
                                                    {post.postCaption.length < 25
                                                        ? post.postCaption
                                                        : `${post.postCaption.slice(0, 25)}... | ${post.postCategory}`}
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
                                    alt={post.userData.username}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Post Actions */}
                            <div className="px-3 flex justify-between items-center py-3">
                                <div className="flex space-x-6">
                                    <div
                                        onClick={() => handleLikeCount(post._id)}
                                        className="flex space-x-2 cursor-pointer"
                                    >
                                        <FaHeart className={`w-6 h-6 ${post.isLiked ? 'text-red-500' : 'text-[var(--semi-text-color)]'}`} />
                                        <span>{post.postLikeCount}</span>
                                    </div>

                                    <div className="flex space-x-2">
                                        <FaRegCommentDots className="w-6 h-6 text-[var(--text-color)]" />
                                        <span>{post.postCommentCount}</span>
                                    </div>
                                </div>
                                <HiOutlineBookmark className="w-6 h-6 text-[var(--text-color)]" />
                            </div>

                            {/* Caption */}
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenDesc(post._id);
                                }}
                                className="text-sm px-3 flex flex-col cursor-pointer"
                            >
                                <span className="font-semibold text-[var(--text-color)]">{post.userData.username}</span>
                                <span className="text-[var(--semi-text-color)]">
                                    {isDescOpen === post._id
                                        ? post.postCaption
                                        : post.postCaption.length > 200
                                            ? post.postCaption.slice(0, 200) + "..."
                                            : post.postCaption}
                                    {post.postCaption.length > 200 && (
                                        <span className="text-blue-300 ml-1">
                                            {isDescOpen === post._id ? "hide" : "more"}
                                        </span>
                                    )}
                                </span>
                            </div>
                        </div>
                    );
                })}

                {/* Loader at the bottom */}
                {isLoading && (
                    <div className="flex justify-center items-center py-10">
                        <Loader
                            screenHeight=""
                            screenWidth=""
                            height="h-10"
                            width="w-10"
                            border="border-3"
                            borderColor="border-[var(--button-color)]"
                        />
                    </div>
                )}
                {!hasMoreData && <p className='w-full text-center capitalize text-[var(--semi-text-color)] font-semibold'>no more data</p>}
            </div>
        </div>
    );
}

export default Posts;
