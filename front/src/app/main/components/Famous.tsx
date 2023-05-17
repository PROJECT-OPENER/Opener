'use client';
import React, { useState, useEffect } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { allChallengeApi } from '@/app/api/challengeApi';
import { memberChallenge } from '@/types/share';
import Link from 'next/link';
import { AiFillHeart } from 'react-icons/ai';
import Image from 'next/image';

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
      setContents(response.memberChallengeList);
    };
    getContent();
  }, []);

  return (
    <>
      {contents && (
        <div className="pb-4 overflow-hidden mt-6 lg:mt-10">
          <h1 className="text-lg lg:mb-3 ml-4 font-bold">인기 챌린지</h1>
          <div className="relative ">
            <div className="lg:hidden p_scrollbar_right" />
            <PerfectScrollbar options={options} className="w-full h-full p-4">
              <div className="flex flex-row relative h-full w-full justify-between">
                {contents.map((content, index) => {
                  return (
                    <Link key={index} href={`/challenge/scroll/LIKE/${index}`}>
                      <div className="lg:mr-0 mr-2 relative shadow-custom w-[110px] sm:w-[137.5px] h-full sm:h-[200px] rounded-3xl bg-brandP flex justify-center items-center lg:w-[155px] lg:h-[225.5px] overflow-hidden">
                        <Image src={content.memberChallengeImg} alt="" fill />
                        <div className="absolute inset-x-0 bottom-2 left-3 h-8 flex text-white items-center">
                          <AiFillHeart
                            size={'1.4rem'}
                            className="fill-white mr-2"
                          />
                          <p>{content.likeCount}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
                <Link className="lg:hidden" href={`/challenge/all`}>
                  <button className="shadow-custom mr-10 w-[110px] h-[160px] sm:h-[200px] rounded-3xl bg-[#fff] hover:text-white active:text-white hover:bg-brandP active:bg-[#620fcf]">
                    더 보기
                  </button>
                </Link>
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      )}
    </>
  );
};
export default Famous;
