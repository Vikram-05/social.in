import React, { useState, useEffect, useCallback } from 'react';
import ThemeToggle from '../components/ThemeToggle'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(true);
  const [activeSection, setActiveSection] = useState('settings');
  const [profileData, setProfileData] = useState({
    "username": "",
    "email": "",
    "bio": ""
  })
  const [a, setA] = useState("")
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');

  useEffect(() => {
    const handleGetUserDetails = async () => {
      try {
        const responseUserDetails = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/getUserById`,
          { withCredentials: true }
        );
        const user = responseUserDetails.data.message;
        setProfileData({
          username: user.username || '',
          email: user.email || '',
          bio: user.bio || ''
        });
      } catch (error) {
        console.log("Error in handleGetUserDetails on settings page", error);
      }
    };

    if (activeSection === "edit-profile") {
      handleGetUserDetails();
    }
  }, [activeSection]);





  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setProfileImage(e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };



  // const handleSaveProfile = () => {
  //   // In a real app, you would save to your backend here
  //   console.log('Saving profile:', profile);
  //   alert('Profile saved successfully!');
  //   setActiveSection('settings');
  // };



  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, { withCredentials: true })
      navigate("/login")
    } catch (error) {
      console.log("Error while logout", error)
    }
  };

  // const openExternalLink = (url) => {
  //   window.open(url, '_blank');
  // };

  const SettingsList = () => (
    <div className="  overflow-hidden flex flex-col gap-3 ">
      {/* Edit Profile */}
      <div
        className="px-6 py-2  flex justify-between items-center  transition-colors cursor-pointer"
        onClick={() => setActiveSection('edit-profile')}
      >
        <h3 className="font-medium text-[var(--text-color)] ">Edit Profile</h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Notification */}
      <div className="px-6 py-2  flex justify-between items-center">
        <h3 className="font-medium text-[var(--text-color)]">Notification</h3>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          <div className="w-11 h-6 bg-[var(--button-color)]  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-main"></div>
        </label>
      </div>

      {/* Dark Mode */}
      <div className="px-6 py-2 border-gray-100 dark:border-gray-800 flex justify-between items-center">
        <h3 className="font-medium text-[var(--text-color)]">Dark Mode</h3>
        <ThemeToggle />
      </div>

      {/* Rate App */}
      <div
        className="px-6 py-2  flex justify-between items-center  cursor-pointer"
      // onClick={() => openExternalLink('https://example.com/rate')}
      >
        <h3 className="font-medium text-[var(--text-color)]">Rate App</h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Share App */}
      <div
        className="px-6 py-2 border-gray-100 dark:border-gray-800 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        onClick={() => openExternalLink('https://example.com/share')}
      >
        <h3 className="font-medium text-[var(--text-color)]">Share App</h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Privacy Policy */}
      <div
        className="px-6 py-2 border-gray-100 dark:border-gray-800 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        onClick={() => openExternalLink('https://example.com/privacy')}
      >
        <h3 className="font-medium text-[var(--text-color)]">Privacy Policy</h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Terms and Condition */}
      <div
        className="px-6 py-2 border-gray-100 dark:border-gray-800 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        onClick={() => openExternalLink('https://example.com/terms')}
      >
        <h3 className="font-medium text-[var(--text-color)]">Terms and Condition</h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Cookies Policy */}
      <div
        className="px-6 py-2 border-gray-100 dark:border-gray-800 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        onClick={() => openExternalLink('https://example.com/cookies')}
      >
        <h3 className="font-medium text-[var(--text-color)]">Cookies Policy</h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Contact */}
      <div
        className="px-6 py-2 border-gray-100 dark:border-gray-800 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        onClick={() => openExternalLink('mailto:support@example.com')}
      >
        <h3 className="font-medium text-[var(--text-color)]">Contact</h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Feedback */}
      <div
        className="px-6 py-2 border-gray-100 dark:border-gray-800 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        onClick={() => openExternalLink('https://example.com/feedback')}
      >
        <h3 className="font-medium text-[var(--text-color)]">Feedback</h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Logout */}
      <div
        className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer text-red-500"
        onClick={handleLogout}
      >
        <h3 className="font-medium">Logout</h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </div>
    </div>
  );

  const EditProfile = () => (
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
          type="submit"
          className="w-full bg-[var(--button-color)] text-[var(--text-secondry-color)] py-3 px-4 font-semibold rounded-md"
        >
          Save Changes
        </button>
      </form>

    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-color)] transition-colors duration-300">
      <div className="container mx-auto  py-8 max-w-2xl">
        {/* Header */}
        <header className="mb-8">
          <div className="px-6 py-2 border-gray-100 dark:border-gray-800 flex items-center">
            <button
              onClick={() => { activeSection == "settings" ? navigate('/profile') : setActiveSection('settings') }}
              className="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-[var(--text-color)] px-3">
              {activeSection === 'settings' ? 'Settings' : 'EditProfile'}
            </h1>
          </div>
          <p className="text-[var(--semi-text-color)] mt-2 px-8">
            {activeSection === 'settings'
              ? 'Manage your app preferences and account'
              : 'Update your personal information'
            }
          </p>
        </header>

        {/* Content */}
        {activeSection === 'settings' ? <SettingsList /> : <EditProfile />}


      </div>
    </div>
  );
};

export default Settings;