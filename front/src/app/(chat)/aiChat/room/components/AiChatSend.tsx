'use client';
import React, { useRef, useState } from 'react';
import {
  BsArrowCounterclockwise,
  BsArrowUp,
  BsKeyboard,
  BsMic,
} from 'react-icons/bs';
import 'regenerator-runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

type SendMessageFunction = (message: string) => void;
type onReceiveMessage = (message: string) => void;

interface AiChatSendProps {
  onSendMessage: SendMessageFunction;
  onReceiveMessage: onReceiveMessage;
}

class ChatGPT {
  getRandomAnswer() {
    const answers = [
      "I'm sorry, but I don't think I can make it to the meeting tomorrow.",
      "Could you please repeat that? I didn't quite catch what you said.",
      "That's a great idea! Let's definitely look into it further.",
      "I'm really looking forward to the concert this weekend.",
      "I'm afraid I won't be able to make it to your party next week.",
      "It's been a pleasure working with you on this project.",
      'Do you mind if we reschedule our call for later this week?',
      "I completely understand where you're coming from on this issue.",
      "I'm excited to see what new opportunities this job will bring.",
      'Can you give me a few more details about the proposal before I make a decision?',
    ];
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex];
  }
}

const AiChatSend = ({ onSendMessage, onReceiveMessage }: AiChatSendProps) => {
  const chatGPT = new ChatGPT();
  const [message, setMessage] = useState('');
  const [isChat, setisChat] = useState(true);
  const [isMic, setisMic] = useState(false); // 마이크 기본값 : 꺼짐
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleKeyboardChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
    // console.log(event.target.value);
    // 높이가 변경될 때마다 `Textarea`의 높이를 자동으로 조절합니다.
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      if (event.target.value === '\n') {
        setMessage('');
        textareaRef.current.style.height = '40px';
      }
    }
  };

  const handleMicChange = () => {
    setisChat(true);
    stopMic();
    setMessage('');
  };

  const handleKeyboard = () => {
    setisChat(!isChat);
    setMessage(transcript);
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      console.log('send message trim');
      onSendMessage(message);
      // textareaRef.current.style.height = `40px`;
    } else {
      console.log('send message');
      onSendMessage(transcript);
    }

    // ChatGPT API를 호출하여 답변을 받아오는 로직 추가
    // 우선 더미 데이터로 대체
    const answer = chatGPT.getRandomAnswer();
    setTimeout(() => {
      onReceiveMessage(answer);
    }, 1000);
    setMessage('');
    stopMic();
  };
  const stopMic = () => {
    SpeechRecognition.stopListening();
    setisMic(false);
    resetTranscript();
  };

  const handleMic = () => {
    if (!listening) {
      // 마이크가 꺼져 있으면 켜고 리스닝 시작
      setisMic(true);
      SpeechRecognition.startListening({
        language: 'en-US ',
        continuous: true,
      });
    } else {
      // 아니면 마이크 끄고 setMessage, sendMessage
      console.log('stop mic');
      setMessage(transcript);
      sendMessage();
      stopMic();
    }
  };

  return (
    <div className="">
      <div className="mx-5">
        {/* 녹음 on */}
        {isChat && (
          <div className="mx-5">
            {transcript && (
              <div className="relative">
                <div className="rounded-2xl bg-slate-300 p-5 min-h-[50px] pr-10">
                  {transcript}
                </div>
                <button
                  type="button"
                  className="absolute right-0 top-0 bottom-0 text-3xl pr-3"
                  onClick={handleKeyboard}
                >
                  <BsKeyboard className="fill-black" />
                </button>
              </div>
            )}
            <div className="bg-brandP rounded-2xl p-5 text-white grid grid-cols-3 shadow-custom">
              {!transcript && (
                <button
                  type="button"
                  className="flex flex-col justify-end text-3xl"
                  onClick={handleKeyboard}
                >
                  <BsKeyboard className="fill-white" />
                </button>
              )}
              {transcript && (
                <button
                  type="button"
                  className="flex flex-col justify-end text-3xl"
                  onClick={() => {
                    stopMic();
                  }}
                >
                  <BsArrowCounterclockwise className="fill-white" />
                </button>
              )}
              <div className="flex flex-col justify-center items-center">
                <div className="text-white">
                  {isMic ? '듣고있어요' : '말씀해주세요.'}
                </div>
                <button
                  className="rounded-full bg-white p-1 text-3xl text-black w-20 h-20 flex justify-center items-center"
                  onClick={handleMic}
                >
                  {isMic ? <BsArrowUp /> : <BsMic />}
                </button>
              </div>
              <div></div>
            </div>
          </div>
        )}
        {/* 키보드 on */}
        {!isChat && (
          <div className="flex items-center min-h-[50px] mx-5 relative">
            <button
              type="button"
              className={`bg-brandY text-white font-bold py-2 px-2 rounded-full mr-3 absolute bottom-[0.65rem] shadow-custom`}
              onClick={handleMicChange}
            >
              <BsMic className="fill-white" />
            </button>
            <div className="relative w-full ml-12 mt-2">
              <textarea
                ref={textareaRef}
                placeholder="메시지를 입력하세요."
                className="mr-2 pl-4 px-10 pr-12 py-2 rounded-lg border-2 text-sm border-gray-400 focus:outline-none focus:border-brandY w-full max-w-[100%] overflow-hidden resize-none min-h-[40px] shadow-custom"
                value={message}
                rows={1}
                onChange={handleKeyboardChange}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className={` bg-brandP hover:bg-brandG text-white font-bold py-2 px-2 rounded-full absolute right-1 bottom-[0.65rem] flex items-center`}
                onClick={sendMessage}
              >
                <BsArrowUp className="fill-white font-bold" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiChatSend;
