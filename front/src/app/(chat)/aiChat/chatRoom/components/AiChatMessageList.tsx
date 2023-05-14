import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { aiChatMessageListState } from '../../store';
import ProfileImage from '@/app/components/ProfileImage';
import { BsVolumeUp } from 'react-icons/bs';

const AiChatMessageList = () => {
  const messageList = useRecoilValue(aiChatMessageListState);
  const [synth, setSynth] = useState<SpeechSynthesisVoice[]>([]);
  const [robotClick, setRobotClick] = useState(0);

  useEffect(() => {
    const voice = window.speechSynthesis.getVoices();
    console.log(voice);
    setSynth(voice);
  }, []);

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
  const textToSpeech = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    speech.rate = 0.8;
    speech.voice = synth[4];
    console.log(speech);
    window.speechSynthesis.speak(speech);
  };
  return (
    <div>
      {messageList.map((message, index) => (
        <div
          key={index}
          className={`${
            message.sender === 'HUMAN' ? 'justify-end flex' : 'flex'
          }`}
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
  );
};

export default AiChatMessageList;
