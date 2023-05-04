'use client';
import React, { useEffect, useState } from 'react';
import { memberChallengeOriginalApi } from '@/app/api/challengeApi';
import { indexMemberChallengeList } from '@/app/types/share';
import VoiceChallengeCard from './VoiceChallengeCard';
import VoiceChallengeInfo from './VoiceChallengeInfo';

type Props = {
  voiceId: number;
};

const ChallengeInfo = ({ voiceId }: Props) => {
  const [memberChallengeList, setMemberChallengeList] =
    useState<indexMemberChallengeList>();
  useEffect(() => {
    const getData = async () => {
      const response = await memberChallengeOriginalApi(voiceId, {
        startIndex: 0,
        endIndex: 10,
      });
      console.log('안됨?', response);
      setMemberChallengeList({
        originalChallengeResponseDto: response.originalChallengeResponseDto,
        memberChallengeResponseDtoList: response.memberChallengeResponseDtoList,
        totalLength: response.totalLength,
      });
    };
    getData();
  }, []);

  const originalChallenge = memberChallengeList?.originalChallengeResponseDto;
  if (!originalChallenge) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:w-2/3 w-full flex flex-col justify-center">
      <VoiceChallengeInfo
        originalChallengeResponseDto={originalChallenge}
      ></VoiceChallengeInfo>
      <VoiceChallengeCard
        memberChallengeResponseDtoList={
          memberChallengeList?.memberChallengeResponseDtoList || []
        }
        totalLength={memberChallengeList?.totalLength || 0}
      ></VoiceChallengeCard>
    </div>
  );
};

export default ChallengeInfo;
