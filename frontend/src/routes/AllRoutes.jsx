import React from 'react'
import { SignupProvider } from "../context/SignupProvider";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import SignupEmail from '../pages/signup/SignupEmail'
import SignupPassword from '../pages/signup/SignupPassword'
import SignupUserName from '../pages/signup/SignupUserName'
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import Upload from '../pages/Upload';
import Reel from '../pages/Reel';
import Chats from '../pages/Chats';
import Notification from '../pages/Notification';
import Settings from '../pages/Settings';
import CategorySearch from '../components/CategorySearch';
import SearchProfile from '../pages/SearchProfile';
import Protected from '../components/Protected';

function AllRoutes() {
  return (
    <BrowserRouter>
      <SignupProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupEmail />} />
          <Route path="/signup/password" element={<SignupPassword />} />
          <Route path="/signup/username" element={<SignupUserName />} />

          {/* Protected Routes */}
          <Route path="/" element={<Protected><Home /></Protected>} />
          <Route path="/profile" element={<Protected><Profile /></Protected>} />
          <Route path="/search-profile/:username" element={<Protected><SearchProfile /></Protected>} />
          <Route path="/search" element={<Protected><Search /></Protected>} />
          <Route path="/upload" element={<Protected><Upload /></Protected>} />
          <Route path="/reel" element={<Protected><Reel /></Protected>} />
          <Route path="/chat" element={<Protected><Chats /></Protected>} />
          <Route path="/notification" element={<Protected><Notification /></Protected>} />
          <Route path="/setting" element={<Protected><Settings /></Protected>} />
          <Route path="/search/category/:name" element={<Protected><CategorySearch /></Protected>} />
        </Routes>
      </SignupProvider>
    </BrowserRouter>
  )
}

export default AllRoutes;
