import { useState, useCallback, useEffect } from 'react';
import { Message } from '../types';
import { AVATARS } from '../constants';
import { ChatService } from '../services/ChatService';

let messageCounter = 0;

const generateUniqueId = () => {
  messageCounter += 1;
  return `msg-${Date.now()}-${messageCounter}`;
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedOrg, setSelectedOrg] = useState('MDM');
  const [selectedUseCase, setSelectedUseCase] = useState('1');
  const [chatService] = useState(() => new ChatService());

  useEffect(() => {
    const username = localStorage.getItem('username');
    const welcomeMessage: Message = {
      id: generateUniqueId(),
      text: `Welcome ${username}! 👋\n\nI support Markdown syntax and RiveScript. Try:\n- \`kd test\` for a table\n- \`image test\` for an image\n- \`rivescript test\` to start a RiveScript conversation`,
      sender: 'bot',
      timestamp: new Date(),
      avatar: AVATARS.bot
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: generateUniqueId(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
      avatar: AVATARS.user
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const botMessage = await chatService.processMessage(input);
      const contextInfo = `**Context**\nOrganization: ${selectedOrg}\nUse Case: ${selectedUseCase}\n\n---\n\n`;
      botMessage.text = contextInfo + botMessage.text;
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: Message = {
        id: generateUniqueId(),
        text: 'Sorry, I encountered an error processing your message.',
        sender: 'bot',
        timestamp: new Date(),
        avatar: AVATARS.bot
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [input, chatService, selectedOrg, selectedUseCase]);

  return {
    messages,
    input,
    setInput,
    handleSend,
    selectedOrg,
    setSelectedOrg,
    selectedUseCase,
    setSelectedUseCase
  };
}