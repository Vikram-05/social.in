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

function AllRoutes() {
  return (
    <BrowserRouter>
      <SignupProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupEmail />} />
          <Route path="/signup/password" element={<SignupPassword />} />
          <Route path="/signup/username" element={<SignupUserName />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/reel" element={<Reel />} />
          <Route path="/chat" element={<Chats />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/setting" element={<Settings />} />
        </Routes>
      </SignupProvider>
    </BrowserRouter>
  )
}

export default AllRoutes;