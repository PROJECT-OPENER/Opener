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

  const [synth, setSynth] = useState<SpeechSynthesisVoice[]>([]);
  useEffect(() => {
    const synth = window.speechSynthesis.getVoices();
    setSynth(synth);
  }, []);

  const textToSpeech = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'ko-KR';
    speech.rate = 0.7;
    speech.pitch = 1.0;
    speech.volume = 1.0;
    speech.voice = synth[0];
    console.log(speech);
    window.speechSynthesis.speak(speech);
  };

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
              <button
                type="button"
                className="border-2 bg-red-200"
                onClick={() => {
                  textToSpeech(message.text);
                }}
              >
                말해
              </button>
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
