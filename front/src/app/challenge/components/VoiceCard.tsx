import Link from 'next/link';
import React from 'react';
import { FiUserPlus } from 'react-icons/fi';

type Voice = {
  id: string;
  title: string;
  image: string;
};

type Props = {
  voiceList: Voice[];
};

const VoiceCard = ({ voiceList }: Props) => {
  return (
    <div className="flex flex-col m-12">
      {voiceList.map((voice) => (
        <div key={voice.id} className="my-3">
          <Link
            href={`challenge/${voice.id}`}
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="grid grid-cols-3">
              <div className="mr-5">
                <img
                  className="h-auto w-full rounded-lg"
                  src={voice.image}
                  alt=""
                />
              </div>
              <div className="col-span-2 flex flex-col justify-between p-7">
                <div className="flex">
                  <p className="font-medium font-sans text-lg text-gray-500 p-5">
                    {voice.title}
                  </p>
                </div>

                <div className="px-5 flex">
                  <FiUserPlus
                    size={'1.5rem'}
                    className="mr-2 stroke-gray-500"
                  />
                  <p className=" font-medium font-sans text-lg text-gray-500">
                    00 명
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default VoiceCard;
