'use client';
import React, { useEffect, useState } from 'react';
import { getMyBadgesApi } from '@/app/api/userApi';
import Image from 'next/image';
import ProgressBar from '@ramonak/react-progress-bar';

const BotBadge = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const getMyBadges = async () => {
      const result = await getMyBadgesApi();
      console.log(result);
      const res = result.data.data;
      const datas = [
        {
          level: res.attendanceBadge.level,
          score: res.attendanceBadge.score,
          badgeSrc:
            '/images/badges/attend_' + res.attendanceBadge.level + '.png',
        },
        {
          level: res.challengeBadge.level,
          score: res.challengeBadge.score,
          badgeSrc:
            '/images/badges/challenge_' + res.challengeBadge.level + '.png',
        },
        {
          level: res.gameBadge.level,
          score: res.gameBadge.score,
          badgeSrc: '/images/badges/game_' + res.gameBadge.level + '.png',
        },
        {
          level: res.shadowingBadge.level,
          score: res.shadowingBadge.score,
          badgeSrc:
            '/images/badges/shadowing_' + res.shadowingBadge.level + '.png',
        },
      ];
      setData(datas);
    };
    getMyBadges();
  }, []);
  return (
    <div>
      <ul>
        {data?.map((content: any, index: number) => {
          return (
            <li
              key={index}
              className="my-4 py-4 border-b flex flex-row justify-between"
            >
              <div className="relative lg:w-[100px] lg:h-[100px] w-[80px] h-[80px]">
                {content.level < 3 && (
                  <Image src={content.badgeSrc} fill alt="" />
                )}
                {content.level >= 4 && (
                  <Image src={content.badgeSrc} fill alt="" />
                )}
              </div>
              <div className="w-[calc(100%-130px)]">
                <p className="sm:text-lg text-base font-bold">
                  출석 Lv.{content.level}
                </p>
                <p className="sm:text-base text-sm">
                  출석하면 점수가 쌓여요. (1일 1회)
                </p>
                <div className="w-full">
                  <ProgressBar completed={content.score} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BotBadge;
