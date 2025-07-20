"use client";
import { useState } from 'react';
import axios from 'axios';

interface ChatMessage {
  who: 'me' | 'bot';
  text: string;
}

const API_BASE: string = process.env.NEXT_PUBLIC_API_BASE ?? '';

export const useChatbot = () => {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    setChat((prev) => [...prev, { who: 'me', text }]);
    setInput('');

    try {
      const res = await axios.post(
        `${API_BASE}/ask`,
        { q: text },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CHATBOT_API_KEY || '',
          },
        }
      );
      const data: { answer: string } = res.data;
      setChat((prev) => [...prev, { who: 'bot', text: data.answer }]);
    } catch (error) {
      console.error('Chat API error', error);
      setChat((prev) => [
        ...prev,
        { who: 'bot', text: '죄송합니다. 오류가 발생했어요.' },
      ]);
    }
  };

  return { chat, input, setInput, sendMessage };
};
