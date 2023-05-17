'use client';

import React, { useEffect, useState } from 'react';
import VoiceCard from './VoiceCard';
import { originalChallenge } from '@/types/share';
import { originalChallengeApi } from '@/app/api/challengeApi';

type ChallengeList = originalChallenge[];

const VoiceList = () => {
  useEffect(() => {
    const getData = async () => {
      const response = await originalChallengeApi();
      setChallengeList(response);
      console.log(response);
    };
    getData();
  }, []);

  const [challengeList, setChallengeList] = useState<ChallengeList>([]);

  return (
    <div className="">
      {challengeList.map((challenge) => (
        <VoiceCard
          key={challenge.challengeId}
          challenge={challenge}
        ></VoiceCard>
      ))}
    </div>
  );
};

export default VoiceList;
