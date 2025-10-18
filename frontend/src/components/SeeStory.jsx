import React, { useState, useEffect } from "react";
import { FaRegPaperPlane, FaChevronLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from './Footer';
import { MdDeleteSweep } from "react-icons/md";
import axios from 'axios';

const SeeStory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [stories, setStories] = useState(null);  // null initially for better checks
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('id');
    setUserId(id);

    if (location.state?.story) {
      const storyData = location.state.story;

      // Defensive check: storyData.status should be an array
      if (storyData.status && Array.isArray(storyData.status)) {
        setStories(storyData);
      } else {
        setStories(null);
      }

      if (typeof storyData.currentIndex === 'number') {
        setCurrentStoryIndex(storyData.currentIndex);
      } else {
        setCurrentStoryIndex(0);
      }
    }
  }, [location.state]);

  const handleNextStory = () => {
    if (!stories) return;

    if (currentStoryIndex < stories.status.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setIsDescOpen(false);
    } else {
      navigate(-1); // End of stories, go back
    }
  };

  const handlePrevStory = () => {
    if (!stories) return;

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

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent triggering story click

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/status/delete-story`,
        {
          data: { storyId: id },
          withCredentials: true,
        }
      );


      if (response.status === 200) {
        // Remove deleted story from stories.status
        setStories((prevStories) => {
          if (!prevStories) return prevStories;
          const updatedStatus = prevStories.status.filter(story => story._id !== id);
          // Adjust currentStoryIndex if needed
          const newIndex = currentStoryIndex >= updatedStatus.length ? updatedStatus.length - 1 : currentStoryIndex;
          setCurrentStoryIndex(newIndex >= 0 ? newIndex : 0);

          return {
            ...prevStories,
            status: updatedStatus,
          };
        });
      }
      navigate("/profile")
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  if (!stories || !stories.status || stories.status.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  // Defensive fallback for currentStory
  const currentStory = stories.status[currentStoryIndex] || {};

  return (
    <>
      <div
        className="relative w-full h-[calc(100vh-70px)] bg-black overflow-hidden cursor-pointer"
        onClick={handleScreenClick}
      >
        {/* Progress Bars */}
        <div className="absolute top-0 left-0 right-0 z-20 p-3 flex gap-1">
          {stories.status.map((story, index) => (
            <div
              key={story._id || index}
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
          src={currentStory.image || ""}
          alt="Story"
          className="w-full h-full object-contain"
          onError={(e) => { e.target.src = '/fallback-image.png'; }} // optional fallback image
        />

        {/* Header */}
        <div className="absolute w-full top-8 py-3 px-4 left-0 right-0 flex items-center justify-between text-white z-10">
          <div className="flex items-center gap-3 relative w-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(-1);
              }}
              className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
            >
              <FaChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 ml-3 ">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/search-profile/${stories.userData?.username || ''}`);
                }}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-white cursor-pointer"
              >
                <img
                  src={stories.userData?.profile || '/default-profile.png'}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm">
                <p className="font-semibold">{stories.userData?.fullName || "Unknown User"}</p>
                <p className="text-xs opacity-80">
                  @{stories.userData?.username || "unknown"} • {currentStory.category || ""}
                </p>
              </div>
            </div>

            {/* Delete button only if story belongs to logged in user */}
            {currentStory.statusBy === userId && (
              <MdDeleteSweep
                onClick={(e) => handleDelete(e, currentStory._id)}
                className="p-2 bg-black/40 rounded-full h-11 w-11 absolute right-0  cursor-pointer hover:bg-red-600 transition-colors"
                title="Delete Story"
              />
            )}
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
              isDescOpen ? "h-auto overflow-y-auto" : "max-h-16 overflow-hidden"
            }`}
          >
            <p className="text-sm leading-relaxed">
              {isDescOpen
                ? currentStory.caption
                : currentStory.caption.length > 50
                ? currentStory.caption.slice(0, 50) + "..."
                : currentStory.caption}
              {!isDescOpen && currentStory.caption.length > 50 && (
                <span className="text-blue-300 ml-1 cursor-pointer">more</span>
              )}
              {isDescOpen && (
                <span className="text-blue-300 ml-1 cursor-pointer">hide</span>
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
