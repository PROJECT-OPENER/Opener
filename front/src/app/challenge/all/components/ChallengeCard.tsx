'use client';

import React, { useEffect, useState, useRef } from 'react';
import { memberChallenge, challengeCategorySwrData } from '@/types/share';
import Link from 'next/link';
import { AiFillHeart } from 'react-icons/ai';
import useSWRInfinite from 'swr/infinite';

const ChallengeCard = () => {
  const [category, setCategory] = useState<string>('LIKE'); // 주의
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    return response.json();
  };
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const { data, error, size, setSize, isLoading, mutate } =
    useSWRInfinite<challengeCategorySwrData>(
      (index) =>
        `${BASE_URL}challenge-service/member-challenges?category=${category}&startIndex=${0}&endIndex=${
          index + 8
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
  const likeButton = useRef<HTMLButtonElement>(null);
  const recentButton = useRef<HTMLButtonElement>(null);
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
        <div className="md:m-10">
          <div className="md:my-14 flex justify-center">
            <button
              ref={likeButton}
              type="button"
              className="md:ml-4 bg-brandP  w-32 text-white rounded-xl shadow-xl py-3"
              onClick={() => {
                setCategory('LIKE');
                mutate();
                if (likeButton.current && recentButton.current) {
                  recentButton.current.className =
                    'ml-4 bg-white w-32 text-black rounded-xl shadow-xl py-3';
                  likeButton.current.className =
                    'ml-4 bg-brandP w-32 text-white rounded-xl shadow-xl py-3';
                }
              }}
            >
              좋아요순
            </button>
            <button
              type="button"
              ref={recentButton}
              className=" ml-4 bg-white w-32 text-black rounded-xl shadow-xl py-3"
              onClick={(e) => {
                e.preventDefault();
                if (likeButton.current && recentButton.current) {
                  console.log('됨');
                  likeButton.current.className =
                    'ml-4 bg-white w-32 text-black rounded-xl shadow-xl py-3';
                  recentButton.current.className =
                    'ml-4 bg-brandP w-32 text-white rounded-xl shadow-xl py-3';
                }
                console.log('됏음?');
                setCategory('RECENT');
                mutate();
              }}
            >
              최신순
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 md:my-16 mt-16">
            {challengeList?.map((memberChallenge, index) => (
              <div
                className="flex justify-center items-center w-[100%] h-[100%]"
                key={memberChallenge.memberChallengeId}
              >
                <Link
                  href={`challenge/scroll/${category}/${index}`}
                  className="overflow-hidden relative rounded-lg w-full h-full bg-black flex justify-center items-center"
                >
                  <img
                    className="w-auto h-auto relative shadow-xl"
                    src={memberChallenge.memberChallengeImg}
                    alt=""
                  />
                  <div className="absolute inset-x-2  bottom-2 left-0 h-8 ml-2 flex text-white items-center">
                    <AiFillHeart
                      size={'1rem'}
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
        </div>
      )}
      <p
        className={
          challenges[0]?.data.totalLength <= challengeList?.length
            ? 'hidden'
            : 'list-end h-20'
        }
        ref={listEndRef}
      ></p>
    </>
  );
};

export default ChallengeCard;
