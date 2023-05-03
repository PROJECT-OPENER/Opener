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
import axios from 'axios';
import { openAiChatApi } from '@/app/api/openAi';
import { handleChatLog, pushChatLog } from '@/app/util/AiChat';

type SendMessageFunction = (message: string) => void;
type onReceiveMessage = (message: string) => void;

interface AiChatSendProps {
  onSendMessage: SendMessageFunction;
  onReceiveMessage: onReceiveMessage;
  promptData: string;
}

const AiChatSend = ({
  onSendMessage,
  onReceiveMessage,
  promptData,
}: AiChatSendProps) => {
  const [message, setMessage] = useState('');
  const [isChat, setisChat] = useState(true);
  const [isMic, setisMic] = useState(false); // 마이크 기본값 : 꺼짐
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [transcript, setTranscript] = useState('');

  // const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    setTranscript(event.results[0][0].transcript);
  };

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

  const chatAi = async (data: string) => {
    try {
      setMessage('');
      stopMic();
      console.log(promptData);
      console.log(data);
      const prompt = pushChatLog(promptData, data);
      const res = await openAiChatApi(prompt);
      const result = await res.data.choices[0].text.replace(/^\n{2}AI:\s*/, '');
      await onReceiveMessage(result);
    } catch (error) {
      console.log(error);
      // setWaitAnswer((prev) => !prev);?
    }
  };

  const sendMessage = async () => {
    if (message.trim()) {
      console.log('send message trim');
      onSendMessage(message);
      // textareaRef.current.style.height = `40px`;
    } else {
      console.log('send message');
      onSendMessage(transcript);
    }
    const question = message.trim() || transcript;
    stopMic();
    setMessage('');
    chatAi(question);
  };
  const stopMic = () => {
    recognition.continuous = false;
    recognition.stop();
    setTranscript('');
    setisMic(false);
  };

  const handleMic = () => {
    if (!isMic) {
      // 마이크가 꺼져 있으면 켜고 리스닝 시작
      console.log('start mic');
      setisMic(true);
      recognition.start();
      recognition.continuous = true;
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
