'use client';
import React from 'react';

interface ResultScoreProps {
  myNickname: string;
  myWordUsed: boolean;
  myGrammarScore: number;
  myContextScore: number;
  otherNickname: string;
  otherWordUsed: boolean;
  otherGrammarScore: number;
  otherContextScore: number;
}

const ResultScore = ({
  myNickname,
  myWordUsed,
  myContextScore,
  myGrammarScore,
  otherContextScore,
  otherGrammarScore,
  otherNickname,
  otherWordUsed,
}: ResultScoreProps) => {
  return (
    <div className="bg-white grid grid-cols-8 mx-5 p-5 rounded-3xl space-x-10">
      <div className="col-span-2 text-center font-bold flex flex-col justify-end">
        <div className="space-y-3 bg-gray-100 pt-3 flex flex-col justify-end rounded-2xl">
          <div>제시어</div>
          <div>문법</div>
          <div>문맥성</div>
        </div>
      </div>
      <div className="col-span-3 bg-green-100 rounded-2xl space-y-3 text-center font-bold flex flex-col justify-end">
        <div className="p-2 bg-white rounded-xl m-2">{myNickname}</div>
        <div>{myWordUsed ? '성공' : '실패'}</div>
        <div>{myGrammarScore}</div>
        <div>{myContextScore}</div>
      </div>
      <div className="col-span-3 bg-yellow-100 rounded-2xl space-y-3 text-center font-bold flex flex-col justify-end">
        <div className="p-2 bg-white rounded-xl m-2">{otherNickname}</div>
        <div>{otherWordUsed ? '성공' : '실패'}</div>
        <div>{otherGrammarScore}</div>
        <div>{otherContextScore}</div>
      </div>
    </div>
  );
};

export default ResultScore;
