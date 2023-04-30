'use client';
import { useState } from 'react';
import BotBadge from './BotBadge';
import BotLikeChallange from './BotLikeChallange';
import BotMyChallange from './BotMyChallange';
import { CgMenuGridO, CgHeart } from 'react-icons/cg';
import { SlBadge } from 'react-icons/sl';

const MypageBotSection = () => {
  const tabList: { [key: number]: JSX.Element } = {
    0: <BotMyChallange />,
    1: <BotLikeChallange />,
    2: <BotBadge />,
  };
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="bg-white">
      <div className="tab-box flex justify-around p-3 text-3xl border-b-2">
        <button
          type="button"
          onClick={() => {
            setActiveTab(0);
          }}
        >
          <CgMenuGridO />
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab(1);
          }}
        >
          <CgHeart />
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab(2);
          }}
        >
          <SlBadge />
        </button>
      </div>
      <div className="content-box px-10 py-3">{tabList[activeTab]}</div>
    </div>
  );
};

export default MypageBotSection;
