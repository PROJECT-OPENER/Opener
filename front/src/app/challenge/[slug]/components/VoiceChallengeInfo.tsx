import React from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { originalChallenge } from '@/app/types/share';

type Props = {
  originalChallengeResponseDto: originalChallenge;
};

const VoiceChallengeInfo = ({ originalChallengeResponseDto }: Props) => {
  return (
    <div className="bg-gray-100 p-10 grid grid-cols-3">
      <div className="m-5">
        <img
          className="h-auto max-w-full rounded-lg"
          src={originalChallengeResponseDto.challengeImg}
          alt=""
        />
      </div>
      <div className="col-span-2 flex flex-col justify-center">
        <div className="my-5 text-xl font-medium">
          <p>{originalChallengeResponseDto.title}</p>
        </div>
        <div className="flex my-5 text-xl font-medium">
          <FiUserPlus size={'2rem'} className="mr-2" />
          {originalChallengeResponseDto.joinCount}
        </div>
      </div>
    </div>
  );
};

export default VoiceChallengeInfo;
