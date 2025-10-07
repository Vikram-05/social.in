import React from 'react'
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa";
import { HiOutlineBookmark } from "react-icons/hi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";



function Posts() {
    const posts = [
        {
            id: 1,
            username: "mathadillaco",
            location: "HEI",
            caption: "Weekly insights #marhad",
            likes: 2875,
            image: "https://images.pexels.com/photos/34143264/pexels-photo-34143264.jpeg",
            isSponsored: true,
            hasMap: true
        },
        {
            id: 2,
            username: "travel_diaries",
            location: "Paris, France",
            caption: "Exploring the city of lights ✨",
            likes: 3421,
            image: "https://images.pexels.com/photos/34143266/pexels-photo-34143266.jpeg",
            isSponsored: false,
            hasMap: true
        },
        {
            id: 3,
            username: "suraj_sharma",
            location: "Paris, France",
            caption: "Exploring the city of lights ✨",
            likes: 3421,
            image: "https://images.pexels.com/photos/34123134/pexels-photo-34123134.jpeg",
            isSponsored: false,
            hasMap: true
        }
    ];
    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]"  >
            {/* Posts Section */}
            <div className="max-w-3xl mx-auto  pb-20">
                {posts.map((post) => (
                    <div key={post.id} className="mb-8">

                        {/* Post Image */}
                        <div className=" relative  aspect-square overflow-hidden">
                        {/* Post Header */}
                        <div className="px-3 absolute top-0 left-0 w-full flex items-center justify-between py-3">
                            <div className="flex items-center space-x-3 ">
                                <div className="w-8 h-8 rounded-full overflow-hidden ">
                                    <img className='w-full h-full object-cover object-center' src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" alt="user image" />
                                </div>
                                <div>
                                    <span className="text-sm font-semibold text-[var(--text-secondry-color)]">{post.username}</span>
                                    <div className="flex items-center space-x-1 text-xs text-[var(--text-secondry-color)]" ><span>{post.caption}</span>
                                    </div>
                                </div>
                            </div>
                            <button className='text-[var(--text-secondry-color)]'>
                                <HiOutlineDotsHorizontal  className='w-5 h-5'/>
                            </button>
                        </div>

                            <img
                                src={post.image}
                                alt={post.caption}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Post Actions */}
                        <div className="px-3 flex justify-between items-center py-3">
                            <div className="flex space-x-6">
                                <div className=' flex  space-x-2'>
                                    <button className="transition-colors" style={{ color: 'var(--text-color)' }}>
                                        <IoIosHeartEmpty className="w-6 h-6" />
                                    </button>
                                    <span>2.3K</span>
                                </div>

                                <div className='flex space-x-2'>
                                    <button className="transition-colors" style={{ color: 'var(--text-color)' }}>
                                        <FaRegCommentDots className="w-6 h-6" />
                                    </button>
                                    <span>103</span>
                                </div>
                            </div>
                            <button className="transition-colors" style={{ color: 'var(--text-color)' }}>
                                <HiOutlineBookmark className='w-6 h-6' />
                            </button>
                        </div>

                        {/* Caption */}
                        <div className="text-sm px-3 flex flex-col">
                            <span className="font-semibold text-[var(--text-color)]" >{post.username}</span>
                            <span className=" text-[var(--semi-text-color)]" >{post.caption}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Posts


