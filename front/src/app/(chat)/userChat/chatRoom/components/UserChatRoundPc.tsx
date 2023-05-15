'use client';
import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  userChatRoomIdState,
  userChatTimerState,
  userChatTurnState,
} from '../../store';
import { BsCircleFill } from 'react-icons/bs';
import UserChatSlider from './UserChatSlider';

const tipText = [
  {
    title: 'Round가 10이 되면 채팅은 종료되고,',
    content: 'AI가 대화를 분석합니다.',
  },
  {
    title: ': TREB : ',
    content: 'Ten Round English Battle',
  },
  {
    title: 'AI 분석을 마치면 결과가 나오고,',
    content: '문법 피드백도 확인할 수 있습니다.',
  },
];

const warnText = [
  {
    title: '주어진 시간 안에 채팅을 보내지 않으면',
    content: '점수를 잃게 되니 주의하세요.',
  },
  {
    title: '게임이 종료되기 전에 나가면',
    content: '패배하게 되니 주의하세요.',
  },
];

const UserChatRoundPc = () => {
  const turn = useRecoilValue(userChatTurnState);
  return (
    <div className="max-lg:hidden bg-[#B474FF] rounded-3xl p-5 space-y-3">
      <h1 className="font-bold text-center xl:text-2xl lg:text-base mb-5 text-white">
        Round {turn === 11 ? '10' : turn === 999 ? '종료' : turn}
      </h1>
      <div className="p-1 xl:text-base lg:text-sm">
        <UserChatSlider data={tipText} classname={'fill-blue-300'} />
      </div>
      <div className="p-1 xl:text-base lg:text-sm">
        <UserChatSlider data={warnText} classname={'fill-yellow-400'} />
      </div>
    </div>
  );
};

export default UserChatRoundPc;
