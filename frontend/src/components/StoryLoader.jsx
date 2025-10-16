import React from "react";

const StoryLoader = ({ screenheight, screenwidth }) => {
    return (
        <div className={`${screenheight} ${screenwidth} px-3 bg-[var(--bg-color)] flex gap-3 items-center justify-start text-[var(--text-color)] `}>
            <div className="flex flex-col items-center space-y-1 flex-shrink-0 ">
                <div className="w-16 h-16 bg-[var(--main-color)] rounded-full p-0.5 ">
                    <div className="w-full h-full  bg-[var(--bg-color)] rounded-full flex items-center justify-center">
                        <div className="w-14 h-14 bg-gray-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-[#ffffff]">You</span>
                        </div>
                    </div>
                </div>
                <span className="text-xs text-[var(--text-color)]">Your Story</span>
            </div>

            <div className="relative w-16 h-16 mb-4 animate-spin">
                
                <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-[var(--button-color)] to-[#2DD4BF]">
                    <div className="w-full h-full  rounded-full animate-spin" />
                </div>
            </div>
            <div className="relative w-16 h-16 mb-4 animate-spin">
                
                <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-[var(--button-color)] to-[#2DD4BF]">
                    <div className="w-full h-full  rounded-full animate-spin" />
                </div>
            </div>
            <div className="relative w-16 h-16 mb-4 animate-spin">
                
                <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-[var(--button-color)] to-[#2DD4BF]">
                    <div className="w-full h-full  rounded-full animate-spin" />
                </div>
            </div>
            
        </div>
    );
};

export default StoryLoader;
