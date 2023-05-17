'use client';
import Button from '@/app/components/Button';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  userChatRoomIdState,
  userChatTimerState,
  userChatTurnState,
} from '../../store';
import { BsCircleFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

const UserChatNav = () => {
  const router = useRouter();
  const userChatRoom = useRecoilValue(userChatRoomIdState);
  const turn = useRecoilValue(userChatTurnState);
  const [isTip, setIsTip] = useState(true);
  const timer = useRecoilValue(userChatTimerState);
  const handleTip = () => {
    setIsTip(!isTip);
  };
  const handleLeftGame = () => {
    const confirmed = window.confirm('게임을 나가시겠습니까?');
    if (confirmed) {
      router.push('/chat');
    }
  };
  return (
    <>
      {/* 모바일 */}
      <div
        className={
          isTip
            ? 'h-[120px] shadow-xl lg:hidden'
            : 'h-[60px] shadow-xl lg:hidden'
        }
      >
        <div className="flex justify-between items-center h-[60px] mx-5 text-2xl">
          <button type="button" onClick={handleLeftGame}>
            종료
          </button>
          <div>Round {turn === 11 ? '10' : turn}</div>
          <Button type="button" className="" text="TIP" onClick={handleTip} />
        </div>
        {isTip && (
          <div className="h-[60px] bg-brandP px-5 flex items-center justify-between space-x-3 max-w-full">
            <div className="text-xl font-bold text-white flex items-center">
              제시어 : {userChatRoom.keyword}
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
      {/* pc */}
      <div className="max-lg:hidden bg-[#fff6] rounded-3xl p-5 space-y-3 shadow-custom">
        <h1 className="text-black font-bold text-center xl:text-2xl lg:text-base mb-5">
          제시어 : {userChatRoom.keyword}
        </h1>
        <div className="bg-brandP p-3 rounded-3xl flex items-center xl:text-base lg:text-sm">
          <BsCircleFill className="fill-blue-300" />
          <div className="text-white ml-3">
            <div>제시어를 사용하면 추가 점수를 얻을 수 있습니다.</div>
            <div>다음과 같이 사용해보세요.</div>
          </div>
        </div>
        <div className="bg-brandP p-3 rounded-3xl flex items-center xl:text-base lg:text-sm">
          <BsCircleFill className="fill-green-400" />
          <div className="text-white ml-3">
            <div>{userChatRoom.exampleEng}</div>
            <div>{userChatRoom.exampleKor}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserChatNav;
