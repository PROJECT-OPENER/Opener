'use client';
import React, { useEffect, useState } from 'react';
import {
  userChatGrammerMsgListState,
  userChatMessageListState,
  userChatMyNicknameState,
} from '../../store';
import { useRecoilValue } from 'recoil';
import { resultArray } from '@/util/AiChat';
import { AiOutlineCheckCircle, AiOutlineWarning } from 'react-icons/ai';
import { ucAnalyzedMsgInterface } from '@/types/userChatTypes';
import { Message } from '@/types/share';

type PossibleResTypes = ucAnalyzedMsgInterface[] | Message[];

const AnalyzeResult = () => {
  // console.log(result);
  const messageList = useRecoilValue(userChatMessageListState);
  const myNickname = useRecoilValue(userChatMyNicknameState);
  const grammerList = useRecoilValue(userChatGrammerMsgListState);
  const [res, setRes] = useState<PossibleResTypes>([]);
  useEffect(() => {
    const handleAnalyze = async () => {
      const result = await resultArray(messageList, grammerList);
      setRes(result);
    };
    handleAnalyze();
  }, []);
  useEffect(() => {
    console.log('res', res);
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
            <div className="other-chat">{item.message}</div>
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
