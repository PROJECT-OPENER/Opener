import React, { useEffect, useState } from 'react';
import { getMyBadgesApi } from '@/app/api/userApi';
import Image from 'next/image';

const BotBadge = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const getMyBadges = async () => {
      const result = await getMyBadgesApi();
      console.log(result.data.data);
      const res = result.data.data;

      setData({
        sources: res,
        badgeSrc: {
          attendSrc:
            '/images/badges/attend_' + res.attendanceBadge.level + '.png',
          challengeSrc:
            '/images/badges/challenge_' + res.challengeBadge.level + '.png',
          shadowingSrc: '/images/badges/game_' + res.gameBadge.level + '.png',
          gameSrc:
            '/images/badges/shadowing_' + res.shadowingBadge.level + '.png',
        },
      });
    };
    getMyBadges();
  }, []);
  return (
    <div>
      {data ? (
        <ul>
          <li className="my-4 py-4 border-b flex flex-row justify-between">
            <div className="relative lg:w-[100px] lg:h-[100px] w-[80px] h-[80px]">
              {data.sources.attendanceBadge.level < 3 && (
                <Image src={data.badgeSrc.attendSrc} fill alt="" />
              )}
              {data.sources.attendanceBadge.level >= 4 && (
                <Image src={data.badgeSrc.attendSrc} fill alt="" />
              )}
            </div>
            <div className="w-[calc(100%-130px)]">
              <p className="sm:text-lg text-base font-bold">
                출석 Lv.{data.sources.attendanceBadge.level}
              </p>
              <p className="sm:text-base text-sm">
                출석하면 점수가 쌓여요. (1일 1회)
              </p>
              <div className="flex flex-row items-center">
                <div className="w-[calc(100%-50px)] h-[20px] flex flex-col relative justfiy-start border rounded-xl overflow-hidden">
                  <div
                    className={
                      data.sources.attendanceBadge.score
                        ? `h-full ${
                            data.sources.attendanceBadge.score
                              ? `w-[${data.sources.attendanceBadge.score}%]`
                              : ''
                          } bg-brandP`
                        : 'h-full w-0'
                    }
                  />
                </div>
                <span className="ml-2">
                  {data.sources.attendanceBadge.score}%
                </span>
              </div>
            </div>
          </li>
          <li className="my-4 py-4 border-b flex flex-row justify-between">
            <div className="relative lg:w-[100px] lg:h-[100px] w-[80px] h-[80px]">
              {data.sources.challengeBadge.level < 3 && (
                <Image src={data.badgeSrc.challengeSrc} fill alt="" />
              )}
              {data.sources.challengeBadge.level >= 4 && (
                <Image src={data.badgeSrc.challengeSrc} fill alt="" />
              )}
            </div>
            <div className="w-[calc(100%-130px)]">
              <p className="sm:text-lg text-base font-bold">
                챌린지 Lv.{data.sources.challengeBadge.level}
              </p>
              <p className="sm:text-base text-sm">
                챌린지에 참여하면 점수가 쌓여요.
              </p>
              <div className="flex flex-row items-center">
                <div className="w-[calc(100%-50px)] h-[20px] flex flex-col relative justfiy-start border rounded-xl overflow-hidden">
                  <div
                    className={
                      data.sources.challengeBadge.score
                        ? `h-full ${
                            data.sources.challengeBadge.score
                              ? `w-[${data.sources.challengeBadge.score}%]`
                              : ''
                          } bg-brandP`
                        : 'h-full w-0'
                    }
                  />
                </div>
                <span className="ml-2">
                  {data.sources.challengeBadge.score}%
                </span>
              </div>
            </div>
          </li>
          <li className="my-4 py-4 border-b flex flex-row justify-between">
            <div className="relative lg:w-[100px] lg:h-[100px] w-[80px] h-[80px]">
              {data.sources.gameBadge.level < 3 && (
                <Image src={data.badgeSrc.shadowingSrc} fill alt="" />
              )}
              {data.sources.gameBadge.level >= 4 && (
                <Image src={data.badgeSrc.shadowingSrc} fill alt="" />
              )}
            </div>
            <div className="w-[calc(100%-130px)]">
              <p className="sm:text-lg text-base font-bold">
                게임 Lv.{data.sources.gameBadge.level}
              </p>
              <p className="sm:text-base text-sm">
                게임에 참여하면 점수가 쌓여요.
              </p>
              <div className="flex flex-row items-center">
                <div className="w-[calc(100%-50px)] h-[20px] flex flex-col relative justfiy-start border rounded-xl overflow-hidden">
                  <div
                    className={
                      data.sources.gameBadge.score
                        ? `h-full ${
                            data.sources.gameBadge.score
                              ? `w-[${data.sources.gameBadge.score}%]`
                              : ''
                          } bg-brandP`
                        : 'h-full w-0'
                    }
                  />
                </div>
                <span className="ml-2">{data.sources.gameBadge.score}%</span>
              </div>
            </div>
          </li>
          <li className="my-4 py-4 border-b flex flex-row justify-between">
            <div className="relative lg:w-[100px] lg:h-[100px] w-[80px] h-[80px]">
              {data.sources.shadowingBadge.level < 3 && (
                <Image src={data.badgeSrc.gameSrc} fill alt="" />
              )}
              {data.sources.shadowingBadge.level >= 4 && (
                <Image src={data.badgeSrc.gameSrc} fill alt="" />
              )}
            </div>
            <div className="w-[calc(100%-130px)]">
              <p className="sm:text-lg text-base font-bold">
                쉐도잉 Lv.{data.sources.shadowingBadge.level}
              </p>
              <p className="sm:text-base text-sm">
                쉐도잉 학습을 하면 점수가 쌓여요.
              </p>
              <div className="flex flex-row items-center">
                <div className="w-[calc(100%-50px)] h-[20px] flex flex-col relative justfiy-start border rounded-xl overflow-hidden">
                  <div
                    className={
                      data.sources.shadowingBadge.score
                        ? `h-full ${
                            data.sources.shadowingBadge.score
                              ? `w-[${data.sources.shadowingBadge.score}%]`
                              : ''
                          } bg-brandP`
                        : 'h-full w-0'
                    }
                  />
                </div>
                <span className="ml-2">
                  {data.sources.shadowingBadge.score}%
                </span>
              </div>
            </div>
          </li>
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};

export default BotBadge;
