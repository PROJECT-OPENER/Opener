'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
const AiChatSend = dynamic(() => import('./AiChatSend'), { ssr: false });
// import AiChatSend from './AiChatSend';
import { BsVolumeUp } from 'react-icons/bs';
import ProfileImage from '@/app/components/ProfileImage';
import { openAiChatApi } from '@/app/api/openAi';
import { useSearchParams } from 'next/navigation';
import { handleChatLog } from '@/util/AiChat';

interface Message {
  text: string;
  sender: 'HUMAN' | 'AI';
}

const AiChatComp = () => {
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [promptData, setPromptData] = useState('');
  const [synth, setSynth] = useState<SpeechSynthesisVoice[]>([]);
  const [robotClick, setRobotClick] = useState(0);
  const searchParams = useSearchParams();
  const subject = searchParams.get('sub');

  useEffect(() => {
    const voice = window.speechSynthesis.getVoices();
    setSynth(voice);

    const res = openAiChatApi(
      `인공지능 챗 봇인 너가 영어학습을 도와줄 거라는 간단한 소개를 한 후 ${subject}와 관련된 대화를 영어로 시작해줘. 대화의 시작은 너의 소개야`,
    );
    res.then((res) => {
      // const regex = /^AI: /;
      const result = res.data.choices[0].text.replace(/^\n{2}AI:\s*/, '');
      console.log(result);
      handleReceiveMessage(result);
    });
  }, []);

  const textToSpeech = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    speech.rate = 0.8;
    speech.voice = synth[4];
    console.log(speech);
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    // 스크롤이 최하단으로 자동으로 이동되도록 chatWindowRef의 scrollTop 속성을 최대값으로 설정합니다.
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
    const prompt = handleChatLog(messages);
    setPromptData(prompt);
    console.log('prompt', prompt);
  }, [messages]);

  const handleSendMessage = (message: string) => {
    console.log('handleSendMessage', message);
    setMessages((prevState) => [
      ...prevState,
      { text: message, sender: 'HUMAN' },
    ]);
  };
  const handleReceiveMessage = (message: string) => {
    setMessages((prevState) => [...prevState, { text: message, sender: 'AI' }]);
    console.log('handleReceiveMessage', messages);
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
        {/* 채팅 */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.sender === 'HUMAN' ? 'flex justify-end' : 'flex'}
          >
            {message.sender === 'HUMAN' && (
              <div>
                <div className="my-chat">{message.text}</div>
              </div>
            )}
            {message.sender === 'AI' && (
              <div className="flex mt-2">
                <ProfileImage
                  className="h-12 w-12 mx-2 hover:cursor-pointer min-w-[48px]"
                  profileUrl="/images/ai.png"
                  height={500}
                  width={500}
                  onClick={handleRobotClick}
                />
                <div className="">
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
        promptData={promptData}
      />
    </div>
  );
};

export default AiChatComp;
