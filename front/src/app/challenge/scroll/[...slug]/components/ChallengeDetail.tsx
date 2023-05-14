'use client';

type Props = {
  challengeList: memberChallenge;
};

import React, { useRef, useEffect, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { memberChallenge, challengeDetail } from '@/types/share';
import {
  likeCreateApi,
  likeDeleteApi,
  deleteMemberChallenge,
} from '@/app/api/challengeApi';
import useUser from '@/app/hooks/userHook';
import { AiFillHeart } from 'react-icons/ai';
import { RiShareForwardFill, RiDeleteBin5Fill } from 'react-icons/ri';
import useSWR from 'swr';

const ChallengeDetail = ({ challengeList }: Props) => {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    return response.json();
  };
  const { user } = useUser();

  const { data, isLoading, error } = useSWR(
    `${BASE_URL}challenge-service/watch/member-challenges/${challengeList.memberChallengeId}/video`,
    fetcher,
  );
  const challengeInfo: challengeDetail = data?.data;
  const youtubePlayRef = useRef<YouTube>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const memberPlayerRef = useRef<HTMLVideoElement>(null);
  const [isView, setIsView] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [likeCnt, setLikeCnt] = useState<number>(0);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const options = {
    root: null,
    threshold: [0.3, 0.9],
  };
  const [detailobserver, setDetailobserver] =
    useState<IntersectionObserver | null>(null);

  const onPlayReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
    const iframe = event.target.getIframe();
    const parent = iframe.contentWindow.parent;
    parent.addEventListener('click', handleParentClick);
  };

  const handleParentClick = async () => {
    console.log('클릭');
    if (youtubePlayRef.current) {
      const player = youtubePlayRef.current.getInternalPlayer();
      const status = await player.getPlayerState();
      if (status === 1) {
        player.pauseVideo();
        // detailobserver?.disconnect();
      } else {
        player.playVideo();
      }
    }
  };

  const playingStateChange = (event: any) => {
    // 유튜브랑 싱크 맞추기 위해서 사용
    if (memberPlayerRef.current) {
      if (event.data === YouTube.PlayerState.ENDED) {
        const player = youtubePlayRef.current?.internalPlayer;
        player.playVideo();
        memberPlayerRef.current.pause();
        memberPlayerRef.current.load();
        // console.log('ENDED');
      }
      if (event.data === YouTube.PlayerState.PLAYING) {
        memberPlayerRef.current.play();
        // console.log('PLAYING');
      }
      if (event.data === YouTube.PlayerState.PAUSED) {
        memberPlayerRef.current.pause();
        // console.log('PAUSED');
      }
    }
  };

  const likeClick = async (method: string) => {
    if (method == 'post') {
      const response = await likeCreateApi(challengeList.memberChallengeId);
      // console.log('response', response);
      setIsLike(true);
      setLikeCnt(likeCnt + 1);
    } else {
      const response = await likeDeleteApi(challengeList.memberChallengeId);
      // console.log('response', response);
      setIsLike(false);
      setLikeCnt(likeCnt - 1);
    }
  };

  const deleteChallenge = async () => {
    const response = await deleteMemberChallenge(
      challengeList.memberChallengeId,
    );
    if (response.code === 200) {
      alert('영상이 삭제되었습니다.');
      setIsDelete(true);
    } else {
      console.log(response);
    }
  };
  const youtubePlayStart = async () => {
    if (youtubePlayRef.current) {
      const player = await youtubePlayRef.current.internalPlayer;
      player.playVideo();
    }
  };

  const shareClick = () => {
    window.navigator.clipboard.writeText(
      `http://localhost:3000/challenge/p/${challengeList.memberChallengeId}`,
    );
    alert('클립보드에 복사를 완료했습니다.');
  };
  useEffect(() => {
    // 촬영 영상 실행 준비되면 유튜브 플레이
    if (isView) {
      youtubePlayStart();
    }
  }, [onPlayReady, isView]);

  useEffect(() => {
    if (data) {
      setIsLike(challengeInfo?.curMemberChallenge.like);
      setLikeCnt(challengeList.likeCount);
    }
  }, [data]);

  useEffect(() => {
    if (!detailobserver) {
      const newObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setIsView(true);
            youtubePlayStart();
          } else if (entry.intersectionRatio < 0.3) {
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
    <div className="py-5">
      {!isDelete && (
        <div className="h-[800px]  flex flex-col items-center" ref={videoRef}>
          <div className="relative overflow-hidden rounded-xl z-0 h-[810px]">
            <div className={isView ? 'relative h-[810px]' : 'hidden'}>
              <video
                ref={memberPlayerRef}
                src={challengeInfo?.curMemberChallenge.memberChallengeUrl}
                className="h-[810px] overflow-hidden relative"
              ></video>
              <YouTube
                videoId="2p7tw_Nzne0"
                opts={opts}
                onReady={onPlayReady}
                ref={youtubePlayRef}
                onStateChange={playingStateChange}
                className="absolute bottom-20 left-0 ml-2 mb-2"
              />
              {user && (
                <>
                  <div className="absolute bottom-20 right-0 mr-2 mb-2">
                    <div className="grid-rows-2  m-3">
                      <div className="flex justify-center">
                        <h1 className="font-semibold text-3xl">
                          {challengeInfo?.curMemberChallenge.like}
                        </h1>
                        {isLike && (
                          <AiFillHeart
                            size={'3rem'}
                            className="fill-[#fb3958]"
                            style={{
                              filter:
                                'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.3))',
                            }}
                            onClick={() => likeClick('delete')}
                          />
                        )}
                        {!isLike && (
                          <AiFillHeart
                            size={'3rem'}
                            className="fill-white"
                            style={{
                              filter:
                                'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.3))',
                            }}
                            onClick={() => likeClick('post')}
                          />
                        )}
                      </div>
                      <div className="flex justify-center">
                        <p
                          className="text-lg font-black text-white"
                          style={{
                            filter:
                              'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.3))',
                          }}
                        >
                          {likeCnt}
                        </p>
                      </div>
                    </div>
                    <div className="grid-rows-2 m-3">
                      <div className="flex justify-center">
                        <RiShareForwardFill
                          size={'3rem'}
                          className="fill-white"
                          style={{
                            filter:
                              'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.3))',
                          }}
                          onClick={() => shareClick()}
                        />
                      </div>
                      <div className="flex justify-center">
                        <p
                          className="text-md font-black text-white"
                          style={{
                            filter:
                              'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.3))',
                          }}
                        >
                          공유하기
                        </p>
                      </div>
                    </div>
                    {challengeInfo?.curMemberChallenge
                      .memberChallengeNickname === user?.data.nickname && (
                      <div className="grid-rows-2 m-3">
                        <div className="flex justify-center">
                          <RiDeleteBin5Fill
                            size={'3rem'}
                            className="fill-white"
                            style={{
                              filter:
                                'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.3))',
                            }}
                            onClick={() => deleteChallenge()}
                          />
                        </div>
                        <div className="flex justify-center">
                          <p
                            className="text-md font-black text-white"
                            style={{
                              filter:
                                'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.3))',
                            }}
                          >
                            삭제하기
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className={isView ? 'hidden' : 'relative rounded-xl'}>
              <img
                src={challengeList.memberChallengeImg}
                alt=""
                className="h-[810px] overflow-hidden relative"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeDetail;
