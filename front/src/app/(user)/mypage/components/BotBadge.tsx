import React, { useEffect, useState } from 'react';
import { getMyBadgesApi } from '@/app/api/userApi';
import Image from 'next/image';

const BotBadge = () => {
  const [data, setData] = useState<any>();
  const badgeNaming: any = [
    {
      attendanceBadge: 'attend',
      challengeBadge: 'challenge',
      gameBadge: 'game',
      shadowingBadge: 'shadowing',
    },
    ['', 'b', 's', 'g', 'p', 'd', 'r'],
  ];
  useEffect(() => {
    const getMyBadges = async () => {
      const res = await getMyBadgesApi();
      console.log(res.data.data);
      setData(res.data.data);
    };
    getMyBadges();
  }, []);
  return (
    <div>
      {data ? (
        <ul>
          <li>
            {data.attendanceBadge.level < 5 && (
              <Image
                src={
                  '/images/badges/attend_' +
                  badgeNaming[1][data.attendanceBadge.level] +
                  '.png'
                }
                fill
                alt=""
              />
            )}
            {data.attendanceBadge.level >= 5 && (
              <Image src={'/images/badges/attend_r.png'} fill alt="" />
            )}
            {/* <span>출석관련 뱃지 레벨 : {data.attendanceBadge.level}</span> */}
            <span>출석관련 뱃지 점수 : {data.attendanceBadge.score}</span>
          </li>
          <li>
            {data.challengeBadge.level < 5 && (
              <Image
                src={
                  '/images/badges/challenge_' +
                  badgeNaming[1][data.challengeBadge.level] +
                  '.png'
                }
                fill
                alt=""
              />
            )}
            {data.challengeBadge.level >= 5 && (
              <Image src={'/images/badges/challenge_r.png'} fill alt="" />
            )}
            {/* <span>출석관련 뱃지 레벨 : {data.attendanceBadge.level}</span> */}
            <span>챌린지관련 뱃지 점수 : {data.challengeBadge.score}</span>
          </li>

          <li>
            {data.gameBadge.level < 5 && (
              <Image
                src={
                  '/images/badges/game_' +
                  badgeNaming[1][data.gameBadge.level] +
                  '.png'
                }
                fill
                alt=""
              />
            )}
            {data.gameBadge.level >= 5 && (
              <Image src={'/images/badges/game_r.png'} fill alt="" />
            )}
            {/* <span>출석관련 뱃지 레벨 : {data.attendanceBadge.level}</span> */}
            <span>게임관련 뱃지 점수 : {data.gameBadge.score}</span>
          </li>

          {/* <li>
            <span>챌린지 관련 뱃지 레벨 : {data.challengeBadge.level}</span>
            <span>챌린지 관련 뱃지 점수 : {data.challengeBadge.score}</span>
          </li> */}
          {/* <li>
            <span>게임 관련 뱃지 레벨 : {data.gameBadge.level}</span>
            <span>게임 관련 뱃지 점수 : {data.gameBadge.score}</span>
          </li> */}
          <li>
            {data.shadowingBadge.level < 5 && (
              <Image
                src={
                  '/images/badges/game_' +
                  badgeNaming[1][data.shadowingBadge.level] +
                  '.png'
                }
                fill
                alt=""
              />
            )}
            {data.shadowingBadge.level >= 5 && (
              <Image src={'/images/badges/shadowing_r.png'} fill alt="" />
            )}
            {/* <span>출석관련 뱃지 레벨 : {data.attendanceBadge.level}</span> */}
            <span> 관련 뱃지 점수 : {data.shadowingBadge.score}</span>
          </li>
          {/* <li>
            <span>쉐도잉 관련 뱃지 레벨 : {data.shadowingBadge.level}</span>
            <span>쉐도잉 관련 뱃지 점수 : {data.shadowingBadge.score}</span>
          </li> */}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};

export default BotBadge;
