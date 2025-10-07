import React from 'react'
import { BiHomeAlt2 } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { LuPlus, LuVideo } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";

import { useNavigate, useLocation } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-[var(--bg-color)] h-16">
            <div className="max-w-3xl mx-auto px-4 py-3 flex justify-around items-center">
                <button onClick={() => navigate("/")} className={`p-2 ${path === "/" && "bg-[var(--button-color)] rounded-full text-[var(--text-secondry-color)]"} text-[var(--text-color)]`}>
                    <BiHomeAlt2 className="w-6 h-6" />
                </button>
                <button onClick={() => navigate("/search")} className={`p-2 ${path === "/search" && "bg-[var(--button-color)] rounded-full text-[var(--text-secondry-color)]"} text-[var(--text-color)]`}>
                    <FiSearch className="w-6 h-6" />
                </button>
                <button onClick={() => navigate("/upload")} className={`p-2 ${path === "/upload" && "bg-[var(--button-color)] rounded-full text-[var(--text-secondry-color)]"} text-[var(--text-color)]`}>
                    <LuPlus className="w-6 h-6" />
                </button>
                <button onClick={() => navigate("/reel")} className={`p-2 ${path === "/reel" && "bg-[var(--button-color)] rounded-full text-[var(--text-secondry-color)]"} text-[var(--text-color)]`}>
                    <LuVideo className="w-6 h-6" />
                </button>
                <button onClick={() => navigate("/profile")} className={`p-2 ${path === "/profile" && "bg-[var(--button-color)] rounded-full text-[var(--text-secondry-color)]"} text-[var(--text-color)]`}>
                    <FaRegUser className="w-6 h-6" />
                </button>
            </div>
        </nav>
    )
}

export default Footer;
