import React from 'react';
import { useTheme } from '../context/ThemeProvider';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 h-10 w-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
      style={{
        color: 'var(--text-color)'
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        // Sun icon for light mode
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-12a.75.75 0 0 0 .75-.75V2a.75.75 0 0 0-1.5 0v2.25c0 .414.336.75.75.75zm0 15a.75.75 0 0 0-.75.75V22a.75.75 0 0 0 1.5 0v-2.25A.75.75 0 0 0 12 20zM4.222 5.222a.75.75 0 0 0 1.06 0l1.5-1.5a.75.75 0 0 0-1.06-1.06l-1.5 1.5a.75.75 0 0 0 0 1.06zm14.496 14.496a.75.75 0 0 0 1.06 0l1.5-1.5a.75.75 0 1 0-1.06-1.06l-1.5 1.5a.75.75 0 0 0 0 1.06zM2 12a.75.75 0 0 0 .75.75H5a.75.75 0 0 0 0-1.5H2.75A.75.75 0 0 0 2 12zm17 0a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-1.5 0v2.25c0 .414.336.75.75.75zm-15.722 6.778a.75.75 0 0 0 0-1.06l-1.5-1.5a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.06 0zm14.496-14.496a.75.75 0 0 0 0-1.06l-1.5-1.5a.75.75 0 1 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.06 0z"/>
        </svg>
      ) : (
        // Moon icon for dark mode
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z"/>
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;