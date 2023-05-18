import Link from 'next/link';
import React from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { originalChallenge } from '@/types/share';

type Props = {
  challenge: originalChallenge;
};

const VoiceCard = ({ challenge }: Props) => {
  return (
    <Link
      key={challenge.challengeId}
      href={`challenge/${challenge.challengeId}`}
      className="block bg-white hover:bg-brandP active:bg-brandPhover hover:text-white w-full lg:rounded-3xl sm:rounded-2xl rounded-xl border shadow-custom p-2 sm:p-3 mb-4"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <img
            className="h-[70px] sm:h-[100px] lg:h-[120px] rounded-md sm:rounded-lg lg:rounded-xl"
            src={`https://img.youtube.com/vi/${challenge.challengeUrl}/0.jpg`}
            alt=""
          />
          <p className="font-medium font-sans text-sm sm:text-md lg:text-lg ml-4 lg:ml-6">
            {challenge.title}
          </p>
        </div>
        <div className="md:px-5 flex">
          <FiUserPlus size={'1.5rem'} className="mr-2" />
          <p className="font-medium font-sans text-md lg:text-lg">
            {challenge.joinCount}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VoiceCard;
