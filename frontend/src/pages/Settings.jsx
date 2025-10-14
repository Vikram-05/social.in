import React, { useState, useEffect, useCallback } from 'react';
import ThemeToggle from '../components/ThemeToggle'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import EditProfile from '../components/EditProfile';

const Settings = () => {
  useEffect(() => { console.log("Setting") }, [])
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(true);
  const [activeSection, setActiveSection] = useState('settings');
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const [profileData, setProfileData] = useState({
    "username": "",
    "email": "",
    "bio": "",
    "fullName": "",
    "profile" : ""
  })

  const handleGetUserDetails = useCallback(async () => {
    try {
      const responseUserDetails = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/getUserById`,
        { withCredentials: true }
      );
      const user = responseUserDetails.data.message;
      const newProfileData = {
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        fullName: user.fullName || '',
        profile: user.profile || ''
      };

      // Check if new data is actually different
      setProfileData((prev) => {
        if (
          prev.username === newProfileData.username &&
          prev.email === newProfileData.email &&
          prev.bio === newProfileData.bio && 
          prev.profile === newProfileData.profile
        ) return prev;
        return newProfileData;
      });
    } catch (error) {
      console.log("Error in handleGetUserDetails on settings page", error);
    }
  }, []);


  useEffect(() => {
    if (activeSection === "edit-profile" && !isProfileLoaded) {
      handleGetUserDetails().then(() => setIsProfileLoaded(true));
    }
  }, [activeSection, isProfileLoaded]);



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
        {
          activeSection === 'settings'
            ?
            <SettingsList />
            :
            <EditProfile
              profileData={profileData}
              setProfileData={setProfileData}
            />
        }


      </div>
    </div>
  );
};

export default Settings;