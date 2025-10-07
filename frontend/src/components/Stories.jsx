import React from 'react'

function Stories() {
    return (
        <div className="py-2">
            <div className="max-w-3xl mx-auto pl-3">
                <div className="flex space-x-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {/* Your Story */}
                    <div className="flex flex-col items-center space-y-1 flex-shrink-0">
                        <div className="w-16 h-16 bg-[var(--main-color)] rounded-full p-0.5">
                            <div className="w-full h-full bg-[var(--bg-color)] rounded-full flex items-center justify-center">
                                <div className="w-14 h-14 bg-gray-500 rounded-full flex items-center justify-center">
                                    <span className="text-xs text-[#ffffff]">You</span>
                                </div>
                            </div>
                        </div>
                        <span className="text-xs text-[var(--text-color)]">Your Story</span>
                    </div>

                    {/* Other Stories */}
                    {[
                        { name: 'poems', emoji: '📝' },
                        { name: 'anthy, gum', emoji: '👫' },
                        { name: 'resemblance', emoji: '👥' },
                        { name: 'NIL, size', emoji: '📏' }
                    ].map((story, index) => (
                        <div key={index} className="flex flex-col items-center space-y-1 flex-shrink-0">
                            <div className="w-16 h-16 bg-[var(--main-color)] rounded-full p-0.5">
                                <div className="w-full h-full bg-[var(--bg-color)] rounded-full flex items-center justify-center">
                                    <div className="w-14 h-14 bg-gray-500 rounded-full flex items-center justify-center text-lg">
                                        {story.emoji}
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs text-[var(--text-color)]">{story.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Stories