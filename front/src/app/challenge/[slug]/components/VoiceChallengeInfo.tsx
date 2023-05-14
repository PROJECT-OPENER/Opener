import React from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { originalChallenge } from '@/types/share';
import Link from 'next/link';
import { AiOutlineCamera } from 'react-icons/ai';
import { GrPlayFill } from 'react-icons/gr';
type Props = {
  originalChallengeResponseDto: originalChallenge;
};

const VoiceChallengeInfo = ({ originalChallengeResponseDto }: Props) => {
  return (
    <div className="bg-[#F8F8F8] p-10 grid grid-cols-3 ">
      <div className="m-5 ">
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
        <div className="flex items-center mb-5 text-xl font-medium">
          <FiUserPlus size={'1.5rem'} className="mr-2" />
          {originalChallengeResponseDto.joinCount}
        </div>
        <div className="flex justify-between">
          <Link
            href={`challenge/${originalChallengeResponseDto.challengeId}/original`}
            className="bg-[#F0F0F0] w-48 py-3 rounded-3xl flex justify-center items-center shadow-sm"
          >
            <GrPlayFill size={'1.3rem'} className="fill-black mr-2" />
            <p className="text-lg font-bold">미리보기</p>
          </Link>
          <Link
            href={`challenge/shooting/${originalChallengeResponseDto.challengeId}`}
            className="bg-[#F0F0F0] w-48 py-3 rounded-3xl flex justify-center items-center sshadow-sm"
          >
            <AiOutlineCamera size={'1.5rem'} className="fill-black mr-2" />
            <p className="text-lg font-bold">참여하기</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VoiceChallengeInfo;
