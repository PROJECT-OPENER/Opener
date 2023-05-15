'use client';
import React, { useEffect, useRef } from 'react';
import AiChatMessageList from './AiChatMessageList';
import AiChatSendVoice from './AiChatSendVoice';
import AiChatSendText from './AiChatSendText';
import { openAiChatApi } from '@/app/api/openAi';
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
import Image from 'next/image';
import TopNavPc from '@/app/components/TopNavPc';
import AiChatNavPc from './AiChatNavPc';

const AiChatRoomPc = () => {
  const [message, setMessage] = useRecoilState(aiChatMessageState);
  const [messageList, setMessageList] = useRecoilState(aiChatMessageListState);
  const [promptData, setPromptData] = useRecoilState(aiChatPromptState);
  const [isRecording, setIsRecording] = useRecoilState(aiChatIsRecordingState);
  const [isChat, setisChat] = useRecoilState(aiChatIsChatState);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messageListContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 스크롤이 최하단으로 자동으로 이동되도록 messageListContainerRef의 scrollTop 속성을 최대값으로 설정합니다.
    if (messageListContainerRef.current) {
      messageListContainerRef.current.scrollTop =
        messageListContainerRef.current.scrollHeight;
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
      console.log('res', res.data.choices[0].text);
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
  const handleKeyboard = () => {
    setisChat(true);
  };
  const handleReceiveMessage = (message: string) => {
    setMessageList((prevState) => [
      ...prevState,
      { text: message, sender: 'AI' },
    ]);
  };
  return (
    <div>
      <TopNavPc />
      <div className="absolute top-20 left-10 right-10 grid grid-cols-3 bottom-10">
        {/* 왼쪽, 정보 */}
        <div className="flex flex-col justify-between h-[70%] mt-20">
          <AiChatNavPc />
          <div className="flex-none h-fit flex flex-col bg-[#B474FF] pt-5 rounded-3xl">
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
              {!isChat && (
                <AiChatSendVoice handleSendMessage={handleSendMessage} />
              )}
              {/* 키보드 */}
              {isChat && (
                <AiChatSendText handleSendMessage={handleSendMessage} />
              )}
            </div>
          </div>
        </div>
        {/* 중앙, three.js */}
        <div className="w-full h-full flex justify-center items-center">
          <Image
            src={'/images/metamong.png'}
            alt=""
            width={500}
            height={500}
            className="object-fill w-96 h-96"
          />
        </div>
        {/* 오른쪽, 채팅 */}
        <div className="h-[70%] mt-20">
          <div
            ref={chatWindowRef}
            className="flex-auto h-full overflow-y-auto bg-[#B474FF] lg:rounded-3xl"
          >
            <div
              className="min-h-full overflow-y-scroll max-h-[500px]"
              ref={messageListContainerRef}
            >
              <AiChatMessageList handleReceiveMessage={handleReceiveMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatRoomPc;
