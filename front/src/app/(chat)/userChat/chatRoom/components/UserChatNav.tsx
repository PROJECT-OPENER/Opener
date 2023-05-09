'use client';
import Button from '@/app/components/Button';
import Link from 'next/link';
import React, { useState } from 'react';

const UserChatNav = () => {
  const [isTip, setIsTip] = useState(true);
  const handleTip = () => {
    setIsTip(!isTip);
  };
  return (
    <div className={isTip ? 'h-[120px] shadow-xl' : 'h-[60px] shadow-xl'}>
      <div className="flex justify-between items-center h-[60px] mx-5 text-2xl">
        <Link href="./aiChat">종료</Link>
        <div>user</div>
        <Button type="button" className="" text="TIP" onClick={handleTip} />
      </div>
      {isTip && (
        <div className="h-[60px] bg-brandP px-5 flex items-center justify-between space-x-3 max-w-full">
          <div className="text-xl font-bold text-white flex items-center">
            제시어 : 아이브
          </div>
          <div className="text-white text-xs">
            대화 중 아이브를 포함하면 추가점이 있습니다!
            <br />
            Do you knwo IVE?
          </div>
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

export default UserChatNav;
