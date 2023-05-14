'use client';

import React, { useEffect, useState, useRef } from 'react';
import Button from '@/app/components/Button';
import { memberChallenge, challengeCategorySwrData } from '@/types/share';
import Link from 'next/link';
import { AiFillHeart } from 'react-icons/ai';
import useSWRInfinite from 'swr/infinite';

const ChallengeCard = () => {
  let category = 'LIKE';

  const fetcher = async (url: string) => {
    const response = await fetch(url);
    return response.json();
  };
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const { data, error, size, setSize, isLoading, mutate } =
    useSWRInfinite<challengeCategorySwrData>(
      (index) =>
        `${BASE_URL}challenge-service/member-challenges?category=${category}&startIndex=${0}&endIndex=${
          index + 2
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
          if (entry.intersectionRatio > 0.3) {
            setSize((prev) => prev + 3);
            // console.log('불러오기');
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
      {isLoading && (
        <div className="h-screen w-screen">
          <h1>로딩중</h1>
        </div>
      )}
      {data && (
        <>
          <div className="my-14">
            <Button
              type="button"
              text="좋아요순"
              className=" bg-brandP w-32 text-white rounded-xl shadow-xl py-3"
              onClick={() => {
                category = 'LIKE';
                mutate();
              }}
            />
            <Button
              type="button"
              text="최신순"
              className="ml-4 bg-white w-32 text-black rounded-xl shadow-xl py-3"
              onClick={() => {
                category = 'RECENT';
                mutate();
              }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 my-16">
            {challengeList?.map((memberChallenge, index) => (
              <div
                className="flex justify-center items-center w-[100%] h-[100%]"
                key={memberChallenge.memberChallengeId}
              >
                <Link
                  href={`challenge/scroll/${category}/${index}`}
                  className="relative block rounded-lg w-full h-full"
                >
                  <img
                    className="w-full h-full rounded-lg relative shadow-xl"
                    src={memberChallenge.memberChallengeImg}
                    alt=""
                  />
                  <div className="absolute inset-x-0 bottom-0 left-0 h-8 ml-2 flex text-white">
                    <AiFillHeart
                      size={'2rem'}
                      className="fill-white mr-2"
                      style={{
                        filter: 'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.3))',
                      }}
                    />
                    <p>{memberChallenge.likeCount}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
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

export default ChallengeCard;
