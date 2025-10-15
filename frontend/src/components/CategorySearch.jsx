import React from 'react'
import Footer from './Footer'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MdVideoLibrary } from "react-icons/md";
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";
import { RiArrowLeftWideLine } from "react-icons/ri";

function CategorySearch() {
    const navigate = useNavigate()
    const { name } = useParams()
    const [query,setQuery] = useState(name)
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getPosts = async () => {
            setIsLoading(true)
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/post/get-post-by-category`,
                    { postCategory: query },
                    { withCredentials: true }
                )
                console.log("data => ", response.data.data)
                setPosts(response.data.data)
            } catch (error) {
                console.log("Error in getPost function ", error)
            } finally {
                setIsLoading(false)
            }
        }
        getPosts()
    }, [query])





    return (
        <div className="min-h-screen flex flex-col " style={{ backgroundColor: 'var(--bg-color)' }}>
            {/* Header */}
            <header className=" z-50 pt-3 px-2" style={{ backgroundColor: 'var(--bg-color)' }}>
                <div className=" mx-auto  gap-1 mb-3">
                    <button
                        onClick={() => { navigate(-1) }}
                        className=" text-gray-500 pb-4 gap-5  rounded-md flex items-center justify-center"
                    >
                    <FaChevronLeft className='text-xl'/>
                    <h1 className='font-semibold text-2xl  text-[var(--text-color)]'>Search</h1>
                    </button>
                    {/* Search Bar */}
                    <div className=" relative  w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5" style={{ color: 'var(--dark-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value)
                            }}
                            className="w-full pl-10 pr-4 py-3 rounded-lg text-sm"
                            style={{
                                backgroundColor: 'var(--semi-text-light-color)',
                                color: 'var(--dark-color)',
                                border: 'none',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>
            </header>

            {/* Image Grid */}
            {
                isLoading ?
                    <Loader
                        screenHeight="h-[calc(100vh-200px)]"
                        screenWidth="w-screen"
                        height="h-10"
                        width="w-10"
                        border="border-3"
                        borderColor="border-[var(--button-color)]"
                    />
                    :

                    <div className="p-1 flex-1 overflow-y-auto">
                        <div className="columns-3 gap-1 space-y-1">
                            {posts.map((post, index) => (
                                <div
                                    key={post._id || index}
                                    className={`bg-gray-400 rounded-sm relative aspect-square overflow-hidden ${index % 7 === 0 ? 'col-span-2 row-span-2' : ''
                                        }`}
                                >
                                    {/* Post Image */}{
                                        post.postType === 'POST' ?
                                            <img
                                                src={post.postImageOrVideoURL}
                                                alt={post.postCaption || 'Post image'}
                                                className="w-full h-full object-cover"
                                            />
                                            :
                                            <video
                                                src={post.postImageOrVideoURL}
                                                alt={post.postCaption || 'Post image'}
                                                className="w-full h-full object-cover"
                                            />


                                    }


                                    {/* Post Type Badge */}
                                    {post.postType === 'REEL' && (
                                        <div className="absolute top-1 right-1  bg-opacity-50 rounded px-1 py-0.5">
                                            <span className="text-white text-xs font-medium"><MdVideoLibrary className='p-1 text-2xl' /></span>
                                        </div>
                                    )}

                                    {/* Optional icon in the top right of some items */}
                                    {index % 4 === 0 && (
                                        <div className="absolute top-1 right-1 bg-white p-1 rounded-full text-xs">
                                            {/* You can add an icon here if needed */}
                                        </div>
                                    )}

                                    {/* Hide comments/likes indicators */}
                                    {/* {(post.isLikeHide || post.isCommentHide) && (
                                <div className="absolute bottom-2 right-2 flex space-x-1">
                                    {post.isLikeHide && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full" title="Likes hidden"></div>
                                    )}
                                    {post.isCommentHide && (
                                        <div className="w-2 h-2 bg-green-500 rounded-full" title="Comments hidden">{post.isCommentHide}</div>
                                    )}
                                </div>
                            )} */}


                                </div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {posts.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="text-6xl mb-4" style={{ color: 'var(--text-color)' }}>📭</div>
                                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
                                    No posts found
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--text-color)' }}>
                                    No posts available in {name} category yet
                                </p>
                            </div>
                        )}
                    </div>
            }

            <Footer />
        </div>
    )
}

export default CategorySearch