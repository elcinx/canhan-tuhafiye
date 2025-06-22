import React, { ReactNode, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children?: ReactNode;
}


const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className={`flex flex-col min-h-screen transition-colors`} style={{background: 'linear-gradient(135deg, #ffe0f7 0%, #ffb6e6 100%)'}}>
      {/* Dark mode toggle */}
      <button
        className="fixed top-4 right-4 z-50 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow hover:scale-110 transition"
        onClick={() => setDarkMode((v) => !v)}
        aria-label="Tema Değiştir"
      >
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M17.657 17.657l1.061 1.061M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M17.657 6.343l1.061-1.061M12 6.75A5.25 5.25 0 1 1 6.75 12 5.257 5.257 0 0 1 12 6.75z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 12 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.664-7.64 6.406-9.09.47-.18.979-.021 1.276.402.297.423.237 1.01-.136 1.37A7.5 7.5 0 0 0 19.5 12c0 1.61-.508 3.106-1.379 4.338-.274.391-.2.927.17 1.234.37.307.902.265 1.208-.111z" />
          </svg>
        )}
      </button>
      <Navbar />
      <main className="flex-grow pt-16">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
