import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Search() {
    useEffect(() => { console.log("search") }, [])
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestedUsers, setSuggestedUsers] = useState([])

    const categories = [
        { name: 'IGTV', icon: '📺' },
        { name: 'Shop', icon: '🛍️' },
        { name: 'Sports', icon: '⚽' },
        { name: 'Auto', icon: '🚗' },
        { name: 'Decor', icon: '🏠' },
        { name: 'Art', icon: '🎨' },
        { name: 'Food', icon: '🍕' },
        { name: 'Nature', icon: '🌿' }
    ];

    const handleSearchByUsername = async (quary) => {

        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/getUserByUsername/${quary}`, { withCredentials: true })

            // console.log(response.data.message)
            setSuggestedUsers(response.data.message)
        } catch (error) {
            console.log("Error in handleSearchByUsername  ", error)

        }
    }



    // const suggestedUsers = [
    //     { username: 'emma_watson', name: 'Emma Watson', image: 'https://images.pexels.com/photos/3751397/pexels-photo-3751397.jpeg' },
    //     { username: 'robertdowneyjr', name: 'Robert Downey Jr.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    //     { username: 'zendaya', name: 'Zendaya', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' }
    // ];

    const recentSearches = [
        { type: 'user', name: 'taylor_swift', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop' },
        { type: 'tag', name: '#makeup', icon: '🔍' },
        { type: 'user', name: 'cristiano', image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=100&h=100&fit=crop' },
        { type: 'tag', name: '#fitness', icon: '🔍' }
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 pt-8 px-4" style={{ backgroundColor: 'var(--bg-color)' }}>
                <div className="max-w-3xl mx-auto">
                    {/* Search Bar */}
                    <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5" style={{ color: 'var(--dark-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => {
                                const quary = e.target.value
                                setSearchQuery(quary); handleSearchByUsername(quary)
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

            {/* Main Content */}
            <div className="pt-24 pb-20 max-w-3xl mx-auto px-4">
                {searchQuery ? (
                    // Search Results
                    <div>
                        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-color)' }}>Results</h2>
                        {
                            suggestedUsers.length > 0 ?
                                <div className="mb-8">
                                    <div className="space-y-3">
                                        {suggestedUsers.map((user) => (
                                            <div key={user._id} onClick={() => navigate(`/search-profile/${user.username}`)} className="flex items-center justify-between p-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                                        <img
                                                            src={user.profile}
                                                            alt={user.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div> 
                                                    <div>
                                                        <div className="font-semibold" style={{ color: 'var(--text-color)' }}>{user.fullName}</div>
                                                        <div className="text-sm" style={{ color: 'var(--semi-text-color)' }}>{user.username}</div>
                                                    </div>
                                                </div>
                                                <button className="px-4 py-1 rounded text-sm font-medium"
                                                    style={{ backgroundColor: 'var(--button-color)', color: 'var(--bg-color)' }}>
                                                    Follow
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                :
                                <div className="text-center py-8" style={{ color: 'var(--semi-text-color)' }}>
                                    No results found for "{searchQuery}"
                                </div>
                        }
                    </div>
                ) : (
                    // Explore Content
                    <div>
                        {/* Categories */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-color)' }}>Browse Categories</h2>
                            <div className="grid grid-cols-4 gap-3">
                                {categories.map((category, index) => (
                                    <div
                                        key={index}
                                        onClick={()=> navigate(`/search/category/${category.name}`)}
                                        className=" aspect-square rounded-lg flex flex-col items-center justify-center p-2 text-center"
                                        style={{ backgroundColor: 'var(--semi-text-light-color)' }}
                                    >
                                        <span className="text-2xl mb-1">{category.icon}</span>
                                        <span className="text-xs font-medium" style={{ color: 'var(--button-color)' }}>
                                            {category.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>



                        {/* Suggested for You */}


                        {/* Recent Searches */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-color)' }}>Recent</h2>
                                <button className="text-sm" style={{ color: 'var(--button-color)' }}>Clear all</button>
                            </div>
                            <div className="space-y-3">
                                {recentSearches.map((search, index) => (
                                    <div key={index} className="flex items-center justify-between p-3">
                                        <div className="flex items-center space-x-3">
                                            {search.type === 'user' ? (
                                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                                    <img
                                                        src={search.image}
                                                        alt={search.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                                                    style={{ backgroundColor: 'var(--semi-text-light-color)' }}>
                                                    {search.icon}
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-medium" style={{ color: 'var(--text-color)' }}>{search.name}</div>
                                                <div className="text-xs capitalize" style={{ color: 'var(--semi-text-color)' }}>
                                                    {search.type}
                                                </div>
                                            </div>
                                        </div>
                                        <button style={{ color: 'var(--text-color)' }}>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Bar */}
            <Footer />
        </div>
    )
}

export default Search