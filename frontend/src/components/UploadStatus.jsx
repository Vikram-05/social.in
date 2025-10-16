import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { FaPenFancy } from "react-icons/fa";

function UploadStatus() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [caption, setCaption] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [pencil, setPencil] = useState(false)
    const navigate = useNavigate()

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!image) return alert("Please select an image");
        const formData = new FormData();
        formData.append('image', image);
        formData.append('caption', caption);
        formData.append('category', category);

        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/status/upload-status`, formData, { withCredentials: true });
            setImage(null);
            setPreview(null);
            setCaption('');
            setCategory('');
            if (response.status == 200) navigate("/profile")
            console.log("res ", response)
        } catch (error) {
            alert("Upload failed");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setImage(null);
        setPreview(null);
        setCaption('');
        setCategory('');
    };

    const handlePencil = () => {
        setPencil(prev => !prev)
    }

    return (
        <div className="min-h-screen bg-[var(--bg-color)] relative overflow-hidden transition-colors duration-300">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 py-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className=" flex items-center text-[var(--text-color)] hover:text-[var(--main-color)] transition-colors duration-200 px-4"
                    >
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-[var(--text-color)] text-xl font-semibold">Create Status</h1>
                    <div className="w-6"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] py-4 pt-15">
                {/* Upload Area / Preview */}
                {preview ? (
                    <div className="relative w-full max-w-md  overflow-hidden border-[var(--semi-text-light-color)] h-full ">
                        <img
                            src={preview}
                            alt="Selected"
                            className="w-full h-full  object-cover"
                        />
                        <div className="absolute top-4 right-4">
                            <button
                                onClick={handleCancel}
                                className="bg-[var(--dark-color)]/50 text-[var(--text-secondry-color)] p-2 rounded-full hover:bg-[var(--dark-color)]/70 transition-all duration-200 backdrop-blur-sm border border-[var(--semi-text-light-color)]/20"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div onClick={handlePencil} className='absolute top-4 right-18 w-10 h-10'>
                            <FaPenFancy  className=" bg-[var(--dark-color)]/50 text-[var(--text-secondry-color)] rounded-full w-full h-full p-2 " />
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-md ">
                        <label
                            htmlFor="file-input"
                            className="flex flex-col items-center justify-center w-full h-64 transition-all duration-300 cursor-pointer bg-[var(--bg-color)] hover:bg-[var(--main-color)]/5 group"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                                <div className="w-16 h-16 mb-4 rounded-full bg-[var(--main-color)]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-[var(--main-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <p className="text-[var(--text-color)] font-semibold text-lg mb-2 group-hover:text-[var(--main-color)] transition-colors duration-200">
                                    Upload Your Story
                                </p>
                                <p className="text-[var(--semi-text-color)] text-sm text-center px-4">
                                    Choose a beautiful photo to share with your friends
                                </p>
                            </div>
                            <input
                                id="file-input"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageSelect}
                            />
                        </label>
                    </div>
                )}

                {/* Input Section */}

                {preview && (
                    <div className={`w-full max-w-md mt-6 space-y-4 animate-fade-in  absolute px-5 py-5 ${pencil ? 'bottom-30' : 'bottom-[-20%]'} transition-all`}>
                        <div className="relative group">
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--dark-color)]  transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <input
                                type="text"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="What's on your mind?"
                                className="w-full bg-[var(--semi-text-light-color)] text-[var(--dark-color)]  pl-10 pr-4 py-3 rounded-md outline-none transition-all duration-200"
                            />
                        </div>

                        <div className="relative group">
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--dark-color)] group-focus-within:text-[var(--main-color)] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Add category (Travel, Food, Moments...)"
                                className="w-full bg-[var(--semi-text-light-color)] text-[var(--dark-color)]  pl-10 pr-4 py-3 rounded-md outline-none transition-all duration-200"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            {preview && (
                <div className="fixed bottom-15 left-0 right-0 px-6 py-3 bg-gradient-to-t from-[var(--bg-color)]/95 to-transparent backdrop-blur-sm border-t border-[var(--semi-text-light-color)]/20">
                    <div className="flex items-center justify-between max-w-md mx-auto">
                        <button
                            onClick={handleCancel}
                            disabled={loading}
                            className="flex items-center px-6 py-3 text-[var(--semi-text-color)] hover:text-[var(--text-color)] transition-colors duration-200 font-medium"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex items-center bg-[var(--button-color)] text-[var(--text-secondry-color)] px-8 py-3 rounded-md font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    Share Story
                                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default UploadStatus;