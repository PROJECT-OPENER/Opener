'use client';

import React, { useEffect, useState } from 'react';
import Button from '@/app/components/Button';
import { allMemberChallengeList } from '@/types/share';
import { allChallengeApi } from '@/app/api/challengeApi';
const ChallengeCard = () => {
  const [memberChallengeList, setMemberChallengeList] =
    useState<allMemberChallengeList>();
  const [category, setCategory] = useState<string>('LIKE');
  useEffect(() => {
    const getData = async () => {
      const response = await allChallengeApi(category, 0, 1);
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
          <div className="relative" key={memberChallenge.memberChallengeId}>
            <img
              className="bg-gray-200  h-48 w-32 rounded-lg"
              src={memberChallenge.memberChallengeImg}
              alt=""
            />
            <div className="absolute inset-x-0 bottom-0 h-8 ml-2 flex text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              <p>{memberChallenge.likeCount}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChallengeCard;
