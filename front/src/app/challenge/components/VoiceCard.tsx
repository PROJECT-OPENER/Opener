import Link from 'next/link';
import React from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { originalChallenge } from '@/types/share';

type Props = {
  challenge: originalChallenge;
};

const VoiceCard = ({ challenge }: Props) => {
  return (
    <div className="flex flex-col m-12">
      <div key={challenge.challengeId} className="">
        <Link
          href={`challenge/${challenge.challengeId}`}
          className="block p-6 :h-60 bg-white border border-gray-200 rounded-lg shadow hover:bg-[#6713d4] hover:text-white hover:stroke-white"
        >
          <div className="grid grid-cols-3">
            <div className="flex items-center">
              <img
                className="md:h-48 rounded-lg "
                src={`https://img.youtube.com/vi/${challenge.challengeUrl}/0.jpg`}
                alt=""
              />
            </div>
            <div className="col-span-2 flex flex-col justify-between p-7">
              <div className="flex">
                <p className="font-medium font-sans text-lg   p-5">
                  {challenge.title}
                </p>
              </div>
              <div className="px-5 flex">
                <FiUserPlus size={'1.5rem'} className="mr-2" />
                <p className=" font-medium font-sans text-lg ">
                  {challenge.joinCount}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VoiceCard;
