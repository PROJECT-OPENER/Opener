type Props = {
  voiceId: string;
};

import React from 'react';
import { FiUserPlus } from 'react-icons/fi';

const VoiceInfo = ({ voiceId }: Props) => {
  return (
    <div className="bg-gray-100 p-10 grid grid-cols-3">
      <div className="m-5">
        <img
          className="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
          alt=""
        />
      </div>
      <div className="col-span-2 flex flex-col justify-center">
        <div className="my-5 text-xl font-medium">
          {voiceId}번째 챌린지 입니다
          <p>간단한 인사말을 활용한 챌린지입니다.</p>
        </div>
        <div className="flex my-5 text-xl font-medium">
          <FiUserPlus size={'2rem'} className="mr-2" />
          00
        </div>
      </div>
    </div>
  );
};

export default VoiceInfo;
