'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './AiChatComp.module.css';
import AiChatSend from './AiChatSend';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AiChatComp = () => {
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // 스크롤이 최하단으로 자동으로 이동되도록 chatWindowRef의 scrollTop 속성을 최대값으로 설정합니다.
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (message: string) => {
    console.log('handleSendMessage', message);
    setMessages((prevState) => [
      ...prevState,
      { text: message, sender: 'user' },
    ]);
  };
  const handleReceiveMessage = (message: string) => {
    setMessages((prevState) => [...prevState, { text: message, sender: 'ai' }]);
  };
  return (
    <div className="h-full">
      <div
        ref={chatWindowRef}
        className="min-h-[70vh] max-h-[70vh] bg-slate-300 overflow-y-scroll"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.sender === 'user' ? 'text-right' : ''}
          >
            <div
              className={message.sender === 'user' ? styles.user : styles.ai}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <AiChatSend
        onSendMessage={handleSendMessage}
        onReceiveMessage={handleReceiveMessage}
      />
    </div>
  );
};

export default AiChatComp;
