import React from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { originalChallenge } from '@/types/share';
import Link from 'next/link';

type Props = {
  originalChallengeResponseDto: originalChallenge;
};

const VoiceChallengeInfo = ({ originalChallengeResponseDto }: Props) => {
  return (
    <div className="bg-gray-100 p-10 grid grid-cols-3">
      <div className="m-5">
        <Link
          href={`challenge/${originalChallengeResponseDto.challengeId}/original`}
        >
          <img
            className="h-48 w-32 rounded-lg bg-gray-200"
            src={originalChallengeResponseDto.challengeImg}
            alt="..."
          />
        </Link>
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
