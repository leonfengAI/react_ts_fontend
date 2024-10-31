import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { Message } from '../types';
import { useThemeStore } from '../store/themeStore';

interface ChatWindowProps {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  selectedOrg: string;
  selectedUseCase: string;
}

export const ChatWindow = ({ messages, input, setInput, handleSend, selectedOrg, selectedUseCase }: ChatWindowProps) => {
  const { isDark } = useThemeStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`flex-1 flex flex-col min-h-0 ${isDark ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-white'} transition-colors duration-300`}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {messages.map(message => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            onImageLoad={scrollToBottom}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={`${isDark ? 'bg-gray-800 bg-opacity-75 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t p-4 shadow-lg transition-colors duration-300`}>
        <div className="flex gap-3 max-w-4xl mx-auto">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className={`flex-1 border rounded-lg p-3 ${
              isDark 
                ? 'bg-gray-900 text-white border-gray-600 placeholder-gray-500' 
                : 'bg-white text-gray-800 border-gray-300 placeholder-gray-400'
            } focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none shadow-md transition-colors duration-300`}
            rows={1}
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all font-semibold shadow-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};