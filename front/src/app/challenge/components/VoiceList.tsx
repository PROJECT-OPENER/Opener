'use client';

import React, { useEffect, useState } from 'react';
import VoiceCard from './VoiceCard';
import { originalChallenge } from '@/types/share';
import { originalChallengeApi } from '@/app/api/challengeApi';
import { TfiAngleLeft } from 'react-icons/tfi';
import Link from 'next/link';

type ChallengeList = originalChallenge[];

const VoiceList = () => {
  useEffect(() => {
    const getData = async () => {
      const response = await originalChallengeApi();
      setChallengeList(response);
      // console.log(response);
    };
    getData();
  }, []);

  const [challengeList, setChallengeList] = useState<ChallengeList>([]);

  return (
    <div className="relative w-full p-4">
      {challengeList.map((challenge) => (
        <VoiceCard
          key={challenge.challengeId}
          challenge={challenge}
        ></VoiceCard>
      ))}
      <Link
        href={`/`}
        className="hidden lg:block fixed left-4 bottom-5 bg-[#fff] hover:bg-brandY p-3 rounded-full shadow-custom"
      >
        <TfiAngleLeft size="1.8rem" />
      </Link>
    </div>
  );
};

export default VoiceList;
