import React, { useState, useEffect } from "react";
import { FaRegPaperPlane, FaChevronLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from './Footer';

const SeeStory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isDescOpen, setIsDescOpen] = useState(false);

  useEffect(() => {
    if (location.state?.story) {
      setStories(location.state.story);
    }
    if (location.state?.currentIndex) {
      setCurrentStoryIndex(location.state.currentIndex);
    }
  }, [location.state]);

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setIsDescOpen(false);
    } else {
      navigate(-1); // End of stories
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
      setIsDescOpen(false);
    }
  };

  const handleOpenDesc = () => {
    setIsDescOpen((prev) => !prev);
  };

  const handleScreenClick = (e) => {
    const screenWidth = window.innerWidth;
    const clickX = e.clientX;
    if (clickX < screenWidth / 2) {
      handlePrevStory();
    } else {
      handleNextStory();
    }
  };

  if (stories.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <p className="text-white">No stories available</p>
      </div>
    );
  }

  const currentStory = stories[currentStoryIndex];

  return (
    <>
      <div
        className="relative w-full h-[calc(100vh-70px)] bg-black overflow-hidden cursor-pointer"
        onClick={handleScreenClick}
      >
        {/* Progress Bars */}
        <div className="absolute top-0 left-0 right-0 z-20 p-3 flex gap-1">
          {stories.map((_, index) => (
            <div
              key={index}
              className="h-1 flex-1 bg-gray-600 rounded-full overflow-hidden"
            >
              <div
                className={`h-full bg-white transition-all duration-300 ${
                  index < currentStoryIndex
                    ? "w-full"
                    : index === currentStoryIndex
                    ? "w-full animate-progress"
                    : "w-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Story Image */}
        <img
          src={currentStory.image}
          alt="Story"
          className="w-full h-full object-contain"
        />

        {/* Header */}
        <div className="absolute w-full top-8 py-3 px-4 left-0 right-0 flex items-center justify-between text-white z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(-1);
              }}
              className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
            >
              <FaChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <img
                  src={currentStory.ststusByProfile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm">
                <p className="font-semibold">{currentStory.ststusByFullName}</p>
                <p className="text-xs opacity-80">
                  @{currentStory.ststusByUsername} • {currentStory.category}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Caption */}
        {currentStory.caption && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDesc();
            }}
            className={`absolute bottom-20 left-4 right-4 bg-black/40 backdrop-blur-sm text-white p-4 rounded-lg transition-all duration-300 overflow-hidden ${
              isDescOpen ? "h-auto overflow-y-auto " : "max-h-16 overflow-hidden"
            }`}
          >
            <p className="text-sm leading-relaxed">
              {isDescOpen
                ? currentStory.caption 
                : currentStory.caption.length > 50
                ? currentStory.caption.slice(0, 50) + "..."
                : currentStory.caption }
              {!isDescOpen && currentStory.caption.length > 50 && (
                <span className="text-blue-300 ml-1">more</span>
              )}
              {isDescOpen  && (
                <span className="text-blue-300 ml-1">hide</span>
              )}
            </p>
          </div>
        )}

        {/* Message Input */}
        <div
          className="absolute bottom-4 left-4 right-4 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-md px-4 py-3 border border-white/20">
            <input
              type="text"
              placeholder="Send message"
              className="bg-transparent text-sm placeholder:text-gray-300 text-white focus:outline-none w-full"
            />
            <button className="flex items-center gap-2 ml-3 text-white hover:text-blue-300 transition-colors">
              <FaRegPaperPlane className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SeeStory;
