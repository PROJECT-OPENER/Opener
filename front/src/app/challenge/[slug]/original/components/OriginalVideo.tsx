'use client';

import React, { useEffect, useState } from 'react';
import { originalVideoApi } from '@/app/api/challengeApi';
import { originalVideo } from '@/types/share';
import YouTube, { YouTubeProps } from 'react-youtube';

type Props = {
  challengeId: number;
};

const OriginalVideo = ({ challengeId }: Props) => {
  const [originVideo, setOriginVideo] = useState<originalVideo>();
  const opts: YouTubeProps['opts'] = {
    height: '640',
    width: '360',
    playerVars: {
      controls: 1,
      loop: 1,
      disablekb: 1,
      autohide: 0,
      autoplay: 1,
      fs: 0,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
    },
  };
  useEffect(() => {
    const getData = async () => {
      const response = await originalVideoApi(challengeId);
      console.log(response);
      setOriginVideo({
        challengeId: response.challengeId,
        title: response.title,
        challengeUrl: response.challengeUrl,
        endTime: response.endTime,
        joinCount: response.joinCount,
        startTime: response.startTime,
        caption: response.caption,
      });
    };
    getData();
  }, []);
  return (
    <div className="md:p-5 rounded-xl bg-white shadow-lg flex">
      <YouTube videoId={originVideo?.challengeUrl} opts={opts} className="" />
    </div>
  );
};

export default OriginalVideo;
