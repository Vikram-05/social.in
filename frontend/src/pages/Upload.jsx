import React, { useState, useRef, useEffect } from 'react'
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

function Upload() {
    useEffect(() => { console.log("upload") }, [])


    const navigate = useNavigate()
    const [selectedTab, setSelectedTab] = useState('POST');
    const [caption, setCaption] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileIntoObjectURL, setFileIntoObjectURL] = useState("")
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [audioFile, setAudioFile] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [hideLikes, setHideLikes] = useState(false);
    const [disableComments, setDisableComments] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const fileInputRef = useRef(null);
    const audioInputRef = useRef(null);
    const coverInputRef = useRef(null);

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

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            setSelectedFiles(files);
        }

        const convertedURL = URL.createObjectURL(files[0])
        setFileIntoObjectURL(convertedURL)
    };

    useEffect(() => {
        return () => {
            if (fileIntoObjectURL) {
                URL.revokeObjectURL(fileIntoObjectURL);
            }
        };
    }, [fileIntoObjectURL]);


    const handleAudioSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAudioFile(file.name);
        }
    };

    const handleCoverSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCoverImage(URL.createObjectURL(file));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const triggerAudioInput = () => {
        audioInputRef.current?.click();
    };

    const triggerCoverInput = () => {
        coverInputRef.current?.click();
    };

    const removeFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleShare = async () => {
        // alert(`${selectedTab.toUpperCase()} shared successfully!`);
        // console.log("file : ", fileIntoObjectURL)
        setIsLoading(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/post/newpost`,
                {
                    "postType": selectedTab,
                    "postImageOrVideoURL": fileIntoObjectURL,
                    "postCaption": caption,
                    "postCategory": selectedCategory,
                    "isLikeHide": hideLikes,
                    "isCommentHide": disableComments
                },
                {
                    withCredentials: true
                }
            )
            // console.log("data => ",response.data)
            setSelectedFiles([]);
            setCaption('');
            setAudioFile('');
            setCoverImage('');
            setSelectedCategory('');
            navigate("/")
        } catch (error) {
            console.log("Error in upload profile page", error)
        }
        finally {
            setIsLoading(false)
        }
    };


    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            {/* Hidden file inputs */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple={selectedTab === 'post'}
                accept={selectedTab === 'post' ? 'image/*,video/*' : selectedTab === 'reel' ? 'video/*' : 'image/*,video/*'}
                className="hidden"
            />
            <input
                type="file"
                ref={audioInputRef}
                onChange={handleAudioSelect}
                accept="audio/*"
                className="hidden"
            />
            <input
                type="file"
                ref={coverInputRef}
                onChange={handleCoverSelect}
                accept="image/*"
                className="hidden"
            />

            {/* Header */}
            <header className="border-white fixed top-0 left-0 right-0 z-50 px-4"
                style={{ backgroundColor: 'var(--bg-color)', borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="max-w-3xl mx-auto flex items-center justify-between py-3">
                    <button
                        className="flex items-center space-x-2"
                        style={{ color: 'var(--text-color)' }}
                        onClick={() => navigate(-1)}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-lg font-semibold">New {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}</span>
                    </button>
                    <button
                        className="text-sm font-semibold"
                        style={{
                            color: selectedFiles.length > 0 ? 'var(--button-color)' : 'var(--semi-text-light-color)',
                            cursor: selectedFiles.length > 0 ? 'pointer' : 'not-allowed'
                        }}
                        onClick={selectedFiles.length > 0 ? handleShare : undefined}
                        disabled={selectedFiles.length === 0}
                    >
                        Upload
                    </button>
                </div>

                {/* Tab Selection */}
                <div className="flex border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    {['POST', 'REEL', 'STORY'].map((tab) => (
                        <button
                            key={tab}
                            className={`flex-1 py-3 text-center font-medium ${selectedTab === tab ? 'border-b-2' : ''}`}
                            style={{
                                color: 'var(--text-color)',
                                borderColor: selectedTab === tab ? 'var(--button-color)' : 'transparent'
                            }}
                            onClick={() => {
                                setSelectedTab(tab);
                                setSelectedFiles([]);
                            }}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </div>
            </header>

            {/* Main Content */}
            <div className="pt-32 pb-28 max-w-3xl mx-auto px-4">
                {/* Upload Area */}
                <div className="mb-6">
                    <div
                        className="border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors hover:border-[var(--button-color)]"
                        style={{
                            borderColor: selectedFiles.length > 0 ? 'var(--button-color)' : 'var(--semi-text-light-color)',
                            backgroundColor: selectedFiles.length > 0 ? 'rgba(20, 184, 166, 0.1)' : 'transparent'
                        }}
                        onClick={triggerFileInput}
                    >
                        {selectedFiles.length > 0 ? (
                            <div className="space-y-4">
                                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl"
                                    style={{ backgroundColor: 'var(--button-color)', color: 'var(--bg-color)' }}>
                                    ✓
                                </div>
                                <div>
                                    <div className="font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
                                        {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
                                    </div>
                                    <div className="text-sm" style={{ color: 'var(--semi-text-color)' }}>
                                        Click to change selection
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {selectedTab === 'post' ? (
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl"
                                            style={{ backgroundColor: 'var(--semi-text-light-color)' }}>
                                            📸
                                        </div>
                                        <div className="font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
                                            Select photos and videos
                                        </div>
                                        <button
                                            className="px-6 py-2 rounded text-sm font-medium"
                                            style={{ backgroundColor: 'var(--button-color)', color: 'var(--bg-color)' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                triggerFileInput();
                                            }}
                                        >
                                            Select from device
                                        </button>
                                    </div>
                                ) : selectedTab === 'reel' ? (
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl"
                                            style={{ backgroundColor: 'var(--semi-text-light-color)' }}>
                                            🎬
                                        </div>
                                        <div className="font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
                                            Create a new reel
                                        </div>
                                        <button
                                            className="px-6 py-2 rounded text-sm font-medium"
                                            style={{ backgroundColor: 'var(--button-color)', color: 'var(--bg-color)' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                triggerFileInput();
                                            }}
                                        >
                                            Select Video
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl"
                                            style={{ backgroundColor: 'var(--semi-text-light-color)' }}>
                                            ✨
                                        </div>
                                        <div className="font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
                                            Create a story
                                        </div>
                                        <button
                                            className="px-6 py-2 rounded text-sm font-medium"
                                            style={{ backgroundColor: 'var(--button-color)', color: 'var(--bg-color)' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                triggerFileInput();
                                            }}
                                        >
                                            Create Story
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Preview Section */}
                {selectedFiles.length > 0 && (
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold" style={{ color: 'var(--text-color)' }}>Preview</h3>
                            <span className="text-sm" style={{ color: 'var(--semi-text-color)' }}>
                                {selectedFiles.length} {selectedFiles.length === 1 ? 'item' : 'items'}
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="aspect-square rounded-lg overflow-hidden relative group">
                                    <div
                                        className="w-full h-full flex items-center justify-center bg-gray-600"
                                        style={{ backgroundColor: 'var(--semi-text-light-color)' }}
                                    >
                                        <span className="text-sm" style={{ color: 'var(--text-color)' }}>
                                            {file.type.startsWith('image/') ? '🖼️' : '🎥'}
                                        </span>
                                    </div>
                                    <button
                                        className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: 'var(--text-color)' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile(index);
                                        }}
                                    >
                                        ×
                                    </button>
                                    <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black/70 to-transparent">
                                        <span className="text-xs text-white truncate block">
                                            {file.name.length > 10 ? file.name.substring(0, 10) + '...' : file.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Caption and Details */}
                <div className="space-y-4">
                    {/* Caption */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                            Caption
                        </label>
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write a caption..."
                            rows="3"
                            className="w-full px-4 py-3 rounded-lg text-sm resize-none"
                            style={{
                                backgroundColor: 'var(--semi-text-light-color)',
                                color: 'var(--dark-color)',
                                border: 'none',
                                outline: 'none'
                            }}
                        />
                        <div className="flex justify-between items-center mt-1">
                            <div className="flex space-x-2">
                                <button
                                    style={{ color: 'var(--semi-text-color)' }}
                                    onClick={() => setCaption(prev => prev + ' 😊')}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                <button
                                    style={{ color: 'var(--semi-text-color)' }}
                                    onClick={() => setCaption(prev => prev + ' @')}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </button>
                            </div>
                            <span className="text-xs" style={{ color: caption.length > 2000 ? '#ef4444' : 'var(--semi-text-color)' }}>
                                {caption.length}/2,200
                            </span>
                        </div>
                    </div>

                    {/* Category Section */}
                    <div>
                        <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-color)' }}>
                            Add Category
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    className={`aspect-square rounded-lg flex flex-col items-center justify-center p-2 text-center transition-all ${selectedCategory === category.name
                                        ? 'border-2 scale-105'
                                        : 'border border-transparent '
                                        }`}
                                    style={{
                                        backgroundColor: selectedCategory === category.name
                                            ? 'var(--button-color)'
                                            : 'var(--semi-text-light-color)',
                                        borderColor: selectedCategory === category.name
                                            ? 'var(--button-color)'
                                            : 'transparent',
                                        color: selectedCategory === category.name
                                            ? 'var(--bg-color)'
                                            : 'var(--dark-color)'
                                    }}
                                    onClick={() => setSelectedCategory(
                                        selectedCategory === category.name ? '' : category.name
                                    )}
                                >
                                    <span className="text-xl mb-1">{category.icon}</span>
                                    <span className="text-xs font-medium">{category.name}</span>
                                </button>
                            ))}
                        </div>
                        {selectedCategory && (
                            <div className="mt-2 text-sm" style={{ color: 'var(--button-color)' }}>
                                Selected: {selectedCategory}
                            </div>
                        )}
                    </div>


                    {/* Advanced Settings */}
                    <div className="border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                        {/* Toggle Header */}
                        <button
                            className="flex items-center justify-between w-full py-3 focus:outline-none"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                        >
                            <span className="text-base font-medium" style={{ color: 'var(--text-color)' }}>Advanced Settings</span>
                            <svg
                                className={`w-5 h-5 transform transition-transform duration-200 ${showAdvanced ? 'rotate-90' : 'rotate-0'}`}
                                style={{ color: 'var(--semi-text-color)' }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Collapsible Content */}
                        {showAdvanced && (
                            <div
                                className="mt-4 rounded-xl p-4 space-y-5 transition-all duration-300 ease-in-out"
                                style={{
                                    backgroundColor: 'var(--semi-text-light-color)',
                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                                }}
                            >
                                {/* Hide Like Count */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-sm font-medium block" style={{ color: 'var(--dark-color)' }}>
                                            Hide like count
                                        </span>
                                        <span className="text-xs mt-1 block" style={{ color: 'var(--dark-color)' }}>
                                            Hide the number of likes on this post
                                        </span>
                                    </div>
                                    <label onChange={() => setHideLikes(prev => !prev)} className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                        />
                                        <div
                                            className={`w-11 h-6 rounded-full transition-colors duration-200 relative`}
                                            style={{
                                                backgroundColor: hideLikes ? 'var(--button-color)' : 'var(--semi-text-color)'
                                            }}
                                        >
                                            <div
                                                className={`absolute top-0.5 w-5 h-5 rounded-full shadow transform transition-transform duration-200`}
                                                style={{
                                                    backgroundColor: 'var(--bg-color)',
                                                    left: hideLikes ? '1.375rem' : '0.125rem'
                                                }}
                                            ></div>
                                        </div>
                                    </label>
                                </div>

                                {/* Disable Comments */}
                                <div className="flex items-center justify-between ">
                                    <div>
                                        <span className="text-sm font-medium block" style={{ color: 'var(--dark-color)' }}>
                                            Turn off commenting
                                        </span>
                                        <span className="text-xs mt-1 block" style={{ color: 'var(--dark-color)' }}>
                                            No one can comment on this post
                                        </span>
                                    </div>
                                    <label onChange={() => setDisableComments(prev => !prev)} className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                        />
                                        <div
                                            className={` w-11 h-6 rounded-full transition-colors duration-200 relative`}
                                            style={{
                                                backgroundColor: disableComments ? 'var(--button-color)' : 'var(--semi-text-color)'
                                            }}
                                        >
                                            <div
                                                className={`absolute top-0.5 w-5 h-5 rounded-full shadow transform transition-transform duration-200`}
                                                style={{
                                                    backgroundColor: 'var(--bg-color)',
                                                    left: disableComments ? '1.375rem' : '0.125rem'
                                                }}
                                            ></div>
                                        </div>
                                    </label>
                                </div>


                            </div>
                        )}
                    </div>

                    {/* Reel Specific Options */}
                    {selectedTab === 'reel' && selectedFiles.length > 0 && (
                        <div className="space-y-3 p-4 rounded-lg" style={{ backgroundColor: 'var(--semi-text-light-color)' }}>
                            <div className="flex items-center justify-between">
                                <span className="text-sm" style={{ color: 'var(--text-color)' }}>Add Audio</span>
                                <button
                                    style={{ color: 'var(--button-color)' }}
                                    onClick={triggerAudioInput}
                                >
                                    {audioFile ? audioFile : 'Browse'}
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm" style={{ color: 'var(--text-color)' }}>Video Length</span>
                                <span className="text-sm" style={{ color: 'var(--semi-text-color)' }}>0-90s</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm" style={{ color: 'var(--text-color)' }}>Cover Image</span>
                                <button
                                    style={{ color: 'var(--button-color)' }}
                                    onClick={triggerCoverInput}
                                >
                                    {coverImage ? 'Change' : 'Select'}
                                </button>
                            </div>
                            {coverImage && (
                                <div className="mt-2">
                                    <img src={coverImage} alt="Cover" className="w-20 h-20 object-cover rounded" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* upload button */}
                    <div className='w-full flex items-center justify-end'>
                        <button
                            onClick={selectedFiles.length > 0 ? handleShare : undefined}
                            disabled={selectedFiles.length === 0}
                            className={`px-5 w-full py-2 text-[var(--text-secondry-color)] rounded-md ${selectedFiles.length === 0 ? 'bg-[#de7a3b6b]' : ' bg-[var(--button-color)]'} `}>

                            {
                                isLoading ?
                                    <Loader
                                        screenHeight="h-full"
                                        screenWidth="w-full"
                                        height="h-6"
                                        width="w-6"
                                        border="border-2"
                                        borderColor="border-[var(--text-secondry-color)]" />
                                    :

                                    "Upload"
                            }
                        </button>
                    </div>
                </div>
            </div>



            <Footer />
        </div>
    )
}

export default Upload