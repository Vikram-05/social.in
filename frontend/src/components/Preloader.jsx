// src/components/SocialLoader.jsx
import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-color)] transition-colors duration-300">
      {/* Main Logo Container */}
      <div className="relative mb-8">
        {/* Glow Effect */}
        <div className="absolute -inset-4 bg-[var(--main-color)] rounded-3xl opacity-20 blur-xl animate-pulse-gentle"></div>
        
      
        
        {/* Orbiting Dots */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--main-color)] rounded-full animate-orbit-1"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[var(--main-color)] rounded-full animate-orbit-2"></div>
      </div>
      
      {/* Animated Text Content */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold tracking-wide">
          {/* Animated social.in text */}
          <span className="inline-block">
            <span className="animate-typing-social">s</span>
            <span className="animate-typing-social" style={{animationDelay: '0.1s'}}>o</span>
            <span className="animate-typing-social" style={{animationDelay: '0.2s'}}>c</span>
            <span className="animate-typing-social" style={{animationDelay: '0.3s'}}>i</span>
            <span className="animate-typing-social" style={{animationDelay: '0.4s'}}>a</span>
            <span className="animate-typing-social" style={{animationDelay: '0.5s'}}>l</span>
          </span>
          <span className="text-[var(--main-color)] animate-ping-slow">.</span>
          <span className="inline-block">
            <span className="animate-typing-in" style={{animationDelay: '0.7s'}}>i</span>
            <span className="animate-typing-in" style={{animationDelay: '0.8s'}}>n</span>
          </span>
        </h2>
        <p className="text-[var(--semi-text-color)] text-sm font-medium animate-fade-in-out">
          Connecting stories, sharing moments
        </p>
      </div>
      
      {/* Progress Indicator */}
      <div className="w-72 h-1.5 bg-[var(--semi-text-light-color)] rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[var(--main-color)] to-amber-600 rounded-full animate-progress-smooth"></div>
      </div>
      
      {/* Floating Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-[var(--main-color)] rounded-full opacity-15 animate-float-slow-1"></div>
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-[var(--main-color)] rounded-full opacity-10 animate-float-slow-2"></div>
      <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-[var(--main-color)] rounded-full opacity-20 animate-float-slow-3"></div>
      <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-[var(--main-color)] rounded-full opacity-12 animate-float-slow-4"></div>
    </div>
  );
};

export default Preloader;