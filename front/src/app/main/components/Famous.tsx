'use client';
import React, { useState, useEffect } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { allChallengeApi } from '@/app/api/challengeApi';
import { memberChallenge } from '@/types/share';
import Link from 'next/link';
import { AiFillHeart } from 'react-icons/ai';

const Famous = () => {
  const [contents, setContents] = useState<memberChallenge[]>([]);
  const options = {
    wheelSpeed: 2,
    handlers: ['touch', 'click-rail', 'drag-thumb', 'keyboard', 'wheel'],
    wheelPropagation: true,
    minScrollbarLength: 2,
  };

  useEffect(() => {
    const getContent = async () => {
      const response = await allChallengeApi('LIKE', 0, 5);
      console.log('000', response.memberChallengeList);
      setContents(response.memberChallengeList);
    };
    getContent();
  }, []);

  return (
    <div className="mt-10">
      {/* 데스크탑 용 */}
      <div className="hidden lg:block">
        <div className="flex flex-row justify-between mb-3">
          <h1 className="text-lg">인기 챌린지</h1>
          <Link href={`/challenge/all`}>더 보기</Link>
        </div>
        <div className="hidden lg:flex flex-row justify-start w-full h-full">
          {contents?.map((content, index) => {
            return (
              <Link
                key={index}
                href={`/challenge/scroll/LIKE/${index}`}
                className="relative block rounded-lg mr-4 lsat:mr-0"
              >
                <div className="opacity-90 hover:opacity-100 shadow-custom hover:shadow-customhover w-[157.2px] h-full rounded-3xl relative">
                  <img
                    src={content.memberChallengeImg}
                    alt=""
                    className="rounded-3xl relative h-full"
                  />
                  <div className="absolute inset-x-0 bottom-0 left-0 h-8 ml-2 flex text-white">
                    <AiFillHeart
                      size={'2rem'}
                      className="fill-white mr-2"
                      style={{
                        filter: 'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.3))',
                      }}
                    />
                    <p>{content.likeCount}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 모바일 용 */}
      <div className="lg:hidden">
        <h1 className="text-lg mb-3 ml-4">인기 챌린지</h1>
        <PerfectScrollbar options={options} className="w-full">
          <div className="flex flex-row relative w-full p-4">
            {contents.map((content, index) => {
              return (
                <Link
                  key={index}
                  href={`/challenge/scroll/LIKE/${index}`}
                  className="relative"
                >
                  <div className="relative shadow-custom hover:shadow-customhover mr-2 w-[110px] sm:w-[137.5px] rounded-xl h-full">
                    <img
                      src={content.memberChallengeImg}
                      alt=""
                      className="rounded-xl relative h-full"
                    />
                    <div className="absolute inset-x-0 bottom-0 left-0 h-8 ml-2 flex text-white">
                      <AiFillHeart
                        size={'2rem'}
                        className="fill-white mr-2"
                        style={{
                          filter: 'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.3))',
                        }}
                      />
                      <p>{content.likeCount}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
            <div>
              <Link href={`/challenge/all`}>
                <button className="shadow-custom mr-2 w-[110px] h-full rounded-xl bg-[#fff] hover:text-white active:text-white hover:bg-brandP active:bg-[#620fcf]">
                  더 보기
                </button>
              </Link>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
};
export default Famous;
