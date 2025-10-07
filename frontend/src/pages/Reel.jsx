import React, { useState, useRef, useEffect } from 'react';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Reel() {
    const navigate = useNavigate();

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [commentText, setCommentText] = useState('');

    const [comments, setComments] = useState([
        {
            id: 1,
            username: 'mountain_lover',
            userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            text: 'This is absolutely breathtaking! 😍',
            likes: 24,
            timestamp: '1 hour ago',
            liked: false
        },
        {
            id: 2,
            username: 'adventure_seeker',
            userImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
            text: 'Which trail is this? Planning to visit next month! 🥾',
            likes: 18,
            timestamp: '45 minutes ago',
            liked: false
        }
    ]);
    const videoRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;

                    if (entry.isIntersecting) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            },
            {
                threshold: 0.8 // 80% of the video must be visible
            }
        );

        videoRefs.current.forEach((video) => {
            if (video) observer.observe(video);
        });

        return () => {
            videoRefs.current.forEach((video) => {
                if (video) observer.unobserve(video);
            });
        };
    }, []);

    // Sample reel data
    const reelsData = [{
        id: 1,
        username: 'travel_diaries',
        userImage: 'https://tse2.mm.bing.net/th/id/OIP.mMxyhd1ycp5u5N0r2tilogHaEK?pid=Api&P=0&h=180',
        caption: 'Exploring the beautiful mountains of Switzerland #travel #adventure #nature',
        videoUrl: 'https://www.pexels.com/download/video/34112142/',
        music: 'Original Sound - Travel Diaries',
        location: 'Swiss Alps, Switzerland'
    }, {
        id: 2,
        username: 'travel_diaries',
        userImage: 'https://tse2.mm.bing.net/th/id/OIP.mMxyhd1ycp5u5N0r2tilogHaEK?pid=Api&P=0&h=180',
        caption: 'Exploring the beautiful mountains of Switzerland #travel #adventure #nature',
        videoUrl: 'https://www.pexels.com/download/video/4812203/',
        music: 'Original Sound - Travel Diaries',
        location: 'Swiss Alps, Switzerland'
    }, {
        id: 3,
        username: 'travel_diaries',
        userImage: 'https://tse2.mm.bing.net/th/id/OIP.mMxyhd1ycp5u5N0r2tilogHaEK?pid=Api&P=0&h=180',
        caption: 'Exploring the beautiful mountains of Switzerland #travel #adventure #nature',
        videoUrl: 'https://www.pexels.com/download/video/8859849/',
        music: 'Original Sound - Travel Diaries',
        location: 'Swiss Alps, Switzerland'
    },]

    // Toggle play / pause
    const togglePlay = (index) => {
        const video = videoRefs.current[index];
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };


    const handleTimeUpdate = () => {
        if (videoRefs.current) {
            setCurrentTime(videoRefs.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRefs.current) {
            setDuration(videoRefs.current.duration);
        }
    };

    const handleLike = () => {
        const newLiked = !liked;
        setLiked(newLiked);
    };

    const handleSave = () => {
        setSaved(!saved);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const trimmed = commentText.trim();
        if (!trimmed) return;

        const newComment = {
            id: comments.length + 1,
            username: 'current_user',
            userImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
            text: trimmed,
            likes: 0,
            timestamp: 'Just now',
            liked: false
        };
        setComments([newComment, ...comments]);
        setCommentText('');
    };

    const handleCommentLike = (commentId) => {
        setComments(comments.map(c => {
            if (c.id === commentId) {
                const toggled = !c.liked;
                return {
                    ...c,
                    liked: toggled,
                    likes: toggled ? c.likes + 1 : c.likes - 1
                };
            }
            return c;
        }));
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-[var(--bg-color)] relative  ">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 pt-8 px-4 bg-transparent">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            className="flex items-center space-x-2"
            style={{ color: 'var(--text-color)' }}
            onClick={() => navigate(-1)}
          >
            <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-lg font-semibold text-white">Reels</span>
          </button>
          <button style={{ color: 'var(--text-color)' }}>
            <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </header>

            {/* Video and Controls */}
            <div className="h-screen overflow-y-scroll snap-y  snap-mandatory">
                {reelsData.map((reel, index) => (
                    <div key={reel.id} className='h-screen'>
                        <div
                            key={reel.id}
                            className="h-[calc(100vh-60px)] w-full flex justify-center items-center snap-start "
                        >
                            <div className="relative w-full max-w-md h-full">
                                <video
                                    ref={(el) => (videoRefs.current[index] = el)}
                                    className="w-full h-full object-cover"
                                    src={reel.videoUrl}
                                    muted
                                    loop
                                    playsInline
                                    controls={false}
                                    onClick={() => togglePlay(index)}
                                />
                                {/* Play overlay */}
                                {!isPlaying && (
                                    <button
                                        className="absolute inset-0 flex items-center justify-center"
                                        onClick={() => togglePlay(index)}
                                    >
                                        <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </button>
                                )}

                                {/* Right side action icons */}
                                <div className="absolute right-2 bottom-15 flex flex-col items-center space-y-3">
                                    {/* Profile */}
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white mb-2">
                                        <img
                                            src={reel.userImage}
                                            alt={reel.username}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Like */}
                                    <div className="flex flex-col items-center">
                                        <button
                                            onClick={handleLike}
                                            className="p-2 rounded-full transition-transform hover:scale-110"
                                        >
                                            <svg
                                                className={`w-7 h-7`}
                                                fill={liked ? 'red' : 'none'}
                                                stroke={liked ? 'red' : 'white'}
                                                strokeWidth={1.5}
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312
                       2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765
                        3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                                />
                                            </svg>
                                        </button>
                                        <span className="text-white text-sm font-medium mt-1">{reel.likes?.toLocaleString() || '2.5K'}</span>
                                    </div>

                                    {/* Comments */}
                                    <div className="flex flex-col items-center">
                                        <button
                                            onClick={() => setShowComments(true)}
                                            className="p-2 rounded-full transition-transform hover:scale-110"
                                        >
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M8 12h.01M12 12h.01M16 12h.01
                      M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0
                      01-4.255-.949L3 20l1.395-3.72C3.512
                      15.042 3 13.574 3 12c0-4.418 4.03-8
                      9-8s9 3.582 9 8z"
                                                />
                                            </svg>
                                        </button>
                                        <span className="text-white text-sm font-medium mt-1">{comments.length}</span>
                                    </div>

                                    {/* Share */}
                                    <button className="p-2 rounded-full transition-transform hover:scale-110">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M8.684 13.342C8.886 12.938 9 12.482
                      9 12c0-.482-.114-.938-.316-1.342m0
                      2.684a3 3 0 110-2.684m0 2.684l6.632
                      3.316m-6.632-6l6.632-3.316m0 0a3 3
                      0 105.367-2.684 3 3 0 00-5.367
                      2.684zm0 9.316a3 3 0 105.368
                      2.684 3 3 0 00-5.368-2.684z"
                                            />
                                        </svg>
                                    </button>

                                    {/* Save */}
                                    <button
                                        onClick={handleSave}
                                        className="p-2 rounded-full transition-transform hover:scale-110"
                                    >
                                        <svg
                                            className="w-7 h-7"
                                            fill={saved ? 'var(--button-color)' : 'none'}
                                            stroke="white"
                                            strokeWidth={1.5}
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012
                   2v16l-7-3.5L5 21V5z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Bottom content overlay */}
                                <div className="absolute left-4 bottom-0 right-20 text-white">
                                    <div className="flex flex-col gap-3 items-start space-x-3 mb-2">
                                        <div className='flex gap-3'>
                                            <span className="font-semibold text-lg">@{reel.username}</span>
                                            <button className="px-4 py-1 text-sm font-semibold rounded-full border border-white
                     hover:bg-white hover:text-black transition-colors">
                                                Follow
                                            </button>
                                        </div>
                                        <p className="text-sm mb-15">{reel.caption}</p>
                                    </div>



                                </div>

                                {/* Progress bar */}
                                <div className="absolute bottom-0 left-0 right-0">
                                    <div className="w-full h-1 bg-gray-600">
                                        <div
                                            className="h-full transition-all duration-100"
                                            style={{
                                                backgroundColor: 'var(--button-color)',
                                                width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Comments Panel */}
            {showComments && (
                <div className="fixed inset-0 z-50 bg-[var(--bg-color)]">
                    <div className="h-full flex flex-col">
                        {/* Header */}
                        <div className="p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                            <div className="flex items-center justify-between">
                                <button onClick={() => setShowComments(false)} style={{ color: 'var(--text-color)' }}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <span className="text-lg font-semibold" style={{ color: 'var(--text-color)' }}>
                                    Comments
                                </span>
                                <div className="w-6"></div>
                            </div>
                        </div>

                        {/* Comment list */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {comments.map((c) => (
                                <div key={c.id} className="flex space-x-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <img src={c.userImage} alt={c.username} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <span className="font-semibold text-sm" style={{ color: 'var(--text-color)' }}>
                                                    {c.username}
                                                </span>{' '}
                                                <span className="text-sm" style={{ color: 'var(--text-color)' }}>
                                                    {c.text}
                                                </span>
                                            </div>
                                            <button onClick={() => handleCommentLike(c.id)}>
                                                <svg
                                                    className="w-4 h-4"
                                                    fill={c.liked ? 'red' : 'none'}
                                                    stroke={c.liked ? 'red' : 'white'}
                                                    strokeWidth={2}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5
                            -1.935 0-3.597 1.126-4.312 2.733
                            -.715-1.607-2.377-2.733-4.313-2.733
                            C5.1 3.75 3 5.765 3 8.25c0
                            7.22 9 12 9 12s9-4.78 9-12z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="flex items-center space-x-4 mt-1">
                                            <span className="text-xs" style={{ color: 'var(--semi-text-color)' }}>
                                                {c.timestamp}
                                            </span>
                                            <span className="text-xs" style={{ color: 'var(--semi-text-color)' }}>
                                                {c.likes} {c.likes === 1 ? 'like' : 'likes'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add comment */}
                        <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                            <form onSubmit={handleCommentSubmit} className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                                        alt="You"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <input
                                    type="text"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="flex-1 bg-transparent border-none outline-none text-sm"
                                    style={{ color: 'var(--text-color)' }}
                                />
                                <button
                                    type="submit"
                                    className="text-sm font-semibold"
                                    style={{
                                        color: commentText.trim() ? 'var(--button-color)' : 'var(--semi-text-light-color)',
                                        cursor: commentText.trim() ? 'pointer' : 'not-allowed'
                                    }}
                                    disabled={!commentText.trim()}
                                >
                                    Post
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default Reel;

