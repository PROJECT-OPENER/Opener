'use client';
import { useState } from 'react';
import BotBadge from './BotBadge';
import { CgMenuGridO, CgHeart } from 'react-icons/cg';
import { SlBadge } from 'react-icons/sl';
import BotMyChallange from './BotMyChallange';
import BotLikeChallange from './BotLikeChallange';

const MypageBotSection = () => {
  const tabList: { [key: number]: JSX.Element } = {
    0: <BotMyChallange />,
    1: <BotLikeChallange />,
    2: <BotBadge />,
  };
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="bg-white m-3 rounded-3xl">
      <div className="tab-box flex justify-around text-3xl border-b-2 h-full">
        <button
          type="button"
          onClick={() => {
            setActiveTab(0);
          }}
          className={`${
            activeTab === 0 ? 'bg-purple-200' : ''
          } w-full flex justify-center h-full p-3`}
        >
          <CgMenuGridO />
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab(1);
          }}
          className={`${
            activeTab === 1 ? 'bg-purple-200' : ''
          } w-full flex justify-center h-full p-3`}
        >
          <CgHeart />
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab(2);
          }}
          className={`${
            activeTab === 2 ? 'bg-purple-200' : ''
          } w-full flex justify-center h-full p-3`}
        >
          <SlBadge />
        </button>
      </div>
      <div className="content-box px-10 py-3">{tabList[activeTab]}</div>
    </div>
  );
};

export default MypageBotSection;
