type Props = {
  voiceId: string;
};

import React from 'react';

const VoiceInfo = ({ voiceId }: Props) => {
  return (
    <div className="bg-gray-100 p-10">
      {voiceId}번째 챌린지 입니다
      <p>간단한 인사말을 활용한 챌린지입니다.</p>
      <div className="flex">
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
        00
      </div>
    </div>
  );
};

export default VoiceInfo;
