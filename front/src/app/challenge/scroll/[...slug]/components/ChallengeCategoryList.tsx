'use client';

import React, { useRef, useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import ChallengeDetail from './ChallengeDetail';
import { memberChallenge, challengeCategorySwrData } from '@/types/share';

type Props = {
  category: string;
  startIdx: number;
};

const ChallengeCategoryList = ({ category, startIdx }: Props) => {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const fetcher = async (url: string) => {
    const response = await fetch(url);
    return response.json();
  };

  const { data, error, size, setSize, isLoading } =
    useSWRInfinite<challengeCategorySwrData>(
      (index) =>
        `${BASE_URL}challenge-service/member-challenges?category=${category}&startIndex=${startIdx}&endIndex=${
          startIdx > index + 5 ? startIdx + 5 : index + 5
        }`,
      fetcher,
    );

  const challenges = data ? data.flat() : [];

  const endIndex = challenges[0]?.data.totalLength - 1;
  const challengeList: memberChallenge[] =
    challenges[challenges.length - 1]?.data.memberChallengeList;
  const isEnd = challengeList?.length > endIndex;

  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const listEndRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (observer && isEnd) {
      console.log('불러오기 끝');
      observer.unobserve;
      if (listEndRef.current) {
        listEndRef.current.className = 'hidden';
      }
    }
  }, [isEnd]);

  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.5,
    };
    if (!observer) {
      const newObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.2) {
            setSize((prev) => prev + 3);
          }
        });
      }, options);
      if (listEndRef.current && newObserver) {
        newObserver.observe(listEndRef.current); // list의 끝부분을 알려주는 p 타겟 요소를 관찰
      }
      setObserver(newObserver);
    }
  }, []);

  return (
    <div className="absolute top-0 left-0 overflow-scroll h-screen snap-mandatory snap-y scrollbar-hide">
      {challengeList && (
        <div className="relative">
          {challengeList.map((chal) => (
            <div key={chal.memberChallengeId} className="snap-center">
              <ChallengeDetail challengeList={chal}></ChallengeDetail>
            </div>
          ))}
        </div>
      )}
      <p
        className={
          challenges[0]?.data.totalLength - startIdx <= challengeList?.length
            ? 'hidden'
            : 'list-end h-20'
        }
        ref={listEndRef}
      ></p>
    </div>
  );
};

export default ChallengeCategoryList;
