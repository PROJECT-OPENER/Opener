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
// import Image from 'next/image';
import TopNavPc from '@/app/components/TopNavPc';
import AiChatNav from './AiChatNav';
import Model from '@/app/three/chat/Model';
import Image from 'next/image';
import AiModel from '../../components/AiModel';
import { useRouter } from 'next/navigation';
const AiChatRoomPc = () => {
  const [message, setMessage] = useRecoilState(aiChatMessageState);
  const [messageList, setMessageList] = useRecoilState(aiChatMessageListState);
  const [promptData, setPromptData] = useRecoilState(aiChatPromptState);
  const [isRecording, setIsRecording] = useRecoilState(aiChatIsRecordingState);
  const [isChat, setisChat] = useRecoilState(aiChatIsChatState);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messageListContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
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
  const handleLeftGame = () => {
    router.push('/chat');
  };
  return (
    <div>
      <div className="absolute top-0 left-0 right-0 h-[100vh] w-full">
        <AiModel />
      </div>
      <div className="absolute top-0 left-0 h-[100vh] w-[100vw] flex flex-row justify-center items-end pb-10 px-8">
        <div className="absolute top-3 left-10 right-10 grid grid-cols-3 bg-[#fff6] shadow-custom p-3 rounded-xl max-w-[1500px] mx-auto">
          <Image
            src={'/images/logo.png'}
            alt="Logo"
            width={100}
            height={24}
            priority
            className="mt-2"
          />
          <h1 className="text-center text-3xl font-bold">AI CHAT</h1>
          <button
            className="text-end text-xl"
            onClick={handleLeftGame}
            type="button"
          >
            종료
          </button>
        </div>
        <div className="flex flex-row justify-between items-end h-[85%] w-full max-w-[1500px] lg:text-sm">
          {/* 왼쪽, 정보 */}
          <div className="w-full max-w-[410px]">
            <AiChatNav />
          </div>
          {/* 오른쪽, 채팅 */}
          <div className="w-full max-w-[410px] h-full">
            <div
              ref={chatWindowRef}
              className="flex flex-col justify-between h-full overflow-y-auto bg-[#fff6] border lg:rounded-3xl shadow-custom"
            >
              <div
                className="overflow-y-auto px-4 mt-6"
                ref={messageListContainerRef}
              >
                <AiChatMessageList
                  handleReceiveMessage={handleReceiveMessage}
                />
              </div>
              <div className="flex-none h-fit flex flex-col rounded-3xl">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatRoomPc;
