'use client';
import Image from 'next/image';
import React from 'react';

interface ResultTrophyProps {
  myScore: number;
  myScoreChange: number;
  winnerNickname: string;
}

const ResultTrophy = ({
  myScore,
  myScoreChange,
  winnerNickname,
}: ResultTrophyProps) => {
  return (
    <div className="bg-white m-5 p-5 flex flex-col justify-center items-center rounded-3xl">
      <h1 className="text-2xl font-bold">
        {myScore} (+{myScoreChange})
      </h1>
      <div className="h-32 w-32">
        <Image
          src={'/images/trophy.png'}
          alt="Picture of the author"
          className="rounded-full w-full h-full"
          width={500}
          height={500}
        />
      </div>
      <div>
        <h1 className="text-xl font-bold">{winnerNickname} 님이 이겼습니다.</h1>
      </div>
    </div>
  );
};

export default ResultTrophy;
