import React from 'react'
import { IoIosNotifications } from "react-icons/io";
import ThemeToggle from './ThemeToggle';
import { useNavigate } from 'react-router-dom'


function Header() {
    const navigate = useNavigate()
    return (
        <header className="">
            <div className="max-w-3xl mx-auto px-3 py-3 flex justify-between items-center">
                <div className="relative">
                    <div className="absolute -top-1 -left-1 w-4 h-4 bg-[var(--main-color)] opacity-40 rounded-full animate-pulse-slow"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[var(--main-color)] opacity-30 rounded-full animate-ping-slow"></div>
                    
                    <h1 
                        onClick={() => navigate("/")} 
                        className="text-2xl font-bold text-[var(--text-color)] cursor-pointer relative group"
                    >
                        <span className="relative z-10">
                            social
                            <span className="text-[var(--button-color)] ">.</span>
                            in
                        </span>
                        
                        {/* Hover underline effect */}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--main-color)] transition-all duration-300 group-hover:w-full"></span>
                    </h1>
                </div>
                
                <div className="flex space-x-6">
                    <ThemeToggle />

                    <button onClick={() => navigate("/notification")} className="py-2 text-[var(--text-color)]">
                        <IoIosNotifications className="w-6 h-6" />
                    </button>
                    <button onClick={() => navigate("/chat")} className="py-2 text-[var(--text-color)]">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header