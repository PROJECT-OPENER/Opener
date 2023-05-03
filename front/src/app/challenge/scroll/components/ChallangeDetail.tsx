'use client';

type Props = {
  title: string;
};

import React, { useRef, useEffect, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

const ChallangeDetail = ({ title }: Props) => {
  const youtubePlayRef = useRef<YouTube>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const [isView, setIsView] = useState<boolean>(false);
  const options = {
    root: null,
    threshold: [0, 0.7],
  };
  const [detailobserver, setDetailobserver] =
    useState<IntersectionObserver | null>(null);

  const onPlayReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  // const playingStateChange = (event: any) => {
  //   // Youtube 태그에 onStateChange={playingStateChange} 추가해서 추후 사용

  //   console.log(event);
  //   console.log(event.data);
  //   if (event.data === -1) {
  //     console.log('>');
  //   }
  // };

  useEffect(() => {
    if (!detailobserver) {
      const newObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.7) {
            setIsView(true);
            const player = youtubePlayRef.current?.internalPlayer;
            player.playVideo();
            entry.target.scrollIntoView(true);
            entry.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else if (entry.intersectionRatio < 0.3) {
            const player = youtubePlayRef.current?.internalPlayer;
            player.pauseVideo();
            setIsView(false);
          }
        });
      }, options);
      if (videoRef.current && newObserver) {
        newObserver.observe(videoRef.current);
      }
      setDetailobserver(newObserver);
    }
  }, []);

  const opts: YouTubeProps['opts'] = {
    height: '800',
    width: '450',
    playerVars: {
      controls: 0,
      loop: 1,
      disablekb: 1,
      autohide: 0,
      autoplay: 0,
      fs: 0,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
    },
  };

  return (
    <div className="h-full flex flex-col items-center pt-10" ref={videoRef}>
      <div className=" relative overflow-hidden mt-10 rounded-xl z-0  bg-white">
        <YouTube
          videoId="Wb7dDxDNvtc"
          opts={opts}
          onReady={onPlayReady}
          ref={youtubePlayRef}
          className="relative"
        />
        {!isView && (
          <div className="w-full h-full bg-zinc-400 absolute top-0">
            <h1 className="text-5xl text-white">썸네일 들어올 자리</h1>
            <h1 className="text-2xl text-white">{title}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallangeDetail;
