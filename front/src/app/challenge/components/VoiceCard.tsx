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
      <div key={challenge.challengeId} className="my-3">
        <Link
          href={`challenge/${challenge.challengeId}`}
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="grid grid-cols-3">
            <div className="mr-5">
              <img
                className="h-auto w-full rounded-lg"
                src={challenge.challengeImg}
                alt=""
              />
            </div>
            <div className="col-span-2 flex flex-col justify-between p-7">
              <div className="flex">
                <p className="font-medium font-sans text-lg text-gray-500 p-5">
                  {challenge.title}
                </p>
              </div>

              <div className="px-5 flex">
                <FiUserPlus size={'1.5rem'} className="mr-2 stroke-gray-500" />
                <p className=" font-medium font-sans text-lg text-gray-500">
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
