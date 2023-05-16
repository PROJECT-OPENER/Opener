'use client';
import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  userChatLastChatState,
  userChatMyNicknameState,
  userChatResultState,
} from '../../store';

const ResultScore = () => {
  const myNickname = useRecoilValue(userChatMyNicknameState);
  const result = useRecoilValue(userChatResultState);
  return (
    <div className="bg-white grid grid-cols-8 mx-5 p-5 rounded-3xl space-x-10">
      <div className="col-span-2 text-center font-bold flex flex-col justify-end">
        <div className="space-y-3 bg-gray-100 pt-3 flex flex-col justify-end rounded-2xl">
          <div>제시어</div>
          <div>문법</div>
          <div>문맥성</div>
        </div>
      </div>
      {result.myScore.nickname === myNickname ? (
        <>
          <div className="col-span-3 bg-green-100 rounded-2xl space-y-3 text-center font-bold flex flex-col justify-end">
            <div className="p-2 bg-white rounded-xl m-2">
              {result.myScore.nickname}
            </div>
            <div>{result.myScore.wordUsed ? '성공' : '실패'}</div>
            <div>{result.myScore.grammarScore}</div>
            <div>{result.myScore.contextScore}</div>
          </div>
          <div className="col-span-3 bg-yellow-100 rounded-2xl space-y-3 text-center font-bold flex flex-col justify-end">
            <div className="p-2 bg-white rounded-xl m-2">
              {result.otherScore.nickname}
            </div>
            <div>{result.otherScore.wordUsed ? '성공' : '실패'}</div>
            <div>{result.otherScore.grammarScore}</div>
            <div>{result.otherScore.contextScore}</div>
          </div>
        </>
      ) : (
        <>
          <div className="col-span-3 bg-yellow-100 rounded-2xl space-y-3 text-center font-bold flex flex-col justify-end">
            <div className="p-2 bg-white rounded-xl m-2">
              {result.otherScore.nickname}
            </div>
            <div>{result.otherScore.wordUsed ? '성공' : '실패'}</div>
            <div>{result.otherScore.contextScore}</div>
            <div>{result.otherScore.grammarScore}</div>
          </div>
          <div className="col-span-3 bg-green-100 rounded-2xl space-y-3 text-center font-bold flex flex-col justify-end">
            <div className="p-2 bg-white rounded-xl m-2">
              {result.myScore.nickname}
            </div>
            <div>{result.myScore.wordUsed ? '성공' : '실패'}</div>
            <div>{result.myScore.contextScore}</div>
            <div>{result.myScore.grammarScore}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultScore;
