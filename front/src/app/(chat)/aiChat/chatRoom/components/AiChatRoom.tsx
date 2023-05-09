'use client';
import React, { useEffect, useRef } from 'react';
import AiChatNav from './AiChatNav';
import AiChatMessageList from './AiChatMessageList';
import AiChatSendVoice from './AiChatSendVoice';
import AiChatSendText from './AiChatSendText';
import { openAiChatApi } from '@/app/api/openAi';
import { useSearchParams } from 'next/navigation';
import {
  aiChatIsChatState,
  aiChatIsRecordingState,
  aiChatMessageListState,
  aiChatMessageState,
  aiChatPromptState,
} from '../../store';
import { useRecoilState } from 'recoil';
import { handleChatLog, pushChatLog } from '@/util/AiChat';
import { BsKeyboard } from 'react-icons/bs';

const AiChatRoom = () => {
  // recoil
  const [message, setMessage] = useRecoilState(aiChatMessageState);
  const [messageList, setMessageList] = useRecoilState(aiChatMessageListState);
  const [promptData, setPromptData] = useRecoilState(aiChatPromptState);
  const [isRecording, setIsRecording] = useRecoilState(aiChatIsRecordingState);
  const [isChat, setisChat] = useRecoilState(aiChatIsChatState);

  // params
  const searchParams = useSearchParams();
  const subject = searchParams.get('sub');

  // ref
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // useEffect
  useEffect(() => {
    const res = openAiChatApi(
      `인공지능 챗 봇인 너가 영어학습을 도와줄 거라는 간단한 소개를 한 후 ${subject}와 관련된 대화를 영어로 시작해줘. 대화의 시작은 너의 소개야`,
    );
    res.then((res) => {
      // const regex = /^AI: /;
      const result = res.data.choices[0].text.replace(/^\n{2}AI:\s*/, '');
      // console.log(result);
      handleReceiveMessage(result);
    });
  }, []);
  useEffect(() => {
    // 스크롤이 최하단으로 자동으로 이동되도록 chatWindowRef의 scrollTop 속성을 최대값으로 설정합니다.
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
    // messageList 변경되면 promptData를 messageList에 추가합니다.
    const prompt = handleChatLog(messageList);
    setPromptData(prompt);
    console.log('prompt', prompt);
  }, [messageList]);

  // function
  const handleChatAi = async (message: string) => {
    try {
      setMessage('');
      // 1. 기존 promptData에 방금 유저가 보낸 message를 추가합니다.
      // 2. promptData를 openAiChatApi에 보내고, 응답을 받습니다.
      // 3. 응답을 messageList에 추가합니다.
      const prompt = pushChatLog(promptData, message);
      const res = await openAiChatApi(prompt);
      const result = await res.data.choices[0].text.replace(/^\n{2}AI:\s*/, '');
      await handleReceiveMessage(result);
    } catch (error) {
      console.log(error);
      // setWaitAnswer((prev) => !prev);?
    }
  };
  const handleSendMessage = () => {
    console.log('handleSendMessage', message);
    setMessageList((prevState) => [
      ...prevState,
      { text: message, sender: 'HUMAN' },
    ]);
    handleChatAi(message);
    setIsRecording(false);
  };
  const handleReceiveMessage = (message: string) => {
    setMessageList((prevState) => [
      ...prevState,
      { text: message, sender: 'AI' },
    ]);
  };

  const handleKeyboard = () => {
    setisChat(true);
  };
  return (
    <div className="h-screen border-2 flex flex-col">
      <div className="flex-none">
        <AiChatNav />
      </div>
      <div
        ref={chatWindowRef}
        className="flex-auto h-0 overflow-y-auto bg-blue-200"
      >
        <div className="min-h-full">
          <AiChatMessageList />
        </div>
      </div>
      <div className="flex-none h-fit flex flex-col bg-blue-200">
        {/* 녹음 시 텍스트 보여주기 */}
        {!isChat && isRecording && (
          <div className="relative mx-5">
            <div className="bg-white rounded-xl text-xl py-3 pl-5 pr-10 min-h-[3.25rem]">
              {message.length > 1 ? message : 'Listening...'}
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
        <div className="mx-5 mb-5 bg-brandP rounded-xl">
          {/* 녹음 */}
          {!isChat && <AiChatSendVoice handleSendMessage={handleSendMessage} />}
          {/* 키보드 */}
          {isChat && <AiChatSendText handleSendMessage={handleSendMessage} />}
        </div>
      </div>
    </div>
  );
};

export default AiChatRoom;
