'use client';
import React, { useEffect, useState } from 'react';
import {
  userChatGrammerMsgListState,
  userChatMessageListState,
  userChatMyNicknameState,
  userChatRoomIdState,
} from '../../store';
import { useRecoilValue } from 'recoil';
import { resultArray } from '@/util/AiChat';
import { AiOutlineCheckCircle, AiOutlineWarning } from 'react-icons/ai';
import { ucAnalyzedMsgInterface } from '@/types/userChatTypes';
import { Message } from '@/types/share';
import ProfileImage from '@/app/components/ProfileImage';

type PossibleResTypes = ucAnalyzedMsgInterface[] | Message[];

const AnalyzeResult = () => {
  // console.log(result);
  const messageList = useRecoilValue(userChatMessageListState);
  const myNickname = useRecoilValue(userChatMyNicknameState);
  const grammerList = useRecoilValue(userChatGrammerMsgListState);
  const userChatRoom = useRecoilValue(userChatRoomIdState);
  const [res, setRes] = useState<PossibleResTypes>([]);
  useEffect(() => {
    console.log('messageList', grammerList);
    const handleAnalyze = async () => {
      const result = await resultArray(messageList, grammerList);
      setRes(result);
    };
    handleAnalyze();
  }, []);
  useEffect(() => {
    console.log('res', res);
    console.log(userChatRoom);
  }, [res]);
  return (
    <div className="p-5 border-2 bg-blue-200 rounded-xl">
      {res.map((item: ucAnalyzedMsgInterface | Message, index) => (
        <div
          key={index}
          className={`${
            item.nickname === myNickname
              ? 'flex flex-col justify-end items-end mb-2'
              : 'w-fit'
          }`}
        >
          {item.nickname !== myNickname && (
            <div className="flex mt-2 relative">
              <ProfileImage
                className="h-12 w-12 mx-2 hover:cursor-pointer min-w-[48px]"
                profileUrl={userChatRoom.otherImgUrl}
                height={500}
                width={500}
              />
              <div className="max-w-[70vw]">
                <div>{userChatRoom.otherNickname}</div>
                <div className="other-chat overflow-hidden break-words">
                  {item.message}
                </div>
              </div>
            </div>
          )}
          {item.nickname === myNickname && (
            <div className="bg-brandY rounded-br-none rounded-2xl p-5 ml-24 mb-1 mr-3 break-words mt-3">
              {'type' in item && item.type === 'pass' && (
                <>
                  <div className="rounded-2xl py-2 w-fit flex relative">
                    <AiOutlineWarning className="absolute bottom-2.5" />
                    <div className="pl-5">pass</div>
                  </div>
                </>
              )}
              {'type' in item && item.type === 'correct' && (
                <>
                  <div className="text-green-500 rounded-2xl py-2 w-fit flex relative font-bold">
                    <AiOutlineCheckCircle className="absolute bottom-3" />
                    <div className="pl-5">문법 상 고칠 부분이 없습니다.</div>
                  </div>
                  <div>{item.message}</div>
                </>
              )}
              {'type' in item && item.type === 'grammerCheck' && (
                <>
                  <div className="text-red-700 rounded-2xl py-2 w-fit flex flex-col relative font-bold">
                    <AiOutlineWarning className="absolute bottom-3" />
                    <div className="pl-5">문법 상 개선 필요</div>
                  </div>
                  <div>{item.message}</div>
                  <hr className="my-1 h-[2px] bg-gray-500" />
                  <div
                    dangerouslySetInnerHTML={{ __html: item.correctMessage }}
                  />
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnalyzeResult;
