import Link from 'next/link';
import React from 'react';
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
    <div className="flex flex-col">
      {voiceList.map((voice) => (
        <div key={voice.id} className="m-2">
          <Link
            href={`challange/${voice.id}`}
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
              <div className="col-span-2">
                <p className="font-normal text-gray-700 p-5">{voice.title}</p>
                <div className="flex px-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  00 명
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
