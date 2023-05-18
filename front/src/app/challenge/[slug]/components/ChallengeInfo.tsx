'use client';
import React, { useEffect, useState, useRef } from 'react';
import VoiceChallengeCard from './VoiceChallengeCard';
import VoiceChallengeInfo from './VoiceChallengeInfo';
import useSWRInfinite from 'swr/infinite';
import { memberChallenge, challengeIdSwrData } from '@/types/share';

type Props = {
  voiceId: number;
};

const ChallengeInfo = ({ voiceId }: Props) => {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const fetcher = async (url: string) => {
    const response = await fetch(url);
    return response.json();
  };

  const { data, error, size, setSize, isLoading } =
    useSWRInfinite<challengeIdSwrData>(
      (index) =>
        `${BASE_URL}challenge-service/challenges/${voiceId}?startIndex=${0}&endIndex=${
          index + 5
        }`,
      fetcher,
    );

  const challenges = data ? data.flat() : [];

  const challengeList: memberChallenge[] =
    challenges[challenges.length - 1]?.data?.memberChallengeList;

  const originalChallenge = challenges[0]?.data?.original;
  const endIndex = challenges[0]?.data?.totalLength - 1;
  const isEnd = challengeList?.length > endIndex;

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
          if (entry.intersectionRatio > 0.3 && !isEnd) {
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
    <div className="w-full max-w-[900px] flex flex-col justify-center items-center">
      {isLoading && (
        <div className="h-screen w-screen">
          <h1>로딩중</h1>
        </div>
      )}
      {data && (
        <div>
          <VoiceChallengeInfo
            originalChallengeResponseDto={originalChallenge}
          ></VoiceChallengeInfo>
          <VoiceChallengeCard
            memberChallengeResponseDtoList={challengeList || []}
            totalLength={endIndex + 1 || 0}
            originalId={originalChallenge?.challengeId}
          ></VoiceChallengeCard>
        </div>
      )}
      <p
        className={
          challenges[0]?.data?.totalLength - 1 <= challengeList?.length
            ? 'hidden'
            : 'list-end'
        }
        ref={listEndRef}
      ></p>
    </div>
  );
};

export default ChallengeInfo;
