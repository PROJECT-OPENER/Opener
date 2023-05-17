'use client';

import React, { useRef, useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import ChallengeDetail from './ChallengeDetail';
import { memberChallenge, challengeIdSwrData } from '@/types/share';

type Props = {
  originalId: string;
  startIdx: number;
};

const ChallengeList = ({ originalId, startIdx }: Props) => {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const fetcher = async (url: string) => {
    const response = await fetch(url);
    return response.json();
  };

  const { data, error, size, setSize, isLoading } =
    useSWRInfinite<challengeIdSwrData>(
      (index) =>
        `${BASE_URL}challenge-service/challenges/${originalId}?startIndex=${startIdx}&endIndex=${
          startIdx > index + 3 ? startIdx + 3 : index + 3
        }`,
      fetcher,
    );

  const challenges = data ? data.flat() : [];

  const challengeList: memberChallenge[] =
    challenges[challenges.length - 1]?.data.memberChallengeList;
  const endIndex = challenges[0]?.data.totalLength - 1;

  const isEnd = challengeList?.length > endIndex;
  const isEmpty = challengeList?.length === 0;

  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const listEndRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    console.log(challengeList?.length, endIndex);
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
          if (entry.intersectionRatio > 0.2 && !isEnd) {
            console.log(isEnd);
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
    <div className="overflow-scroll h-screen snap-mandatory snap-y scrollbar-hide">
      {isEmpty ? <p>조회된 챌린지가 없습니다.</p> : null}
      {isLoading && (
        <div className="h-screen w-screen">
          <h1>로딩중</h1>
        </div>
      )}
      {challengeList && (
        <div className="">
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
            : 'list-end h-20 bg-red-400'
        }
        ref={listEndRef}
      ></p>
    </div>
  );
};

export default ChallengeList;
