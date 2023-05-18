import React from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { originalChallenge } from '@/types/share';
import Link from 'next/link';
import { BsPlay, BsCameraVideo } from 'react-icons/bs';
type Props = {
  originalChallengeResponseDto: originalChallenge;
};

const VoiceChallengeInfo = ({ originalChallengeResponseDto }: Props) => {
  return (
    <div className="bg-white rounded-lg px-5 relative flex py-5 flex-col sm:flex-row items-center justify-center">
      <div className="sm:mx-5">
        <Link
          href={`challenge/${originalChallengeResponseDto.challengeId}/original`}
        >
          <img
            className="rounded-lg bg-gray-200"
            src={`https://img.youtube.com/vi/${originalChallengeResponseDto.challengeUrl}/0.jpg`}
            alt="..."
          />
        </Link>
      </div>
      <div className="flex flex-col sm:min-w-[300px] justify-center sm:mx-5">
        <div className="my-5 text-lg font-medium mx-2">
          <p>{originalChallengeResponseDto.title}</p>
        </div>
        <div className="flex items-center mb-5 text-lg font-medium mx-3">
          <FiUserPlus size={'1.3rem'} className="mr-2" />
          {originalChallengeResponseDto.joinCount}
        </div>
        <div className="flex justify-center">
          <Link
            href={`challenge/${originalChallengeResponseDto.challengeId}/original`}
            className="bg-white text-base font-semibold rounded-3xl flex justify-center items-center shadow-custom px-3 py-1 hover:bg-brandP active:bg-[#7113ea] hover:text-white mr-3"
          >
            <BsPlay className="mr-2" />
            미리보기
          </Link>
          <Link
            href={`challenge/shooting/${originalChallengeResponseDto.challengeId}`}
            className="bg-white text-base font-semibold rounded-3xl flex justify-center items-center shadow-custom px-3 py-1 hover:bg-brandP active:bg-[#7113ea] hover:text-white"
          >
            <BsCameraVideo className="mr-2" />
            참여하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VoiceChallengeInfo;
