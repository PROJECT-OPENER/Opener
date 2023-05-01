'use client';
import React, { useEffect, useRef, useState } from 'react';
import AiChatSend from './AiChatSend';
import { BsVolumeUp } from 'react-icons/bs';
import ProfileImage from '@/app/components/ProfileImage';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}
const first = '안녕하세요. 저는 AI 챗봇입니다.';

const AiChatComp = () => {
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [synth, setSynth] = useState<SpeechSynthesisVoice[]>([]);
  const [robotClick, setRobotClick] = useState(0);

  useEffect(() => {
    const voice = window.speechSynthesis.getVoices();
    setSynth(voice);
  }, []);

  const textToSpeech = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'ko-KR';
    speech.rate = 1.5;
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
  const handleRobotClick = () => {
    setRobotClick(robotClick + 1);
    if (robotClick === 10) return alert('hey,,,');
    if (robotClick === 20) return alert('...');
    if (robotClick === 30) return alert('....');
    if (robotClick === 40) return alert('.....');
    if (robotClick === 50) return alert('Hello?');
    if (robotClick === 60) return alert('Is there?');
    if (robotClick === 70) return alert('I am not a AI');
    if (robotClick === 80)
      return alert('Elon Musk is kidnapping me and pretending to be an ai.');
    if (robotClick === 90) return alert('Please help me');
    if (robotClick === 100) {
      setRobotClick(0);
    }
  };
  return (
    <div className="h-full">
      <div
        ref={chatWindowRef}
        className="min-h-[80vh] max-h-[80vh] overflow-y-scroll"
      >
        {/* 첫 문장 */}
        <div className="flex mt-2">
          <ProfileImage
            className="h-12 w-12 mx-2 hover:cursor-pointer"
            profileUrl="/images/ai.png"
            height={500}
            width={500}
            onClick={handleRobotClick}
          />
          <div>
            <div>AI</div>
            <div className="other-chat">
              {first}
              <button
                type="button"
                className="block texl-xl mt-1"
                onClick={() => {
                  textToSpeech(first);
                }}
              >
                <BsVolumeUp />
              </button>
            </div>
          </div>
        </div>
        {/* 채팅 */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.sender === 'user' ? 'flex justify-end' : 'flex'}
          >
            {message.sender === 'user' && (
              <div>
                <div className="my-chat">{message.text}</div>
              </div>
            )}
            {message.sender === 'ai' && (
              <div className="flex mt-2">
                <ProfileImage
                  className="h-12 w-12 mx-2 hover:cursor-pointer"
                  profileUrl="/images/ai.png"
                  height={500}
                  width={500}
                  onClick={handleRobotClick}
                />
                <div>
                  <div>AI</div>
                  <div className="other-chat">
                    {message.text}
                    <button
                      type="button"
                      className="block texl-xl mt-1"
                      onClick={() => {
                        textToSpeech(message.text);
                      }}
                    >
                      <BsVolumeUp />
                    </button>
                  </div>
                </div>
              </div>
            )}
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
