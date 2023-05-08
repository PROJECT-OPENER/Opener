'use client';

import React, { useEffect, useState } from 'react';
import { originalVideoApi } from '@/app/api/challengeApi';
import { originalVideo } from '@/types/share';
type Props = {
  challengeId: number;
};

const OriginalVideo = ({ challengeId }: Props) => {
  const [originVideo, setOriginVideo] = useState<originalVideo>();
  useEffect(() => {
    const getData = async () => {
      const response = await originalVideoApi(challengeId);
      setOriginVideo({
        challengeId: response.challengeId,
        title: response.title,
        korCaption: response.korCaption,
        engCaption: response.engCaption,
        captionTime: response.captionTime,
        challengeUrl: response.challengeUrl,
        joinCount: response.joinCount,
      });
    };
    getData();
  }, []);
  return (
    <div className="bg-gray-100 p-10">
      <p>원본 영상입니다.</p>
      <p>{originVideo?.title}</p>
      <p>{originVideo?.korCaption}</p>
      <p>{originVideo?.engCaption}</p>
      <p>{originVideo?.captionTime}</p>
      <p>{originVideo?.challengeUrl}</p>
      <p>{originVideo?.joinCount}</p>
    </div>
  );
};

export default OriginalVideo;
