'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import AiChatSlider from './AiChatSlider';
import Button from '@/app/components/Button';

const AiChatNav = () => {
  const searchParams = useSearchParams();
  const subject = searchParams.get('sub');
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
        <div className="h-[60px] bg-brandP px-5 flex items-center justify-between space-x-3 max-w-full">
          <div className="text-2xl font-bold text-white flex items-center">
            {subject}
          </div>
          <AiChatSlider />
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
