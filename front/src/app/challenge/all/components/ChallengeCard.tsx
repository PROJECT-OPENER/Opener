'use client';

import React, { useEffect, useState } from 'react';
import Button from '@/app/components/Button';
import { allMemberChallengeList } from '@/types/share';
import { allChallengeApi } from '@/app/api/challengeApi';
import Link from 'next/link';
import { AiFillHeart } from 'react-icons/ai';

const ChallengeCard = () => {
  const [memberChallengeList, setMemberChallengeList] =
    useState<allMemberChallengeList>();
  const [category, setCategory] = useState<string>('LIKE');
  useEffect(() => {
    const getData = async () => {
      const response = await allChallengeApi(category, 0, 10);
      setMemberChallengeList({
        memberChallengeList: response.memberChallengeList,
        totalLength: response.totalLength,
      });
    };
    getData();
  }, [category]);

  return (
    <>
      <div className="my-14">
        <Button
          type="button"
          text="좋아요순"
          className=" bg-brandP w-32 text-white rounded-xl shadow-xl py-3"
          onClick={() => {
            setCategory('LIKE');
          }}
        />
        <Button
          type="button"
          text="최신순"
          className="ml-4 bg-white w-32 text-black rounded-xl shadow-xl py-3"
          onClick={() => {
            setCategory('RECENT');
          }}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 my-16">
        {memberChallengeList?.memberChallengeList?.map((memberChallenge) => (
          <div
            className="flex justify-center items-center w-[100%] h-[100%]"
            key={memberChallenge.memberChallengeId}
          >
            <Link href="" className="relative block rounded-lg w-full h-full">
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
  );
};

export default ChallengeCard;
