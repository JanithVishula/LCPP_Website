'use client';

import { useEffect, useState } from 'react';

export default function AccessibilityControls() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSize] = useState<'normal' | 'small' | 'large' | 'xl'>('normal');
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    const savedFontSize = localStorage.getItem('fontSize') as typeof fontSize || 'normal';
    
    setTheme(savedTheme);
    setFontSize(savedFontSize);
    
    applyTheme(savedTheme);
    applyFontSize(savedFontSize);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const applyFontSize = (size: typeof fontSize) => {
    document.documentElement.classList.remove('font-small', 'font-large', 'font-xl');
    if (size !== 'normal') {
      document.documentElement.classList.add(`font-${size}`);
    }
    localStorage.setItem('fontSize', size);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const changeFontSize = (size: typeof fontSize) => {
    setFontSize(size);
    applyFontSize(size);
  };

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-2xl hover:shadow-warm transition-all duration-300 transform hover:scale-110 focus:ring-4 focus:ring-gold animate-float"
        aria-label="Accessibility Controls"
        title="Accessibility Controls"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>

      {/* Controls Panel */}
      {showControls && (
        <div className="fixed bottom-24 right-6 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-80 animate-scale-in glass">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-primary dark:text-white">Accessibility</h3>
            <button
              onClick={() => setShowControls(false)}
              className="text-gray-500 hover:text-primary transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Theme Toggle */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-primary dark:text-white mb-3">
              🌓 Theme
            </label>
            <div className="flex gap-2">
              <button
                onClick={toggleTheme}
                className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                  theme === 'light'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                }`}
              >
                {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-bold text-primary dark:text-white mb-3">
              🔤 Font Size
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => changeFontSize('small')}
                className={`py-2 px-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 text-sm ${
                  fontSize === 'small'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-primary dark:text-white'
                }`}
              >
                A
              </button>
              <button
                onClick={() => changeFontSize('normal')}
                className={`py-2 px-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 text-base ${
                  fontSize === 'normal'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-primary dark:text-white'
                }`}
              >
                A
              </button>
              <button
                onClick={() => changeFontSize('large')}
                className={`py-2 px-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 text-lg ${
                  fontSize === 'large'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-primary dark:text-white'
                }`}
              >
                A
              </button>
              <button
                onClick={() => changeFontSize('xl')}
                className={`py-2 px-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 text-xl ${
                  fontSize === 'xl'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-primary dark:text-white'
                }`}
              >
                A
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              💡 Use keyboard Tab to navigate and Enter to select
            </p>
          </div>
        </div>
      )}
    </>
  );
}
