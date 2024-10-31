import { useEffect } from 'react';
import { TopMenuBar } from './components/TopMenuBar';
import { FunctionPanel } from './components/FunctionPanel';
import { ChatWindow } from './components/ChatWindow';
import { useChat } from './hooks/useChat';
import { AVATARS } from './constants';
import './App.css';

export function App() {
  const { 
    messages, 
    input, 
    setInput, 
    handleSend, 
    selectedOrg, 
    setSelectedOrg, 
    selectedUseCase, 
    setSelectedUseCase 
  } = useChat();
  const username = localStorage.getItem('username');

  return (
    <div className="flex flex-col h-full">
      <TopMenuBar userAvatar={AVATARS.user} username={username} />
      <div className="flex flex-1 overflow-hidden">
        <FunctionPanel 
          selectedOrg={selectedOrg}
          setSelectedOrg={setSelectedOrg}
          selectedUseCase={selectedUseCase}
          setSelectedUseCase={setSelectedUseCase}
        />
        <ChatWindow 
          messages={messages}
          input={input}
          setInput={setInput}
          handleSend={handleSend}
        />
      </div>
    </div>
  );
}