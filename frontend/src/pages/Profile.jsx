import React from 'react'
import Footer from '../components/Footer';

function Profile() {
    const posts = [
        { id: 1, image: "https://images.pexels.com/photos/3751397/pexels-photo-3751397.jpeg" },
        { id: 2, image: "https://images.pexels.com/photos/158465/waterlily-pink-water-lily-water-plant-158465.jpeg" },
        { id: 3, image: "https://images.pexels.com/photos/289586/pexels-photo-289586.jpeg" },
        { id: 4, image: "https://images.pexels.com/photos/906097/pexels-photo-906097.jpeg" },
        { id: 5, image: "https://images.pexels.com/photos/207353/pexels-photo-207353.jpeg" },
        { id: 6, image: "https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg" },
        { id: 7, image: "https://images.pexels.com/photos/96627/pexels-photo-96627.jpeg" },
    ];

    return (
        <div className="min-h-screen text-[var(--text-color)] bg-[var(--bg-color)]">
            

            {/* Profile Content */}
            <div className=" max-w-3xl mx-auto  pt-6">
                {/* Profile Header */}
                <div className="px-3 flex items-start space-x-6 mb-2">
                    {/* Profile Image */}
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                            src="https://images.pexels.com/photos/3751397/pexels-photo-3751397.jpeg" 
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    {/* Profile Stats */}
                    <div className="flex-1 ">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-xl font-semibold" style={{ color: 'var(--text-color)' }}>allsesmith</h1>
                           
                            <button style={{ color: 'var(--text-color)' }}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Stats */}
                        <div className="flex space-x-6 mb-4">
                            <div className="text-center">
                                <div className="font-semibold" style={{ color: 'var(--text-color)' }}>245</div>
                                <div className="text-sm" style={{ color: 'var(--text-color)' }}>posts</div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold" style={{ color: 'var(--text-color)' }}>7,850</div>
                                <div className="text-sm" style={{ color: 'var(--text-color)' }}>followers</div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold" style={{ color: 'var(--text-color)' }}>715</div>
                                <div className="text-sm" style={{ color: 'var(--text-color)' }}>following</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="px-3 mb-6 ">
                    <h2 className="font-semibold mb-1" style={{ color: 'var(--text-color)' }}>Alise Smith</h2>
                    <p className="text-sm mb-2" style={{ color: 'var(--semi-text-color)' }}>Fashion designer, London UK</p>
                    <p className="text-sm" style={{ color: 'var(--semi-text-color)' }}>Creating beautiful designs ✨</p>
                </div>

                {/* Action Buttons */}
                <div className="px-3 flex space-x-2 mb-6">
                    <button className="flex-1 py-2 rounded text-sm font-medium text-center" 
                            style={{ backgroundColor: 'var(--button-color)', color: 'var(--bg-color)' }}>
                        Follow
                    </button>
                    <button className="flex-1 py-2 rounded text-sm font-medium text-center border" 
                            style={{ borderColor: 'var(--semi-text-light-color)', color: 'var(--text-color)' }}>
                        Send Message
                    </button>
                </div>

                {/* Highlights Stories */}
                <div className="px-3 mb-3">
                    <div className="flex space-x-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {['Travel', 'Work', 'Art', 'Food'].map((highlight, index) => (
                            <div key={index} className="flex flex-col items-center space-y-1 flex-shrink-0">
                                <div className="w-16 h-16 rounded-full p-0.5" style={{ background: 'linear-gradient(to right, var(--button-color), #2DD4BF)' }}>
                                    <div className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-color)' }}>
                                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-medium" 
                                             style={{ backgroundColor: 'var(--semi-text-light-color)', color: 'var(--text-color)' }}>
                                            {highlight.charAt(0)}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs" style={{ color: 'var(--text-color)' }}>{highlight}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="mb-4 ">
                    <div className="flex" style={{ borderColor: 'var(--semi-text-light-color)' }}>
                        <button className="flex-1 py-3 text-sm font-medium text-center border-b-2" 
                                style={{ borderColor: 'var(--button-color)', color: 'var(--text-color)' }}>
                            <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            Posts
                        </button>
                        <button className="flex-1 py-3 text-sm font-medium text-center" 
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
                <div className="grid grid-cols-3 gap-1 pb-20">
                    {posts.map((post) => (
                        <div key={post.id} className="aspect-square bg-gray-700 rounded-none overflow-hidden">
                            <img 
                                src={post.image} 
                                alt={`Post ${post.id}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* footer */}
            <Footer />

            
        </div>
    )
}

export default Profile