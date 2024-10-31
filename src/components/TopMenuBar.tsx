import { useState } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useThemeStore } from '../store/themeStore';
import { useNavigate } from 'react-router-dom';

interface TopMenuBarProps {
  userAvatar: string;
  username?: string;
}

export const TopMenuBar = ({ userAvatar, username }: TopMenuBarProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLLMDialog, setShowLLMDialog] = useState(false);
  const { isDark, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleMenuClick = (option: string) => {
    if (option === 'Theme') {
      toggleTheme();
    } else if (option === 'LLM') {
      setShowLLMDialog(true);
      setTimeout(() => setShowLLMDialog(false), 2000);
    }
    setIsSettingsOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className={`h-[10vh] ${isDark ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black' : 'bg-white'} shadow-2xl px-6 flex items-center justify-end ${isDark ? 'text-gray-300' : 'text-gray-800'} transition-colors duration-300`}>
      <div className="flex items-center gap-6">
        <div className="relative">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`p-2 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition duration-300`}
          >
            <Cog6ToothIcon className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          </button>
          {isSettingsOpen && (
            <div className={`absolute right-0 mt-2 w-48 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-lg py-2 z-50`}>
              {['Theme', 'LLM'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleMenuClick(option)}
                  className={`w-full text-left px-4 py-2 text-sm ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${isDark ? 'text-gray-200' : 'text-gray-800'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 shadow-lg"
          >
            <img
              src={userAvatar}
              alt="User"
              className="w-full h-full object-cover"
            />
          </button>
          {isProfileOpen && (
            <div className={`absolute right-0 mt-2 w-48 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-lg py-2 z-50`}>
              <div className={`px-4 py-2 text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                {username || 'Guest'}
              </div>
              <button
                onClick={handleLogout}
                className={`w-full text-left px-4 py-2 text-sm ${isDark ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'}`}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      {showLLMDialog && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          LLM has switched to GPT-4
        </div>
      )}
    </div>
  );
};