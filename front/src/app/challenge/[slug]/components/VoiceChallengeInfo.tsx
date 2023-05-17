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
    <div className="bg-[#F8F8F8] p-5 grid grid-cols-5 ">
      <div className="mx-5 flex items-center col-span-2">
        <Link
          href={`challenge/${originalChallengeResponseDto.challengeId}/original`}
        >
          <img
            className="w-auto rounded-lg bg-gray-200"
            src={`https://img.youtube.com/vi/${originalChallengeResponseDto.challengeUrl}/0.jpg`}
            alt="..."
          />
        </Link>
      </div>
      <div className="col-span-3 flex flex-col justify-center mx-2">
        <div className="my-5 text-xl font-medium mx-2">
          <p>{originalChallengeResponseDto.title}</p>
        </div>
        <div className="flex items-center mb-5 text-xl font-medium mx-3">
          <FiUserPlus size={'1.5rem'} className="mr-2" />
          {originalChallengeResponseDto.joinCount}
        </div>
        <div className="flex justify-between">
          <Link
            href={`challenge/${originalChallengeResponseDto.challengeId}/original`}
            className="bg-[#F0F0F0]  w-48 py-3 rounded-3xl flex justify-center items-center shadow-sm mx-2"
          >
            <GrPlayFill size={'1.3rem'} className="fill-black mr-2" />
            <p className="text-lg font-bold">미리보기</p>
          </Link>
          <Link
            href={`challenge/shooting/${originalChallengeResponseDto.challengeId}`}
            className="bg-[#F0F0F0] w-48 py-3 rounded-3xl flex justify-center items-center sshadow-sm mx-2"
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
