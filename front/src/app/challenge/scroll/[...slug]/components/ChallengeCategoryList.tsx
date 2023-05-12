'use client';

import React, { useRef, useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import ChallengeDetail from './ChallengeDetail';
import { memberChallenge } from '@/types/share';

interface scrollChallengeList {
  // original: number;
  totalLength: number;
  memberChallengeList: memberChallenge[];
}

interface dataList {
  data: scrollChallengeList;
}

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

  const { data, error, size, setSize, isLoading } = useSWRInfinite<dataList>(
    (index) =>
      `${BASE_URL}challenge-service/member-challenges?category=${category}&startIndex=${startIdx}&endIndex=${
        startIdx > index + 3 ? startIdx + 3 : index + 3
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
            setSize((prev) => prev + 1);
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
    <>
      {challengeList && (
        <div>
          {challengeList.map((chal) => (
            <div key={chal.memberChallengeId}>
              <ChallengeDetail challengeList={chal}></ChallengeDetail>
            </div>
          ))}
        </div>
      )}
      <p
        className={
          challenges[0]?.data.totalLength <= challengeList?.length
            ? 'hidden'
            : 'list-end'
        }
        ref={listEndRef}
      ></p>
    </>
  );
};

export default ChallengeCategoryList;
