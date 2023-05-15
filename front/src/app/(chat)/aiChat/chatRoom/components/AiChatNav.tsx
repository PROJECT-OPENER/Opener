'use client';
import Button from '@/app/components/Button';
import Link from 'next/link';
import React, { useState } from 'react';
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
};

const AiChatNav = () => {
  const subject = useRecoilValue(aiChatSub);
  const [isTip, setIsTip] = useState(true);
  const handleTip = () => {
    setIsTip(!isTip);
  };
  return (
    <div className={isTip ? 'h-[120px] shadow-xl' : 'h-[60px] shadow-xl'}>
      <div className="flex justify-between items-center h-[60px] mx-5 text-2xl">
        <Link href="./aiChat">종료</Link>
        <div>AI 챗</div>
        <Button type="button" className="" text="TIP" onClick={handleTip} />
      </div>
      {isTip && (
        <div className="h-[60px] bg-brandP px-5 flex items-center justify-between space-x-3 max-w-full]">
          <div className="text-2xl font-bold text-white flex items-center max-sm:text-sm">
            {subject.name}
          </div>
          <AiChatNavSlider setting={settings} />
          <Button
            text="x"
            className="text-white text-xl"
            type="button"
            onClick={handleTip}
          />
        </div>
      )}
    </div>
  );
};

export default AiChatNav;
