'use client';

import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

const OriginalVideo = () => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      controls: 0,
    },
  };
  return <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={onPlayerReady} />;
};

export default OriginalVideo;
