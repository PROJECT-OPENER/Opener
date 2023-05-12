'use client';
import Button from '@/app/components/Button';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  userChatRoomIdState,
  userChatTimerState,
  userChatTurnState,
} from '../../store';

const UserChatNav = () => {
  const userChatRoom = useRecoilValue(userChatRoomIdState);
  const turn = useRecoilValue(userChatTurnState);
  const [isTip, setIsTip] = useState(true);
  const timer = useRecoilValue(userChatTimerState);
  const handleTip = () => {
    setIsTip(!isTip);
  };
  return (
    <div className={isTip ? 'h-[120px] shadow-xl' : 'h-[60px] shadow-xl'}>
      <div className="flex justify-between items-center h-[60px] mx-5 text-2xl">
        <Link href={'./userChat/Result'}>종료</Link>
        <div>Round {turn === 11 ? '10' : turn}</div>
        <Button type="button" className="" text="TIP" onClick={handleTip} />
      </div>
      {isTip && (
        <div className="h-[60px] bg-brandP px-5 flex items-center justify-between space-x-3 max-w-full">
          <div className="text-xl font-bold text-white flex items-center">
            제시어 : {userChatRoom.keyword} : {timer}
          </div>
          <div className="text-white text-xs flex-1">
            {userChatRoom.exampleEng}
            <br />
            {userChatRoom.exampleKor}
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
