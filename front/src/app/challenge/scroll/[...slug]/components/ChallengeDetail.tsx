'use client';

type Props = {
  challengeList: memberChallenge;
};

import React, { useRef, useEffect, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { memberChallenge, challengeDetail } from '@/types/share';
import useSWR from 'swr';

const ChallengeDetail = ({ challengeList }: Props) => {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    return response.json();
  };

  const { data, isLoading, error } = useSWR(
    `${BASE_URL}challenge-service/watch/member-challenges/${challengeList.memberChallengeId}/video`,
    fetcher,
  );

  const challengeInfo: challengeDetail = data?.data;
  const youtubePlayRef = useRef<YouTube>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const memberPlayerRef = useRef<HTMLVideoElement>(null);
  const [isView, setIsView] = useState<boolean>(false);
  const options = {
    root: null,
    threshold: [0.3, 0.7],
  };
  const [detailobserver, setDetailobserver] =
    useState<IntersectionObserver | null>(null);

  const onPlayReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  const playingStateChange = (event: any) => {
    // 유튜브랑 싱크 맞추기 위해서 사용
    if (event.data === YouTube.PlayerState.ENDED) {
      if (youtubePlayRef.current) {
        const player = youtubePlayRef.current?.internalPlayer;
        player.playVideo();
        if (memberPlayerRef.current) {
          memberPlayerRef.current.pause();
          memberPlayerRef.current.load();
        }
      }
    }
    if (event.data === YouTube.PlayerState.PLAYING) {
      if (memberPlayerRef.current) {
        memberPlayerRef.current.play();
      }
    }
    if (event.data === YouTube.PlayerState.PAUSED) {
      if (memberPlayerRef.current) {
        memberPlayerRef.current.pause();
      }
    }
  };
  useEffect(() => {
    // 촬영 영상 실행 준비되면 유튜브 플레이
    if (youtubePlayRef.current && isView) {
      const player = youtubePlayRef.current?.internalPlayer;
      player.playVideo();
    }
  }, [onPlayReady, isView]);

  useEffect(() => {
    if (!detailobserver) {
      const newObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          console.log('entry.intersectionRatio:', entry.intersectionRatio);
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setIsView(true);
            console.log('isView---', isView);
            const player = youtubePlayRef.current?.internalPlayer;
            player?.playVideo();
            // entry.target.scrollIntoView(true);
            // entry.target.scrollIntoView({
            //   behavior: 'smooth',
            //   block: 'center',
            // });
          } else if (entry.intersectionRatio < 0.3) {
            console.log('감지~!');
            const player = youtubePlayRef.current?.internalPlayer;
            player?.pauseVideo();
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
    height: '224',
    width: '126',
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
    <div
      className={
        isView
          ? 'h-screen flex flex-col items-center pt-10 bg-gray-50 mb-10 border-2'
          : 'h-screen flex flex-col items-center pt-10 bg-gray-100 mb-10 border-2'
      }
      ref={videoRef}
    >
      <div className="relative overflow-hidden mt-10 rounded-xl z-0  bg-white">
        <div className={isView ? 'relative' : 'hidden'}>
          <video
            ref={memberPlayerRef}
            src={challengeInfo?.curMemberChallenge.memberChallengeUrl}
            className="h-[810px] overflow-hidden relative"
          ></video>
          <div className="absolute bottom-0 left-0 ml-2 mb-2">
            <YouTube
              videoId="2p7tw_Nzne0"
              opts={opts}
              onReady={onPlayReady}
              ref={youtubePlayRef}
              onStateChange={playingStateChange}
            />
          </div>
        </div>
        <div className={isView ? 'hidden' : 'relative'}>
          <img
            src={challengeList.memberChallengeImg}
            alt=""
            className="h-[810px] overflow-hidden relative"
          />
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
