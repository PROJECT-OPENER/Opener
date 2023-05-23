'use client';
import Button from '@/app/components/Button';
import Link from 'next/link';
import React, { useState } from 'react';
import AiChatNavSlider from './AiChatNavSlider';
import { useRecoilValue } from 'recoil';
import { aiChatSub } from '../../store';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const AiChatNav = () => {
  const subject = useRecoilValue(aiChatSub);
  const [isTip, setIsTip] = useState(true);
  const handleTip = () => {
    setIsTip(!isTip);
  };
  return (
    <div>
      <div className="lg:hidden">
        <div className="flex flex-row justify-between items-center p-3 bg-white shadow-custom">
          <Link href="./chat">종료</Link>
          <p className="text-lg">AI CHAT</p>
          <Button type="button" className="" text="TIP" onClick={handleTip} />
        </div>
        {isTip && (
          <div className="flex flex-row justify-between px-5 py-2 h-[60px] items-center bg-brandP text-white">
            <p className="font-bold text-base">{subject.name}</p>
            <div className="w-[calc(100%-70px)] overflow-hidden flex flex-col justify-center">
              <AiChatNavSlider />
            </div>
            <button className="" onClick={handleTip}>
              <AiOutlineCloseCircle size={'1.25rem'} />
            </button>
          </div>
        )}
      </div>
      <div className="hidden lg:block p-5 rounded-3xl lg:shadow-custom lg:bg-[#fff6] border">
        <h1 className="text-center font-bold text-xl text-white lg:mb-4 lg:text-[#4B4B4B]">
          주제 : {subject.name}
        </h1>
        <div className="rounded-xl bg-brandP text-white p-2 h-[60px]">
          <AiChatNavSlider />
        </div>
      </div>
    </div>
  );
};

export default AiChatNav;
