import { rankInterface } from '@/types/share';
import Image from 'next/image';
import React from 'react';

type props = {
  rank: rankInterface[];
};

const Rank = ({ rank }: props) => {
  const leftRankings = rank.slice(0, 5); // 왼쪽에 위치할 1~5등 데이터
  const rightRankings = rank.slice(5, 10); // 오른쪽에 위치할 6등 데이터

  return (
    <div className="mt-6 lg:mt-10">
      <h1 className="text-lg lg:mb-3 ml-4 font-bold">TREB 랭킹</h1>
      <div className="bg-white mx-3 p-3 rounded-xl shadow-custom">
        <div className="flex lg:flex-row max-lg:flex-col">
          <div className="lg:w-1/2 max-lg:w-full">
            {leftRankings.map((content, index) => (
              <div
                key={index}
                className="flex flex-row items-center p-3 border-b-2 justify-between"
              >
                <div className="flex flex-row items-center ">
                  <p className="font-bold text-2xl">{content.rank}</p>
                  <div className="h-10 w-10 ml-3 mr-1">
                    <Image
                      src={content.profile}
                      width={30}
                      height={30}
                      alt="avatar"
                      className="rounded-full h-full w-full"
                    />
                  </div>
                  <p className="text-sm font-bold lg:text-base">
                    {content.nickname}
                  </p>
                </div>
                <p className="text-end col-end-1 font-bold">
                  {content.score}점
                </p>
              </div>
            ))}
          </div>
          <div className="lg:w-1/2 max-lg:w-full">
            {rightRankings.map((content, index) => (
              <div
                key={index}
                className="flex flex-row items-center p-3 border-b-2 justify-between"
              >
                <div className="flex flex-row items-center ">
                  <p className="font-bold text-2xl w-5">{content.rank}</p>
                  <div className="h-10 w-10 ml-3 mr-1">
                    <Image
                      src={content.profile}
                      width={30}
                      height={30}
                      alt="avatar"
                      className="rounded-full h-full w-full"
                    />
                  </div>
                  <p className="text-sm font-bold lg:text-base">
                    {content.nickname}
                  </p>
                </div>
                <p className="text-end col-end-1 font-bold">
                  {content.score}점
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rank;
