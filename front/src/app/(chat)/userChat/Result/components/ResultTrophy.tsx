'use client';
import Image from 'next/image';
import React from 'react';
import { userChatMyNicknameState, userChatResultState } from '../../store';
import { useRecoilValue } from 'recoil';

const ResultTrophy = () => {
  const myNickname = useRecoilValue(userChatMyNicknameState);
  const result = useRecoilValue(userChatResultState);
  return (
    <div className="bg-white m-5 p-5 flex flex-col justify-center items-center rounded-3xl">
      <h1 className="text-2xl font-bold">
        {result.myScore.nickname === myNickname ? (
          <span>
            {result.myScore.currentScore} (
            {result.myScore.changeScore > 0
              ? `+${result.myScore.changeScore}`
              : `${result.myScore.changeScore}`}
            )
          </span>
        ) : (
          <span>
            {result.otherScore.currentScore} (
            {result.otherScore.changeScore > 0
              ? `+${result.otherScore.changeScore}`
              : `${result.otherScore.changeScore}`}
            )
          </span>
        )}
      </h1>
      <div className="h-32 w-32">
        <Image
          src={'/images/trophy.png'}
          alt="pic"
          className="rounded-full w-full h-full"
          width={500}
          height={500}
        />
      </div>
      <div>
        {/* <h1 className="text-xl font-bold">{winnerNickname} 님이 이겼습니다.</h1> */}
        {result.winnerNickname === null && (
          <h1 className="text-xl font-bold">Dead heat</h1>
        )}
        {result.winnerNickname === myNickname ? (
          <h1 className="text-xl font-bold">Victory</h1>
        ) : (
          <h1 className="text-xl font-bold">Defeat</h1>
        )}
      </div>
    </div>
  );
};

export default ResultTrophy;
