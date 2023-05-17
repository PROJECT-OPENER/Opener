import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { aiChatMessageListState, aiChatSub } from '../../store';
import ProfileImage from '@/app/components/ProfileImage';
import { BsVolumeUp } from 'react-icons/bs';
import { openAiChatApi } from '@/app/api/openAi';
type Props = {
  handleReceiveMessage?: (result: string) => void;
};

const AiChatMessageList = ({ handleReceiveMessage }: Props) => {
  const messageList = useRecoilValue(aiChatMessageListState);
  const [synth, setSynth] = useState<SpeechSynthesisVoice[]>([]);
  const [robotClick, setRobotClick] = useState(0);
  const subject = useRecoilValue(aiChatSub);
  const [isFirst, setIsFirst] = useState(false);
  useEffect(() => {
    if (handleReceiveMessage && !isFirst) {
      const res = openAiChatApi(
        `인공지능 챗 봇인 너가 영어학습을 도와줄 거라는 간단한 소개를 한 후 ${subject.name}와 관련된 대화를 영어로 시작해줘. 대화의 시작은 너의 소개야`,
      );
      res.then((res) => {
        // const regex = /^AI: /;
        const result: string = res.data.choices[0].text.replace(
          /^\n{2}AI:\s*/,
          '',
        );
        // console.log(result);
        handleReceiveMessage(result);
        setIsFirst(true);
      });
    }
  }, []);

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
    // const voice = window.speechSynthesis.getVoices();
    // console.log(voice);
    const speech = new SpeechSynthesisUtterance(text);
    console.log(synth);
    speech.lang = 'en-US';
    speech.voice = synth[2];
    console.log(speech);
    window.speechSynthesis.speak(speech);
  };
  return (
    <div className="lg:rounded-b-3xl lg:text-white">
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
                <div className="text-black">AI</div>
                <div className="other-chat">
                  {message.text}
                  <button
                    type="button"
                    className="block texl-xl mt-3"
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
