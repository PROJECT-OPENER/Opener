import { useSearchParams } from 'next/navigation';
import React from 'react';
import AiChatNavSlider from './AiChatNavSlider';
import { useRecoilValue } from 'recoil';
import { aiChatSub } from '../../store';

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  rows: 2,
};

const AiChatNavPc = () => {
  const subject = useRecoilValue(aiChatSub);
  return (
    <div className="bg-[#B474FF] p-5 rounded-3xl">
      <h1 className="text-center font-bold text-2xl text-white">
        주제 : {subject.name}
      </h1>
      <AiChatNavSlider settings={settings} />
    </div>
  );
};

export default AiChatNavPc;
