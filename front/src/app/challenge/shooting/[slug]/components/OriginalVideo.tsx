'use client';

import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

const OriginalVideo = () => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };
  const opts: YouTubeProps['opts'] = {
    height: '480',
    width: '270',
    playerVars: {
      controls: 0,
      disablekb: 1,
    },
  };
  return (
    <div className="w-[100px]">
      <YouTube
        videoId="2g811Eo7K8U"
        opts={opts}
        onReady={onPlayerReady}
        className=""
      />
    </div>
  );
};

export default OriginalVideo;
