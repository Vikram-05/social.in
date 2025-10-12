import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom';

export default React.memo(function EditProfile({ profileData, setProfileData }) {
    useEffect(() => { console.log("Edit") }, [])
    const navigate = useNavigate()
    const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');
    const [isProfileUpdate, setIsProfileUploaded] = useState(false)

    //const handleImageUpload = (event) => {
    //   const file = event.target.files[0];
    //   if (file) {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //       setProfileImage(e.target.result);
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // };

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        setIsProfileUploaded(true)
        try {
            axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/update-user-data`, profileData, { withCredentials: true })
            navigate("/profile")
        } catch (error) {
            console.log("Error in update profile")
        }
        finally {
            setIsProfileUploaded(false)
        }
    }

    return (
        <div className=" overflow-hidden">
            {/* Profile Image */}
            <div className="px-6 py-8 flex flex-col items-center">
                <div className="relative">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-[var(--button-color)] "
                    />
                    <label htmlFor="profileImage" className=" bg-[var(--bg-color)] absolute bottom-0 right-0 p-2  rounded-full text-[var(--text-color)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            className="hidden"
                        // onChange={handleImageUpload}
                        />
                    </label>
                </div>
                <p className="text-sm text-[var(--semi-text-color)] mt-4">Click Change your profile photo</p>
            </div>

            <form
                className="px-6 pb-6 space-y-6"
            >
                <div>
                    <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        value={profileData.username}
                        onChange={(e) =>
                            setProfileData((prev) => ({
                                ...prev,
                                username: e.target.value,
                            }))
                        }
                        className="w-full px-4 py-3 border-gray-300 dark:border-gray-600 rounded-lg bg-[var(--semi-text-light-color)]"
                        placeholder="Enter your username"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                        FullName
                    </label>
                    <input
                        type="text"
                        value={profileData.fullName || ""}
                        onChange={(e) =>
                            setProfileData((prev) => ({
                                ...prev,
                                fullName: e.target.value,
                            }))
                        }
                        className="w-full px-4 py-3 border-gray-300 dark:border-gray-600 rounded-lg bg-[var(--semi-text-light-color)]"
                        placeholder="Set FullName"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                        Email
                    </label>
                    {/* Removed extra input with value={a} */}
                    <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                            setProfileData((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                        className="w-full px-4 py-3 border-gray-300 dark:border-gray-600 rounded-lg bg-[var(--semi-text-light-color)]"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                        Bio
                    </label>
                    <textarea
                        value={profileData.bio}
                        onChange={(e) =>
                            setProfileData((prev) => ({
                                ...prev,
                                bio: e.target.value,
                            }))
                        }
                        rows={3}
                        className="w-full px-4 py-3 h-50 border-gray-300 dark:border-gray-600 rounded-lg bg-[var(--semi-text-light-color)]"
                        placeholder="Tell us about yourself"
                    />
                </div>

                <button
                    onClick={handleUpdateProfile}
                    type="submit"
                    className={`w-full bg-[var(--button-color)] text-[var(--text-secondry-color)] ${!isProfileUpdate ? 'py-3' : 'py-2'} px-4 font-semibold rounded-md`}
                >
                    {
                        isProfileUpdate ?
                            <Loader
                            screenHeight="h-full"
                            screenWidth="w-full"
                            height="h-6"
                            width="w-6" 
                            border="border-3"
                            borderColor="border-[var(--text-secondry-color)]"/>
                            :

                            "Save Changes"
                    }
                </button>
            </form>

        </div>
    )
});

// export default EditProfile;




