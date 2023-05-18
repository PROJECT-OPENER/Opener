'use client';
import React, { useEffect, useRef } from 'react';
import AiChatNav from './AiChatNav';
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
import Model from '@/app/three/chat/Model';
import DetailPageNav from '@/app/components/DetailPageNav';
import { useRouter } from 'next/navigation';
import AiModel from '../../components/AiModel';

const AiChatRoom = () => {
  // recoil
  const [message, setMessage] = useRecoilState(aiChatMessageState);
  const [messageList, setMessageList] = useRecoilState(aiChatMessageListState);
  const [promptData, setPromptData] = useRecoilState(aiChatPromptState);
  const [isRecording, setIsRecording] = useRecoilState(aiChatIsRecordingState);
  const [isChat, setisChat] = useRecoilState(aiChatIsChatState);

  // ref
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

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
      console.log('res', res.data.choices[0].text);
      const result = await res.data.choices[0].text.replace(/^\n{2}AI:\s*/, '');
      await handleReceiveMessage(result);
    } catch (error) {
      console.log(error);
      // setWaitAnswer((prev) => !prev);?
    }
  };
  const handleSendMessage = () => {
    if (message.length === 0) {
      alert('메세지를 입력해주세요.');
      return;
    }
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
  const handleLeftGame = () => {
    router.push('/chat');
  };
  return (
    <div>
      <div className="absolute top-0 left-0 w-screen h-screen">
        <AiModel />
      </div>
      <div className="absolute top-0 left-0 w-screen h-screen flex flex-col items-center overflow-hidden">
        <div className="lg:block hidden">
          <DetailPageNav
            className="max-w-[1500px] absolute top-3 left-10 right-10 mx-auto"
            title="AI CHAT"
            propEvent={handleLeftGame}
          />
        </div>
        <div className="lg:hidden w-full text-sm">
          <AiChatNav />
        </div>

        <div className="lg:p-6 lg:pt-20 h-full w-full flex lg:flex-row lg:justify-between lg:items-end lg:max-w-[1560px]">
          <div className="lg:w-full lg:max-w-[410px] lg:block hidden text-sm ">
            <AiChatNav />
          </div>
          {/* 오른쪽, 채팅 */}
          <div className="h-full w-full lg:max-w-[410px] lg:max-h-[700px]">
            <div className="flex flex-col justify-between h-full overflow-y-auto lg:bg-[#fff6] lg:border lg:rounded-3xl shadow-custom">
              <div
                ref={chatWindowRef}
                className="overflow-y-auto lg:px-5 lg:mt-6 flex-auto h-0"
              >
                <div className="min-h-full text-sm">
                  <AiChatMessageList
                    handleReceiveMessage={handleReceiveMessage}
                  />
                </div>
              </div>
              <div className="flex-none h-fit flex flex-col lg:rounded-3xl">
                {/* 녹음 시 텍스트 보여주기 */}
                {!isChat && isRecording && (
                  <div className="relative mx-5">
                    <div className="bg-white rounded-xl py-3 pl-5 pr-10 min-h-[3.25rem] text-sm">
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
                <div className="mx-5 mb-5 bg-brandP rounded-xl shadow-custom">
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

export default AiChatRoom;
