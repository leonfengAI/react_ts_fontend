import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../types';
import { useThemeStore } from '../store/themeStore';

interface ChatMessageProps {
  message: Message;
  onImageLoad?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onImageLoad }) => {
  const isBot = message.sender === 'bot';
  const { isDark } = useThemeStore();
  
  const messageClasses = isBot
    ? isDark
      ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 border border-gray-600'
      : 'bg-gray-100 text-gray-800 border border-gray-200'
    : isDark
      ? 'bg-gradient-to-r from-purple-600 to-indigo-500 text-white'
      : 'bg-purple-100 text-purple-900';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-6 items-start`}>
      {isBot && (
        <div className="flex-shrink-0">
          <img
            src="/images/chatbot_icon.png"
            alt="Bot"
            className="w-10 h-10 rounded-full mr-3 border-2 border-purple-500 shadow-lg"
            loading="lazy"
          />
        </div>
      )}
      <div className={`max-w-[70%] rounded-lg px-5 py-3 text-sm ${messageClasses} shadow-lg`}>
        <div className={`prose ${isDark ? 'prose-invert' : ''} max-w-none`}>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ node, ...props }) => (
                <img 
                  {...props} 
                  className="rounded-lg shadow-md max-w-full h-auto my-2" 
                  loading="lazy"
                  onLoad={() => {
                    if (onImageLoad) {
                      onImageLoad();
                    }
                  }}
                />
              ),
              table: ({ node, ...props }) => (
                <table {...props} className={`border-collapse border ${isDark ? 'border-gray-600' : 'border-gray-300'} my-2`} />
              ),
              th: ({ node, ...props }) => (
                <th {...props} className={`border px-4 py-2 ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-100'}`} />
              ),
              td: ({ node, ...props }) => (
                <td {...props} className={`border px-4 py-2 ${isDark ? 'border-gray-600' : 'border-gray-300'}`} />
              )
            }}
          >
            {message.text}
          </ReactMarkdown>
        </div>
        <span className={`text-xs ${
          isDark 
            ? (isBot ? 'text-gray-400' : 'text-indigo-200') 
            : (isBot ? 'text-gray-500' : 'text-purple-600')
        } block mt-2`}>
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
      {!isBot && (
        <div className="flex-shrink-0">
          <img
            src="/images/user_icon.png"
            alt="User"
            className="w-10 h-10 rounded-full ml-3 border-2 border-indigo-500 shadow-lg"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};